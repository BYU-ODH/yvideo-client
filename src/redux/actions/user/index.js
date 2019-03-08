import { GET_USER, GET_USER_INFO, GET_RECENT } from './types'
import axios from 'axios'
import { cookies } from '../../../util'

export const getUser = callback => {
	return async dispatch => {
		await axios(process.env.REACT_APP_YVIDEO_SERVER + `/api/user`, { withCredentials: true })
			.then(result => {
				const json = result.data
				dispatch({ type: GET_USER, payload: json })
				typeof callback === `function` && callback(json)
			}).catch(error => {
				console.error(error)
				cookies.delete(`auth`)
				const err = `User is not logged in.`
				throw err
			})
	}
}

export const getUserAuth = callback => {
	return async dispatch => {
		await axios(process.env.REACT_APP_YVIDEO_SERVER + `/api/user/auth`, { withCredentials: true })
			.then(result => {
				const json = result.data
				dispatch({ type: GET_USER_INFO, payload: json })
				typeof callback === `function` && callback(json)
			}).catch(error => {
				console.error(error)
				cookies.delete(`auth`)
				const err = `User is not logged in.`
				throw err
			})
	}
}

export const getRecent = callback => {
	return async dispatch => {
		await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/user/recent`, { withCredentials: true })
			.then(result => {
				const json = result.data
				if (json.length > 0) dispatch({ type: GET_RECENT, payload: json })
				typeof callback === `function` && callback(json)
			})
			.catch(() => {
				const err = `Could not load recent videos.`
				throw err
			})
	}
}