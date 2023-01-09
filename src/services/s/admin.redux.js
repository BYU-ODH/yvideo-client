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
		ADMIN_SEARCH_PUBLIC_COLLECTIONS: `ADMIN_SEARCH_PUBLIC_COLLECTIONS`,
		ADMIN_COLLECTION_EDIT: `ADMIN_COLLECTION_EDIT`,
		ADMIN_COLLECTION_DELETE: `ADMIN_COLLECTION_DELETE`,
		ADMIN_USER_DELETE: `ADMIN_USER_DELETE`,
		ADMIN_USER_UPDATE: `ADMIN_USER_UPDATE`,
		ADMIN_CONTENT_DELETE: `ADMIN_CONTENT_DELETE`,
		ADMIN_CONTENT_DELETE_FROM_TABLE: `ADMIN_CONTENT_DELETE_FROM_TABLE`,
		ADMIN_GET_USER_BY_ID: `ADMIN_GET_USER_BY_ID`,
		ADMIN_EMPTY_SEARCHED_USER: `ADMIN_EMPTY_SEARCHED_USER`,
		ADMIN_GET_PUBLIC_COLLECTION_CONTENT: `ADMIN_GET_PUBLIC_COLLECTION_CONTENT`,
		ADMIN_GET_MORE_PUBLIC_COLLECTION_CONTENT: `ADMIN_GET_MORE_PUBLIC_COLLECTION_CONTENT`,
		ADMIN_POST_USERS: `ADMIN_POST_USERS`,
		ADMIN_EMPTY_USERS_RESULT: `ADMIN_EMPTY_USERS_RESULT`,
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
		adminSearchPublicCollections: results => ({ type: this.types.ADMIN_SEARCH_PUBLIC_COLLECTIONS, payload: { results }}),
		adminCollectionEdit: collection => ({ type: this.types.ADMIN_COLLECTION_EDIT, payload: { collection }}),
		adminCollectionDelete: response => ({ type: this.types.ADMIN_COLLECTION_DELETE, payload: { response }}),
		adminUserDelete: data => ({ type: this.types.ADMIN_USER_DELETE, payload: { data }}),
		adminUserUpdate: data => ({ type: this.types.ADMIN_USER_UPDATE, payload: { data }}),
		adminContentDelete: content => ({ type: this.types.ADMIN_CONTENT_DELETE, payload: { content }}),
		adminContentDeleteFromTable: content => ({ type: this.types.ADMIN_CONTENT_DELETE_FROM_TABLE, payload: { content }}),
		adminGetUserById: user => ({ type: this.types.ADMIN_GET_USER_BY_ID, payload: { user }}),
		adminEmptySearchedUser: () => ({ type: this.types.ADMIN_EMPTY_SEARCHED_USER, payload: {} }),
		adminGetPublicCollectionContents: (content, collectionId) => ({type: this.types.ADMIN_GET_PUBLIC_COLLECTION_CONTENT, payload: {content, collectionId}}),
		adminGetMorePublicCollectionContents: (content, collectionId) => ({type: this.types.ADMIN_GET_PUBLIC_COLLECTION_CONTENT, payload: {content, collectionId}}),
		adminAddUsers: (successResult, failResult) => ({type: this.types.ADMIN_POST_USERS, payload: {successResult, failResult}}),
		adminEmptyUsersResult: () => ({type: this.types.ADMIN_EMPTY_USERS_RESULT, payload: {}}),
	}

	// default store

	store = {
		data: null,
		cache: {},
		searchedUser: {}, // store user here from get by id
		addedUsers: {},
		professors: [],
		professor: {},
		publicCollections: [],
		morePublicCollections: [],
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
			ADMIN_SEARCH_PUBLIC_COLLECTIONS,
			ADMIN_COLLECTION_EDIT,
			ADMIN_COLLECTION_DELETE,
			ADMIN_USER_DELETE,
			ADMIN_USER_UPDATE,
			ADMIN_CONTENT_DELETE,
			ADMIN_CONTENT_DELETE_FROM_TABLE,
			ADMIN_GET_USER_BY_ID,
			ADMIN_GET_PUBLIC_COLLECTION_CONTENT,
			ADMIN_GET_MORE_PUBLIC_COLLECTION_CONTENT,
			ADMIN_EMPTY_SEARCHED_USER,
			ADMIN_POST_USERS,
			ADMIN_EMPTY_USERS_RESULT,
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
			console.error(action.payload.error) // eslint-disable-line no-console
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

		case ADMIN_SEARCH_PUBLIC_COLLECTIONS:
			return {
				...store,
				professors: [],
				publicCollections: action.payload.results,
				loading: false,
				lastFetchedCollections: Date.now(),
			}

		case ADMIN_GET_PUBLIC_COLLECTION_CONTENT:
			return{
				...store,
				publicCollections: {
					...store.publicCollections,
					[action.payload.collectionId]: {
						...store.publicCollections[action.payload.collectionId],
						content: action.payload.content,
					},
				},
			}

		case ADMIN_GET_MORE_PUBLIC_COLLECTION_CONTENT:
			return{
				...store,
				morePublicCollections: {
					...store.morePublicCollections,
					[action.payload.collectionId]: {
						...store.morePublicCollections[action.payload.collectionId],
						content: action.payload.content,
					},
				},
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

		case ADMIN_USER_UPDATE:
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

		case ADMIN_GET_USER_BY_ID:
			return{
				...store,
				searchedUser: action.payload.user,
			}

		case ADMIN_EMPTY_SEARCHED_USER:
			return{
				...store,
				searchedUser: {},
			}

		case ADMIN_POST_USERS:
			return{
				...store,
				addedUsers: action.payload,
			}

		case ADMIN_EMPTY_USERS_RESULT:
			return{
				...store,
				addedUsers: {},
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
				console.error(error.message) // eslint-disable-line no-console
				dispatch(this.actions.adminError(error))
			}

		} else dispatch(this.actions.adminAbort())
	}

	emptyAddedUsersResult = () => async(dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.adminStart())

		try {
			dispatch(this.actions.adminEmptyUsersResult())
		} catch (error) {
			dispatch(this.actions.adminError(error))
		}
	}

	addUsers = (usernames) => async(dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.adminStart())

		try {

			const resultSuccess = []
			const resultFail = []

			usernames.forEach(async(username) => {
				if(username === ``) return

				const body = {
					"account-role": 1,
					"email": `${username}@byu.edu`,
					"last-login": `string`,
					"account-name": username,
					"account-type": 0,
					username,
				}

				const response = await apiProxy.user.post(body)

				if(response.status === 200 && response.data.id.length > 30){
					resultSuccess.push(response.data.id)
					dispatch(this.actions.adminAddUsers(resultSuccess, resultFail))
				} else{
					resultFail.push(username)
					dispatch(this.actions.adminAddUsers(resultSuccess, resultFail))
				}
			})

		} catch (error) {
			dispatch(this.actions.adminError(error))
		}
	}

	getPublicCollectionContents = (collectionId, isModal = false) => async(dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.adminStart())

		try {

			// get contents that connected to public collection
			const response = await apiProxy.collection.permissions.getContents(collectionId)

			const contentResult = []

			if(response.content){
				response.content.forEach((item) => {
					contentResult.push(new Content(item))
				})
			}

			if(!isModal)
				dispatch(this.actions.adminGetPublicCollectionContents(contentResult, collectionId))

			// handle different for more public collections
			else{
				getState().adminStore.morePublicCollections = getState().adminStore.publicCollections
				dispatch(this.actions.adminGetMorePublicCollectionContents(contentResult, collectionId))
			}

		} catch (error) {
			console.error(error.message) // eslint-disable-line no-console
			dispatch(this.actions.adminError(error))
		}
	}

	// this calls public collection when user searchs
	searchPublicCollection = (searchQuery, force = false) => async (dispatch, getState, { apiProxy }) => {

		const time = Date.now() - getState().adminStore.lastFetchedProfessors

		const stale = time >= process.env.REACT_APP_STALE_TIME

		if (stale || force) {

			dispatch(this.actions.adminStart())

			try {

				// I think we need to make this as a one api call from backend.
				const data = await apiProxy.admin.search.public.collection.get(searchQuery)

				const result = {}

				data.forEach(collection => {

					const contentResult = []

					if(collection.content){
						collection.content.forEach((item) => {
							contentResult.push(new Content(item))
						})
					}
					collection.content = contentResult
					result[collection.id]= collection
				})

				dispatch(this.actions.adminSearchPublicCollections(result))

			} catch (error) {
				console.error(error.message) // eslint-disable-line no-console
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
				console.error(error.message) // eslint-disable-line no-console
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
			console.error(`ERROR: `, error.message) // eslint-disable-line no-console
			dispatch(this.actions.adminError(error))
		}
	}

	getUserByUsername = (searchQuery, force = false) => async (dispatch, getState, { apiProxy }) => {

		const time = Date.now() - getState().adminStore.lastFetched

		const stale = time >= process.env.REACT_APP_STALE_TIME

		if (stale || force) {

			dispatch(this.actions.adminStart())

			try {
				const results = await apiProxy.admin.search.get(`user`, searchQuery)

				const finalData = []
				results.forEach((item) => {
					finalData.push(new User(item))
				})

				return finalData

			} catch (error) {
				console.error(error.message) // eslint-disable-line no-console
				dispatch(this.actions.adminError(error))
			}

		} else dispatch(this.actions.adminAbort())
	}

	getUserById = (userId, force = false) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.adminStart())

		try {

			const results = await apiProxy.admin.user.get(userId)

			dispatch(this.actions.adminGetUserById(new User(results)))
			return new User(results)

		} catch (error) {
			console.error(`ERROR: `, error.message) // eslint-disable-line no-console
			dispatch(this.actions.adminError(error))
		}
	}

	emptySearchedUser = () => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.adminStart())

		try {

			dispatch(this.actions.adminEmptySearchedUser())

		} catch (error) {
			console.error(`ERROR: `, error.message) // eslint-disable-line no-console
			dispatch(this.actions.adminError(error))
		}
	}

	getCollectionContent = (id, force = false) => async (dispatch, getState, { apiProxy }) => {

		const time = Date.now() - getState().adminStore.lastFetchedProfContent

		const stale = time >= process.env.REACT_APP_STALE_TIME

		if (stale || force) {

			dispatch(this.actions.adminStart())

			try {

				const results = await apiProxy.admin.collection.content.get(id)

				dispatch(this.actions.adminGetCollectionContent(results))

			} catch (error) {
				console.error(error.message) // eslint-disable-line no-console
				dispatch(this.actions.adminError(error))
			}

		} else dispatch(this.actions.adminAbort())
	}

	createContent = (content) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.adminStart())

		try {
			await apiProxy.content.post(content)

		} catch (error) {

			dispatch(this.actions.adminError(error))
		}
	}

	createContentFromResource = (collectionId, resourceId) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.adminStart())

		try {
			await apiProxy.admin.collection.content.createFromResource(collectionId, resourceId)

		} catch (error) {
			dispatch(this.actions.adminError(error))
		}
	}

	searchCollections = (professorId, force = false, isLookingForPublicCollections = false) => async (dispatch, getState, { apiProxy }) => {

		const time = Date.now() - getState().adminStore.lastFetchedCollections

		const stale = time >= process.env.REACT_APP_STALE_TIME

		if (stale || force) {

			dispatch(this.actions.adminStart())

			try {

				if(isLookingForPublicCollections){
					const results = await apiProxy.admin.collection.get(professorId)

					const collections = results.data.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})

					return collections
				}else{
					const results = await apiProxy.admin.collection.get(professorId)

					if(results?.data?.length > 0){
						results.data.forEach(async(collection, index) => {
							const res = await apiProxy.collection.permissions.getContents(collection.id)

							const contentResult = []

							if(res.content){
								res.content.forEach((item) => {
									contentResult.push(new Content(item))
								})
							}

							results.data[index].content = contentResult
						})
					}

					const collections = results.data.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})

					dispatch(this.actions.adminSearchCollections(collections))
				}

			} catch (error) {
				dispatch(this.actions.adminError(error))
			}

		} else dispatch(this.actions.adminAbort())
	}

	updateCollectionStatus = (colId, action) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.adminStart())

		// Grab all the collections from the admin store
		const collections = { ...getState().adminStore.professorCollections }
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
				const result = { ...getState().adminStore.professorCollections }
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

			currentResults.splice(currentResults.findIndex((element) => element.id === collectionId), 1)
			await apiProxy.admin.collection.delete(collectionId)

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

			currentState.splice(currentState.findIndex((element) => element.id === contentId), 1)
		} else {
			currentState = { ...getState().adminStore.profCollectionContent }

			delete currentState[contentId]
		}

		try {
			await apiProxy.admin.content.delete(contentId)

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

		currentResults.splice(currentResults.findIndex((element) => element.id === userId), 1)

		try {
			await apiProxy.admin.user.deleteWithCollections(userId)

			dispatch(this.actions.adminUserDelete(currentResults))

		} catch (error) {
			dispatch(this.actions.adminError(error))
		}
	}

	updateUserRole = (role, userId) => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.adminStart())
		try {
			await apiProxy.admin.user.edit(role, userId)
			const currentResults = [...getState().adminStore.data]

			currentResults.forEach(element => {
				if (element.id === userId) {
					element.roles = role
					return
				}
			})

			dispatch(this.actions.adminUserUpdate(currentResults))

		} catch (error) {
			dispatch(this.actions.adminError(error))
		}
	}

	clean = () => async (dispatch) => {
		dispatch(this.actions.adminClean())
	}

}
