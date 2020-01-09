export default class AdminService {

	// types

	types = {
		ADMIN_START: `ADMIN_START`,
		ADMIN_ABORT: `ADMIN_ABORT`,
		ADMIN_CLEAN: `ADMIN_CLEAN`,
		ADMIN_ERROR: `ADMIN_ERROR`,
		ADMIN_SEARCH: `ADMIN_SEARCH`,
	}

	// action creators

	actions = {
		adminStart: () => ({ type: this.types.ADMIN_START }),
		adminAbort: () => ({ type: this.types.ADMIN_ABORT }),
		adminClean: () => ({ type: this.types.ADMIN_CLEAN }),
		adminError: error => ({ type: this.types.ADMIN_ERROR, payload: { error } }),
		adminSearch: results => ({ type: this.types.ADMIN_SEARCH, payload: { results } }),
	}

	// default store

	store = {
		cache: {},
		loading: false,
		lastFetched: 0,
	}

	// reducer

	reducer = (store = this.store, action) => {

		const {
			ADMIN_START,
			ADMIN_ABORT,
			ADMIN_CLEAN,
			ADMIN_ERROR,
			ADMIN_SEARCH,
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
				loading: false,
			}

		case ADMIN_CLEAN:
			return {
				...store,
				cache: {},
			}

		case ADMIN_ERROR:
			console.error(action.payload.error)
			return {
				...store,
				loading: false,
			}

		case ADMIN_SEARCH:
			console.log(action.payload.results)
			return {
				...store,
				cache: {
					...action.payload.results,
				},
				loading: false,
				lastFetched: Date.now(),
			}

		default:
			return store
		}
	}

	// thunks

	search = (searchCategory, searchQuery, force = false) => async (dispatch, getState, { apiProxy }) => {

		console.log(searchCategory, searchQuery)

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

	clean = () => async (dispatch) => {
		dispatch(this.actions.adminClean())
	}

}
