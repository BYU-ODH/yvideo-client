export default class UserService {

	// types

	types = {
		USER_START: `USER_START`,
		USER_ABORT: `USER_ABORT`,
		USER_CLEAN: `USER_CLEAN`,
		USER_ERROR: `USER_ERROR`,
		USER_GET: `USER_GET`,
	}

	// action creators

	actions = {
		userStart: () => ({ type: this.types.USER_START }),
		userAbort: () => ({ type: this.types.USER_ABORT }),
		userError: ({ message }) => ({
			type: this.types.USER_ERROR,
			payload: { message },
		}),
		userGet: user => ({
			type: this.types.USER_GET,
			payload: { user },
		}),
	}

	// default store

	store = {
		user: null,
		loading: true,
		message: ``,
		tried: false,
	}

	// reducer

	reducer = (store = this.store, { type, payload }) => {
		switch (type) {

		case this.types.USER_START:
			return {
				...store,
				loading: true,
			}

		case this.types.USER_ERROR:
			console.error(payload.message)
			return {
				...store,
				user: null,
				loading: false,
				message: payload.message,
				tried: true,
			}

		case this.types.USER_ABORT:
			return {
				...store,
				user: null,
				loading: false,
				tried: false,
			}

		case this.types.USER_GET:
			return {
				...store,
				user: payload.user,
				loading: false,
				tried: true,
			}

		default:
			return store
		}
	}

	// thunks

	getUser = () => async (dispatch, _getState, { apiProxy }) => {
		dispatch(this.actions.userStart())
		try {
			const user = await apiProxy.user.get()
			dispatch(this.actions.userGet(user))
		} catch (error) {
			dispatch(this.actions.userError(error))
		}
	}

}
