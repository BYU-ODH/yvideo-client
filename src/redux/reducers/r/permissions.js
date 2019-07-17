import {
	ABORT_PERMISSIONS,
	ERROR_PERMISSIONS,
	START_PERMISSIONS,
	UPDATE_PERMISSIONS
} from 'redux/actions/types'

const initState = {
	permissions: {},
	error: null,
	isFetching: false,
	lastFetched: 0
}

export const permissionsReducer = (state = initState, { type, payload, error }) => {
	switch (type) {

		case ERROR_PERMISSIONS:
			return {
				...state,
				error,
				isFetching: false
			}

		case START_PERMISSIONS:
			return {
				...state,
				isFetching: true
			}

		case UPDATE_PERMISSIONS:
			return {
				...state,
				permissions: {
					...state.permissions,
					...payload
				},
				error: null,
				isFetching: false,
				lastFetched: Date.now()
			}

		case ABORT_PERMISSIONS:
		default:
			return state
	}
}