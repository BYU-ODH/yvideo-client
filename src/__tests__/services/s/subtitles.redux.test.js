import * as testutil from '../../testutil/testutil'
import SubtitlesService from '../../../services/s/subtitles.redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import proxies from 'proxy'

const sub1 = `test`

const sub2 = `created sub`

const subtitle = testutil.subtitle

const updateSubtitle = testutil.updateSubtitle

const updateSubtitle1 = testutil.updateSubtitle1

const subtitle1 = testutil.subtitle1

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
					cache: {
						'subtitle1': subtitle1,
						loading: false,
						lastFetched: 0,
						active: 0,
						contentId : 12,
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

	proxies.apiProxy.content.getSubtitles = jest.fn()
	proxies.apiProxy.subtitles.post = jest.fn()
	proxies.apiProxy.subtitles.edit = jest.fn()
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
		expect(store.getState().cache).toEqual([{sub1}])
		const result = store.dispatch(subtitleServiceConstructor.actions.subtitlesCreate([{sub1}, {sub2}]))
		expect(store.getState().cache).toEqual({ 0: {sub1}, 1: {sub2}})
		expect(result.type).toBe(`SUBTITLES_CREATE`)
	})

	it(`subtitlesError`, () => {
		const result = store.dispatch(subtitleServiceConstructor.actions.subtitlesError(`SUBTITLES_ERROR test error message`))
		expect(result.payload.error).toBe(`SUBTITLES_ERROR test error message`)
		expect(result.type).toBe(`SUBTITLES_ERROR`)
	})

	it(`subtitlesGet`, () => {
		const result = store.dispatch(subtitleServiceConstructor.actions.subtitlesGet([{sub1}], 0))
		expect(result.payload.subtitles).toEqual([{sub1}])
		expect(result.payload.id).toEqual(0)
		expect(store.getState().loading).toBe(false)
		expect(store.getState().lastFetched).toBeLessThanOrEqual(Date.now())
		expect(result.type).toBe(`SUBTITLES_GET`)
	})

	it(`subtitlesUpdate`, () => {
		const result = store.dispatch(subtitleServiceConstructor.actions.subtitlesUpdate([{sub2}]))
		expect(result.payload.subtitles).toEqual([{sub2}])
		expect(store.getState().loading).toBe(false)
		expect(result.type).toBe(`SUBTITLES_UPDATE`)
	})

	it(`subtitlesUpdate`, () => {
		const result = store.dispatch(subtitleServiceConstructor.actions.activeUpdate(true))
		expect(result.payload.active).toBe(true)
		expect(result.type).toBe(`ACTIVE_UPDATE`)
	})

	it(`setContentId`, () => {
		const result = store.dispatch(subtitleServiceConstructor.actions.setContentId(0))
		expect(result.payload.id).toBe(0)
		expect(result.type).toBe(`SET_CONTENT_ID`)
	})

	it(`setSubtitles`, async() => {
		proxies.apiProxy.subtitles.post.mockImplementationOnce(()=>{
			return Promise.resolve(subtitle1)
		})
		expect(store.getState().cache).toEqual([{sub1}])
		await subtitleServiceConstructor.setSubtitles(subtitle1)(dispatch, getState, { apiProxy })
		expect(store.getState().cache).toEqual(subtitle1)
	})

	it(`getSubtitles`, async() => {
		proxies.apiProxy.content.getSubtitles.mockImplementationOnce(()=>{
			return Promise.resolve(subtitle1)
		})
		expect(store.getState().cache).toEqual([{sub1}])
		await subtitleServiceConstructor.getSubtitles(`subtitle1`, true)(dispatch, getState, { apiProxy })
		expect(store.getState().cache).toEqual(subtitle1)
	})

	it(`createSubtitle`, async() => {
		proxies.apiProxy.subtitles.post.mockImplementationOnce(()=>{
			return Promise.resolve(subtitle)
		})
		expect(store.getState().cache).toEqual([{sub1}])
		await subtitleServiceConstructor.createSubtitle(subtitle)(dispatch, getState, { apiProxy })
	})

	it(`updateSubtitle: content === string`, async() => {
		proxies.apiProxy.subtitles.edit.mockImplementationOnce(()=>{
			return Promise.resolve(updateSubtitle)
		})
		expect(store.getState().cache).toEqual([{sub1}])
		await subtitleServiceConstructor.updateSubtitle(updateSubtitle)(dispatch, getState, { apiProxy })
	})

	it(`updateSubtitle: content !== string`, async() => {
		proxies.apiProxy.subtitles.edit.mockImplementationOnce(()=>{
			return Promise.resolve(updateSubtitle1)
		})
		expect(store.getState().cache).toEqual([{sub1}])
		await subtitleServiceConstructor.updateSubtitle(updateSubtitle1)(dispatch, getState, { apiProxy })

	})

	it(`updateSubtitle: catch error`, async() => {
		proxies.apiProxy.subtitles.edit.mockImplementationOnce(()=>{
			return Promise.reject('error')
		});
		expect(store.getState().loading).toEqual(false)
		await subtitleServiceConstructor.updateSubtitle(updateSubtitle1)(dispatch, getState, { apiProxy })
		expect(store.getState().loading).toEqual(false)
	})

	it(`activeUpdate`, async() => {
		const testUpdate = 1
		expect(store.getState().active).toEqual(0)
		await subtitleServiceConstructor.activeUpdate(testUpdate)(dispatch, getState, { apiProxy })
		expect(store.getState().active).toEqual(testUpdate)
	})

	it(`setContentId`, async() => {
		const testContentId = `1`
		expect(store.getState().contentId).toEqual(``)
		await subtitleServiceConstructor.setContentId(testContentId)(dispatch, getState, { apiProxy })
		expect(store.getState().contentId).toEqual(testContentId)
	})

	it(`deleteSubtitle`, async() => {
		proxies.apiProxy.subtitles.post.mockImplementationOnce(()=>{
			return Promise.resolve(subtitle1)
		})

		proxies.apiProxy.subtitles.delete.mockImplementationOnce(()=>{
			return Promise.resolve(subtitle1)
		})

		await subtitleServiceConstructor.setSubtitles(subtitle1)(dispatch, getState, { apiProxy })
		expect(store.getState().cache).toEqual(subtitle1)

		await subtitleServiceConstructor.deleteSubtitle(subtitle1)(dispatch, getState, { apiProxy })
	})

	// TODO : test catch error

})