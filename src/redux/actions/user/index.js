import { GET_USER, GET_USER_INFO, GET_RECENT } from './types'
import axios from 'axios'
import { cookies } from 'js/util'

// TODO: add functionality to ALL actions to handle 403 and 401, deleting auth cookie if any request returns that

export const getUser = callback => {
	return async dispatch => {
		await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/user`, { withCredentials: true })
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

export const getUserInfo = callback => {
	return async dispatch => {
		await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/user`, { withCredentials: true })
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
				const err = `Could not load recent videos. Displaying fillers.`
				if (json.length > 0) dispatch({ type: GET_RECENT, payload: json })
				else throw err
				typeof callback === `function` && callback(json)
			})
			.catch(err => {
				dispatch({ type: GET_RECENT, payload: fakedata })
				throw err
			})
	}
}

const fakedata = [
	{
		contentId: 0,
		thumbnail: ``,
		name: `video 1.1`,
		collection: `test`
	},
	{
		contentId: 1,
		thumbnail: ``,
		name: `video 2.1`,
		collection: `test2`
	},
	{
		contentId: 2,
		thumbnail: ``,
		name: `video 2.2`,
		collection: `test2`
	},
	{
		contentId: 3,
		thumbnail: ``,
		name: `video 3.1`,
		collection: `test3`
	},
	{
		contentId: 4,
		thumbnail: ``,
		name: `video 4.1`,
		collection: `test4`
	},
	{
		contentId: 5,
		thumbnail: ``,
		name: `video 5.1`,
		collection: `test5`
	}
]