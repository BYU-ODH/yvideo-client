export default class FileService {

	// types

	types = {
		FIle_START: `FIle_START`,
		FIle_ABORT: `FIle_ABORT`,
		FIle_CLEAN: `FIle_CLEAN`,
		FIle_ERROR: `FIle_ERROR`,
		FIle_UPLOAD:`FIle_UPLOAD`,
	}

	// action creators

	actions = {
		fileStart: () => ({ type: this.types.FIle_START }),
		fileAbort: () => ({ type: this.types.FIle_ABORT }),
		fileClean: () => ({ type: this.types.FIle_CLEAN }),
		fileError: error => ({ type: this.types.FIle_ERROR, payload: { error } }),
		fileUpload: result => ({ type: this.types.FIle_UPLOAD, payload: { result } }),
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
			FIle_START,
			FIle_ABORT,
			FIle_CLEAN,
			FIle_ERROR,
			FIle_UPLOAD,
		} = this.types

		switch (action.type) {

		case FIle_START:
			return {
				...store,
				loading: true,
			}

		case FIle_ABORT:
			return {
				...store,
				loading: false,
			}

		case FIle_CLEAN:
			return {
				...store,
				cache: {},
			}

		case FIle_ERROR:
			console.error(action.payload.error)
			return {
				...store,
				loading: false,
			}

		case FIle_UPLOAD:
			return {
				...store,
				cache: {
					...store.cache,
					[action.payload.result.data.id]: action.payload.result.data.id,
				},
				loading: false,
				lastFetched: Date.now(),
			}

		default:
			return store
		}
	}

	// thunks

	upload = (file) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.fileStart())

		try {
			const result = await apiProxy.file.post(file)

			dispatch(this.actions.fileUpload(result))

		} catch (error) {
			dispatch(this.actions.resourcesError(error))
		}
	}

	delete = (id) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.fileStart())

		try {
			const result = await apiProxy.file.delete(id)

			console.log(result)

		} catch (error) {
			dispatch(this.actions.resourcesError(error))
		}
	}
}