import { combineReducers } from 'redux'

import authReducer from './r/auth'
import { collectionReducer, collectionsReducer } from './r/collection'
import { menuReducer, loadReducer, doneReducer, lostReducer, onAdminReducer, editReducer } from './r/interface'
import { userReducer, userInfoReducer, recentReducer } from './r/user'
import { resourceReducer } from './r/resource'

const rootReducer = combineReducers({
	authorized: authReducer,

	collections: collectionsReducer,
	collection: collectionReducer,

	menuActive: menuReducer,
	loading: loadReducer,
	done: doneReducer,
	lost: lostReducer,
	onAdmin: onAdminReducer,

	user: userReducer,
	userInfo: userInfoReducer,
	recent: recentReducer,

	editMode: editReducer,

	resource: resourceReducer
})

export default rootReducer