import React from 'react'
import { shallow, mount } from 'enzyme'
import ManageCollection from '../../../../components/c/ManageCollection/index'
import  { Icon, TitleEditButton, PublishButton } from '../../../../components/c/ManageCollection/styles'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'
import { BrowserRouter } from 'react-router-dom'

const resource = testutil.resource

const content = testutil.content

const newcontent = {
	id: 116,
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
	resource,
	fullVideo: true,
	authKey: `5377628e855d31ad4d84a8fdedf5758b`,
	views: 0,
}

const collection = testutil.collection
const collection6 = testutil.collection6

const props = {
	viewstate : {
		collection,
		content : [
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
				resource,
				fullVideo: true,
				authKey: `5377628e855d31ad4d84a8fdedf5758b`,
				views: 0,
			},
		],
		collectionName: `Collection 1`,
		isContent: true,
		isEditingCollectionName: false,
	},
	handlers: {
		unarchive: jest.fn(),
		toggleEdit: jest.fn(),
		handleNameChange: jest.fn(),
		togglePublish: jest.fn(),
		archive: jest.fn(),
		setTab: jest.fn(),
		createContent: jest.fn(),
		handleShowTip: jest.fn(),
		toggleTip: jest.fn(),
	},
}

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

	it(`test viewstate`, ()=> {
		props.viewstate.isContent = true
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<ManageCollection {...props}/>
				</BrowserRouter>
			</Provider>,
		)

		const viewstate = wrapper.find(`ContentOverviewContainer`).childAt(0).props().viewstate
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

	it(`simulate click action`, ()=> {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<ManageCollection {...props}/>
				</BrowserRouter>
			</Provider>,
		)

		console.log(wrapper.debug())
		wrapper.find(`.content-button`).simulate('click')
		wrapper.find(`.permissions-button`).simulate('mouseEnter')
		wrapper.find(`.permissions-button`).simulate('mouseLeave')
		wrapper.find(Icon).simulate('mouseEnter')
		wrapper.find(Icon).simulate('mouseLeave')
		wrapper.find('h6').simulate('click')
	})

	it(`simulate click action`, ()=> {
		props.viewstate.isEditingCollectionName = true
		props.viewstate.collection = collection6
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<ManageCollection {...props}/>
				</BrowserRouter>
			</Provider>,
		)

		wrapper.find(TitleEditButton).simulate('mouseEnter')
		wrapper.find(TitleEditButton).simulate('mouseLeave')
		wrapper.find(PublishButton).simulate('mouseEnter')
		wrapper.find(PublishButton).simulate('mouseLeave')
	})
})