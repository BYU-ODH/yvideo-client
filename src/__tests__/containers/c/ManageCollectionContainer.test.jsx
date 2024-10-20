import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../containers/c/ManageCollectionContainer'
import { Provider } from 'react-redux'
import * as testutil from '../../testutil/testutil'
import ContentService from '../../../services/s/content.redux'
import AuthService from '../../../services/s/auth.redux'
import proxies from 'proxy'
import { BrowserRouter } from 'react-router-dom'
import store from 'services/store'

const resource = testutil.resource

const settings = {
	allowDefinitions: false,
	showAnnotations: false,
	showCaptions: false,
	showTranscripts: false,
	showWordList: false,
	aspectRatio: `1.77`,
	description: ``,
	targetLanguage: ``,
	annotationDocument: [],
	captionTrack: [],
}

const newcontent = {
	id: 2,
	name: `newcontent`,
	contentType: `newcontent`,
	collectionId: 0,
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

const content1 = {
	id: 0,
	name: `testname`,
	contentType: `video`,
	collectionId: 0,
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

const content2 = {
	id: 1,
	name: `testname2`,
	contentType: `video2`,
	collectionId: 0,
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

const content3 = {
	id: 2,
	name: `testname3`,
	contentType: `video3`,
	collectionId: 0,
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

const content = [
	content1,
	content2,
]

const updatedContents = [
	content1,
	content2,
	content3,
]

const collection = {
	archived: false,
	content,
	id: 0,
	name: `Collection 1`,
	owner: 22,
	published: true,
	thumbnail: `test@thumbnail`,
	'expired-content': content,
}

const props = {
	collection,
	content,
	getContent: jest.fn(),
	updateCollectionName: jest.fn(),
	updateCollectionStatus: jest.fn(),
	getCollectionContent: jest.fn(),
	getCollections: jest.fn(),
}

describe(`manage collection container test`, () => {

	it(`container shallow render should be success`, () => {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).dive()

		const content = wrapper.props().content[0]
		expect(content.name).toBe(`testname`)
		expect(content.contentType).toBe(`video`)
		expect(content.thumbnail).toBe(`test@thumbnail.com`)
		expect(content.physicalCopyExists).toBe(false)
		expect(content.isCopyrighted).toBe(false)
		expect(content.expired).toBe(true)
		expect(content.resourceId).toBe(`5ebdaef833e57cec218b457c`)
	})

	it(`viewstate should be generated successfully`, () => {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = wrapper.props().viewstate

		// viewstate content of collection
		expect(viewstate.collection.archived).toBe(false)
		expect(viewstate.collection.content[0].id).toBe(0)
		expect(viewstate.collection.content[0].name).toBe(`testname`)
		expect(viewstate.collection.content[0].contentType).toBe(`video`)
		expect(viewstate.collection.content[0].thumbnail).toBe(`test@thumbnail.com`)
		expect(viewstate.collection.content[0].physicalCopyExists).toBe(false)
		expect(viewstate.collection.content[0].isCopyrighted).toBe(false)
		expect(viewstate.collection.content[0].expired).toBe(true)
		expect(viewstate.collection.content[0].resourceId).toBe(`5ebdaef833e57cec218b457c`)

		// viewstate collection
		expect(viewstate.collection.name).toBe(`Collection 1`)
		expect(viewstate.collection.owner).toBe(22)
		expect(viewstate.collection.published).toBe(true)
		expect(viewstate.collection.thumbnail).toBe(`test@thumbnail`)

		// viewstate content
		expect(viewstate.content[0].name).toBe(`testname`)
		expect(viewstate.content[0].contentType).toBe(`video`)
		expect(viewstate.content[0].thumbnail).toBe(`https://i.ytimg.com/vi/HK7SPnGSxLM/default.jpg`)
		expect(viewstate.content[0].physicalCopyExists).toBe(false)
		expect(viewstate.content[0].isCopyrighted).toBe(false)
		expect(viewstate.content[0].expired).toBe(false)
		expect(viewstate.content[0].resourceId).toBe(`00000000-0000-0000-0000-000000000000`)
	})

	it(`testing buttons`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)

		// TODO: should pass a Mock function toggleModal to component, otherwise jest won't be able to check whether it was called or not.

		wrapper.find({"id" : `newcontent-button`}).at(0).simulate(`click`)

		// switching back and forth Content and Permissions componenets
		expect(wrapper.find(`ManageCollection`).props().viewstate.isContentTab).toBe(true)
		const permissionsButton = wrapper.find({"id" : `permissions-button`})
		permissionsButton.simulate(`click`)
		expect(wrapper.find(`ManageCollection`).props().viewstate.isContentTab).toBe(false)

		const contentButton = wrapper.find({"id" : `content-button`})
		contentButton.simulate(`click`)
		expect(wrapper.find(`ManageCollection`).props().viewstate.isContentTab).toBe(true)
	})

	it(`test rest of event handlers`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)

		// make sure it is not editing mode before initiating `Edit`
		expect(wrapper.find({"id" : `title-edit`}).length).toBe(0)
		expect(wrapper.find({"id" : `title-edit-button`}).at(0).props().editing).toBe(false)
		expect(wrapper.find({"id" : `title-edit-button`}).at(0).props().children).toBe(`Edit`)

		// simulates clicking edit title button
		wrapper.find({"id" : `title-edit-button`}).at(0).simulate(`click`)

		// check if it is edting mode and check if it is changed into `Save` button
		expect(wrapper.find({"id" : `title-edit-button`}).at(0).props().editing).toBe(true)
		expect(wrapper.find({"id" : `title-edit-button`}).at(0).text()).toContain(`Save`)
		expect(wrapper.find({"id" : `title-edit`}).length).not.toBe(0)

		// test title changes
		expect(wrapper.find(`input`).props().value).toBe(`Collection 1`)
		expect(wrapper.find(`ManageCollection`).props().viewstate.collectionName).toBe(`Collection 1`)
		wrapper.find(`input`).simulate(`change`, {target: {value: `title changed`}})
		expect(wrapper.find(`input`).props().value).toBe(`title changed`)
		expect(wrapper.find(`ManageCollection`).props().viewstate.collectionName).toBe(`title changed`)
	})

	// TODO: still need to complete
	it(`test`, async() => {

		const contentServiceConstructor = new ContentService()
		const authServiceConstructor = new AuthService()

		const dispatch = store.dispatch
		const getState = store.getState
		const apiProxy = proxies.apiProxy

		// first content
		proxies.apiProxy.content.post = jest.fn()
		proxies.apiProxy.content.post.mockImplementationOnce(() => {
			return Promise.resolve({
				data: content1,
			})
		})
		await contentServiceConstructor.createContent(newcontent, 0)(dispatch, getState, { apiProxy })

		// second content
		proxies.apiProxy.content.post.mockImplementationOnce(() => {
			return Promise.resolve({
				data: content2,
			})
		})
		await contentServiceConstructor.createContent(newcontent, 0)(dispatch, getState, { apiProxy })

		// third content
		proxies.apiProxy.content.post.mockImplementationOnce(() => {
			return Promise.resolve({
				data: content3,
			})
		})
		await contentServiceConstructor.createContent(newcontent, 0)(dispatch, getState, { apiProxy })

		// put test auth user
		store.dispatch(authServiceConstructor.actions.authGet(testutil.user))

		// test if two contents are inserted

		// TODO: Will be uncommented when we go back to finally fixing tests
		// const collectionContents = wrapper.find(`ManageCollectionContainer`).props().collection.content
		// const contents = wrapper.find(`ManageCollectionContainer`).props().content

		// expect(collectionContents.length).toBe(2)
		// expect(Object.keys(contents).length).toBe(2)

		// test if collectionCotents and contents are same obejct
		// expect(collectionContents[0]).toEqual(contents[0])
		// expect(collectionContents[1]).toEqual(contents[1])

		// console.log(wrapper.find(`ManageCollectionContainer`).props())
		// console.log(wrapper.find({id: `newcontent-button`}).debug())
		// wrapper.find({id: `newcontent-button`}).at(0).simulate(`click`)
		// console.log(wrapper.find(`ManageCollectionContainer`).props())
	})
})
