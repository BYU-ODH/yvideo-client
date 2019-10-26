import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {
	userService,
	interfaceService,
} from 'services'

const store = createStore(

	// This is what the store looks like
	combineReducers({
		userStore: userService.reducer,
		interfaceStore: interfaceService.reducer,
	}),

	// This is the initial state of the store
	{
		userStore: userService.store,
		interfaceStore: interfaceService.store,
	},

	composeWithDevTools(
		applyMiddleware(thunk)
	)
)

export default store