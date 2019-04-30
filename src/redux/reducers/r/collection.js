import { GET_COLLECTIONS } from '../../actions/types'

const initState = []

export const collectionReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case GET_COLLECTIONS:
			return payload

		default:
			return state
	}
}

export default collectionReducer