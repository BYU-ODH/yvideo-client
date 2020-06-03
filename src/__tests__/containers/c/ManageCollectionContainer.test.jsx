import React from 'react'
import { shallow, mount } from 'enzyme'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Container from '../../../containers/c/ManageCollectionContainer'
import configureMockStore from 'redux-mock-store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

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

const content = [
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
]

const collection = {
	archived: false,
	content,
	id: 65,
	name: `Collection 1`,
	owner: 22,
	published: true,
	thumbnail: `test@thumbnail`,
}

const props = {
	collection,
	content,
	getContent: jest.fn(),
	updateCollectionName: jest.fn(),
	updateCollectionStatus: jest.fn(),
}

describe(`manage collection container test`, () => {
	it(`container shallow render should be success`, ()=> {
		const wrapper = shallow(
			<Container store={store}/>,
		).dive()

		const content = wrapper.props().content[0]
		expect(content.id).toBe(115)
		expect(content.name).toBe(`testname`)
		expect(content.contentType).toBe(`video`)
		expect(content.collectionId).toBe(85)
		expect(content.thumbnail).toBe(`test@thumbnail.com`)
		expect(content.physicalCopyExists).toBe(false)
		expect(content.isCopyrighted).toBe(false)
		expect(content.expired).toBe(true)
		expect(content.resourceId).toBe(`5ebdaef833e57cec218b457c`)
	})

	it(`container mount should be success`, () => {
		const wrapper = mount(
			<Provider store={store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>,
			</Provider>,
		)

		// Child component does not render even though it is mounted.
	})
})