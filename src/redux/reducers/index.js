import { combineReducers } from 'redux'

import loadReducer from './load'
import authReducer from './auth'
import preloadReducer from './preload'
import menuReducer from './menu'
import lostReducer from './lost'
import { userReducer, userInfoReducer, userPreviewReducer, userRecentReducer } from './user'

const rootReducer = combineReducers({
	loading: loadReducer,
	done: preloadReducer,
	authorized: authReducer,
	menuActive: menuReducer,
	lost: lostReducer,
	user: userReducer,
	userAuth: userInfoReducer,
	preview: userPreviewReducer,
	recent: userRecentReducer
})

export default rootReducer