import { LOAD, LOADED } from '../../actions/types'

const initState = false

const loadReducer = (state = initState, action) => {
	switch (action.type) {
		case LOAD:
			return true

		case LOADED:
			return false

		default:
			return state
	}
}

export default loadReducer