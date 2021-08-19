import Content from 'models/Content'

export default class CollectionService {
	// types

	types = {
		COLLECTIONS_START: `COLLECTIONS_START`,
		COLLECTIONS_ABORT: `COLLECTIONS_ABORT`,
		COLLECTIONS_CLEAN: `COLLECTIONS_CLEAN`,
		COLLECTIONS_ERROR: `COLLECTIONS_ERROR`,
		COLLECTIONS_GET: `COLLECTIONS_GET`,
		COLLECTIONS_REMOVE_CONTENT: `COLLECTION_REMOVE_CONTENT`,
		COLLECTION_CREATE: `COLLECTION_CREATE`,
		COLLECTION_EDIT: `COLLECTION_EDIT`,
		COLLECTION_INFO_GET: `COLLECTION_INFO_GET`,
		COLLECTION_ROLES_UPDATE: `COLLECTION_ROLES_UPDATE`,
		COLLECTION_UPDATE_CONTENTS: `COLLECTION_UPDATE_CONTENTS`,
		PUBLIC_COLLECTION_UPDATE_SUBSCRIBERS: `PUBLIC_COLLECTION_UPDATE_SUBSCRIBERS`,
		CREATED_COLLECTION_UPDATE: `CREATED_COLLECTION_UPDATE`,
	}

	roleEndpoints = {
		addCourse: `add-course`,
		addUser: `add-user`,
		removeCourse: `remove-course`,
		removeUser: `remove-user`,
	}

	// action creators

	actions = {
		collectionsStart: () => ({ type: this.types.COLLECTIONS_START }),
		collectionsAbort: () => ({ type: this.types.COLLECTIONS_ABORT }),
		collectionsClean: () => ({ type: this.types.COLLECTIONS_CLEAN }),
		collectionsError: error => ({ type: this.types.COLLECTIONS_ERROR, payload: { error } }),
		collectionsErrorSync: error => ({type: this.types.COLLECTIONS_ERROR_SYNC, payload:{ error }}),
		collectionsGet: collections => ({ type: this.types.COLLECTIONS_GET, payload: { collections } }),
		collectionsRemoveContent: (id, collection) => ({ type: this.types.COLLECTIONS_REMOVE_CONTENT, payload: {id, collection} }),
		collectionCreate: collection => ({ type: this.types.COLLECTION_CREATE, payload: { collection }}),
		collectionEdit: collection => ({ type: this.types.COLLECTION_EDIT, payload: { collection }}),
		collectionGetInfo: data => ({ type: this.types.COLLECTION_INFO_GET, payload: { data }}),
		collectionPermissionUpdate: object => ({ type: this.types.COLLECTION_ROLES_UPDATE, payload: { object }}),
		collectionUpdateContents: (result, collectionId) => ({ type: this.types.COLLECTION_UPDATE_CONTENTS, payload: { result, collectionId }}),
		publicCollectionUpdateSubscribers: (users, collectionId) => ({type: this.types.PUBLIC_COLLECTION_UPDATE_SUBSCRIBERS, payload: {users, collectionId}}),
		createdCollectionUpdate: collectionId => ({ type: this.types.CREATED_COLLECTION_UPDATE, payload: { collectionId }}),
	}

	// default store

	store = {
		errorMessage: ``,
		errorMessagePrev: ``,
		cache: {},
		loading: false,
		lastFetched: 0,
		users: [],
		courses: [],
		newCollectionId: ``,
	}

	// reducer

