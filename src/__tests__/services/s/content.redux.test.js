import * as testutil from '../../testutil/testutil'
import ContentService from '../../../services/s/content.redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import proxies from 'proxy'

const resource = testutil.resource

const settings = testutil.settings

const changedSettings = testutil.changedSettings

const newcontent = {
	id: 0,
	name: `newcontent`,
	contentType: `newcontent`,
	collectionId: 85,
	thumbnail: `test@thumbnail.com`,
	physicalCopyExists:false,
	isCopyrighted:false,
	expired:true,
	dateValidated:``,
	requester:``,
	resourceId:`5ebdaef833e57cec218b457c`,
	published:true,
	settings,
	resource,
	fullVideo: true,
	authKey: `5377628e855d31ad4d84a8fdedf5758b`,
	views: 0,
}

const contentSettingsChanged = {
	id: 0,
	name: `newcontent`,
	contentType: `newcontent`,
	collectionId: 85,
	thumbnail: `test@thumbnail.com`,
	physicalCopyExists:false,
	isCopyrighted:false,
	expired:true,
	dateValidated:``,
	requester:``,
	resourceId:`5ebdaef833e57cec218b457c`,
	published:true,
	settings: changedSettings,
	resource,
	fullVideo: true,
	authKey: `5377628e855d31ad4d84a8fdedf5758b`,
	views: 0,
}

