import * as testutil from '../../testutil/testutil'
import AuthService from '../../../services/s/auth.redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import proxies from 'proxy'

describe(`content service test`, () => {

	let authServiceConstructor
	let store
	let dispatch
	let getState
	let apiProxy

	// reset store
	beforeEach(() => {
		authServiceConstructor = new AuthService()

		// TODO: good to fix: when getState().adminStore is used, this mock store has to have adminStore object,
		// is there any way to combine these duplicated stores?
		store = createStore(
			authServiceConstructor.reducer,
			{
				user: null,
				loading: true,
				message: ``,
				tried: false,
				authStore:{
					user: null,
					loading: true,
					message: ``,
					tried: false,
				},
			},
			composeWithDevTools(
				applyMiddleware(thunk.withExtraArgument(proxies)),
			),
		)
		dispatch = store.dispatch
		getState = store.getState
		apiProxy = proxies.apiProxy
	})

	// types
	it(`should return correct types`, ()=> {
		const types = authServiceConstructor.types

		expect(types.AUTH_START).toBe(`AUTH_START`)
		expect(types.AUTH_ABORT).toBe(`AUTH_ABORT`)
		expect(types.AUTH_CLEAN).toBe(`AUTH_CLEAN`)
		expect(types.AUTH_ERROR).toBe(`AUTH_ERROR`)
		expect(types.AUTH_GET).toBe(`AUTH_GET`)
	})

	// reducers and actions
	it(`authStart`, () => {
		const result = store.dispatch(authServiceConstructor.actions.authStart())
		expect(store.getState().loading).toBe(true)
		expect(result.type).toBe(`AUTH_START`)
	})

	it(`authAbort`, () => {
		const result = store.dispatch(authServiceConstructor.actions.authAbort())
		expect(store.getState().loading).toBe(false)
		expect(store.getState().tried).toBe(false)
		expect(store.getState().user).toEqual(null)
		expect(result.type).toBe(`AUTH_ABORT`)
	})

	it(`authError`, () => {
		const result = store.dispatch(authServiceConstructor.actions.authError({message: `AUTH_ERROR test error message`}))
		expect(store.getState().loading).toBe(false)
		expect(store.getState().tried).toBe(true)
		expect(store.getState().user).toEqual(null)
		expect(store.getState().message).toBe(`AUTH_ERROR test error message`)
		expect(result.type).toBe(`AUTH_ERROR`)
	})

	it(`authGet`, () => {
		const result = store.dispatch(authServiceConstructor.actions.authGet(testutil.user))
		expect(store.getState().loading).toBe(false)
		expect(store.getState().tried).toBe(true)
		expect(store.getState().user).toEqual(testutil.user)
		expect(result.type).toBe(`AUTH_GET`)
	})

	// thunk
	// TODO: need to figure out how to check actions to be called
	it(`checkAuth`, async() => {

		proxies.apiProxy.user.get = jest.fn()
		proxies.apiProxy.user.get.mockImplementationOnce(()=>{
			return Promise.resolve(testutil.user)
		})

		expect(store.getState().user).toEqual(null)
		await authServiceConstructor.checkAuth()(dispatch, getState, { apiProxy })
		expect(store.getState().user).toEqual(testutil.user)
	})

	it(`login`, async() => {
		proxies.apiProxy.auth.cas = jest.fn()
		proxies.apiProxy.auth.cas.mockImplementationOnce(()=>{
			return Promise.resolve()
		})

		await authServiceConstructor.login()(dispatch, getState, { apiProxy })
	})

	it(`logout`, async() => {
		proxies.apiProxy.auth.logout = jest.fn()
		proxies.apiProxy.auth.logout.mockImplementationOnce(()=>{
			return Promise.resolve()
		})

		await authServiceConstructor.logout()(dispatch, getState, { apiProxy })
	})

})