	reducer = (store = this.store, action) => {

		const {
			COLLECTIONS_START,
			COLLECTIONS_ABORT,
			COLLECTIONS_CLEAN,
			COLLECTIONS_ERROR,
			COLLECTIONS_ERROR_SYNC,
			COLLECTIONS_GET,
			COLLECTIONS_REMOVE_CONTENT,
			COLLECTION_CREATE,
			COLLECTION_EDIT,
			COLLECTION_INFO_GET,
			COLLECTION_ROLES_UPDATE,
			COLLECTION_UPDATE_CONTENTS,
			PUBLIC_COLLECTION_UPDATE_SUBSCRIBERS,
			CREATED_COLLECTION_UPDATE,
		} = this.types

		switch (action.type) {

		case COLLECTIONS_START:
			return {
				...store,
				loading: true,
			}

		case COLLECTIONS_ABORT:
			return {
				...store,
				loading: false,
			}

		case COLLECTIONS_CLEAN:
			return {
				...store,
				cache: {},
			}

		case COLLECTION_CREATE:
			return {
				...store,
				loading: false,
			}

		case COLLECTIONS_ERROR:
			console.error(action.payload.error)
			return {
				...store,
				errorMessage: `${action.payload.error.response.data}. Status: ${action.payload.error.response.status}`,
				loading: false,
			}
		case COLLECTIONS_ERROR_SYNC:
			return{
				...store,
				errorMessagePrev: action.payload.error,
			}
		case COLLECTIONS_GET:
			return {
				...store,
				cache: {
					...store.cache,
					...action.payload.collections,
				},
				loading: false,
				lastFetched: Date.now(),
			}

		case COLLECTIONS_REMOVE_CONTENT:
			return {
				...store,
				cache: {
					...store.cache,
					[action.payload.collection.id]: action.payload.collection,
				},
				loading: false,
			}

		case COLLECTION_EDIT:
			return {
				...store,
				cache: {
					...store.cache,
					[action.payload.collection.id]: action.payload.collection,
				},
				loading: false,
			}

		case COLLECTION_INFO_GET:
			return {
				...store,
				users: action.payload.data.users,
				courses: action.payload.data.courses,
				loading: false,
			}

		case COLLECTION_ROLES_UPDATE:
			return {
				...store,
				users: action.payload.object.currentUsers,
				courses: action.payload.object.currentCourses,
			}

		case COLLECTION_UPDATE_CONTENTS:
			return {
				...store,
				cache: {
					...store.cache,
					[action.payload.collectionId]: {
						...store.cache[action.payload.collectionId],
						...action.payload.result.content,
					},
				},
			}

		case PUBLIC_COLLECTION_UPDATE_SUBSCRIBERS:
			return {
				...store,
				cache: {
					...store.cache,
					[action.payload.collectionId]: {
						...store.cache[action.payload.collectionId],
						subscribers: action.payload.users,
					},
				},
			}

		case CREATED_COLLECTION_UPDATE:
			return{
				...store,
				newCollectionId: action.payload.collectionId,
			}

		default:
			return store
		}
	}

	searchCollections = (force = false, doesIncludePublic = false) => async (dispatch, getState, { apiProxy }) => {

		const time = Date.now() - getState().collectionStore.lastFetched

		const stale = time >= process.env.REACT_APP_STALE_TIME

		if (stale || force) {

			dispatch(this.actions.collectionsStart())

			try {
				// this gets the collections directly connected to the user.
				const result = await apiProxy.user.collections.get()

				dispatch(this.actions.collectionsGet(result))

			} catch (error) {
				dispatch(this.actions.collectionsError(error))
			}

		} else dispatch(this.actions.collectionsAbort())
	}

