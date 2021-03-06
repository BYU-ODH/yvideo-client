import User from 'models/User'
import Content from 'models/Content'

export default class AdminService {

	// TODO: Move all functionality from this service into appropriate services

	// This whole service doesn't make sense. There is no object in the database called an "admin". That's just a role.
	// So all of the collection stuff should be put into the collections service, all the search_professor stuff should
	// be in some kind of user service, etc.

	// types

	types = {
		ADMIN_START: `ADMIN_START`,
		ADMIN_ABORT: `ADMIN_ABORT`,
		ADMIN_CLEAN: `ADMIN_CLEAN`,
		ADMIN_ERROR: `ADMIN_ERROR`,
		ADMIN_SEARCH: `ADMIN_SEARCH`,
		ADMIN_CREATE_COLLECTION: `ADMIN_CREATE_COLLECTION`,
		ADMIN_CREATE_CONTENT: `ADMIN_CREATE_CONTENT`,
		ADMIN_GET_COLLECTION_CONTENT: `ADMIN_GET_COLLECTION_CONTENT`,
		ADMIN_SEARCH_PROFESSORS: `ADMIN_SEARCH_PROFESSORS`,
		ADMIN_SET_PROFESSOR: `ADMIN_SET_PROFESSOR`,
		ADMIN_SEARCH_COLLECTIONS: `ADMIN_SEARCH_COLLECTIONS`,
		ADMIN_COLLECTION_EDIT: `ADMIN_COLLECTION_EDIT`,
		ADMIN_COLLECTION_DELETE: `ADMIN_COLLECTION_DELETE`,
		ADMIN_USER_DELETE: `ADMIN_USER_DELETE`,
		ADMIN_CONTENT_DELETE: `ADMIN_CONTENT_DELETE`,
		ADMIN_CONTENT_DELETE_FROM_TABLE: `ADMIN_CONTENT_DELETE_FROM_TABLE`,
	}

	// action creators

	actions = {
		adminStart: () => ({ type: this.types.ADMIN_START }),
		adminAbort: () => ({ type: this.types.ADMIN_ABORT }),
		adminClean: () => ({ type: this.types.ADMIN_CLEAN }),
		adminCreateCollection: () => ({ type: this.types.ADMIN_CREATE_COLLECTION }),
		adminCreateContent: (content) => ({ type: this.types.ADMIN_CREATE_CONTENT, payload: { content } }),
		adminError: error => ({ type: this.types.ADMIN_ERROR, payload: { error } }),
		adminGetCollectionContent: content => ({ type: this.types.ADMIN_GET_COLLECTION_CONTENT, payload: { content }}),
		adminSearch: results => ({ type: this.types.ADMIN_SEARCH, payload: { results } }),
		adminSearchProfessors: results => ({ type: this.types.ADMIN_SEARCH_PROFESSORS, payload: { results }}),
		adminSetProfessor: professor => ({ type: this.types.ADMIN_SET_PROFESSOR, payload: { professor }}),
		adminSearchCollections: results => ({ type: this.types.ADMIN_SEARCH_COLLECTIONS, payload: { results }}),
		adminCollectionEdit: collection => ({ type: this.types.ADMIN_COLLECTION_EDIT, payload: { collection }}),
		adminCollectionDelete: response => ({ type: this.types.ADMIN_COLLECTION_DELETE, payload: { response }}),
		adminUserDelete: data => ({ type: this.types.ADMIN_USER_DELETE, payload: { data }}),
		adminContentDelete: content => ({ type: this.types.ADMIN_CONTENT_DELETE, payload: { content }}),
		adminContentDeleteFromTable: content => ({ type: this.types.ADMIN_CONTENT_DELETE_FROM_TABLE, payload: { content }}),
	}

	// default store

	store = {
		data: null,
		cache: {},
		professors: [],
		professor: {},
		professorCollections: null,
		profCollectionContent: null,
		loading: false,
		lastFetched: 0,
		lastFetchedProfContent: 0,
		lastFetchedProfessors: 0,
		lastFetchedCollections: 0,
	}

