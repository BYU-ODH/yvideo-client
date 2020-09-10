export default class FileService {

	// types

	types = {
		FILE_START: `FILE_START`,
		FILE_ABORT: `FILE_ABORT`,
		FILE_CLEAN: `FILE_CLEAN`,
		FILE_ERROR: `FILE_ERROR`,
		FILE_UPLOAD:`FILE_UPLOAD`,
		FILE_UPDATE: `FILE_UPDATE`,
	}

	// action creators

	actions = {
		fileStart: () => ({ type: this.types.FILE_START }),
		fileAbort: () => ({ type: this.types.FILE_ABORT }),
		fileClean: () => ({ type: this.types.FILE_CLEAN }),
		fileError: error => ({ type: this.types.FILE_ERROR, payload: { error } }),
		fileUpload: file => ({ type: this.types.FILE_UPLOAD, payload: { file } }),
		fileUpdate: file => ({ type: this.types.FILE_UPDATE, payload: { file } }),
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
			FILE_START,
			FILE_ABORT,
			FILE_CLEAN,
			FILE_ERROR,
			FILE_UPLOAD,
			FILE_UPDATE,
		} = this.types

		switch (action.type) {

		case FILE_START:
			return {
				...store,
				loading: true,
			}

		case FILE_ABORT:
			return {
				...store,
				loading: false,
			}

		case FILE_CLEAN:
			return {
				...store,
				cache: {},
			}

		case FILE_ERROR:
			console.error(action.payload.error)
			return {
				...store,
				loading: false,
			}

		case FILE_UPLOAD:
			return {
				...store,
				cache: {
					...store.cache,
					[action.payload.file.id]: action.payload.file.id,
				},
				loading: false,
				lastFetched: Date.now(),
			}

		case FILE_UPDATE:
			return {
				...store,
				cache: {
					...store.cache,
					[action.payload.file.id]: action.payload.file,
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
			dispatch(this.actions.fileError(error))
		}
	}

	delete = (id) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.fileStart())

		try {

			const result = await apiProxy.file.delete(id)

		} catch (error) {
			dispatch(this.actions.fileError(error))
		}
	}

	update = (id, file) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.fileStart())

		try {
			const result = await apiProxy.file.patch(id, file)

			dispatch(this.actions.fileUpdate(file))

		} catch (error) {
			dispatch(this.actions.fileError(error))
		}
	}
}