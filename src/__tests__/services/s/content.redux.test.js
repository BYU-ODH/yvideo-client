import * as testutil from '../../testutil/testutil'
import ContentService from '../../../services/s/content.redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import proxies from 'proxy'
import Content from 'models/Content'

const resource = testutil.resource

const settings = testutil.settings

const newcontent = {
	id: 0,
	name: `newcontent`,
	contentType: `newcontent`,
	collectionId: 85,
	thumbnail: `test@thumbnail.com`,
	physicalCopyExists: false,
	isCopyrighted: false,
	expired: true,
	dateValidated: ``,
	requester: ``,
	resourceId: `5ebdaef833e57cec218b457c`,
	published: true,
	settings,
	resource,
	fullVideo: true,
	authKey: `5377628e855d31ad4d84a8fdedf5758b`,
	views: 0,
}

const contentBeforeModel = testutil.contentBeforeModel[0]
const contentBeforeModel2 = testutil.contentBeforeModel[1]

const error = {
	response: {
		data: `SUBTITLES_ERROR test error message`,
	},
}

proxies.apiProxy.content.post = jest.fn()
proxies.apiProxy.content.post.mockImplementation(() => {
	return Promise.resolve(contentBeforeModel)
})

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
				cache: {
					"contentid2": new Content(contentBeforeModel2),
				},
				contentStore: {
					cache: {
						"contentid2": new Content(contentBeforeModel2),
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
	it(`should return correct types`, () => {
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
		console.error = jest.fn() // eslint-disable-line no-console
		const result = store.dispatch(contentServiceConstructor.actions.contentError(error))
		expect(result.type).toBe(`CONTENT_ERROR`)
		expect(result.payload.error).toEqual(error)
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

		expect(store.getState().cache[`contentid2`].views).toBe(0)
		store.dispatch(contentServiceConstructor.actions.contentAddView(`contentid2`))
		expect(store.getState().cache[`contentid2`].views).toBe(1)
	})

	it(`content update`, () => {
		const result = store.dispatch(contentServiceConstructor.actions.contentUpdate(newcontent))
		expect(store.getState().cache[0].name).toBe(`newcontent`)
		expect(result.payload.content.name).toBe(`newcontent`)
		expect(result.type).toBe(`CONTENT_UPDATE`)
	})

	it(`setContent`, async() => {
		expect(store.getState().cache[`id`]).toEqual(undefined)
		await contentServiceConstructor.setContent(contentBeforeModel)(dispatch, getState, { apiProxy })
		expect(store.getState().cache[`id`]).toEqual(`contentid1`)
	})

	it(`getContent`, async() => {
		proxies.apiProxy.content.getSingleContent = jest.fn()
		proxies.apiProxy.content.getSingleContent.mockImplementation(() => {
			return Promise.resolve(contentBeforeModel)
		})
		expect(store.getState().cache[`contentid1`]).toEqual(undefined)
		await contentServiceConstructor.getContent(`contentid1`)(dispatch, getState, { apiProxy })
		expect(store.getState().cache[`contentid1`]).toEqual(new Content(contentBeforeModel))
	})

	it(`getContent: catch error`, async() => {
		proxies.apiProxy.content.getSingleContent = jest.fn()
		proxies.apiProxy.content.getSingleContent.mockImplementation(() => {
			return Promise.reject(error)
		})
		expect(store.getState().cache[`contentid1`]).toEqual(undefined)
		await contentServiceConstructor.getContent(`contentid1`)(dispatch, getState, { apiProxy })
		expect(store.getState().cache[`contentid1`]).toEqual(undefined)
	})

	it(`updateContent`, async() => {
		proxies.apiProxy.content.update = jest.fn()
		proxies.apiProxy.content.update.mockImplementation(() => {
			return Promise.resolve(contentBeforeModel)
		})
		expect(store.getState().cache[`contentid1`]).toEqual(undefined)
		await contentServiceConstructor.updateContent(new Content(contentBeforeModel))(dispatch, getState, { apiProxy })
		expect(store.getState().cache[`contentid1`]).toEqual(new Content(contentBeforeModel))
	})

	it(`updateContent: catch error`, async() => {
		proxies.apiProxy.content.update = jest.fn()
		proxies.apiProxy.content.update.mockImplementation(() => {
			return Promise.reject(error)
		})
		expect(store.getState().cache[`contentid1`]).toEqual(undefined)
		await contentServiceConstructor.updateContent(new Content(contentBeforeModel))(dispatch, getState, { apiProxy })
		expect(store.getState().cache[`contentid1`]).toEqual(undefined)
	})

	it(`createContent`, async() => {
		expect(store.getState().cache[`contentid1`]).toBe(undefined)
		await contentServiceConstructor.createContent(contentBeforeModel)(dispatch, getState, { apiProxy })
		// expect(store.getState().cache[0].name).toBe(`newcontent`)
	})

	it(`addView`, async() => {
		proxies.apiProxy.content.addView.get = jest.fn()
		proxies.apiProxy.content.addView.get.mockImplementation(() => {
			return Promise.resolve({
				status: 200,
			})
		})
		expect(store.getState().cache[`contentid2`].views).toBe(0)
		await contentServiceConstructor.addView(`contentid2`, true)(dispatch, getState, { apiProxy })
		expect(store.getState().cache[`contentid2`].views).toBe(1)
	})

	it(`addView: catch error`, async() => {
		proxies.apiProxy.content.addView.get = jest.fn()
		proxies.apiProxy.content.addView.get.mockImplementation(() => {
			return Promise.reject(error)
		})
		expect(store.getState().cache[`contentid2`].views).toBe(0)
		await contentServiceConstructor.addView(`contentid2`, true)(dispatch, getState, { apiProxy })
		expect(store.getState().cache[`contentid2`].views).toBe(0)
	})

	it(`getSubtitles`, async() => {
		proxies.apiProxy.content.getSubtitles = jest.fn()
		proxies.apiProxy.content.getSubtitles.mockImplementationOnce(() => {
			return Promise.resolve({
				status: 200,
			})
		})

		store.dispatch(contentServiceConstructor.actions.contentCreate(newcontent, 85))
		expect(store.getState().loading).toEqual(false)
		// expect(store.getState().cache[0].views).toBe(0)
		await contentServiceConstructor.getSubtitles(0)(dispatch, getState, { apiProxy })
		// expect(store.getState().cache[0].views).toBe(1)
		expect(store.getState().loading).toEqual(true)
	})

	it(`getSubtitles: catch error`, async() => {
		proxies.apiProxy.content.getSubtitles = jest.fn()
		proxies.apiProxy.content.getSubtitles.mockImplementationOnce(() => {
			return Promise.reject(error)
		})

		store.dispatch(contentServiceConstructor.actions.contentCreate(newcontent, 85))
		expect(store.getState().loading).toEqual(false)
		await contentServiceConstructor.getSubtitles(0)(dispatch, getState, { apiProxy })
		expect(store.getState().loading).toEqual(false)
	})

	it(`addSubtitles`, async() => {
		proxies.apiProxy.content.addSubtitles = jest.fn()
		proxies.apiProxy.content.addSubtitles.mockImplementationOnce(() => {
			return Promise.resolve({
				status: 200,
			})
		})
		expect(store.getState().subtitlesIds).toEqual(undefined)
		await contentServiceConstructor.addSubtitles(`sub`)(dispatch, getState, { apiProxy })
		expect(store.getState().subtitlesIds).toEqual({})
	})

	it(`addSubtitles: catch error`, async() => {
		proxies.apiProxy.content.addSubtitles = jest.fn()
		proxies.apiProxy.content.addSubtitles.mockImplementationOnce(() => {
			return Promise.reject(error)
		})
		expect(store.getState().loading).toEqual(undefined)
		await contentServiceConstructor.addSubtitles(`sub`)(dispatch, getState, { apiProxy })
		expect(store.getState().loading).toEqual(false)
	})

})