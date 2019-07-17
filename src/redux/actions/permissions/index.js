import { ABORT_PERMISSIONS, ERROR_PERMISSIONS, START_PERMISSIONS, UPDATE_PERMISSIONS } from './types'

import axios from 'axios'

const { REACT_APP_STALE_TIME, REACT_APP_YVIDEO_SERVER } = process.env

export const getCollectionPermissions = (collectionId, force = false) => {
	return async (dispatch, getState) => {

		const time = Date.now() - getState().collectionsCache.lastFetched

		const stale = time >= REACT_APP_STALE_TIME

		const { permissions } = getState().permissionsCache
		const cached = Object.keys(permissions).includes(collectionId)

		if (stale || !cached || force) {
			dispatch({ type: START_PERMISSIONS })

			const results = await axios(`${REACT_APP_YVIDEO_SERVER}/api/collection/${collectionId}/permissions`, { withCredentials: true })
				.catch(err => dispatch({ type: ERROR_PERMISSIONS, error: err }))

			console.log(`action creator`, results)

			// const data = results.data.reduce((map, item) => {
			// 	map[item.id] = item
			// 	return map
			// }, {})

			// dispatch({ type: UPDATE_PERMISSIONS, payload: data })

		} else dispatch({ type: ABORT_PERMISSIONS })
	}
}