import { ABORT_RESOURCES, ERROR_RESOURCES, START_RESOURCES, UPDATE_RESOURCES } from './types'

import axios from 'axios'

const { REACT_APP_STALE_TIME, REACT_APP_RESOURCE_LIB } = process.env

export const getResources = (resourceId = null, callback = () => { }) => {
	return async (dispatch, getState) => {

		const { resources } = getState().resourceCache
		const cachedIds = Object.keys(resources)
		const cached = cachedIds.includes(resourceId)

		const stale = Date.now() - getState().resourceCache.lastFetched >= REACT_APP_STALE_TIME

		if (stale || !cached) {
			dispatch({ type: START_RESOURCES })

			const result = await axios(`${REACT_APP_RESOURCE_LIB}/resources/${resourceId}?${Date.now().toString(36)}`, { includeCredentials: true })
				.catch(err => dispatch({ type: ERROR_RESOURCES, payload: err }))

			const resource = result.data.resource
			resource.resources = {}
			resource.relations.forEach(item => resource.resources[item.type] = [])

			Promise.all(resource.relations.map(async item => {
				const result = await axios(`${REACT_APP_RESOURCE_LIB}/resources/${item.subjectId}?${Date.now().toString(36)}`, { includeCredentials: true })
				resource.resources[item.type].push(result.data.resource)
			}))

			dispatch({ type: UPDATE_RESOURCES, payload: resource })
			callback(resource)

		} else dispatch({ type: ABORT_RESOURCES })
	}
}

export const addResource = (resource, callback = () => { }) => {
	return async dispatch => {
		dispatch({ type: UPDATE_RESOURCES, payload: resource })
		callback(resource)
	}
}