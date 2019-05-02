import { LOGIN, LOGOUT } from './types'
import { cookies } from '../../../js/util'

export const login = () => {
	return async dispatch => {
		await cookies.set(`auth`, true, 30)
		dispatch({ type: LOGIN })
	}
}

export const logout = () => {
	return async dispatch => {
		await cookies.delete(`auth`)
		dispatch({ type: LOGIN })
	}
}

export const getAuthCookie = () => {
	return async dispatch => {
		if (await cookies.get(`auth`)) dispatch({ type: LOGIN })
		else dispatch({ type: LOGOUT })
	}
}