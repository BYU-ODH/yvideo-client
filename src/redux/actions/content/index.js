import { ABORT_CONTENT, ERROR_CONTENT, START_CONTENT, UPDATE_CONTENT } from 'redux/actions/types'

import axios from 'axios'

const { REACT_APP_STALE_TIME, REACT_APP_YVIDEO_SERVER } = process.env

export const getContent = (contentIds = [], force = false) => {
	return async (dispatch, getState) => {
		const { content } = getState().contentCache
		const cachedIds = Object.keys(content).map(id => parseInt(id))
		const notCached = contentIds.filter(id => !cachedIds.includes(id))

		const stale = Date.now() - getState().resourceCache.lastFetched >= REACT_APP_STALE_TIME

		if (stale || notCached.length > 0 || force) {
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

export const abortGetContent = () => {
	return dispatch => {
		dispatch({ type: ABORT_CONTENT })
	}
}

export const updateContent = content => {
	return async dispatch => {

		// delete these once you fix it
		if (content === undefined) {
			dispatch({ type: ABORT_CONTENT })
			return
		} else if (content.resource === undefined) {
			dispatch({ type: ABORT_CONTENT })
			return
		}

		const { id, published } = content

		const {
			title,
			description,
			keywords
		} = content.resource

		const {
			captionTrack,
			annotationDocument,
			targetLanguages,
			aspectRatio,
			showCaptions,
			showAnnotations,
			allowDefinitions,
			showTranscripts,
			showWordList
		} = content.settings

		const settings = {
			captionTrack,
			annotationDocument,
			targetLanguages,
			aspectRatio,
			showCaptions,
			showAnnotations,
			allowDefinitions,
			showTranscripts,
			showWordList
		}

		const metadata = {
			title,
			description,
			keywords,
			published
		}

		// const settingsResult =
		await axios(`${REACT_APP_YVIDEO_SERVER}/content/${id}/settings`, {
			method: `POST`,
			data: JSON.stringify(settings),
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`
			}
		})
			.catch(err => dispatch({ type: ERROR_CONTENT, error: err }))

		// const metaResult =
		await axios(`${REACT_APP_YVIDEO_SERVER}/content/${id}/metadata`, {
			method: `POST`,
			data: JSON.stringify(metadata),
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`
			}
		})
			.catch(err => dispatch({ type: ERROR_CONTENT, error: err }))

		// dispatch({ type: UPDATE_CONTENT, payload: content })

		// console.log(`settings`, settingsResult)
		// console.log(`meta`, metaResult)

	}
}