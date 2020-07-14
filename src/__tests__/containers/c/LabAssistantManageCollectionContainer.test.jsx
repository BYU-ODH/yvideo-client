import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import Container from '../../../containers/c/LabAssistantManageCollectionContainer'
import * as testutil from '../../testutil/testutil'
import { BrowserRouter } from 'react-router-dom'

const collection = testutil.collection

const content = testutil.content

const props = {
	collection,
	content,
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
		expect(viewstate.collection.content[0].expired).toBe(true)
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
		expect(viewstate.content[0].expired).toBe(true)
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
		expect(wrapper.find(`ManageCollection`).props().viewstate.isContent).toBe(true)
		const permissionsButton = wrapper.find({"className" : `permissions-button`})
		permissionsButton.simulate(`click`)
		expect(wrapper.find(`ManageCollection`).props().viewstate.isContent).toBe(false)

		const contentButton = wrapper.find({"className" : `content-button`})
		contentButton.simulate(`click`)
		expect(wrapper.find(`ManageCollection`).props().viewstate.isContent).toBe(true)

		// test craete content button for initigating togglemodal
		wrapper.find({"className" : `newcontent-button`}).at(0).simulate(`click`)
		setTimeout(() => {
			expect(wrapper.props().children.props.toggleModal).toHaveBeenCalled()
		}, 500)
	})
})