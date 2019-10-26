import {
	ABORT_COLLECTIONS,
	ERROR_COLLECTIONS,
	START_COLLECTIONS,
	UPDATE_COLLECTIONS
} from 'redux/actions/types'

const initState = {
	collections: {},
	error: null,
	isFetching: false,
	lastFetched: 0
}

export const collectionsReducer = (state = initState, { type, payload, error }) => {
	switch (type) {

		case ERROR_COLLECTIONS:
			return {
				...state,
				error,
				isFetching: false
			}

		case START_COLLECTIONS:
			return {
				...state,
				isFetching: true
			}

		case UPDATE_COLLECTIONS:
			return {
				...state,
				collections: {
					...state.collections,
					...payload
				},
				error: null,
				isFetching: false,
				lastFetched: Date.now()
			}

		case ABORT_COLLECTIONS:
		default:
			return state
	}
}