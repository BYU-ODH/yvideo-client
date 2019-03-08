import { LOGIN, LOGOUT } from '../../actions/types'

const initState = false

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case LOGIN:
			return true

		case LOGOUT:
			return false

		default:
			return state
	}
}

export default authReducer