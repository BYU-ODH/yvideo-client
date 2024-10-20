import ResourceObject from '../../models/ResourceObject'

export default class ResourceService {

	// types

	types = {
		RESOURCE_START: `RESOURCE_START`,
		RESOURCE_ABORT: `RESOURCE_ABORT`,
		RESOURCE_CLEAN: `RESOURCE_CLEAN`,
		RESOURCE_ERROR: `RESOURCE_ERROR`,
		RESOURCE_GET: `RESOURCE_GET`,
		RESOURCE_ADD: `RESOURCE_ADD`,
		RESOURCE_FILES: `RESOURCE_FILES`,
		RESOURCE_FILE_DELETE: `RESOURCE_FILE_DELETE`,
		RESOURCE_SEARCH: `RESOURCE_SEARCH`,
		RESOURCE_EDIT: `RESOURCE_EDIT`,
		RESOURCE_DELETE: `RESOURCE_DELETE`,
		RESOURCE_STREAM: `RESOURCE_STREAM`,
		RESOURCE_FILES_EDIT: `RESOURCE_FILES_EDIT`,
		RESOURCE_ADD_ACCESS: `RESOURCE_ADD_ACCESS`,
		RESOURCE_READ_ACCESS: `RESOURCE_READ_ACCESS`,
		RESOURCE_REMOVE_ACCESS: `RESOURCE_REMOVE_ACCESS`,
		RESOURCE_UPDATE_COUNT: `RESOURCE_UPDATE_COUNT`,
	}

	// action creators

	actions = {
		resourcesStart: () => ({ type: this.types.RESOURCE_START }),
		resourcesAbort: () => ({ type: this.types.RESOURCE_ABORT }),
		resourcesClean: () => ({ type: this.types.RESOURCE_CLEAN }),
		resourcesError: error => ({ type: this.types.RESOURCE_ERROR, payload: { error } }),
		resourcesGet: resource => ({ type: this.types.RESOURCE_GET, payload: { resource } }),
		resourcesAdd: resource => ({ type: this.types.RESOURCE_ADD, payload: { resource } }),
		resourcesFiles: (id, files) => ({ type: this.types.RESOURCE_FILES, payload: { id, files } }),
		resourcesFileDelete: (fileId, resourceId) => ({ type: this.types.RESOURCE_FILE_DELETE, payload: { fileId, resourceId } }),
		resourcesFilesEdit: (resourceId, files) => ({ type: this.types.RESOURCE_FILES_EDIT, payload: { resourceId, files } }),
		resourceSearch: resource => ({ type: this.types.RESOURCE_SEARCH, payload: { resource } }),
		resourceEdit: resource => ({ type: this.types.RESOURCE_EDIT, payload: { resource } }),
		resourceDelete: filteredResources => ({ type: this.types.RESOURCE_DELETE, payload: { filteredResources } }),
		resourceStream: (key, resourceId) => ({ type: this.types.RESOURCE_STREAM, payload: { key, resourceId } }),
		resourceAddAccess: access => ({ type: this.types.RESOURCE_ADD_ACCESS, payload: { access } }),
		resourceReadAccess: (resourceId, access) => ({ type: this.types.RESOURCE_READ_ACCESS, payload: { resourceId, access } }),
		resourceRemoveAccess: (resourceId, access) => ({ type: this.types.RESOURCE_REMOVE_ACCESS, payload: { resourceId, access } }),
		resourceUpdateCount: update => ({ type: this.types.RESOURCE_UPDATE_COUNT, payload: { update } }),
	}

	// default store

	store = {
		cache: {},
		loading: false,
		lastFetched: 0,
		streamKey: ``,
		resourceIdStreamKey: ``, // this resource id is to make sure that we have a stream key for the current resource id
		access: [],
		update: false,
	}

	// reducer

