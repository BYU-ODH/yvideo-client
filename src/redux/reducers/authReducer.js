import { LOGIN, LOGOUT } from '../actions/types'

const initState = {
	authorized: false
}

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case LOGIN:
			return { ...state, authorized: action.payload }

		case LOGOUT:
			return { ...state, authorized: action.payload }

		default:
			return state
	}
}

export default authReducer