	// reducer
	reducer = (store = this.store, action) => {

		const {
			ADMIN_START,
			ADMIN_ABORT,
			ADMIN_CLEAN,
			ADMIN_CREATE_COLLECTION,
			ADMIN_CREATE_CONTENT,
			ADMIN_ERROR,
			ADMIN_GET_COLLECTION_CONTENT,
			ADMIN_SEARCH,
			ADMIN_SEARCH_PROFESSORS,
			ADMIN_SET_PROFESSOR,
			ADMIN_SEARCH_COLLECTIONS,
			ADMIN_COLLECTION_EDIT,
			ADMIN_COLLECTION_DELETE,
			ADMIN_USER_DELETE,
			ADMIN_CONTENT_DELETE,
			ADMIN_CONTENT_DELETE_FROM_TABLE,
		} = this.types

		switch (action.type) {

		case ADMIN_START:
			return {
				...store,
				loading: true,
			}

		case ADMIN_ABORT:
			return {
				...store,
				data: null,
				loading: false,
			}

		case ADMIN_CLEAN:
			return {
				...store,
				data: null,
				cache: {},
			}

		case ADMIN_CREATE_COLLECTION:
			return {
				...store,
				professor: {},
				professorCollections: null,
				profCollectionContent: null,
				loading: false,
			}

		case ADMIN_CREATE_CONTENT:
			return {
				...store,
				profCollectionContent: {
					...store.profCollectionContent,
					[action.payload.content.id]: action.payload.content,
				},
				loading: false,
			}

		case ADMIN_ERROR:
			console.error(action.payload.error)
			return {
				...store,
				data: null,
				loading: false,
			}

		case ADMIN_GET_COLLECTION_CONTENT:
			return {
				...store,
				profCollectionContent: action.payload.content,
				lastFetchedProfContent: Date.now(),
			}

		case ADMIN_SEARCH:
			return {
				...store,
				data: action.payload.results,
				cache: {
					...action.payload.results,
				},
				loading: false,
				lastFetched: Date.now(),
			}

		case ADMIN_SEARCH_PROFESSORS:
			return {
				...store,
				professors: action.payload.results,
				professor: {},
				professorCollections: null,
				profCollectionContent: null,
				loading: false,
				lastFetchedProfessors: Date.now(),
			}

		case ADMIN_SET_PROFESSOR:
			return {
				...store,
				professor: action.payload.professor,
				loading: false,
			}

		case ADMIN_SEARCH_COLLECTIONS:
			return {
				...store,
				professors: [],
				professorCollections: action.payload.results,
				loading: false,
				lastFetchedCollections: Date.now(),
			}

		case ADMIN_COLLECTION_EDIT:
			return {
				...store,
				professorCollections: {
					...store.professorCollections,
					[action.payload.collection.id]: action.payload.collection,
				},
				loading: false,
			}

		case ADMIN_COLLECTION_DELETE:
			return {
				...store,
				data: action.payload.response,
				loading: false,
			}

		case ADMIN_USER_DELETE:
			return {
				...store,
				data: action.payload.data,
				loading: false,
			}

		// THIS IS DELETING CONTENT FROM MANAGE COLLECTION
		case ADMIN_CONTENT_DELETE:
			return {
				...store,
				profCollectionContent: action.payload.content,
				loading: false,
			}

		// THIS IS DELETING CONTENT FROM THE ADMIN CONTAINER / ADMIN DASHBOARD
		case ADMIN_CONTENT_DELETE_FROM_TABLE:
			return {
				...store,
				data: action.payload.content,
				loading: false,
			}

		default:
			return store
		}
	}

	// thunks

	search = (searchCategory, searchQuery, force = false) => async (dispatch, getState, { apiProxy }) => {

		const time = Date.now() - getState().adminStore.lastFetched

		const stale = time >= process.env.REACT_APP_STALE_TIME

		if (stale || force) {

			dispatch(this.actions.adminStart())

			try {

				const results = await apiProxy.admin.search.get(searchCategory, searchQuery)

				const finalData = []
				switch (searchCategory) {
				case `user`:
					results.forEach((item) => {
						finalData.push(new User(item))
					})
					break

				case `collection`:
					results.forEach((item) => {
						item[`name`] = item[`collection-name`]
						delete item[`collection-name`]
						finalData.push(item)
					})
					break

				case `content`:
					results.forEach((item) => {
						finalData.push(new Content(item))
					})
					break

				default:
					break
				}

				dispatch(this.actions.adminSearch(finalData))

			} catch (error) {
				console.error(error.message)
				dispatch(this.actions.adminError(error))
			}

		} else dispatch(this.actions.adminAbort())
	}

	searchProfessors = (searchQuery, force = false) => async (dispatch, getState, { apiProxy }) => {

		const time = Date.now() - getState().adminStore.lastFetchedProfessors

		const stale = time >= process.env.REACT_APP_STALE_TIME

		if (stale || force) {

			dispatch(this.actions.adminStart())

			try {

				const results = await apiProxy.admin.search.get(`user`, searchQuery)

				const profArray = []

				results.forEach(element => {
					profArray.push(new User(element))
				})

				dispatch(this.actions.adminSearchProfessors(profArray))

			} catch (error) {
				console.error(error.message)
				dispatch(this.actions.adminError(error))
			}

		} else dispatch(this.actions.adminAbort())
	}

