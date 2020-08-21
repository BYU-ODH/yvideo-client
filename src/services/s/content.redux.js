import BackEndContent from 'models/BackEndContent'
import Content from 'models/Content'

export default class ContentService {

	// types

	types = {
		CONTENT_START: `CONTENT_START`,
		CONTENT_ABORT: `CONTENT_ABORT`,
		CONTENT_CLEAN: `CONTENT_CLEAN`,
		CONTENT_CREATE: `CONTENT_CREATE`,
		CONTENT_ERROR: `CONTENT_ERROR`,
		CONTENT_SET: `CONTENT_SET`,
		CONTENT_GET: `CONTENT_GET`,
		CONTENT_ADD_VIEW: `CONTENT_ADD_VIEW`,
		CONTENT_UPDATE: `CONTENT_UPDATE`,
	}

	// action creators

	actions = {
		contentStart: () => ({ type: this.types.CONTENT_START }),
		contentAbort: () => ({ type: this.types.CONTENT_ABORT }),
		contentClean: () => ({ type: this.types.CONTENT_CLEAN }),
		contentCreate: (content) => ({ type: this.types.CONTENT_CREATE, payload: { content }}),
		contentError: error => ({ type: this.types.CONTENT_ERROR, payload: { error } }),
		contentSet: content => ({ type: this.types.CONTENT_SET, payload: { content } }),
		contentGet: content => ({ type: this.types.CONTENT_GET, payload: { content } }),
		contentAddView: id => ({ type: this.types.CONTENT_ADD_VIEW, payload: { id } }),
		contentUpdate: content => ({ type: this.types.CONTENT_UPDATE, payload: { content }}),
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
			CONTENT_START,
			CONTENT_ABORT,
			CONTENT_CLEAN,
			CONTENT_CREATE,
			CONTENT_ERROR,
			CONTENT_SET,
			CONTENT_GET,
			CONTENT_ADD_VIEW,
			CONTENT_UPDATE,
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

		case CONTENT_SET:
			return {
				...store,
				cache: {
					...action.payload.content,
				},
				loading: false,
				lastFetched: Date.now(),
			}

		case CONTENT_GET:
			return {
				...store,
				cache: {
					...store.cache,
					[action.payload.content.id]: action.payload.content,
				},
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

		default:
			return store
		}
	}

	// thunks
	setContent = (content, force = false) => async (dispatch, getState, { apiProxy }) => {
		//SETS CONTENT FOR ALL THE COLLECTIONS OF THE USER
		dispatch(this.actions.contentStart())

		try {
			dispatch(this.actions.contentSet(content))
		} catch (error) {
			dispatch(this.actions.contentError(error))
		}
	}

	getContent = (id, force = false) => async (dispatch, getState, { apiProxy }) => {
		//GETS SPECIFIC CONTENT BASED ON CONTENT ID FROM THE BACK END IF THE CONTENT STORE DOES NOT HAVE IT
		dispatch(this.actions.contentStart())

		try {

			const result = await apiProxy.content.getSingleContent(id)

			const newContent = new Content(result)

			dispatch(this.actions.contentGet(newContent))
		} catch (error) {
			dispatch(this.actions.contentError(error))
		}
	}

	// getContent = (contentIds, force = false) => async (dispatch, getState, { apiProxy }) => {

	// 	const time = Date.now() - getState().contentStore.lastFetched

	// 	const stale = time >= process.env.REACT_APP_STALE_TIME

	// 	const { cache } = getState().contentStore
	// 	const cachedIds = Object.keys(cache).map(id => id)
	// 	const notCached = contentIds.filter(id => !cachedIds.includes(id))

	// 	// console.log('updated store', contentIds)

	// 	if (stale || notCached.length || force) {

	// 		dispatch(this.actions.contentStart())

	// 		try {

	// 			const result = await apiProxy.content.get(notCached)

	// 			dispatch(this.actions.contentGet(result))

	// 		} catch (error) {

	// 			console.error(error.message)
	// 			dispatch(this.actions.contentError(error))
	// 		}

	// 	} else dispatch(this.actions.contentAbort())
	// }

	createContent = (content) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.contentStart())

		try {
			const result = await apiProxy.content.post(content)
			let id = result.id
			content['id'] = id

			// const data = { [result.data.id]: result.data }

			const newContent = new Content(content)
			// console.log(result)

			// // TODO: Why doesn't this update to state cause it to rerender?
			dispatch(this.actions.contentCreate({ [id]: newContent}))

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

}