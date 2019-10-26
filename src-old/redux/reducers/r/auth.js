import { LOGIN, LOGOUT } from 'redux/actions/types'

const initState = false

const authReducer = (state = initState, { type }) => {
	switch (type) {
	case LOGIN:
		return true

	case LOGOUT:
		return false

	default:
		return state
	}
}

export default authReducer