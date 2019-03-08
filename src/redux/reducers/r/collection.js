import { GET_COLLECTIONS } from '../../actions/types'

const initUserPreview = []

export const collectionReducer = (state = initUserPreview, { type, payload }) => {
	switch (type) {
		case GET_COLLECTIONS:
			return payload

		default:
			return state
	}
}

export default collectionReducer