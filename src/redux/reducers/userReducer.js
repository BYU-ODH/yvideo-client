import { GET_USER_AUTH } from '../actions/types'

const initState = {}

const userReducer = (state = initState, action) => {
	switch (action.type) {
		case GET_USER_AUTH:
			return action.payload

		default:
			return state
	}
}

export default userReducer