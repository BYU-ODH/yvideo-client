import * as testutil from '../../testutil/testutil'
import LanguageService from '../../../services/s/language.redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import proxies from 'proxy'

const lang1 = testutil.lang1

describe(`language service test`, () => {

	let languageServiceConstructor
	let store
	let dispatch
	let getState
	let apiProxy

	// reset store
	beforeEach(() => {
		languageServiceConstructor = new LanguageService()

		store = createStore(
			languageServiceConstructor.reducer,
			{
				cache: {},
				languageStore: {
					cache: {
					},
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
		const types = languageServiceConstructor.types

		expect(types.LANGUAGE_START).toBe(`LANGUAGE_START`)
		expect(types.LANGUAGE_ABORT).toBe(`LANGUAGE_ABORT`)
		expect(types.LANGUAGE_CLEAN).toBe(`LANGUAGE_CLEAN`)
		expect(types.LANGUAGE_ERROR).toBe(`LANGUAGE_ERROR`)
		expect(types.LANGUAGE_POST).toBe(`LANGUAGE_POST`)
		expect(types.LANGUAGE_GET).toBe(`LANGUAGE_GET`)
	})

	// reducers and actions
	it(`languageStart`, () => {
		const result = store.dispatch(languageServiceConstructor.actions.languageStart())
		expect(result.type).toBe(`LANGUAGE_START`)
	})

	it(`languageAbort`, () => {
		const result = store.dispatch(languageServiceConstructor.actions.languageAbort())
		expect(result.type).toBe(`LANGUAGE_ABORT`)
	})

	it(`languageClean`, () => {
		const result = store.dispatch(languageServiceConstructor.actions.languageClean())
		expect(result.type).toBe(`LANGUAGE_CLEAN`)
	})

	it(`languageError`, () => {

		console.error = jest.fn() // eslint-disable-line no-console
		const result = store.dispatch(languageServiceConstructor.actions.languageError(`test error message`))
		expect(result.type).toBe(`LANGUAGE_ERROR`)

		expect(console.error).toBeCalled() // eslint-disable-line no-console
		expect(result.payload.error).toBe(`test error message`)
	})

	it(`languagePost`, () => {
		const result = store.dispatch(languageServiceConstructor.actions.languagePost(lang1))
		expect(result.type).toBe(`LANGUAGE_POST`)
	})

	it(`languageGet`, () => {
		const result = store.dispatch(languageServiceConstructor.actions.languageGet(lang1))
		expect(result.type).toBe(`LANGUAGE_GET`)
	})

	// thunk
	// TODO: need to fix the actual thunk and check this again
	it(`post`, async() => {

		proxies.apiProxy.language.post = jest.fn()
		proxies.apiProxy.language.post.mockImplementationOnce(()=>{
			return Promise.resolve(lang1)
		})

		expect(store.getState().cache).toEqual({})
		await languageServiceConstructor.post(lang1)(dispatch, getState, { apiProxy })
		expect(store.getState().cache).toEqual({[lang1]: {name: {name: lang1.name}}})
	})

	// TODO: check this again later since it is not using anywhere yet.
	it(`delete`, async() => {

		proxies.apiProxy.language.post = jest.fn()
		proxies.apiProxy.language.post.mockImplementationOnce(()=>{
			return Promise.resolve(lang1)
		})

		proxies.apiProxy.language.delete = jest.fn()
		proxies.apiProxy.language.delete.mockImplementationOnce(()=>{
			return Promise.resolve(lang1)
		})

		// insert lang before deleting
		await languageServiceConstructor.post(lang1)(dispatch, getState, { apiProxy })

		await languageServiceConstructor.delete(lang1.name)(dispatch, getState, { apiProxy })
	})

	it(`get`, async() => {

		proxies.apiProxy.language.get = jest.fn()
		proxies.apiProxy.language.get.mockImplementationOnce(()=>{
			return Promise.resolve(lang1)
		})

		expect(store.getState().cache.langs).toEqual(undefined)
		await languageServiceConstructor.get()(dispatch, getState, { apiProxy })
		expect(store.getState().cache.langs).toEqual(lang1)
	})

})