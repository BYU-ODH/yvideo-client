import { LOGIN, LOGOUT } from './types'

export const login = () => {
	return {
		type: LOGIN,
		payload: true
	}
}

export const logout = () => {
	return {
		type: LOGOUT,
		payload: false
	}
}