	reducer = (store = this.store, action) => {

		const {
			RESOURCE_START,
			RESOURCE_ABORT,
			RESOURCE_CLEAN,
			RESOURCE_ERROR,
			RESOURCE_GET,
			RESOURCE_ADD,
			RESOURCE_SEARCH,
			RESOURCE_EDIT,
			RESOURCE_DELETE,
			RESOURCE_FILES,
			RESOURCE_STREAM,
			RESOURCE_FILES_EDIT,
			RESOURCE_ADD_ACCESS,
			RESOURCE_READ_ACCESS,
			RESOURCE_REMOVE_ACCESS,
			RESOURCE_UPDATE_COUNT,
		} = this.types

		switch (action.type) {

		case RESOURCE_START:
			return {
				...store,
				loading: true,
			}

		case RESOURCE_ABORT:
			return {
				...store,
				loading: false,
			}

		case RESOURCE_CLEAN:
			return {
				...store,
				cache: {},
			}

		case RESOURCE_ERROR:
			console.error(action.payload.error) // eslint-disable-line no-console
			return {
				...store,
				loading: false,
			}

		case RESOURCE_GET:
			return {
				...store,
				cache: {
					...store.cache,
					[action.payload.resource.id]: action.payload.resource,
				},
				loading: false,
				lastFetched: Date.now(),
			}

		case RESOURCE_ADD:
			return {
				...store,
				cache: {
					...store.cache,
					[action.payload.resource.id]: action.payload.resource,
				},
				loading: false,
			}

		case RESOURCE_FILES:
			return {
				...store,
				cache: {
					...store.cache,
					[action.payload.id]: {
						...store.cache[action.payload.id],
						files: action.payload.files,
					},
				},
				loading: false,
				lastFetched: Date.now(),
			}

		case RESOURCE_FILES_EDIT:
			return {
				...store,
				cache: {
					...store.cache,
					[action.payload.resourceId]: {
						...store.cache[action.payload.resourceId],
						files: action.payload.files,
					},
				},
				loading: false,
				lastFetched: Date.now(),
			}

		case RESOURCE_EDIT:
			return {
				...store,
				cache: {
					...store.cache,
					[action.payload.resource.id]: action.payload.resource,
				},
			}

		case RESOURCE_DELETE:
			return {
				...store,
				cache: {
					...action.payload.filteredResources,
				},
			}

		case RESOURCE_SEARCH:
			return {
				...store,
				cache: {
					...action.payload.resource,
				},
			}

		case RESOURCE_STREAM:
			return {
				...store,
				streamKey: action.payload.key,
				resourceIdStreamKey: action.payload.resourceId,
			}

		case RESOURCE_ADD_ACCESS:
			return {
				...store,
			}

		case RESOURCE_READ_ACCESS:
			return {
				...store,
				access: {
					...store.access,
					[action.payload.resourceId]: action.payload.access,
				},
			}

		case RESOURCE_REMOVE_ACCESS:
			return {
				...store,
				access: {
					...store.access,
					[action.payload.resourceId]: action.payload.access,
				},
			}

		case RESOURCE_UPDATE_COUNT:
			return {
				...store,
				update: action.payload.update,
			}

		default:
			return store
		}
	}

	// thunks

