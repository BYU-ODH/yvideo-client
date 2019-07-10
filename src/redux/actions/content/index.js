import { ABORT_CONTENT, ERROR_CONTENT, START_CONTENT, UPDATE_CONTENT } from 'redux/actions/types'

import axios from 'axios'

const { REACT_APP_STALE_TIME, REACT_APP_YVIDEO_SERVER } = process.env

export const getContent = (contentIds = []) => {
	return async (dispatch, getState) => {
		const { content } = getState().contentCache
		const cachedIds = Object.keys(content).map(id => parseInt(id))
		const notCached = contentIds.filter(id => !cachedIds.includes(id))

		const stale = Date.now() - getState().resourceCache.lastFetched >= REACT_APP_STALE_TIME

		if (stale || notCached.length > 0) {
			dispatch({ type: START_CONTENT })

			const results = await Promise.all(notCached.map(id => axios(`${REACT_APP_YVIDEO_SERVER}/api/content/${id}`, { withCredentials: true })
				.then(result => result.data)
				.catch(err => dispatch({ type: ERROR_CONTENT, error: err }))))

			const data = results.reduce((map, item) => {
				map[item.id] = item
				return map
			}, {})

			dispatch({ type: UPDATE_CONTENT, payload: data })

		} else dispatch({ type: ABORT_CONTENT })
	}
}
