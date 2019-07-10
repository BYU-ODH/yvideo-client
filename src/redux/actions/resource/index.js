import { ABORT_RESOURCES, ERROR_RESOURCES, START_RESOURCES, UPDATE_RESOURCES } from './types'

import axios from 'axios'

const { REACT_APP_STALE_TIME, REACT_APP_RESOURCE_LIB } = process.env

export const getResources = (collection = null) => {
	return async (dispatch, getState) => {

		const stale = Date.now() - getState().resourceCache.lastFetched >= REACT_APP_STALE_TIME

		if (stale) {
			dispatch({ type: START_RESOURCES })

			const result = await axios(`${REACT_APP_RESOURCE_LIB}/resources/${collection.resourceId}?${Date.now().toString(36)}`, { includeCredentials: true })
				.catch(err => dispatch({ type: ERROR_RESOURCES, payload: err }))

			collection.resource = result.data.resource
			collection.resource.resources = {}
			collection.resource.relations.forEach(item => collection.resource.resources[item.type] = [])

			Promise.all(collection.resource.relations.map(async item => {
				const result = await axios(`${REACT_APP_RESOURCE_LIB}/resources/${item.subjectId}?${Date.now().toString(36)}`, { includeCredentials: true })
				collection.resource.resources[item.type].push(result.data.resource)
			}))

			dispatch({ type: UPDATE_RESOURCES, payload: collection })

		} else dispatch({ type: ABORT_RESOURCES })
	}
}