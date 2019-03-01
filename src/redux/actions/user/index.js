import { GET_USER_INFO, GET_COLL_PREVIEW, GET_COLL_RECENT } from './types'
import axios from 'axios'

export const getUserAuth = callback => {
	return async dispatch => {
		await axios(process.env.REACT_APP_YVIDEO_SERVER + '/api/user/auth', { withCredentials: true })
			.then(result => {
				const json = result.data
				dispatch({ type: GET_USER_INFO, payload: json })
				callback(json)
			}).catch(error => {
				console.error(error)
				const err = 'User is not logged in.'
				throw err
			})
	}
}

export const getCollectionPreview = callback => {
	return async dispatch => {
		await axios(process.env.REACT_APP_YVIDEO_SERVER + '/api/user/preview', { withCredentials: true })
			.then(result => {
				const json = result.data
				console.log(json)
				if (json.length > 0) dispatch({ type: GET_COLL_PREVIEW, payload: json })
				callback(json)
			})
			.catch(() => {
				const err = 'Could not load collection previews.'
				throw err
			})
	}
}

export const getCollectionRecent = callback => {
	return async dispatch => {
		await axios(process.env.REACT_APP_YVIDEO_SERVER + '/api/user/recent', { withCredentials: true })
			.then(result => {
				const json = result.data
				console.log(json)
				if (json.length > 0) dispatch({ type: GET_COLL_RECENT, payload: json })
				callback(json)
			})
			.catch(() => {
				const err = 'Could not load recent videos.'
				throw err
			})
	}
}