	setProfessor = (professorId, force = false) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.adminStart())

		try {

			const results = await apiProxy.admin.user.get(professorId)

			dispatch(this.actions.adminSetProfessor(new User(results)))

		} catch (error) {
			console.error(`ERRROR`, error.message)
			dispatch(this.actions.adminError(error))
		}
	}

	getCollectionContent = (id, force = false) => async (dispatch, getState, { apiProxy }) => {

		const time = Date.now() - getState().adminStore.lastFetchedProfContent

		const stale = time >= process.env.REACT_APP_STALE_TIME

		if (stale || force) {

			dispatch(this.actions.adminStart())

			try {

				const content = await apiProxy.admin.collection.content.get(id)

				dispatch(this.actions.adminGetCollectionContent(content))

			} catch (error) {
				console.error(error.message)
				dispatch(this.actions.adminError(error))
			}

		} else dispatch(this.actions.adminAbort())
	}

	// createCollection = (name) => async (dispatch, getState, { apiProxy }) => {

	// 	dispatch(this.actions.adminStart())

	// 	try {

	// 		const ownerId = getState().adminStore.professor.id

	// 		await apiProxy.admin.collection.create(name, parseInt(ownerId)) // maybe parseInt(ownerId) -> ownerId -Matthew

	// 		dispatch(this.actions.adminCreateCollection())

	// 		this.searchCollections(ownerId)

	// 	} catch (error) {
	// 		console.log(error.message)
	// 		dispatch(this.actions.adminError(error))
	// 	}
	// }

	createContent = (content) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.adminStart())

		try {
			const result = await apiProxy.content.post(content)

		} catch (error) {
			console.log(`errorr api proxy ?`)
			dispatch(this.actions.adminError(error))
		}
	}

	createContentFromResource = (collectionId, resourceId) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.adminStart())

		try {

			const result = await apiProxy.admin.collection.content.createFromResource(collectionId, resourceId)

		} catch (error) {
			dispatch(this.actions.adminError(error))
		}
	}

	searchCollections = (professorId, force = false) => async (dispatch, getState, { apiProxy }) => {

		const time = Date.now() - getState().adminStore.lastFetchedCollections

		const stale = time >= process.env.REACT_APP_STALE_TIME

		if (stale || force) {

			dispatch(this.actions.adminStart())

			try {

				const results = await apiProxy.admin.collection.get(professorId)

				const collections = results.data.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})

				dispatch(this.actions.adminSearchCollections(collections))

			} catch (error) {
				console.log(`SEARCH COLLECTIONS FAILED`)
				console.error(error.message)
				dispatch(this.actions.adminError(error))
			}

		} else dispatch(this.actions.adminAbort())
	}

	updateCollectionStatus = (colId, action) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.adminStart())

		// Grab all the collections from the admin store
		const collections = { ...getState().adminStore.professorCollections}
		// Grab the current collection from the admin store
		const professorId = { ...getState().adminStore.professor.id }
		let currentCollection
		Object.keys(collections).forEach(item => {
			const {id} = collections[item]
			if (id === colId){
				currentCollection = collections[item]
				return
			}
		})

		// console.log(collections)

		let abort = false

		switch (action) {
		case `publish`:
			currentCollection.published = true
			break

		case `unpublish`:
			currentCollection.published = false
			break

		case `archive`:
			currentCollection.archived = true
			break

		case `unarchive`:
			currentCollection.published = false
			currentCollection.archived = false
			break

		default:
			abort = true
			break
		}

		const finalState = {
			published: currentCollection.published,
			archived: currentCollection.archived,
		}

		if (abort) dispatch(this.actions.adminAbort())
		else {
			try {
				// Edit the desired collection
				await apiProxy.collection.edit(colId, finalState)
				// Get the updated collection and all the other collections
				// This fixes the bug that it will add a duplicated collection
				// to the professorCollections
				await this.searchCollections(professorId, true)
				// The result will be the updated professorCollections
				// This will be the paidload for the adminSeachCollections
				const result = { ...getState().adminStore.professorCollections}
				dispatch(this.actions.adminSearchCollections(result))
			} catch (error) {
				dispatch(this.actions.adminError(error))
			}
		}
	}

	deleteCollection = (collectionId) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.adminStart())

		try {

			const currentResults = [...getState().adminStore.data]

			// console.log(currentResults)

			currentResults.splice(currentResults.findIndex((element) => element.id === collectionId) ,1)

			const result = await apiProxy.admin.collection.delete(collectionId)
			// console.log(result)

			// console.log(currentResults)

			dispatch(this.actions.adminCollectionDelete(currentResults))

		} catch (error) {
			dispatch(this.actions.adminError(error))
		}
	}

	deleteContent = (contentId, fromAdmin) => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.adminStart())

		let currentState

		if(fromAdmin){
			currentState = [...getState().adminStore.data]

			currentState.splice(currentState.findIndex((element) => element.id === contentId) ,1)
		} else {
			currentState = { ...getState().adminStore.profCollectionContent }

			delete currentState[contentId]
		}

		try {
			const result = await apiProxy.admin.content.delete(contentId)

			if(fromAdmin)
				dispatch(this.actions.adminContentDeleteFromTable(currentState))

			else
				dispatch(this.actions.adminContentDelete(currentState))

		} catch (error) {
			dispatch(this.actions.adminError(error))
		}
	}

	deleteUser = (userId) => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.adminStart())

		const currentResults = [...getState().adminStore.data]

		currentResults.splice(currentResults.findIndex((element) => element.id === userId) ,1)

		try {

			const result = await apiProxy.admin.user.delete(userId)

			dispatch(this.actions.adminUserDelete(currentResults))

		} catch (error) {
			dispatch(this.actions.adminError(error))
		}
	}

	clean = () => async (dispatch) => {
		dispatch(this.actions.adminClean())
	}

}
