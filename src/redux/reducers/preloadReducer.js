import { READY, DONE } from '../actions/types'

const initState = false

const preloadReducer = (state = initState, action) => {
	switch (action.type) {
		case DONE:
			return true

		case READY:
			return false

		default:
			return state
	}
}

export default preloadReducer