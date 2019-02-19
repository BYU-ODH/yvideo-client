import { GET_USER_AUTH } from './types'

import axios from 'axios'

export const getUserAuth = () => {
	return async (dispatch, getState) => {
		const result = await fetch(process.env.REACT_APP_YVIDEO_SERVER + '/api/user/auth', { credentials: 'include', mode: 'cors' })
		const response = await result.json()
		console.log(response)
		dispatch({ type: GET_USER_AUTH, payload: result })
	}
}