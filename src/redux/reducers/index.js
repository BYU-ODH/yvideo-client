import { combineReducers } from 'redux'

import loadReducer from './loadReducer'
import authReducer from './authReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
	load: loadReducer,
	auth: authReducer,
	user: userReducer
})

export default rootReducer