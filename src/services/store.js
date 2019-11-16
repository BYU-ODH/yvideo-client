import proxies from 'proxy'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { authService, collectionService, interfaceService } from 'services'

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
		interfaceStore: interfaceService.reducer,
		collectionStore: collectionService.reducer,
	}),

	// This is the initial state of the store
	{
		authStore: authService.store,
		interfaceStore: interfaceService.store,
		collectionStore: collectionService.store,
	},

	composeWithDevTools(
		applyMiddleware(thunk.withExtraArgument(proxies)),
	),
)

export default store