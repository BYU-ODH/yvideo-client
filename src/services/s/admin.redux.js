export default class AdminService {

	// types

	types = {
		ADMIN_START: `ADMIN_START`,
		ADMIN_ABORT: `ADMIN_ABORT`,
		ADMIN_CLEAN: `ADMIN_CLEAN`,
		ADMIN_ERROR: `ADMIN_ERROR`,
		ADMIN_SEARCH: `ADMIN_SEARCH`,
		ADMIN_SEARCH_PROFESSORS: `ADMIN_SEARCH_PROFESSORS`,
		ADMIN_SEARCH_COLLECTIONS: `ADMIN_SEARCH_COLLECTIONS`,
	}

	// action creators

	actions = {
		adminStart: () => ({ type: this.types.ADMIN_START }),
		adminAbort: () => ({ type: this.types.ADMIN_ABORT }),
		adminClean: () => ({ type: this.types.ADMIN_CLEAN }),
		adminError: error => ({ type: this.types.ADMIN_ERROR, payload: { error } }),
		adminSearch: results => ({ type: this.types.ADMIN_SEARCH, payload: { results } }),
		adminSearchProfessors: results => ({ type: this.types.ADMIN_SEARCH_PROFESSORS, payload: { results }}),
		adminSearchCollections: results => ({ type: this.types.ADMIN_SEARCH_COLLECTIONS, payload: { results }}),
	}

	// default store

	store = {
		data: null,
		cache: {},
		lacache: {}, // lab assistant cache
		loading: false,
		lastFetched: 0,
		lastFetchedProfessors: 0,
		lastFetchedCollections: 0,
	}

	// reducer

	reducer = (store = this.store, action) => {

		const {
			ADMIN_START,
			ADMIN_ABORT,
			ADMIN_CLEAN,
			ADMIN_ERROR,
			ADMIN_SEARCH,
			ADMIN_SEARCH_PROFESSORS,
			ADMIN_SEARCH_COLLECTIONS,
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

		case ADMIN_ERROR:
			console.error(action.payload.error)
			return {
				...store,
				data: null,
				loading: false,
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
				lacache: {
					professors: action.payload.results,
				},
				loading: false,
				lastFetchedProfessors: Date.now(),
			}

		case ADMIN_SEARCH_COLLECTIONS:
			return {
				...store,
				lacache: {
					...store.lacache,
					collections: action.payload.results,
				},
				loading: false,
				lastFetchedCollections: Date.now(),
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

				dispatch(this.actions.adminSearch(results))

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
				console.log(results)
				dispatch(this.actions.adminSearchProfessors(results))

			} catch (error) {
				console.error(error.message)
				dispatch(this.actions.adminError(error))
			}

		} else dispatch(this.actions.adminAbort())
	}

	searchCollections = (searchQuery, force = false) => async (dispatch, getState, { apiProxy }) => {

		const time = Date.now() - getState().adminStore.lastFetchedCollections

		const stale = time >= process.env.REACT_APP_STALE_TIME

		if (stale || force) {

			dispatch(this.actions.adminStart())

			try {

				const results = await apiProxy.admin.search.get(`collection`, searchQuery)

				dispatch(this.actions.adminSearchCollections(results))

			} catch (error) {
				console.error(error.message)
				dispatch(this.actions.adminError(error))
			}

		} else dispatch(this.actions.adminAbort())
	}

	clean = () => async (dispatch) => {
		dispatch(this.actions.adminClean())
	}

}
