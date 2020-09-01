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
		collectionsGet: collections => ({ type: this.types.COLLECTIONS_GET, payload: { collections } }),
		collectionsRemoveContent: (id, collection) => ({ type: this.types.COLLECTIONS_REMOVE_CONTENT, payload: {id, collection} }),
		collectionCreate: collection => ({ type: this.types.COLLECTION_CREATE, payload: { collection }}),
		collectionEdit: collection => ({ type: this.types.COLLECTION_EDIT, payload: { collection }}),
		collectionGetInfo: data => ({ type: this.types.COLLECTION_INFO_GET, payload: { data }}),
		collectionPermissionUpdate: object => ({ type: this.types.COLLECTION_ROLES_UPDATE, payload: { object }}),
	}

	// default store

	store = {
		cache: {},
		loading: false,
		lastFetched: 0,
		users: [],
		courses: [],
	}

	// reducer

	reducer = (store = this.store, action) => {

		const {
			COLLECTIONS_START,
			COLLECTIONS_ABORT,
			COLLECTIONS_CLEAN,
			COLLECTIONS_ERROR,
			COLLECTIONS_GET,
			COLLECTIONS_REMOVE_CONTENT,
			COLLECTION_CREATE,
			COLLECTION_EDIT,
			COLLECTION_INFO_GET,
			COLLECTION_ROLES_UPDATE,
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
				loading: false,
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
			if(store.users.length !== action.payload.data.users.length || store.courses.length !== action.payload.data.courses.length){
					return {
					...store,
					users: action.payload.data.users,
					courses: action.payload.data.courses,
					loading: false,
				}
			}
			else {
				return {
					...store,
				}
			}


		case COLLECTION_ROLES_UPDATE:
			return {
				...store,
				users: action.payload.object.currentUsers,
				courses: action.payload.object.currentCourses,
			}

		default:
			return store
		}
	}

	// thunks

	getCollections = (force = false) => async (dispatch, getState, { apiProxy }) => {

		const time = Date.now() - getState().collectionStore.lastFetched

		const stale = time >= process.env.REACT_APP_STALE_TIME

		if (stale || force) {

			dispatch(this.actions.collectionsStart())

			try {

				const result = await apiProxy.user.collections.get()

				dispatch(this.actions.collectionsGet(result))

			} catch (error) {
				console.error(error.message)
				dispatch(this.actions.collectionsError(error))
			}

		} else dispatch(this.actions.collectionsAbort())
	}

	removeCollectionContent = (id, contentId, isLabAssistant) => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.collectionsStart())

		const currentState = { ...getState().collectionStore.cache[id] }
		let contentIndex = 0

		currentState.content.forEach((element, index) => {
			if(element.id === contentId){
				// console.log(true)
				contentIndex = index
			}
		})
		currentState.content.splice(contentIndex, 1)

		try {
			const result = await apiProxy.collection.remove(contentId)
			// console.log(result)

			// You also have to be an admin to do this, I'm pretty sure
			dispatch(this.actions.collectionsRemoveContent(id, currentState))
		} catch (error) {
			console.log(error)
			dispatch(this.actions.collectionsError(error))
		}
	}

	createCollection = (name) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.collectionsStart())

		try {

			await apiProxy.collection.create(name)

			const results = await apiProxy.user.collections.get()

			// TODO: We need to update state
			dispatch(this.actions.collectionsGet(results))

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

		default:
			abort = true
			break
		}

		const finalState = {
			published: currentState.published,
			archived: currentState.archived,
		}

		// console.log(`finalState: `, finalState)

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
		//GET USERS AND COURSES FOR A SPECIFIED COLLECTION
		return async (dispatch, getState, { apiProxy }) => {

			dispatch(this.actions.collectionsStart())

			try {

				const users = await apiProxy.collection.permissions.getUsers(collectionId)
				console.log(users)

				const courses = await apiProxy.collection.permissions.getCourses(collectionId)
				//console.log(courses)

				dispatch(this.actions.collectionGetInfo({ users, courses }))
			} catch (error) {
				dispatch(this.actions.collectionsError(error))
			}
		}
	}

	updateCollectionName = (collectionId, collectionName) => {
		return async (dispatch, getState, { apiProxy }) => {
			dispatch(this.actions.collectionsStart())

			try {

				await apiProxy.collection.post(collectionId, collectionName)

				let currentState = {}

				currentState = getState().collectionStore.cache[collectionId]
				// console.log(`not admin`, currentState)
				currentState.name = collectionName
				dispatch(this.actions.collectionEdit(currentState))

			} catch (error) {
				dispatch(this.actions.collectionsError(error))
			}
		}
	}

	updateCollectionPermissions = (collectionId, endpoint, body) => async (dispatch, getState, { apiProxy }) => {

		console.log('update permissions')
		dispatch(this.actions.collectionsStart())

		let backEndBody = {}

		const currentUsers = getState().collectionStore.users
		const currentCourses = getState().collectionStore.courses

		//TODO: WE CANT ADD THE SAME USER TWICE. ADD DELETE ADD DOES NOT WORK

		try {

			if(endpoint === 'add-user'){
				backEndBody = {
					'username': body.username,
					'account-role': body.role,
				}
				// currentUsers.push(backEndBody)
			}
			else if(endpoint === 'add-course'){
				backEndBody = {
					'department': body.department,
					'catalog-number': body.catalog,
					'section-number': body.section,
				}
				// currentCourses.push(backEndBody)
			}
			else if(endpoint === 'remove-course'){
				backEndBody = {
					'course-id': body
				}
				// currentCourses.splice(currentCourses.findIndex(element => element['id'] === body), 1)
			}
			else if(endpoint === 'remove-user'){
				backEndBody = {
					'username': body
				}
				// currentUsers.splice(currentUsers.findIndex(element => element['username'] === body), 1)
			}

			//TODO: RENDER THE COMPONENT BY EDITTING USERS AND COURSES IN THE STORE AND PASSING NEW COURSES AND USERS

			console.log(backEndBody)

			const result = await apiProxy.collection.permissions.post(collectionId, endpoint, backEndBody)

			dispatch(this.actions.collectionGetInfo( { users: [], courses: [] } ))
		} catch (error) {
			alert('The data could not be saved. Plase, try again')
			dispatch(this.actions.collectionsError(error))
		}
	}
	updateMany  = (collectionId, body) => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.collectionsStart())

		try {

			const result =  await apiProxy.collection.permissions.postMany(collectionId, body)
			console.log(result)
		} catch (error) {
			dispatch(this.actions.collectionsError(error))
		}
	}
}
