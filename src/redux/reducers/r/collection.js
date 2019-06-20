import { GET_COLLECTIONS, GET_CONTENT, GET_PRIVILEGED_COLLECTIONS } from 'redux/actions/types'

const initState = {
	collections: [],
	content: {}
}

export const collectionsReducer = (state = initState.collections, { type, payload }) => {
	switch (type) {
		case GET_COLLECTIONS:
			return payload
		case GET_PRIVILEGED_COLLECTIONS:
			return payload
		default:
			return state
	}
}

export const contentReducer = (state = initState.content, { type, payload }) => {
	switch (type) {
		case GET_CONTENT:
			return payload
		default:
			return state
	}
}
