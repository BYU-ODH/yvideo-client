import { combineReducers } from 'redux'

import loadReducer from './loadReducer'
import authReducer from './authReducer'
import userReducer from './userReducer'
import preloadReducer from './preloadReducer'

const rootReducer = combineReducers({
	loading: loadReducer,
	done: preloadReducer,
	authorized: authReducer,
	userAuth: userReducer
})

export default rootReducer