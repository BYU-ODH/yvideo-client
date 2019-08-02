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

			const { data = {} } = results

			dispatch({ type: UPDATE_PERMISSIONS, payload: { [collectionId]: data } })

		} else dispatch({ type: ABORT_PERMISSIONS })
	}
}

export const updateCollectionPermissions = (body, endpoint, collectionId) => {
	return async (dispatch, getState) => {

		dispatch({ type: START_PERMISSIONS })

		const results = await axios(`${REACT_APP_YVIDEO_SERVER}/collection/${collectionId}/${endpoint}`, {
			method: `POST`,
			data: JSON.stringify(body),
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`
			}
		}).catch(err => dispatch({ type: ERROR_PERMISSIONS, error: err }))

		const { data = {} } = results

		const newPermissions = getState().permissionsCache.permissions[collectionId]

		switch (endpoint) {

			case `linkCourses`:
				newPermissions.courses = [...newPermissions.courses, data[0]]
				break
			case `addTA`:
				newPermissions.admins = [...newPermissions.admins, data]
				newPermissions.exceptions = [...newPermissions.exceptions, data]
				break
			case `addException`:
				newPermissions.exceptions = [...newPermissions.exceptions, data]
				break

			case `unlinkCourses`:
				newPermissions.courses = newPermissions.courses.filter(item => item.id !== body[0].id)
				break
			case `removeTA`:
				newPermissions.admins = newPermissions.admins.filter(item => item.username !== body)
				newPermissions.exceptions = newPermissions.exceptions.filter(item => item.username !== body)
				break
			case `removeException`:
				newPermissions.exceptions = newPermissions.exceptions.filter(item => item.username !== body)
				break

			default:
				break
		}

		dispatch({ type: UPDATE_PERMISSIONS, payload: { [collectionId]: newPermissions } })
	}
}