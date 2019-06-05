import { GET_RESOURCE } from 'redux/actions/types'

const initState = {}

export const resourceReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case GET_RESOURCE:
			return payload

		default:
			return state
	}
}

export default resourceReducer