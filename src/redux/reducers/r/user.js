import { GET_USER, GET_USER_INFO, GET_RECENT } from '../../actions/types'

const initUser = {}

export const userReducer = (state = initUser, { type, payload }) => {
	switch (type) {
		case GET_USER:
			return payload

		default:
			return state
	}
}

const initUserInfo = {}

export const userInfoReducer = (state = initUserInfo, { type, payload }) => {
	switch (type) {
		case GET_USER_INFO:
			return payload

		default:
			return state
	}
}

const initUserRecent = []

export const userRecentReducer = (state = initUserRecent, { type, payload }) => {
	switch (type) {
		case GET_RECENT:
			return payload

		default:
			return state
	}
}
