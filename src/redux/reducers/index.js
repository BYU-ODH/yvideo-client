import { combineReducers } from 'redux'

import authReducer from './r/auth'
import collectionReducer from './r/collection'
import { menuReducer, loadReducer, doneReducer, lostReducer, onAdminReducer } from './r/interface'
import { userReducer, userInfoReducer, recentReducer } from './r/user'
import headerReducer from './r/header'

const rootReducer = combineReducers({
	authorized: authReducer,

	collections: collectionReducer,

	menuActive: menuReducer,
	loading: loadReducer,
	done: doneReducer,
	lost: lostReducer,
	onAdmin: onAdminReducer,

	user: userReducer,
	userInfo: userInfoReducer,
	recent: recentReducer,

	headerBorder: headerReducer
})

export default rootReducer