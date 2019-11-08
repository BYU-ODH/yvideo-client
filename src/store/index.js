import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {
	authService,
	userService,
	interfaceService,
} from 'services'

import proxies from 'proxy'

// Use this const to change the settings in Redux Dev Tools. Set
// the options here, and then replace `composeWithDevTools` with
// `composeEnhancers` down below.

// const composeEnhancers = composeWithDevTools({
// 	trace: true,
// })

const store = createStore(

	// This is what the store looks like
	combineReducers({
		authStore: authService.reducer,
		userStore: userService.reducer,
		interfaceStore: interfaceService.reducer,
	}),

	// This is the initial state of the store
	{
		authStore: authService.store,
		userStore: userService.store,
		interfaceStore: interfaceService.store,
	},

	composeWithDevTools(
		applyMiddleware(thunk.withExtraArgument(proxies)),
	),
)

export default store