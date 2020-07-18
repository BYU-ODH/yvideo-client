import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Container from '../../../containers/c/PlayerContainer'
import * as testutil from '../../testutil/testutil'

const settings = testutil.settings

const content = [
	{
		id: 0,
		name: `testname`,
		contentType: `video`,
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
	resourceCache: jest.fn(),
	getResources: jest.fn(),
	addView: jest.fn(),
	isAdmin: true,
	isProf: false,
	userId: 10,
}

// mock useParams
jest.mock(`react-router-dom`, () => ({
	...jest.requireActual(`react-router-dom`), // use actual for all non-hook parts
	useParams: () => ({
		id: `0`,
	}),
	useRouteMatch: () => ({ url: `/player/0` }),
}))

// TODO: need to re-write player container test
describe(`PlayerContainer test`, () => {

	it(`test viewstate`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)

		const viewstate = wrapper.find(`Player`).at(0).props().viewstate

		expect(viewstate.duration).toBe(0)
		expect(viewstate.fullscreen).toBe(false)
		expect(viewstate.hovering).toBe(false)
		expect(viewstate.muted).toBe(false)
		expect(viewstate.playbackRate).toBe(1)
		expect(viewstate.playing).toBe(false)
		expect(viewstate.url).toBe(`test url`)
	})
})