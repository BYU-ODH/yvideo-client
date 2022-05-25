export default class AuthService {

	// types

	types = {
		AUTH_START: `AUTH_START`,
		AUTH_ABORT: `AUTH_ABORT`,
		AUTH_CLEAN: `AUTH_CLEAN`,
		AUTH_ERROR: `AUTH_ERROR`,
		AUTH_GET: `AUTH_GET`,
		AUTH_HAS_COLLECTION_PERMISSIONS: `AUTH_HAS_COLLECTION_PERMISSIONS`,
	}

	// action creators

	actions = {
		authStart: () => ({ type: this.types.AUTH_START }),
		authAbort: () => ({ type: this.types.AUTH_ABORT }),
		authError: ({ message }) => ({
			type: this.types.AUTH_ERROR,
			payload: { message },
		}),
		authGet: user => ({
			type: this.types.AUTH_GET,
			payload: { user },
		}),
		authHasCollectionPermissions: permissions => ({
			type: this.types.AUTH_HAS_COLLECTION_PERMISSIONS,
			payload: { permissions }
		})
	}

	// default store

	store = {
		user: null,
		loading: true,
		message: ``,
		tried: false,
		permissions: false,
	}

	// reducer

	reducer = (store = this.store, { type, payload }) => {
		switch (type) {

		case this.types.AUTH_START:
			return {
				...store,
				loading: true,
			}

		case this.types.AUTH_ERROR:
			console.error(payload.message)
			return {
				...store,
				user: null,
				loading: false,
				message: payload.message,
				tried: true,
			}

		case this.types.AUTH_ABORT:
			return {
				...store,
				user: null,
				loading: false,
				tried: false,
			}

		case this.types.AUTH_GET:
			return {
				...store,
				user: payload.user,
				loading: false,
				tried: true,
			}

		case this.types.AUTH_UPDATE_LANDING_STATUS:
			return{
				...store,
				loading: payload,
			}

		case this.types.AUTH_HAS_COLLECTION_PERMISSIONS:
			return{
				...store,
				permissions: payload.permissions,
			}

		default:
			return store
		}
	}

	// thunks

	/**
	 * Tries to get the current user from the API. If unsuccessful, we know the user isn't logged in.
	 */
	checkAuth = () => async (dispatch, getState, { apiProxy }) => {
		dispatch(this.actions.authStart())
		try {
			let user
			if(window.location.href.includes(`localhost`))
				user = await apiProxy.user.get()

			if(window.clj_session_id !== `{{ session-id }}`){
				// we got a valid session id so user should login automatically
				user = await apiProxy.user.get()
			}

			dispatch(this.actions.authGet(user))
		} catch (error) {
			dispatch(this.actions.authError(error))
		}
	}

	checkHasCollectionPermissions = (username) => async (dispatch, getState, { apiProxy }) => {
		try {
			console.log("check call.. ", username)
			const result = await apiProxy.user.getHasPermissions(username)
			// console.log('has collection permissions result: ', result)
			console.log("check call.. ", result)
			dispatch(this.actions.authHasCollectionPermissions(result))
		}
		catch(error){
			dispatch(this.actions.authError(error))
		}
	}

	/**
	 * Redirects to the BYU CAS Login page
	 */
	login = () => async (_dispatch, _getState, { apiProxy }) => {
		apiProxy.auth.cas()
	}

	/**
	 * Redirects to the BYU CAS Logout page
	 */
	logout = () => async (_dispatch, _getState, { apiProxy }) => {
		apiProxy.auth.logout()
	}

}
