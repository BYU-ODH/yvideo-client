export default class AuthenticationService {

	// types
	types = {
		LOGIN: `LOGIN`,
		LOGOUT: `LOGOUT`,
	}

	// default store
	store = {
		authenticated: false,
	}

	// reducer
	reducer = (store = this.store, action) => {
		switch (action.type) {
		case this.types.LOGIN:
			return {
				...store,
				authenticated: true,
			}

		case this.types.LOGOUT:
			return {
				...store,
				authenticated: false,
			}

		default:
			return store
		}
	}

	// thunk actions

}
