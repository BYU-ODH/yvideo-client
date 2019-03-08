import { combineReducers } from 'redux'

import loadReducer from './r/load'
import authReducer from './r/auth'
import preloadReducer from './r/preload'
import menuReducer from './r/menu'
import lostReducer from './r/lost'
import { userReducer, userInfoReducer, userRecentReducer } from './r/user'
import collectionReducer from './r/collection'

const rootReducer = combineReducers({
	loading: loadReducer,
	done: preloadReducer,
	authorized: authReducer,
	menuActive: menuReducer,
	lost: lostReducer,
	user: userReducer,
	userAuth: userInfoReducer,
	recent: userRecentReducer,
	collections: collectionReducer
})

export default rootReducer