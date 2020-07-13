import * as testutil from '../../testutil/testutil'
import ResourcesService from '../../../services/s/resources.redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import proxies from 'proxy'

const resource = testutil.resource

const resources = testutil.resources

describe(`content service test`, () => {

	let resourcesServiceConstructor
	let store
	let dispatch
	let getState
	let apiProxy

	// reset store
	beforeEach(() => {
		resourcesServiceConstructor = new ResourcesService()

		// TODO: good to fix: when getState().adminStore is used, this mock store has to have adminStore object,
		// is there any way to combine these duplicated stores?
		store = createStore(
			resourcesServiceConstructor.reducer,
			{
				cache: {},
				loading: false,
				lastFetched: 0,
				resourceStore:{
					cache: {},
					loading: false,
					lastFetched: 0,
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
		const types = resourcesServiceConstructor.types

		expect(types.RESOURCE_START).toBe(`RESOURCE_START`)
		expect(types.RESOURCE_ABORT).toBe(`RESOURCE_ABORT`)
		expect(types.RESOURCE_CLEAN).toBe(`RESOURCE_CLEAN`)
		expect(types.RESOURCE_ERROR).toBe(`RESOURCE_ERROR`)
		expect(types.RESOURCE_GET).toBe(`RESOURCE_GET`)
	})

	// reducers and actions
	it(`resourcesStart`, () => {
		expect(store.getState().loading).toBe(false)
		const result = store.dispatch(resourcesServiceConstructor.actions.resourcesStart())
		expect(store.getState().loading).toBe(true)
		expect(result.type).toBe(`RESOURCE_START`)
	})

	it(`resourcesAbort`, () => {
		const result = store.dispatch(resourcesServiceConstructor.actions.resourcesAbort())
		expect(store.getState().loading).toBe(false)
		expect(result.type).toBe(`RESOURCE_ABORT`)
	})

	it(`resourcesClean`, () => {
		const result = store.dispatch(resourcesServiceConstructor.actions.resourcesClean())
		expect(store.getState().cache).toEqual({})
		expect(result.type).toBe(`RESOURCE_CLEAN`)
	})

	it(`resourcesError`, () => {
		const result = store.dispatch(resourcesServiceConstructor.actions.resourcesError(`RESOURCE_ERROR test error message`))
		expect(result.payload.error).toBe(`RESOURCE_ERROR test error message`)
		expect(result.type).toBe(`RESOURCE_ERROR`)
	})

	it(`resourcesGet`, () => {
		const result = store.dispatch(resourcesServiceConstructor.actions.resourcesGet(resource))
		expect(store.getState().cache).toEqual({'resourceId': resource})
		expect(result.type).toBe(`RESOURCE_GET`)
	})

	// thunk
	// TODO: need to figure out how to check actions to be called
	// TODO: need to figure out how the Promise data structure looks like, in order to get correct expected value
	it(`getResources`, async() => {
		proxies.apiProxy.resources.get = jest.fn()
		proxies.apiProxy.resources.get.mockImplementationOnce(()=>{
			return Promise.resolve(
				{
					data: {
						resource: {
							resource,
							resources: {
								resources,
							},
							relations:[
								{
									type: `resourceId`,
								},
							],
						},
					},
				},
			)
		})

		expect(store.getState().cache).toEqual({})
		await resourcesServiceConstructor.getResources(`resourceId`, true)(dispatch, getState, { apiProxy })
		expect(store.getState().cache).not.toEqual({})
	})

})