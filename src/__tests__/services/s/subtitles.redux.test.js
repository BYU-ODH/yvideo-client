import * as testutil from '../../testutil/testutil'
import SubtitlesService from '../../../services/s/subtitles.redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import proxies from 'proxy'
import ResourceObject from '../../../models/ResourceObject'

const resource = testutil.resource

const resource2 = testutil.resource2

const resources = testutil.resources

const resources2 = testutil.resources2

const file1 = testutil.file1

const file1mod = testutil.file1mod

const file2 = testutil.file2

const sub1 = `test`

const sub2 = `created sub`

describe(`content service test`, () => {

	let subtitleServiceConstructor
	let store
	let dispatch
	let getState
	let apiProxy

	// reset store
	beforeEach(() => {
		subtitleServiceConstructor = new SubtitlesService()

		// TODO: good to fix: when getState().adminStore is used, this mock store has to have adminStore object,
		// is there any way to combine these duplicated stores?
		store = createStore(
			subtitleServiceConstructor.reducer,
			{
				cache: [{sub1}],
				loading: false,
				lastFetched: 0,
				active: 0,
				contentId : ``,
				subtitlesStore:{
					cache: [],
					loading: false,
					lastFetched: 0,
					active: 0,
					contentId : ``,
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

	proxies.apiProxy.content.getSubtitles = jest.fn()
	proxies.apiProxy.subtitles.post = jest.fn()
	proxies.apiProxy.content.edit = jest.fn()
	proxies.apiProxy.subtitles.delete = jest.fn()

	// types
	it(`should return correct types`, ()=> {
		const types = subtitleServiceConstructor.types

		expect(types.SUBTITLES_START).toBe(`SUBTITLES_START`)
		expect(types.SUBTITLES_ABORT).toBe(`SUBTITLES_ABORT`)
		expect(types.SUBTITLES_CLEAN).toBe(`SUBTITLES_CLEAN`)
		expect(types.SUBTITLES_CREATE).toBe(`SUBTITLES_CREATE`)
		expect(types.SUBTITLES_ERROR).toBe(`SUBTITLES_ERROR`)
		expect(types.SUBTITLES_GET).toBe(`SUBTITLES_GET`)
		expect(types.SUBTITLES_UPDATE).toBe(`SUBTITLES_UPDATE`)
		expect(types.ACTIVE_UPDATE).toBe(`ACTIVE_UPDATE`)
		expect(types.SET_CONTENT_ID).toBe(`SET_CONTENT_ID`)
	})

	// reducers and actions
	it(`subtitlesStart`, () => {
		expect(store.getState().loading).toBe(false)
		const result = store.dispatch(subtitleServiceConstructor.actions.subtitlesStart())
		expect(store.getState().loading).toBe(true)
		expect(result.type).toBe(`SUBTITLES_START`)
	})

	it(`subtitlesAbort`, () => {
		store.dispatch(subtitleServiceConstructor.actions.subtitlesStart())
		expect(store.getState().loading).toBe(true)

		const result = store.dispatch(subtitleServiceConstructor.actions.subtitlesAbort())
		expect(store.getState().loading).toBe(false)
		expect(result.type).toBe(`SUBTITLES_ABORT`)
	})

	it(`subtitlesClean`, () => {
		const result = store.dispatch(subtitleServiceConstructor.actions.subtitlesClean())
		expect(store.getState().cache).toEqual([])
		expect(result.type).toBe(`SUBTITLES_CLEAN`)
	})

	it(`subtitlesCreate`, () => {
		// expect(store.getState().cache).toEqual([{sub1}])
		// const result = store.dispatch(subtitleServiceConstructor.actions.subtitlesCreate([{sub1}, {sub2}]))
		// expect(store.getState().cache).toEqual([{sub1}, {sub2}])
		// expect(result.type).toBe(`SUBTITLES_CREATE`)
	})

	// thunk
	// TODO: check this later
	// it(`getResources`, async() => {
	// 	proxies.apiProxy.resources.get.mockImplementationOnce(()=>{
	// 		return Promise.resolve(
	// 			{
	// 				data: {
	// 					resource: {
	// 						resource,
	// 						resources: {
	// 							resources,
	// 						},
	// 						relations:[
	// 							{
	// 								type: `resourceId`,
	// 							},
	// 						],
	// 					},
	// 				},
	// 			},
	// 		)
	// 	})

	// 	expect(store.getState().cache).toEqual({})
	// 	await subtitleServiceConstructor.getResources(`resourceId`, true)(dispatch, getState, { apiProxy })
	// 	expect(store.getState().cache).not.toEqual({})
	// })

	// it(`search`, async() => {
	// 	proxies.apiProxy.resources.search.mockImplementationOnce(()=>{
	// 		return Promise.resolve(resources2)
	// 	})

	// 	expect(store.getState().cache).toEqual({})
	// 	await subtitleServiceConstructor.search(`resourceId2`, true)(dispatch, getState, { apiProxy })
	// 	expect(store.getState().cache).toEqual({[resource2.id]: new ResourceObject(resource2)})
	// })

})