	// thunks
	getCollections = (force = false, doesIncludePublic = false) => async (dispatch, getState, { apiProxy }) => {

		const time = Date.now() - getState().collectionStore.lastFetched

		const stale = time >= process.env.REACT_APP_STALE_TIME

		const userId = getState().authStore.user.id
		const student = getState().authStore.user.roles === 3
		const admin = getState().authStore.user.roles === 0
		// console.log(`%c Current USER ID => ${userId}`, 'background-color: black; color: yellow; heigh: 20px; font-weight: bold; font-size: 14px;')

		if (stale || force) {

			dispatch(this.actions.collectionsStart())

			try {
				// this gets the collections directly linked to the user.
				const result = await apiProxy.user.collections.get()

				if(student || admin){
					// we also need to display the collections link to the user, but through courses.
					// first we get the courses that a user is registered to
					const courses = await apiProxy.user.courses.get(userId)
					// console.log(`%c Current COURSES => `, 'background-color: black; color: yellow; heigh: 20px; font-weight: bold; font-size: 14px;', courses)
					// once we have the courses, we can get the collections for those courses and display them
					// by adding those collections to the result object.
					// get all the collections from the courses that the user is registered to.
					const courseCollections = []
					let i = 0
					while(i < courses.length){
						const response = await apiProxy.courses.getCollections(courses[i])
						courseCollections.concat(response)
						setTimeout(() => {
							i++
						}, 50)
					}

					courseCollections.forEach(element => {
						result[element.id] = element
					})
				}

				dispatch(this.actions.collectionsGet(result))

			} catch (error) {
				dispatch(this.actions.collectionsError(error))
			}

		} else dispatch(this.actions.collectionsAbort())
	}

