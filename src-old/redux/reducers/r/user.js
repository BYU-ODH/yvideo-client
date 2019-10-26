import { GET_USER, GET_USER_INFO, GET_RECENT } from 'redux/actions/types'

const initState = {
	user: {},
	userInfo: {},
	recent: []
}

export const userReducer = (state = initState.user, { type, payload }) => {
	if (type === GET_USER) return payload
	return state
}

export const userInfoReducer = (state = initState.userInfo, { type, payload }) => {
	if (type === GET_USER_INFO) return payload
	return state
}

export const recentReducer = (state = initState.recent, { type, payload }) => {
	if (type === GET_RECENT) return payload
	return state
}