describe(`content service test`, () => {

	let contentServiceConstructor
	let store
	let dispatch
	let getState
	let apiProxy

	// reset store
	beforeEach(() => {
		contentServiceConstructor = new ContentService()

		store = createStore(
			contentServiceConstructor.reducer,
			{
				cache:{
					0:{
						views: 0,
					},
					loading: false,
					lastFetched: 0,
				},
				contentStore:{
					cache:{
						0:{
							views: 0,
						},
					},
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
		contentServiceConstructor = new ContentService()
		const types = contentServiceConstructor.types

		expect(types.CONTENT_START).toBe(`CONTENT_START`)
		expect(types.CONTENT_ABORT).toBe(`CONTENT_ABORT`)
		expect(types.CONTENT_CLEAN).toBe(`CONTENT_CLEAN`)
		expect(types.CONTENT_CREATE).toBe(`CONTENT_CREATE`)
		expect(types.CONTENT_ERROR).toBe(`CONTENT_ERROR`)
		expect(types.CONTENT_GET).toBe(`CONTENT_GET`)
		expect(types.CONTENT_ADD_VIEW).toBe(`CONTENT_ADD_VIEW`)
		expect(types.CONTENT_UPDATE).toBe(`CONTENT_UPDATE`)
	})

	// reducers and actions
	it(`content start`, () => {
		const result = store.dispatch(contentServiceConstructor.actions.contentStart())
		expect(store.getState().loading).toBe(true)
		expect(result.type).toBe(`CONTENT_START`)
	})

	it(`content abort`, () => {
		store.dispatch(contentServiceConstructor.actions.contentStart())
		expect(store.getState().loading).toBe(true)
		const result = store.dispatch(contentServiceConstructor.actions.contentAbort())
		expect(store.getState().loading).toBe(false)
		expect(result.type).toBe(`CONTENT_ABORT`)
	})

	it(`content clean`, () => {
		store.dispatch(contentServiceConstructor.actions.contentUpdate(newcontent))
		expect(store.getState().cache[0].name).toBe(`newcontent`)
		const result = store.dispatch(contentServiceConstructor.actions.contentClean())
		expect(store.getState().cache[0]).toBe(undefined)
		expect(result.type).toBe(`CONTENT_CLEAN`)
	})

	it(`content create`, () => {
		const result = store.dispatch(contentServiceConstructor.actions.contentCreate(newcontent, 85))
		expect(store.getState().cache.name).toBe(`newcontent`)
		expect(result.payload.content.name).toBe(`newcontent`)
		expect(result.type).toBe(`CONTENT_CREATE`)
	})

	it(`content error`, () => {
		console.error = jest.fn()
		const result = store.dispatch(contentServiceConstructor.actions.contentError(`error message`))
		expect(console.error).toBeCalled()
		expect(result.type).toBe(`CONTENT_ERROR`)
		expect(result.payload.error).toBe(`error message`)
	})

	it(`content get`, () => {
		const result = store.dispatch(contentServiceConstructor.actions.contentGet(newcontent))
		expect(result.type).toBe(`CONTENT_GET`)
		expect(result.payload.content.name).toBe(`newcontent`)
	})

	it(`content add view`, () => {
		const content = store.dispatch(contentServiceConstructor.actions.contentCreate(newcontent, 0))
		expect(store.getState().cache.name).toBe(`newcontent`)
		expect(content.payload.content.name).toBe(`newcontent`)

		expect(store.getState().cache[0].views).toBe(0)
		store.dispatch(contentServiceConstructor.actions.contentAddView(0))
		expect(store.getState().cache[0].views).toBe(1)
	})

	it(`content update`, () => {
		const result = store.dispatch(contentServiceConstructor.actions.contentUpdate(newcontent))
		expect(store.getState().cache[0].name).toBe(`newcontent`)
		expect(result.payload.content.name).toBe(`newcontent`)
		expect(result.type).toBe(`CONTENT_UPDATE`)
	})

	// thunk
	// TODO: need to figure out how to check actions to be called
	it(`getContent`, async() => {

		proxies.apiProxy.content.post = jest.fn()
		proxies.apiProxy.content.post.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
				data: {
					authKey: `1c4c003ef6a10b5e0278e36f4e4eb967`,
					collectionId: 85,
					contentType: `video`,
					dateValidated: ``,
					expired: true,
					fullVideo: true,
					id: 0,
					isCopyrighted: false,
					name: `newcontent`,
					physicalCopyExists: false,
					published: true,
					requester: ``,
					resourceId: `5efd21c433e57c47058b456e`,
					settings,
					thumbnail: ``,
					views: 0,
				},
			})
		})

		proxies.apiProxy.content.get = jest.fn()
		proxies.apiProxy.content.get.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
				data: {
					authKey: `1c4c003ef6a10b5e0278e36f4e4eb967`,
					collectionId: 85,
					contentType: `video`,
					dateValidated: ``,
					expired: true,
					fullVideo: true,
					id: 0,
					isCopyrighted: false,
					name: `newcontent`,
					physicalCopyExists: false,
					published: true,
					requester: ``,
					resourceId: `5efd21c433e57c47058b456e`,
					settings,
					thumbnail: ``,
					views: 0,
				},
			})
		})

		expect(store.getState().cache[0].name).toBe(undefined)
		await contentServiceConstructor.createContent(newcontent, 85)(dispatch, getState, { apiProxy })
		expect(store.getState().cache[0].name).toBe(`newcontent`)

		// TODO: function called success, just need to check if it actually gets content
		await contentServiceConstructor.getContent([0])(dispatch, getState, { apiProxy })
	})

	it(`createContent`, async() => {

		proxies.apiProxy.content.post = jest.fn()
		proxies.apiProxy.content.post.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
				data: {
					authKey: `1c4c003ef6a10b5e0278e36f4e4eb967`,
					collectionId: 85,
					contentType: `video`,
					dateValidated: ``,
					expired: true,
					fullVideo: true,
					id: 0,
					isCopyrighted: false,
					name: `newcontent`,
					physicalCopyExists: false,
					published: true,
					requester: ``,
					resourceId: `5efd21c433e57c47058b456e`,
					settings,
					thumbnail: ``,
					views: 0,
				},
			})
		})

		expect(store.getState().cache[0].name).toBe(undefined)
		await contentServiceConstructor.createContent(newcontent, 85)(dispatch, getState, { apiProxy })
		expect(store.getState().cache[0].name).toBe(`newcontent`)
	})

	it(`addView`, async() => {

		proxies.apiProxy.content.addView.get = jest.fn()
		proxies.apiProxy.content.addView.get.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
			})
		})

		store.dispatch(contentServiceConstructor.actions.contentCreate(newcontent, 85))

		expect(store.getState().cache[0].views).toBe(0)
		await contentServiceConstructor.addView(0, true)(dispatch, getState, { apiProxy })
		expect(store.getState().cache[0].views).toBe(1)
	})

	it(`updateContent`, async() => {

		proxies.apiProxy.content.post = jest.fn()
		proxies.apiProxy.content.post.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
				data: {
					authKey: `1c4c003ef6a10b5e0278e36f4e4eb967`,
					collectionId: 85,
					contentType: `video`,
					dateValidated: ``,
					expired: true,
					fullVideo: true,
					id: 0,
					isCopyrighted: false,
					name: `newcontent`,
					physicalCopyExists: false,
					published: true,
					requester: ``,
					resourceId: `5efd21c433e57c47058b456e`,
					settings,
					thumbnail: ``,
					views: 0,
				},
			})
		})
		proxies.apiProxy.content.settings.post = jest.fn()
		proxies.apiProxy.content.settings.post.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
			})
		})
		proxies.apiProxy.content.metadata.post = jest.fn()
		proxies.apiProxy.content.metadata.post.mockImplementationOnce(()=>{
			return Promise.resolve({
				status: 200,
			})
		})

		// create content before changing
		expect(store.getState().cache[0].name).toBe(undefined)
		await contentServiceConstructor.createContent(newcontent, 85)(dispatch, getState, { apiProxy })
		expect(store.getState().cache[0].name).toBe(`newcontent`)

		// check default settings
		expect(store.getState().cache[0].settings.allowDefinitions).toBe(false)
		expect(store.getState().cache[0].settings.showAnnotations).toBe(false)
		expect(store.getState().cache[0].settings.showCaptions).toBe(false)
		expect(store.getState().cache[0].settings.showTranscripts).toBe(false)
		expect(store.getState().cache[0].settings.showWordList).toBe(false)
		expect(store.getState().cache[0].settings.description).toBe(``)

		// update content and check changed settings
		await contentServiceConstructor.updateContent(contentSettingsChanged)(dispatch, getState, { apiProxy })
		expect(store.getState().cache[0].settings.allowDefinitions).toBe(true)
		expect(store.getState().cache[0].settings.showAnnotations).toBe(true)
		expect(store.getState().cache[0].settings.showCaptions).toBe(true)
		expect(store.getState().cache[0].settings.showTranscripts).toBe(true)
		expect(store.getState().cache[0].settings.showWordList).toBe(true)
		expect(store.getState().cache[0].settings.description).toBe(`changed`)
	})
})