import { LOST, FOUND } from '../../actions/types'

const initialState = false

export default (state = initialState, { type }) => {
	switch (type) {

		case LOST:
			return true

		case FOUND:
			return false

		default:
			return state
	}
}
