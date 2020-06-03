import React from 'react'
import { shallow, mount } from 'enzyme'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import ManageCollection from '../../../../components/c/ManageCollection/index'
import configureMockStore from 'redux-mock-store'
import {Provider} from 'react-redux'

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	disableLifecycleMethods: true,
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
	viewstate : {
		collection,
		content,
		collectionName: `Collection 1`,
		isContent: true,
		isEditingCollectionName: false,
	},
	handlers: {
		archive: jest.fn(),
		createContent: jest.fn(),
		handleNameChange: jest.fn(),
		setTab: jest.fn(),
		toggleEdit: jest.fn(),
		togglePublish: jest.fn(),
	},
}

const thunk = require(`redux-thunk`).default
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const store = mockStore({
	store: {
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
	},
})

describe(`manage collection test`, () => {
	it(`ContentOverviewContainer should be connected`, ()=> {

		const wrapper = shallow(
			<ManageCollection {...props} />,
		).dive()

		expect(wrapper.find(`Connect(CollectionPermissionsContainer)`).length).toBe(0)
		expect(wrapper.find(`Connect(ContentOverviewContainer)`).length).toBe(1)
	})

	it(`CollectionPermissionsContainer should be connected`, ()=> {
		props.viewstate.isContent = false
		const wrapper = shallow(
			<ManageCollection {...props} />,
		).dive()

		expect(wrapper.find(`Connect(ContentOverviewContainer)`).length).toBe(0)
		expect(wrapper.find(`Connect(CollectionPermissionsContainer)`).length).toBe(1)
	})

	it(`mount`, ()=> {
		props.viewstate.isContent = true
		const wrapper = mount(
			<Provider store={store}>
				<ManageCollection {...props}/>,
			</Provider>,
		)

		// console.log(wrapper.debug())
	})
})