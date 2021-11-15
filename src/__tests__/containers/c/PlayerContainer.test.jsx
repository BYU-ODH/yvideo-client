import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Container from '../../../containers/c/PlayerContainer'
import * as testutil from '../../testutil/testutil'
import store from 'services/store'
import ContentService from '../../../services/s/content.redux'
import AuthService from '../../../services/s/auth.redux'
import proxies from 'proxy'

const settings = testutil.settings

const content = [
	{
		authKey: `5377628e855d31ad4d84a8fdedf5758b`,
		collectionId: 85,
		contentType: `video`,
		dateValidated:``,
		description: `test`,
		expired:true,
		fullVideo: true,
		id: 0,
		isCopyrighted:false,
		name: `testname`,
		physicalCopyExists:false,
		published:true,
		requester:``,
		resourceId:`5ebdaef833e57cec218b457c`,
		settings,
		thumbnail: `test@thumbnail.com`,
		url: `test url`,
		views: 0,
		resource: testutil.resource,
	},
	{
		id: 1,
		name: `testname2`,
		contentType: `video2`,
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
		fullVideo: true,
		authKey: `5377628e855d31ad4d84a8fdedf5758b`,
		views: 0,
	},
]

const props = {
	contentCache: content,
	getContent: jest.fn(),
	setEvents: jest.fn(),
	getStreamKey: jest.fn(),
	resourceCache: jest.fn(),
	getResources: jest.fn(),
	addView: jest.fn(),
	streamKey: `key`,
	indexToDisplay: 0,
}

// mock useParams
jest.mock(`react-router-dom`, () => ({
	...jest.requireActual(`react-router-dom`), // use actual for all non-hook parts
	useParams: () => ({
		id: `0`,
	}),
	useRouteMatch: () => ({ url: `/player/0` }),
}))

proxies.apiProxy.user.get = jest.fn()
proxies.apiProxy.user.get.mockImplementation(()=>{
	return Promise.resolve(testutil.user)
})

proxies.apiProxy.content.get = jest.fn()
proxies.apiProxy.content.get.mockImplementation(()=>{
	return Promise.resolve({0: content[0]})
})

// TODO: need to re-write player container test
describe(`PlayerContainer test`, () => {
	let contentServiceConstructor
	let authServiceConstructor
	let dispatch
	let getState
	let apiProxy

	beforeEach(async() => {
		authServiceConstructor = new AuthService()
		contentServiceConstructor = new ContentService()

		dispatch = testutil.store.dispatch
		getState = testutil.store.getState
		apiProxy = proxies.apiProxy

		// await authServiceConstructor.checkAuth()(dispatch, getState, { apiProxy })

		// await contentServiceConstructor.getContent([0], true)(dispatch, getState, { apiProxy })
	})

	it(`test viewstate`, async() => {

		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)

		// const viewstate = wrapper.find(`Player`).at(0).props().viewstate

		// expect(viewstate.duration).toBe(0)
		// expect(viewstate.fullscreen).toBe(false)
		// expect(viewstate.hovering).toBe(false)
		// expect(viewstate.muted).toBe(false)
		// expect(viewstate.playbackRate).toBe(1)
		// expect(viewstate.playing).toBe(false)
		// expect(viewstate.url).toBe(`test url`)
	})
})