import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import Container from '../../../containers/c/LabAssistantManageCollectionContainer'
import * as testutil from '../../testutil/testutil'
import { BrowserRouter } from 'react-router-dom'

const collection = testutil.collection

const content = testutil.content

const user = testutil.user

const props = {
	collection,
	content,
	user,
	getCollectionContent: jest.fn(),
	updateCollectionStatus: jest.fn(),
}

describe(`LabAssistantManageCollectionContainer container test`, () => {
	it(`test props should be true`, () => {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = wrapper.props().viewstate

		// viewstate content of collection
		expect(viewstate.collection.archived).toBe(false)
		expect(viewstate.collection.content[0].name).toBe(`testname`)
		expect(viewstate.collection.content[0].contentType).toBe(`video`)
		expect(viewstate.collection.content[0].thumbnail).toBe(`test@thumbnail.com`)
		expect(viewstate.collection.content[0].physicalCopyExists).toBe(false)
		expect(viewstate.collection.content[0].isCopyrighted).toBe(false)
		expect(viewstate.collection.content[0].resourceId).toBe(`5ebdaef833e57cec218b457c`)

		// viewstate collection
		expect(viewstate.collection.id).toBe(0)
		expect(viewstate.collection.name).toBe(`Collection 1`)
		expect(viewstate.collection.owner).toBe(22)
		expect(viewstate.collection.published).toBe(true)
		expect(viewstate.collection.thumbnail).toBe(`test@thumbnail`)

		// viewstate content
		expect(viewstate.content[0].name).toBe(`testname`)
		expect(viewstate.content[0].contentType).toBe(`video`)
		expect(viewstate.content[0].thumbnail).toBe(`test@thumbnail.com`)
		expect(viewstate.content[0].physicalCopyExists).toBe(false)
		expect(viewstate.content[0].isCopyrighted).toBe(false)
		expect(viewstate.content[0].resourceId).toBe(`5ebdaef833e57cec218b457c`)
	})

	it(`mount for testing button behaviors`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)

		// switching back and forth Content and Permissions componenets
		expect(wrapper.find(`ManageCollection`).props().viewstate.isContentTab).toBe(true)
		const permissionsButton = wrapper.find({"id" : `permissions-button`})
		permissionsButton.simulate(`click`)
		expect(wrapper.find(`ManageCollection`).props().viewstate.isContentTab).toBe(false)

		const contentButton = wrapper.find({"id" : `content-button`})
		contentButton.simulate(`click`)
		expect(wrapper.find(`ManageCollection`).props().viewstate.isContentTab).toBe(true)

		// test craete content button for initigating togglemodal
		// wrapper.find({"id" : `newcontent-button`}).at(0).simulate(`click`)
		// setTimeout(() => {
		// 	expect(wrapper.props().children.props.toggleModal).toHaveBeenCalled()
		// }, 500)
	})

	it(`event handlers`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)

		// TODO: this need to be fixed. This is not checking the change that triggered.
		wrapper.find({"id" : `archive-button`}).at(0).simulate(`click`)
		wrapper.find({"id" : `publish-button`}).at(0).simulate(`click`)

		// click edit button, so you can edit the title
		expect(wrapper.find({"id" : `title-edit`}).length).toBe(0)
		wrapper.find({"id" : `title-edit-button`}).at(0).simulate(`click`)
		expect(wrapper.find({"id" : `title-edit`}).length).not.toBe(0)

		// edit title
		expect(wrapper.find({"id" : `title-edit`}).at(0).props().value).toBe(`Collection 1`)
		wrapper.find({"id" : `title-edit`}).at(0).simulate(`change`, {target: {value: `collection title is changed`}})
		expect(wrapper.find({"id" : `title-edit`}).at(0).props().value).toBe(`collection title is changed`)
	})
})

// upload new content(resource)
// authrorize, bring the hard copy video to the lab attandence, mark that as authorized
