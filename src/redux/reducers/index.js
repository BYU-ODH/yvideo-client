import { combineReducers } from 'redux'

import { userReducer, userInfoReducer, recentReducer } from './r/user'
import authReducer from './r/auth'

import { collectionsReducer } from './r/collection'
import { resourceReducer } from './r/resource'
import { contentReducer } from './r/content'

import { menuReducer, loadReducer, doneReducer, lostReducer, onAdminReducer, editReducer, modalReducer } from './r/interface'

const rootReducer = combineReducers({
	authorized: authReducer,

	collectionsCache: collectionsReducer,
	contentCache: contentReducer,
	resourceCache: resourceReducer,

	menuActive: menuReducer,

	modal: modalReducer,

	loading: loadReducer,
	done: doneReducer,
	lost: lostReducer,
	onAdmin: onAdminReducer,

	user: userReducer,
	userInfo: userInfoReducer,
	recent: recentReducer,

	editMode: editReducer
})

export default rootReducer