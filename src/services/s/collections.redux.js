export default class CollectionService {

	// types

	types = {
		COLLECTIONS_START: `COLLECTIONS_START`,
		COLLECTIONS_ABORT: `COLLECTIONS_ABORT`,
		COLLECTIONS_CLEAN: `COLLECTIONS_CLEAN`,
		COLLECTIONS_ERROR: `COLLECTIONS_ERROR`,
		COLLECTIONS_GET: `COLLECTIONS_GET`,
	}

	// action creators

	actions = {
		collectionsStart: () => ({ type: this.types.COLLECTIONS_START }),
		collectionsAbort: () => ({ type: this.types.COLLECTIONS_ABORT }),
		collectionsClean: () => ({ type: this.types.COLLECTIONS_CLEAN }),
		collectionsError: error => ({ type: this.types.COLLECTIONS_ERROR, payload: { error } }),
		collectionsGet: payload => ({ type: this.types.COLLECTIONS_GET, payload }),
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
			COLLECTIONS_START,
			COLLECTIONS_ABORT,
			COLLECTIONS_CLEAN,
			COLLECTIONS_ERROR,
			COLLECTIONS_GET,
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
					...action.payload,
				},
				loading: false,
				lastFetched: Date.now(),
			}

		default:
			return store
		}
	}

	// thunks

	getCollections = force => async (dispatch, getState, { apiProxy }) => {

		console.log(`getCollections thunk`)

		const time = Date.now() - getState().collectionStore.lastFetched

		const stale = time >= process.env.REACT_APP_STALE_TIME

		if (stale || force) {

			dispatch(this.actions.collectionsStart())

			try {

				const result = await apiProxy.user.collections()
				console.log(result)

			} catch (error) {
				console.error(error.message)
				dispatch(this.actions.collectionsError(error))
			}

		} else dispatch(this.actions.collectionsAbort())
	}

}
