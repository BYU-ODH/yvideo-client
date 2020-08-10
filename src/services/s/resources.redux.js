import ResourceObject from '../../models/ResourceObject'

export default class ResourceService {

	// types

	types = {
		RESOURCE_START: `RESOURCE_START`,
		RESOURCE_ABORT: `RESOURCE_ABORT`,
		RESOURCE_CLEAN: `RESOURCE_CLEAN`,
		RESOURCE_ERROR: `RESOURCE_ERROR`,
		RESOURCE_GET: `RESOURCE_GET`,
		RESOURCE_FILES: `RESOURCE_FILES`,
		RESOURCE_SEARCH:`RESOURCE_SEARCH`,
		RESOURCE_EDIT: `RESOURCE_EDIT`,
		RESOURCE_DELETE: `RESOURCE_DELETE`,
		RESOURCE_STREAM: 'RESOURCE_STREAM',
	}

	// action creators

	actions = {
		resourcesStart: () => ({ type: this.types.RESOURCE_START }),
		resourcesAbort: () => ({ type: this.types.RESOURCE_ABORT }),
		resourcesClean: () => ({ type: this.types.RESOURCE_CLEAN }),
		resourcesError: error => ({ type: this.types.RESOURCE_ERROR, payload: { error } }),
		resourcesGet: resource => ({ type: this.types.RESOURCE_GET, payload: { resource } }),
		resourcesFiles: (id, files) => ({ type: this.types.RESOURCE_FILES, payload: { id, files } }),
		resourceSearch: resource => ({ type: this.types.RESOURCE_SEARCH, payload: { resource } }),
		resourceEdit: resource => ({ type: this.types.RESOURCE_EDIT, payload: { resource } }),
		resourceDelete: filteredResources => ({ type: this.types.RESOURCE_DELETE, payload: { filteredResources } }),
		resourceStream: key => ({ type: this.types.RESOURCE_STREAM, payload: { key } })
	}

	// default store

	store = {
		cache: {},
		loading: false,
		lastFetched: 0,
		streamKey: '',
	}

	// reducer

	reducer = (store = this.store, action) => {

		const {
			RESOURCE_START,
			RESOURCE_ABORT,
			RESOURCE_CLEAN,
			RESOURCE_ERROR,
			RESOURCE_GET,
			RESOURCE_SEARCH,
			RESOURCE_EDIT,
			RESOURCE_DELETE,
			RESOURCE_FILES,
			RESOURCE_STREAM
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
			console.error(action.payload.error)
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
			}

		default:
			return store
		}
	}

	// thunks

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

	getFiles = (id, force = false) => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.resourcesStart())

		try {

			const result = await apiProxy.resources.files(id)

			dispatch(this.actions.resourcesFiles(id, result))

			console.log(getState().resourceStore)

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

	addResource = (resource) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.resourcesStart())

		try {
			const result = await apiProxy.resources.post(resource)

			dispatch(this.actions.resourcesGet(resource))
		} catch(error){
			dispatch(this.actions.resourcesError(error))
		}
	}

	editResource = (resource, resourceId) => async (dispatch, getState, { apiProxy }) => {

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

			const result = await apiProxy.resources.edit(backendForm, resourceId)

			dispatch(this.actions.resourceEdit(resource))
		} catch(error){
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

			const result = await apiProxy.resources.delete(resourceId)
			dispatch(this.actions.resourceDelete(filteredResources))

		} catch(error){
			dispatch(this.actions.resourcesError(error))
		}
	}

	getStreamKey = (resourceId, language) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.resourcesStart())

		try {

			const allFiles = await apiProxy.resources.files(resourceId)

			//console.log(allFiles)

			let fileId = allFiles.find(element => element['file-version'].includes(language) !== false)['id']

			//console.log(fileId)
			const result = await apiProxy.media.getKey(fileId)
			//console.log('FILE KEY', result)


			dispatch(this.actions.resourceStream(result['file-key']))

		} catch(error){
			dispatch(this.actions.resourcesError(error))
		}
	}

}