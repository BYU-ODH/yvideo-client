import { GET_COLLECTIONS, GET_COLLECTION } from 'redux/actions/types'

const initState = {
	collections: [],
	collection: {}
}

export const collectionsReducer = (state = initState.collections, { type, payload }) => {
	switch (type) {
		case GET_COLLECTIONS:
			return payload

		default:
			return state
	}
}

export const collectionReducer = (state = initState.collection, { type, payload }) => {
	switch (type) {
		case GET_COLLECTION:
			return payload

		default:
			return state
	}
}