	addAccess = (resourceId, username) => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.resourcesStart())

		try {

			// add access to resource
			await apiProxy.resources.access.add(resourceId, username)

		} catch (error) {
			dispatch(this.actions.resourcesError(error))
		}
	}

	readAccess = (resourceId) => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.resourcesStart())

		try {

			// read access
			const result = await apiProxy.resources.access.read(resourceId)

			dispatch(this.actions.resourceReadAccess(resourceId, result))

			return result

		} catch (error) {
			dispatch(this.actions.resourcesError(error))
		}
	}

	removeAccess = (resourceId, username) => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.resourcesStart())

		try {
			// remove access from resource
			await apiProxy.resources.access.remove(resourceId, username)

			// get access and filter out the name that just got deleted

			const newAccess = getState().resourceStore.access[resourceId].filter(item => item !== username)
			dispatch(this.actions.resourceRemoveAccess(resourceId, newAccess))

		} catch (error) {
			dispatch(this.actions.resourcesError(error))
		}
	}

	search = (term, force = false) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.resourcesStart())

		try {

			dispatch(this.actions.resourcesClean())

			const result = await apiProxy.resources.search(term)

			const convertedResult = []

			result.forEach((resource) => {
				const resourceObj = new ResourceObject(resource)
				convertedResult[resourceObj.id] = resourceObj
			})

			dispatch(this.actions.resourceSearch(convertedResult))

		} catch (error) {
			dispatch(this.actions.resourcesError(error))
		}
	}

	editResource = (resource, resourceId, selectedFile) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.resourcesStart())

		try {
			const backendForm = {
				"id": resource.id,
				"copyrighted": resource.copyrighted,
				"resource-name": resource.resourceName,
				"physical-copy-exists": resource.physicalCopyExists,
				"published": resource.published,
				"views": resource.views,
				"full-video": resource.fullVideo,
				"metadata": resource.metadata,
				"requester-email": resource.requesterEmail,
				"all-file-versions": resource.allFileVersions,
				"resource-type": resource.resourceType,
				"date-validated": resource.dateValidated,
			}

			await apiProxy.resources.edit(backendForm, resourceId)

			if(selectedFile !== undefined){
				const files = getState().resourceStore.cache[resourceId].files
				const newFileStack = []

				files.forEach(item => {
					if(item.id !== selectedFile.id)
						newFileStack.push(item)
				})
				resource.files = newFileStack
			}

			dispatch(this.actions.resourceEdit(resource))
		} catch(error){
			dispatch(this.actions.resourcesError(error))
		}
	}

	// it only updates store
	updateFileVersion = (resource, files) => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.resourcesStart())

		try {

			if(files !== undefined){
				resource.files = files

				let langs = ``
				files.forEach(file => {
					langs = langs.concat(`${file[`file-version`]};`)
				})

				resource.allFileVersions = langs
			}

			dispatch(this.actions.resourceEdit(resource))
		} catch(error){
			dispatch(this.actions.resourcesError(error))
		}
	}

	editFile = (resourceId, file, edit = true) => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.resourcesStart())

		// add file versions on resource
		try {
			const files = getState().resourceStore.cache[resourceId].files

			const newFileStack = []

			files.forEach(item => {
				if(item.id !== file.id)
					newFileStack.push(item)
			})

			if(edit)
				newFileStack.push(file)

			dispatch(this.actions.resourcesFilesEdit(resourceId, newFileStack))

		} catch (error) {
			dispatch(this.actions.resourcesError(error))
		}
	}

	getResource = (id, force = false) => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.resourcesStart())

		try {

			const result = await apiProxy.resources.get(id)

			dispatch(this.actions.resourcesGet(result))

		} catch (error) {
			dispatch(this.actions.resourcesError(error))
		}
	}

	getResources = (id, force = false) => async (dispatch, getState, { apiProxy }) => {

		const { resourceStore } = getState()

		const time = Date.now() - resourceStore.lastFetched

		const stale = time >= process.env.REACT_APP_STALE_TIME

		const { cache } = getState().resourceStore
		const cachedIds = Object.keys(cache)
		const cached = cachedIds.includes(id)

		if (stale || !cached || force) {

			dispatch(this.actions.resourcesStart())

			try {

				const result = await apiProxy.resources.get(id)

				const { resource } = result.data

				resource.resources = {}
				resource.relations.forEach(item => resource.resources[item.type] = [])

				Promise.all(resource.relations.map(async item => {
					const result = await apiProxy.resources.get(item.subjectId)
					resource.resources[item.type].push(result.data.resource)
				}))

				if (typeof resource.keywords === `string`) resource.keywords = resource.keywords.split(`,`)

				dispatch(this.actions.resourcesGet(resource))

			} catch (error) {
				dispatch(this.actions.resourcesError(error))
			}

		} else dispatch(this.actions.resourcesAbort())
	}

	addResource = (resource, data) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.resourcesStart())

		try {
			const result = await apiProxy.resources.post(resource)

			data.id = result.id
			dispatch(this.actions.resourcesAdd(data))

			return result
		} catch(error){
			dispatch(this.actions.resourcesError(error))
		}
	}

	getFiles = (id, force = false) => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.resourcesStart())

		try {
			const result = await apiProxy.resources.files(id)

			dispatch(this.actions.resourceUpdateCount(false))
			dispatch(this.actions.resourcesFiles(id, result))

			return result
		} catch (error) {
			dispatch(this.actions.resourcesError(error))
		}
	}

	updateStatus = (status) => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.resourcesStart())

		try {
			dispatch(this.actions.resourceUpdateCount(status))
		} catch (error) {
			dispatch(this.actions.resourcesError(error))
		}
	}

	removeResource = (resourceId) => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.resourcesStart())

		try {

			const currentResources = getState().resourceStore.cache
			const filteredResources = []
			Object.keys(currentResources).forEach(key => {
				if(key !== resourceId)
					filteredResources[key] = currentResources[key]
			})

			await apiProxy.resources.delete(resourceId)
			dispatch(this.actions.resourceDelete(filteredResources))

		} catch(error){
			dispatch(this.actions.resourcesError(error))
		}
	}

	getStreamKey = (resourceId, language) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.resourcesStart())

		try {

			const allFiles = await apiProxy.resources.files(resourceId)

			const fileId = allFiles.find(element => element[`file-version`].includes(language) !== false)[`id`]

			const result = await apiProxy.media.getKey(fileId)

			dispatch(this.actions.resourceStream(result[`file-key`], resourceId))
		} catch(error){
			dispatch(this.actions.resourcesError(error))
		}
	}
}
