import { ABORT_RESOURCES, ERROR_RESOURCES, START_RESOURCES, UPDATE_RESOURCES } from 'redux/actions/types'

const initState = {
	resources: {},
	error: null,
	isFetching: false,
	lastFetched: 0
}

export const resourceReducer = (state = initState, { type, payload, error }) => {
	switch (type) {

		case ERROR_RESOURCES:
			return {
				...state,
				error,
				isFetching: false
			}

		case START_RESOURCES:
			return {
				...state,
				isFetching: true
			}

		case UPDATE_RESOURCES:
			return {
				...state,
				resources: {
					...state.resources,
					[payload.id]: payload
				},
				error: null,
				isFetching: false,
				lastFetched: Date.now()
			}

		case ABORT_RESOURCES:
		default:
			return state
	}
}

export default resourceReducer