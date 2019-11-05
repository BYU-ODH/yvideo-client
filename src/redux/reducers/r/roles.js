import {
	ABORT_ROLES,
	ERROR_ROLES,
	START_ROLES,
	UPDATE_ROLES
} from 'redux/actions/types'

const initState = {
	roles: {},
	error: null,
	isFetching: false,
	lastFetched: 0
}

export const rolesReducer = (state = initState, { type, payload, error }) => {
	switch (type) {

	case ERROR_ROLES:
		return {
			...state,
			error,
			isFetching: false
		}

	case START_ROLES:
		return {
			...state,
			isFetching: true
		}

	case UPDATE_ROLES:
		return {
			...state,
			roles: {
				...state.roles,
				...payload
			},
			error: null,
			isFetching: false,
			lastFetched: Date.now()
		}

	case ABORT_ROLES:
	default:
		return state
	}
}