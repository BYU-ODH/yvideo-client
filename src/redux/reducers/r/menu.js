import { TOGGLE_MENU } from '../../actions/types'

const initialState = false

const menuReducer = (state = initialState, action) => {
	switch (action.type) {

		case TOGGLE_MENU:
			return !state

		default:
			return state
	}
}

export default menuReducer