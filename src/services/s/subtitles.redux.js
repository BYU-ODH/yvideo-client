export default class SubtitlesService {

	// types
	types = {
		SUBTITLES_START : `SUBTITLES_START`,
		SUBTITLES_ABORT : `SUBTITLES_ABORT`,
		SUBTITLES_CLEAN: `SUBTITLES_CLEAN`,
		SUBTITLES_CREATE: `SUBTITLES_CREATE`,
		SUBTITLES_ERROR: `SUBTITLES_ERROR`,
		SUBTITLES_GET: `SUBTITLES_GET`,
		SUBTITLES_UPDATE: `SUBTITLES_UPDATE`,
		ACTIVE_UPDATE: `ACTIVE_UPDATE`,
		SET_CONTENT_ID: `SET_CONTENT_ID`,
	}

	// action creators

	actions = {
		subtitlesStart: () => ({ type: this.types.SUBTITLES_START }),
		subtitlesAbort: () => ({ type: this.types.SUBTITLES_ABORT }),
		subtitlesClean: () => ({ type: this.types.SUBTITLES_CLEAN }),
		subtitlesCreate: (subtitles) => ({ type: this.types.SUBTITLES_CREATE, payload: { subtitles }}),
		subtitlesError: error => ({ type: this.types.SUBTITLES_ERROR, payload: { error } }),
		subtitlesGet: (subtitles, id) => ({ type: this.types.SUBTITLES_GET, payload: { subtitles, id } }),
		subtitlesUpdate: subtitles => ({ type: this.types.SUBTITLES_UPDATE, payload: { subtitles }}),
		activeUpdate: active => ({ type: this.types.ACTIVE_UPDATE, payload: { active }}),
		setContentId: id => ({type: this.types.SET_CONTENT_ID,payload: {id}}),
	}

	store = {
		errorMessage: ``,
		cache: [],
		loading: false,
		lastFetched: 0,
		active: 0,
		contentId : ``,
	}

	// reducer

	reducer = (store = this.store, action) => {

		const {
			SUBTITLES_START,
			SUBTITLES_ABORT,
			SUBTITLES_CLEAN,
			SUBTITLES_CREATE,
			SUBTITLES_ERROR,
			SUBTITLES_GET,
			SUBTITLES_UPDATE,
			ACTIVE_UPDATE,
			SET_CONTENT_ID,
		} = this.types

		switch (action.type) {

		case SUBTITLES_START:
			return {
				...store,
				loading: true,
			}

		case SUBTITLES_ABORT:
			return {
				...store,
				errorMessage: ``,
				loading: false,
			}

		case SUBTITLES_CLEAN:
			return {
				...store,
				errorMessage: ``,
				cache: [],
				contentId: ``,
			}

		case SUBTITLES_CREATE:
			return {
				...store,
				cache: {
					...store.cache,
					...action.payload.subtitles,
				},
				errorMessage: ``,
				loading: false,
			}

		case SUBTITLES_ERROR:
			// alert(`${action.payload.error.response.data}. Status: ${action.payload.error.response.status}`)
			return {
				...store,
				errorMessage: `${action.payload.error.response.data}. Status: ${action.payload.error.response.status}`,
				loading: false,
			}

		case SUBTITLES_GET:
			// console.log(`??//`,action.payload)
			return {
				...store,
				cache: action.payload.subtitles,
				contentId: action.payload.id,
				errorMessage: ``,
				loading: false,
				lastFetched: Date.now(),
			}

		case SUBTITLES_UPDATE:
			return {
				...store,
				cache:action.payload.subtitles,
				errorMessage: ``,
				loading: false,
			}
		case ACTIVE_UPDATE:
			return {
				...store,
				active: action.payload.active,
				errorMessage: ``,
			}
		case SET_CONTENT_ID:
			return{
				...store,
				contentId: action.payload.id,
				errorMessage: ``,
			}
		default:
			return store
		}
	}
	setSubtitles = (content) => async (dispatch, getState, { apiProxy }) => {
		// console.log('updated content1', content)

		try {
			// TODO: Why doesn't this update to state cause it to rerender?
			// dispatch(this.actions.contentCreate(data))

			dispatch(this.actions.subtitlesUpdate(content))
		} catch (error) {
			dispatch(this.actions.subtitlesError(error))
		}

	}

	getSubtitles = (id, force = false) => async (dispatch, getState, { apiProxy }) => {
		// console.log('updated store', contentIds)
		const currentContentId = getState().subtitlesStore.contentId

		// console.log(`USED SESSION ID`, window.clj_session_id)

		dispatch(this.actions.subtitlesStart())

		if(currentContentId !== id)
			dispatch(this.actions.subtitlesClean())

		try {
			const result = await apiProxy.content.getSubtitles(id)
			dispatch(this.actions.subtitlesGet(result, id))
			return result
		} catch (error) {
			console.error(error.message)
			dispatch(this.actions.subtitlesError(error))
			return[]
		}

	}

	createSubtitle = (subtitle) => async (dispatch, getState, { apiProxy }) => {

		// dispatch(this.actions.subtitlesStart())

		try {
			const tempSub = {}
			tempSub[`content`] = JSON.stringify(subtitle[`content`])
			tempSub[`language`] = subtitle[`language`]
			tempSub[`title`] = subtitle[`title`]
			tempSub[`content-id`] = subtitle[`content-id`]
			tempSub[`content`] = JSON.stringify(subtitle[`content`])
			tempSub[`words`] = ``
			const result = await apiProxy.subtitles.post(tempSub)
			// TODO: Why doesn't this update to state cause it to rerender?
			// dispatch(this.actions.contentCreate(data))

			// dispatch(this.actions.subtitlesAbort())
			return result
		} catch (error) {
			dispatch(this.actions.subtitlesError(error))
		}
	}

	updateSubtitle = subtitle => async (dispatch, _getState, { apiProxy }) => {
		dispatch(this.actions.subtitlesStart())

		try {
			const tempSub = {}
			if(typeof subtitle[`content`] !== `string`)
				tempSub[`content`] = JSON.stringify(subtitle[`content`])
			else
				tempSub[`content`] = subtitle[`content`]

			tempSub[`language`] = subtitle[`language`]
			tempSub[`title`] = subtitle[`title`]
			tempSub[`content-id`] = subtitle[`content-id`]
			tempSub[`words`] = subtitle[`words`]

			await apiProxy.subtitles.edit(tempSub,subtitle[`id`])
		} catch (error) {
			dispatch(this.actions.subtitlesError(error))
		}
	}

	activeUpdate = active => async (dispatch, _getState, { apiProxy }) => {
		dispatch(this.actions.activeUpdate(active))
	}
	setContentId = id => async(dispatch,getState, {apiProxy}) => {
		dispatch(this.actions.setContentId(id))
	}
	deleteSubtitle = (ids) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.subtitlesStart())

		try {
			await apiProxy.subtitles.delete(ids)
			// console.log(result.data)

			// TODO: Why doesn't this update to state cause it to rerender?
			// dispatch(this.actions.contentCreate(data))

			dispatch(this.actions.subtitlesAbort())
		} catch (error) {
			dispatch(this.actions.subtitlesError(error))
		}
	}
}
