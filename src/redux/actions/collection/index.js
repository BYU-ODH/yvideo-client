import { ABORT_COLLECTIONS, ERROR_COLLECTIONS, START_COLLECTIONS, UPDATE_COLLECTIONS } from 'redux/actions/types'

import axios from 'axios'

const { REACT_APP_STALE_TIME, REACT_APP_YVIDEO_SERVER } = process.env

export const getCollections = (authorized = false, force = false) => {
	return async (dispatch, getState) => {

		const time = Date.now() - getState().collectionsCache.lastFetched

		const stale = time >= REACT_APP_STALE_TIME

		if (stale || force) {
			dispatch({ type: START_COLLECTIONS })

			const results = await axios(`${REACT_APP_YVIDEO_SERVER}/api/user/${authorized ? `privilegedCollections` : `collections`}`, { withCredentials: true })
				.catch(err => dispatch({ type: ERROR_COLLECTIONS, error: err }))

			const data = results.data.reduce((map, item) => {
				map[item.id] = item
				return map
			}, {})

			dispatch({ type: UPDATE_COLLECTIONS, payload: data })

		} else dispatch({ type: ABORT_COLLECTIONS })
	}
}

export const updateCollectionName = (collectionId, collectionName) => {
	return async (dispatch, getState) => {
		dispatch({ type: START_COLLECTIONS })

		const currentState = getState().collectionsCache.collections[collectionId]

		console.group()
		console.warn(`Update Collection Name:`)
		console.warn(`collection name:`, collectionName)
		console.warn(`collection id:`, collectionId)
		console.groupEnd()

		currentState.name = collectionName

		await axios(`${REACT_APP_YVIDEO_SERVER}/collection/${collectionId}`, { method: `post`, data: { name: collectionName }, withCredentials: true })
			.catch(err => dispatch({ type: ERROR_COLLECTIONS, error: err }))

		console.warn(`About to update state:`, currentState)

		dispatch({ type: UPDATE_COLLECTIONS, payload: { [collectionId]: currentState } })

	}
}

export const updateCollectionStatus = (collectionId, action) => {
	return async (dispatch, getState) => {

		dispatch({ type: START_COLLECTIONS })

		const currentState = getState().collectionsCache.collections[collectionId]

		console.log(currentState)

		switch (action) {
		case `publish`:
			currentState.published = true
			break

		case `unpublish`:
			currentState.published = false
			break

		case `archive`:
			currentState.archived = true
			break

		case `unarchive`:
			currentState.published = false
			break

		default:
			break
		}

		await axios(`${REACT_APP_YVIDEO_SERVER}/collection/${collectionId}/${action}`, { withCredentials: true })
			.catch(err => dispatch({ type: ERROR_COLLECTIONS, error: err }))

		dispatch({ type: UPDATE_COLLECTIONS, payload: { [collectionId]: currentState } })
	}
}

