import BackEndContent from 'models/BackEndContent'

export default class ContentService {

	// types

	types = {
		CONTENT_START: `CONTENT_START`,
		CONTENT_ABORT: `CONTENT_ABORT`,
		CONTENT_CLEAN: `CONTENT_CLEAN`,
		CONTENT_CREATE: `CONTENT_CREATE`,
		CONTENT_ERROR: `CONTENT_ERROR`,
		CONTENT_GET: `CONTENT_GET`,
		CONTENT_ADD_VIEW: `CONTENT_ADD_VIEW`,
		CONTENT_UPDATE: `CONTENT_UPDATE`,
		CONTENT_GET_SUBTITLES: `CONTENT_GET_SUBTITLES`,
		CONTENT_ADD_SUBTITLES: `CONTENT_ADD_SUBTITLES`,
	}

	// action creators

	actions = {
		contentStart: () => ({ type: this.types.CONTENT_START }),
		contentAbort: () => ({ type: this.types.CONTENT_ABORT }),
		contentClean: () => ({ type: this.types.CONTENT_CLEAN }),
		contentCreate: (content) => ({ type: this.types.CONTENT_CREATE, payload: { content }}),
		contentError: error => ({ type: this.types.CONTENT_ERROR, payload: { error } }),
		contentGet: content => ({ type: this.types.CONTENT_GET, payload: { content } }),
		contentAddView: id => ({ type: this.types.CONTENT_ADD_VIEW, payload: { id } }),
		contentUpdate: content => ({ type: this.types.CONTENT_UPDATE, payload: { content }}),
		contentGetSubtitles: ids => ({type: this.types.CONTENT_GET_SUBTITLES, payload: {ids}}),
		contentAddSubtitles: ids => ({type: this.types.CONTENT_ADD_SUBTITLES, payload:{ids}}),
	}

	// default store

	store = {
		cache: {},
		loading: false,
		lastFetched: 0,
		subtitlesIds: [],
	}

	// reducer

	reducer = (store = this.store, action) => {

		const {
			CONTENT_START,
			CONTENT_ABORT,
			CONTENT_CLEAN,
			CONTENT_CREATE,
			CONTENT_ERROR,
			CONTENT_GET,
			CONTENT_ADD_VIEW,
			CONTENT_UPDATE,
			CONTENT_GET_SUBTITLES,
			CONTENT_ADD_SUBTITLES,
		} = this.types

		switch (action.type) {

		case CONTENT_START:
			return {
				...store,
				loading: true,
			}

		case CONTENT_ABORT:
			return {
				...store,
				loading: false,
			}

		case CONTENT_CLEAN:
			return {
				...store,
				cache: {},
			}

		case CONTENT_CREATE:
			return {
				...store,
				cache: {
					...store.cache,
					...action.payload.content,
				},
				loading: false,
			}

		case CONTENT_ERROR:
			console.error(action.payload.error)
			return {
				...store,
				loading: false,
			}

		case CONTENT_GET:
			return {
				...store,
				cache: {
					...store.cache,
					...action.payload.content,
				},
				loading: false,
				lastFetched: Date.now(),
			}

		case CONTENT_UPDATE:
			return {
				...store,
				cache: {
					...store.cache,
					[action.payload.content.id]: action.payload.content,
				},
				loading: false,
			}

		case CONTENT_ADD_VIEW:
			return {
				...store,
				cache: {
					[action.payload.id]: {
						...store.cache[action.payload.id],
						views: store.cache[action.payload.id].views + 1,
					},
				},
				loading: false,
			}
		case CONTENT_GET_SUBTITLES:
			return {
				...store,
				subtitlesIds: {
					...store.subtitlesIds,
					...action.payload.content,
				},
			}
		case CONTENT_ADD_SUBTITLES:
			return{
				...store,
				subtitlesIds: {
					...store.subtitlesIds,
					...action.payload.content,
				},
			}

		default:
			return store
		}
	}

	// thunks
	setContent = (content) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.contentStart())

		// console.log('updated content1', content)

		try {
			// TODO: Why doesn't this update to state cause it to rerender?
			// dispatch(this.actions.contentCreate(data))

			dispatch(this.actions.contentGet(content))
		} catch (error) {
			dispatch(this.actions.contentError(error))
		}

	}

	getContent = (contentIds = [], force = false) => async (dispatch, getState, { apiProxy }) => {

		const time = Date.now() - getState().contentStore.lastFetched

		const stale = time >= process.env.REACT_APP_STALE_TIME

		const { cache } = getState().contentStore
		const cachedIds = Object.keys(cache).map(id => id)
		const notCached = contentIds.filter(id => !cachedIds.includes(id))

		// console.log('updated store', contentIds)

		if (stale || notCached.length || force) {

			dispatch(this.actions.contentStart())

			try {

				const result = await apiProxy.content.get(notCached)

				dispatch(this.actions.contentGet(result))

			} catch (error) {
				console.error(error.message)
				dispatch(this.actions.contentError(error))
			}

		} else dispatch(this.actions.contentAbort())
	}

	createContent = (content) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.contentStart())

		try {
			const result = await apiProxy.content.post(content)

			const data = { [result.data.id]: result.data }

			// console.log(result.data)

			// TODO: Why doesn't this update to state cause it to rerender?
			// dispatch(this.actions.contentCreate(data))

			dispatch(this.actions.contentAbort())
		} catch (error) {
			dispatch(this.actions.contentError(error))
		}
	}

	updateContent = content => async (dispatch, _getState, { apiProxy }) => {

		// console.log(content)

		dispatch(this.actions.contentStart())

		try {

			const finalData = new BackEndContent(content).backEndData

			const results = await apiProxy.content.update(finalData)

			// const metaResult =
			// await apiProxy.content.metadata.post(id, metadata)

			// console.log(settingsResult)

			dispatch(this.actions.contentUpdate(content))

		} catch (error) {
			dispatch(this.actions.contentError(error))
		}
	}

	addView = (id, force = false) => async (dispatch, getState, { apiProxy }) => {

		const time = Date.now() - getState().contentStore.lastFetched

		const stale = time >= process.env.REACT_APP_STALE_TIME

		if (stale || force) {

			dispatch(this.actions.contentStart())

			try {

				await apiProxy.content.addView.get(id)

				dispatch(this.actions.contentAddView(id))

			} catch (error) {
				console.error(error.message)
				dispatch(this.actions.contentError(error))
			}

		} else dispatch(this.actions.contentAbort())
	}

	getSubtitles = (id, force = false) => async (dispatch, getState, { apiProxy }) => {

		const time = Date.now() - getState().contentStore.lastFetched

		const stale = time >= process.env.REACT_APP_STALE_TIME
		// console.log('updated store', contentIds)

		if (stale || force) {

			dispatch(this.actions.contentStart())

			try {

				const result = await apiProxy.content.getSubtitles(id)

				dispatch(this.actions.subtitlesIds(result))

			} catch (error) {
				console.error(error.message)
				dispatch(this.actions.contentError(error))
			}

		} else dispatch(this.actions.contentAbort())
	}
	addSubtitles = subs => async (dispatch, getState, { apiProxy }) => {

		// console.log(content)

		dispatch(this.actions.contentStart())

		try {

			const results = await apiProxy.content.addSubtitles(subs)

			// const metaResult =
			// await apiProxy.content.metadata.post(id, metadata)

			// console.log(settingsResult)

			dispatch(this.actions.contentAddSubtitles(subs))

		} catch (error) {
			dispatch(this.actions.contentError(error))
		}
	}
}