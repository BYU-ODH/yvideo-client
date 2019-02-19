import { GET_USER_AUTH } from '../actions/types'

const initState = {
	userAuth: {}
}

const userReducer = (state = initState, action) => {
	switch (action.type) {
		case GET_USER_AUTH:
			return { ...state, userAuth: action.payload }

		default:
			return state
	}
}

export default userReducer