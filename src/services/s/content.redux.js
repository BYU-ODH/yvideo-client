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
		CONTENT_GET_SUBTITLES: `CONTENT_GET_SUBTITLES`,
		CONTENT_ADD_SUBTITLES: `CONTENT_ADD_SUBTITLES`,
		CONTENT_ERROR_SYNC: `CONTENT_ERROR_SYNC`,
	}

	// action creators

	actions = {
		contentStart: () => ({ type: this.types.CONTENT_START }),
		contentAbort: () => ({ type: this.types.CONTENT_ABORT }),
		contentClean: () => ({ type: this.types.CONTENT_CLEAN }),
		contentCreate: (content) => ({ type: this.types.CONTENT_CREATE, payload: { content }}),
		contentError: error => ({ type: this.types.CONTENT_ERROR, payload: { error } }),
		contentErrorSync: error => ({type: this.types.CONTENT_ERROR_SYNC, payload:{ error }}),
		contentSet: content => ({ type: this.types.CONTENT_SET, payload: { content } }),
		contentGet: content => ({ type: this.types.CONTENT_GET, payload: { content } }),
		contentAddView: id => ({ type: this.types.CONTENT_ADD_VIEW, payload: { id } }),
		contentUpdate: content => ({ type: this.types.CONTENT_UPDATE, payload: { content }}),
		contentGetSubtitles: ids => ({type: this.types.CONTENT_GET_SUBTITLES, payload: {ids}}),
		contentAddSubtitles: ids => ({type: this.types.CONTENT_ADD_SUBTITLES, payload:{ids}}),
	}

	// default store

	store = {
		errorMessage: ``,
		errorMessagePrev: ``,
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
			CONTENT_ERROR_SYNC,
			CONTENT_SET,
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
				errorMessage: ``,
				loading: false,
			}

		case CONTENT_CLEAN:
			return {
				...store,
				errorMessage: ``,
				cache: {},
			}

		case CONTENT_CREATE:
			return {
				...store,
				cache: {
					...store.cache,
					...action.payload.content,
				},
				errorMessage: ``,
				loading: false,
			}

		case CONTENT_ERROR:
			// alert(`${action.payload.error.response.data}. Status: ${action.payload.error.response.status}`)
			return {
				...store,
				errorMessage: `Status: ${action.payload.error.response ? `${action.payload.error.response.status}` : ``}`,
				loading: false,
			}
		case CONTENT_ERROR_SYNC:
			return{
				...store,
				errorMessagePrev: action.payload.error,
			}
		case CONTENT_SET:
			return {
				...store,
				cache: {
					...store.cache,
					...action.payload.content,
				},
				errorMessage: ``,
				loading: false,
				lastFetched: Date.now(),
			}

		case CONTENT_GET:
			return {
				...store,
				cache: {
					[action.payload.content.id]: action.payload.content,
				},
				errorMessage: ``,
			}

		case CONTENT_UPDATE:
			return {
				...store,
				cache: {
					...store.cache,
					[action.payload.content.id]: action.payload.content,
				},
				errorMessage: ``,
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
				errorMessage: ``,
				loading: false,
			}
		case CONTENT_GET_SUBTITLES:
			return {
				...store,
				subtitlesIds: {
					...store.subtitlesIds,
					...action.payload.content,
				},
				errorMessage: ``,
			}
		case CONTENT_ADD_SUBTITLES:
			return{
				...store,
				subtitlesIds: {
					...store.subtitlesIds,
					...action.payload.content,
				},
				errorMessage: ``,
			}

		default:
			return store
		}
	}

	// thunks
	setContent = (content, force = false) => async (dispatch, getState, { apiProxy }) => {
		// SETS CONTENT FOR ALL THE COLLECTIONS OF THE USER

		// CONTENT IS AN ARRAY OF CONTENTS

		dispatch(this.actions.contentStart())

		try {

			dispatch(this.actions.contentSet(content))
		} catch (error) {
			dispatch(this.actions.contentError(error))
		}
	}

	getContent = (id, force = false) => async (dispatch, getState, { apiProxy }) => {
		// GETS SPECIFIC CONTENT BASED ON CONTENT ID FROM THE BACK END IF THE CONTENT STORE DOES NOT HAVE IT
		dispatch(this.actions.contentStart())

		try {

			const result = await apiProxy.content.getSingleContent(id)
			const newContent = new Content(result)

			dispatch(this.actions.contentGet(newContent))
		} catch (error) {
			console.log(`this is an error`, error.response.status)
			dispatch(this.actions.contentError(error))
		}
	}

	createContent = (content) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.contentStart())

		try {

			const result = await apiProxy.content.post(content)

			const id = result.id
			content[`id`] = id

			const newContent = new Content(content) // POST https://yvideodev.byu.edu/api/content

			// TODO: Why doesn't this update to state cause it to rerender?
			dispatch(this.actions.contentCreate({ [id]: newContent}))

			dispatch(this.actions.contentAbort())
		} catch (error) {
			console.log(error)
			dispatch(this.actions.contentError(error))
		}
	}

	updateContent = content => async (dispatch, _getState, { apiProxy }) => {

		dispatch(this.actions.contentStart())

		try {
			// let finalData = 'asd'
			const finalData = new BackEndContent(content).backEndData

			const results = await apiProxy.content.update(finalData)

			// console.log(content)

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
		dispatch(this.actions.contentStart())

		try {
			const result = await apiProxy.content.getSubtitles(id)
			return result
		} catch (error) {
			console.error(error.message)
			dispatch(this.actions.contentError(error))
		}
	}
	addSubtitles = subs => async (dispatch, getState, { apiProxy }) => {

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

	syncError = () => async (dispatch, getState) => {
		const err = getState().contentStore.errorMessage
		dispatch(this.actions.contentErrorSync(err))
	}
}