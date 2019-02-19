import { LOAD, LOADED } from '../actions/types'

const initState = {
	loading: true
}

const loadReducer = (state = initState, action) => {
	switch (action.type) {
		case LOAD:
			return { ...state, loading: action.payload }

		case LOADED:
			return { ...state, loading: action.payload }

		default:
			return state
	}
}

export default loadReducer