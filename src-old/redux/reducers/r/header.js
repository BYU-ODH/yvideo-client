import { TOGGLE_BORDER } from 'redux/actions/types'

const initState = false

export const headerReducer = (state = initState, { type }) => {
	switch (type) {
		case TOGGLE_BORDER:
			return !state

		default:
			return state
	}
}

export default headerReducer