import { ABORT_ROLES, ERROR_ROLES, START_ROLES, UPDATE_ROLES } from './types'

import axios from 'axios'

const { REACT_APP_STALE_TIME, REACT_APP_YVIDEO_SERVER } = process.env

export const getCollectionRoles = (collectionId, force = false) => {
	return async (dispatch, getState) => {

		const time = Date.now() - getState().collectionsCache.lastFetched

		const stale = time >= REACT_APP_STALE_TIME

		const { roles } = getState().rolesCache
		const cached = Object.keys(roles).includes(collectionId)

		if (stale || !cached || force) {
			dispatch({ type: START_ROLES })

			const results = await axios(`${REACT_APP_YVIDEO_SERVER}/api/collection/${collectionId}/roles`, { withCredentials: true })
				.catch(err => dispatch({ type: ERROR_ROLES, error: err }))

			const { data = {} } = results

			dispatch({ type: UPDATE_ROLES, payload: { [collectionId]: data } })

		} else dispatch({ type: ABORT_ROLES })
	}
}

export const updateCollectionRoles = (body, endpoint, collectionId) => {
	return async (dispatch, getState) => {

		dispatch({ type: START_ROLES })

		const results = await axios(`${REACT_APP_YVIDEO_SERVER}/collection/${collectionId}/${endpoint}`, {
			method: `POST`,
			data: JSON.stringify(body),
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`
			}
		}).catch(err => dispatch({ type: ERROR_ROLES, error: err }))

		const { data = {} } = results

		const newRoles = getState().rolesCache.roles[collectionId]

		switch (endpoint) {

		case `linkCourses`:
			newRoles.courses = [...newRoles.courses, data[0]]
			break
		case `addTA`:
			newRoles.admins = [...newRoles.admins, data]
			newRoles.exceptions = [...newRoles.exceptions, data]
			break
		case `addException`:
			newRoles.exceptions = [...newRoles.exceptions, data]
			break

		case `unlinkCourses`:
			newRoles.courses = newRoles.courses.filter(item => item.id !== body[0].id)
			break
		case `removeTA`:
			newRoles.admins = newRoles.admins.filter(item => item.username !== body)
			newRoles.exceptions = newRoles.exceptions.filter(item => item.username !== body)
			break
		case `removeException`:
			newRoles.exceptions = newRoles.exceptions.filter(item => item.username !== body)
			break

		default:
			break
		}

		dispatch({ type: UPDATE_ROLES, payload: { [collectionId]: newRoles } })
	}
}