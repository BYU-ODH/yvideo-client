import {
	ABORT_CONTENT,
	ERROR_CONTENT,
	START_CONTENT,
	UPDATE_CONTENT
} from 'redux/actions/types'

const initState = {
	content: {},
	error: null,
	isFetching: false
}

export const contentReducer = (state = initState, { type, payload, error }) => {
	switch (type) {

		case ERROR_CONTENT:
			return {
				...state,
				error,
				isFetching: false
			}

		case START_CONTENT:
			return {
				...state,
				isFetching: true
			}

		case UPDATE_CONTENT:
			return {
				...state,
				content: {
					...state.content,
					...payload
				},
				error: null,
				isFetching: false
			}

		case ABORT_CONTENT:
		default:
			return state
	}
}
