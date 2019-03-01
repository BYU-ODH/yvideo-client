import { GET_USER_AUTH } from './types'
import axios from 'axios'

export const getUserAuth = callback => {
	return async dispatch => {
		await axios(process.env.REACT_APP_YVIDEO_SERVER + '/api/user/auth', { withCredentials: true })
			.then(result => {
				const json = result.data.data
				dispatch({ type: GET_USER_AUTH, payload: json })
				callback(json)
			}).catch(() => {
				const err = 'User is not logged in.'
				throw err
			})
	}
}