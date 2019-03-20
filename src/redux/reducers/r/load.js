import { LOAD, LOADED } from '../../actions/types'

const initState = false

const loadReducer = (state = initState, { type }) => {
	switch (type) {
		case LOAD:
			return true

		case LOADED:
			return false

		default:
			return state
	}
}

export default loadReducer