export default class LanguageService {

	// types

	types = {
		LANGUAGE_START: `LANGUAGE_START`,
		LANGUAGE_ABORT: `LANGUAGE_ABORT`,
		LANGUAGE_CLEAN: `LANGUAGE_CLEAN`,
		LANGUAGE_ERROR: `LANGUAGE_ERROR`,
		LANGUAGE_POST:	`LANGUAGE_POST`,
		LANGUAGE_GET:	`LANGUAGE_GET`,
	}

	// action creators

	actions = {
		languageStart: () => ({ type: this.types.LANGUAGE_START }),
		languageAbort: () => ({ type: this.types.LANGUAGE_ABORT }),
		languageClean: () => ({ type: this.types.LANGUAGE_CLEAN }),
		languageError: error => ({ type: this.types.LANGUAGE_ERROR, payload: { error } }),
		languagePost: lang => ({ type: this.types.LANGUAGE_POST, payload: { lang } }),
		languageGet: langs => ({ type: this.types.LANGUAGE_GET, payload: { langs } }),
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
			LANGUAGE_START,
			LANGUAGE_ABORT,
			LANGUAGE_CLEAN,
			LANGUAGE_ERROR,
			LANGUAGE_POST,
			LANGUAGE_GET,
		} = this.types

		switch (action.type) {

		case LANGUAGE_START:
			return {
				...store,
				loading: true,
			}

		case LANGUAGE_ABORT:
			return {
				...store,
				loading: false,
			}

		case LANGUAGE_CLEAN:
			return {
				...store,
				cache: {},
			}

		case LANGUAGE_ERROR:
			console.error(action.payload.error) // eslint-disable-line no-console
			return {
				...store,
				loading: false,
			}

		case LANGUAGE_POST:
			return {
				...store,
				cache: {
					...store.cache,
					[action.payload.lang]: {
						name: action.payload.lang,
					},
				},
				loading: false,
				lastFetched: Date.now(),
			}

		case LANGUAGE_GET:
			return {
				...store,
				cache: {
					langs: action.payload.langs,
				},
				loading: false,
				lastFetched: Date.now(),
			}

		default:
			return store
		}
	}

	// thunks

	post = (lang) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.languageStart())

		try {
			const result = await apiProxy.language.post(lang)

			dispatch(this.actions.languagePost(result))

		} catch (error) {
			dispatch(this.actions.languageError(error))
		}
	}

	delete = (lang) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.languageStart())

		try {
			// eslint-disable-next-line no-unused-vars
			const result = await apiProxy.language.delete(lang)

		} catch (error) {
			dispatch(this.actions.languageError(error))
		}
	}

	get = () => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.languageStart())

		try {
			const result = await apiProxy.language.get()

			dispatch(this.actions.languageGet(result))

		} catch (error) {
			dispatch(this.actions.languageError(error))
		}
	}
}