import { LOGIN, LOGOUT } from './types'

export const login = () => {
	return { type: LOGIN }
}

export const logout = () => {
	return { type: LOGOUT }
}
