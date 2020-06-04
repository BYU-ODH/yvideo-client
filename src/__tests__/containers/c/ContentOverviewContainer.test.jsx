import React from 'react'
import { shallow, mount } from 'enzyme'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import Container from '../../../containers/c/ContentOverviewContainer'
import configureMockStore from 'redux-mock-store'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	disableLifecycleMethods: true,
})

const thunk = require(`redux-thunk`).default
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const store = mockStore({
	contentStore:{
		cache: [
			{
				id: 115,
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
				settings: {
					allowDefinitions:false,
					showAnnotations:false,
					showCaptions:false,
					showTranscripts:false,
					showWordList:false,
					aspectRatio:`1.77`,
					description:``,
					targetLanguages: [],
					annotationDocument: [],
					captionTrack: [],
				},
				fullVideo: true,
				authKey: `5377628e855d31ad4d84a8fdedf5758b`,
				views: 0,
			},
		],
	},
})

const content = {
	id: 115,
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
	settings: {
		allowDefinitions:false,
		showAnnotations:false,
		showCaptions:false,
		showTranscripts:false,
		showWordList:false,
		aspectRatio:`1.77`,
		description:``,
		targetLanguages: [],
		annotationDocument: [],
		captionTrack: [],
	},
	fullVideo: true,
	authKey: `5377628e855d31ad4d84a8fdedf5758b`,
	views: 0,
}

const props = {
	content,
	removeCollectionContent: jest.fn(),
	updateContent: jest.fn(),
}

describe(`manage collection test`, () => {
	it(`ContentOverviewContainer should render`, ()=> {
		const wrapper = mount(
			<Provider store={store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>,
			</Provider>,
		)

		const viewstate = wrapper.find(`ContentOverview`).props().viewstate

		expect(viewstate.content.id).toBe(115)
		expect(viewstate.content.name).toBe(`testname`)
		expect(viewstate.content.contentType).toBe(`video`)
		expect(viewstate.content.collectionId).toBe(85)
		expect(viewstate.content.thumbnail).toBe(`test@thumbnail.com`)
		expect(viewstate.content.physicalCopyExists).toBe(false)
		expect(viewstate.content.isCopyrighted).toBe(false)
		expect(viewstate.content.expired).toBe(true)
		expect(viewstate.content.resourceId).toBe(`5ebdaef833e57cec218b457c`)
	})
})