	removeCollectionContent = (id, contentId, isLabAssistant) => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.collectionsStart())

		const currentState = { ...getState().collectionStore.cache[id] }
		let contentIndex = 0

		currentState.content.forEach((element, index) => {
			if(element.id === contentId)
				contentIndex = index

		})
		currentState.content.splice(contentIndex, 1)

		try {
			const result = await apiProxy.collection.remove(contentId)

			// You also have to be an admin to do this, I'm pretty sure
			dispatch(this.actions.collectionsRemoveContent(id, currentState))
		} catch (error) {
			// console.log(error)
			dispatch(this.actions.collectionsError(error))
		}
	}

	createCollection = (item) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.collectionsStart())

		try {
			const data = await apiProxy.collection.create(item)

			const results = await apiProxy.user.collections.get()

			// TODO: We need to update state
			dispatch(this.actions.collectionsGet(results))
			dispatch(this.actions.createdCollectionUpdate(data.id))

		} catch (error) {
			// console.log(error.message)
			dispatch(this.actions.collectionsError(error))
		}
	}

	removeCreatedCollectionIdFromStore = () => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.collectionsStart())

		try {

			dispatch(this.actions.createdCollectionUpdate(``))

		} catch (error) {
			console.log(error.message)
			dispatch(this.actions.collectionsError(error))
		}
	}

	updateCollectionStatus = (id, action) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.collectionsStart())

		const currentState = getState().collectionStore.cache[id]

		let abort = false

		switch (action) {
		case `publish`:
			currentState.published = true

			break

		case `unpublish`:
			currentState.published = false
			break

		case `archive`:
			currentState.archived = true
			break

		case `unarchive`:
			currentState.published = false
			currentState.archived = false
			break
		case `public`:
			currentState.public = !currentState.public
			break
		default:
			abort = true
			break
		}

		const finalState = {
			published: currentState.published,
			archived: currentState.archived,
			public: currentState.public,
		}

		if (abort) dispatch(this.actions.collectionsAbort())
		else {
			try {
				await apiProxy.collection.edit(id, finalState)
				dispatch(this.actions.collectionEdit(currentState))
			} catch (error) {
				dispatch(this.actions.collectionsError(error))
			}
		}
	}

	getCollectionInfo = (collectionId, force = false) => {
		// GET USERS AND COURSES FOR A SPECIFIED COLLECTION
		return async (dispatch, getState, { apiProxy }) => {

			dispatch(this.actions.collectionsStart())

			const currentUsers = getState().collectionStore.users
			const currentCourses = getState().collectionStore.courses

			try {

				const users = await apiProxy.collection.permissions.getUsers(collectionId)

				const courses = await apiProxy.collection.permissions.getCourses(collectionId)

				const strUsers = JSON.stringify(users)
				const strCourses = JSON.stringify(courses)

				if(strUsers !== JSON.stringify(currentUsers) || strCourses !== JSON.stringify(currentCourses))
					dispatch(this.actions.collectionGetInfo( { users, courses } ))

			} catch (error) {
				dispatch(this.actions.collectionsError(error))
			}
		}
	}

	getSubscribers = (userId, force = false) => {

		return async (dispatch, getState, { apiProxy }) => {

			dispatch(this.actions.collectionsStart())

			try {

				const collections = await apiProxy.user.collections.get(userId)

				return collections

			} catch (error) {
				dispatch(this.actions.collectionsError(error))
			}
		}
	}

	updateCollectionContents = (collectionId, contentId) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.collectionsStart())

		try {
			const res = await apiProxy.collection.permissions.getContents(collectionId)

			const result = []
			res.content.forEach(item => {
				result.push(new Content(item))
			})

			dispatch(this.actions.collectionUpdateContents(res, collectionId))

			return result

		} catch (error) {
			console.log(error.message)
			dispatch(this.actions.collectionsError(error))
		}
	}

	updateCollectionName = (collectionId, collectionName) => {
		return async (dispatch, getState, { apiProxy }) => {
			dispatch(this.actions.collectionsStart())

			try {

				await apiProxy.collection.post(collectionId, collectionName)

				let currentState = {}

				currentState = getState().collectionStore.cache[collectionId]

				currentState.name = collectionName
				dispatch(this.actions.collectionEdit(currentState))

			} catch (error) {
				dispatch(this.actions.collectionsError(error))
			}
		}
	}

	updateCollectionPermissions = (collectionId, endpoint, body) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.collectionsStart())

		let backEndBody = {}

		try {

			if(endpoint === `add-user`){
				backEndBody = {
					'username': body.username,
					'account-role': body.roles,
				}
			} else if(endpoint === `add-course`){
				backEndBody = {
					'department': body.department,
					'catalog-number': body.catalog,
					'section-number': body.section,
				}
			} else if(endpoint === `remove-course`){
				backEndBody = {
					'course-id': body,
				}
			} else if(endpoint === `remove-user`){
				backEndBody = {
					'username': body,
				}
			}

			// TODO: RENDER THE COMPONENT BY EDITTING USERS AND COURSES IN THE STORE AND PASSING NEW COURSES AND USERS
			const result = await apiProxy.collection.permissions.post(collectionId, endpoint, backEndBody)

			let currentState = {}
			currentState = getState().collectionStore.cache[collectionId]
			const currentUsers = getState().collectionStore.users
			const currentCourses = getState().collectionStore.courses

			// based on the endpoint edit the current store
			if(endpoint === `add-user`){
				const temp = []
				if(currentUsers.length < 1)
					temp.push(backEndBody)

				dispatch(this.actions.collectionGetInfo( { users: [], courses: currentCourses } ))
			} else if(endpoint === `add-course`){
				const temp = []
				if(currentCourses.length < 1)
					temp.push(backEndBody)

				dispatch(this.actions.collectionGetInfo( { users: currentUsers, courses: temp } ))
			} else if(endpoint === `remove-course`)
				dispatch(this.actions.collectionGetInfo( { users: currentUsers, courses: [] } ))
			else if(endpoint === `remove-user`)
				dispatch(this.actions.collectionGetInfo( { users: [], courses: currentCourses } ))
			// const updatedSubscribers = currentState.subscribers.filter(person => person.username !== body.username)
			// dispatch(this.actions.publicCollectionUpdateSubscribers( updatedSubscribers, collectionId ))

		} catch (error) {
			// console.log(error)
			alert(`The data could not be saved. Please, try again`)
			dispatch(this.actions.collectionsError(error))
		}
	}

	updateMany = (collectionId, body) => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.collectionsStart())
		try {
			const result = await apiProxy.collection.permissions.postMany(collectionId, body)
			dispatch(this.actions.collectionGetInfo( { users: [], courses: [] } ))
		} catch (error) {
			alert(`The data could not be saved. Please, try again`)
			dispatch(this.actions.collectionsError(error))
		}
	}

	syncError = () => async (dispatch, getState) => {
		const err = getState().collectionStore.errorMessage
		dispatch(this.actions.collectionsErrorSync(err))
	}
}
