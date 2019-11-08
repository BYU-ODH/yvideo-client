export default class AuthService {

	// types

	types = {
		AUTH_START: `AUTH_START`,
		AUTH_ABORT: `AUTH_ABORT`,
		AUTH_ERROR: `AUTH_ERROR`,
		AUTH_LOGIN: `AUTH_LOGIN`,
		AUTH_LOGOUT: `AUTH_LOGOUT`,
	}

	// action creators

	actions = {
		authStart: () => ({ type: this.types.AUTH_START }),
		authAbort: () => ({ type: this.types.AUTH_ABORT }),
		authError: ({ message }) => ({
			type: this.types.AUTH_ERROR,
			payload: { message },
		}),
		authLogin: user => ({
			type: this.types.AUTH_LOGIN,
			payload: { user },
		}),
		authLogout: () => ({ type: this.types.AUTH_LOGOUT }),
	}

	// default store

	store = {
		user: null,
		loading: false,
		message: ``,
		tried: false,
	}

	// reducer

	reducer = (store = this.store, { type, payload }) => {
		switch (type) {

		case this.types.AUTH_START:
			return {
				...store,
				loading: false,
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

		case this.types.AUTH_LOGIN:
			return {
				...store,
				loading: false,
				user: payload.user,
				tried: true,
			}

		case this.types.AUTH_LOGOUT:
			return {
				...store,
				user: null,
				loading: false,
				message: `Logged out.`,
				tried: false,
			}

		default:
			return store
		}
	}

	// thunks

	login = () => async (dispatch, _getState, { apiProxy }) => {
		dispatch(this.actions.authStart())
		try {
			const user = await apiProxy.auth.cas()

			console.log(user)

			dispatch(this.actions.authLogin(user))
		} catch (error) {
			dispatch(this.actions.authError(error))
		}
	}

	logout = () => async (dispatch, _getState, { apiProxy }) => {
		dispatch(this.actions.authStart())
		try {
			await apiProxy.auth.logout()
			dispatch(this.actions.authLogout())
		} catch (error) {
			dispatch(this.actions.authError(error))
		}
	}

}
