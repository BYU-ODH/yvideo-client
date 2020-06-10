import React from 'react'
import { shallow, mount } from 'enzyme'
import ManageCollection from '../../../../components/c/ManageCollection/index'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const content = testutil.content

const collection = testutil.collection

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
				<ManageCollection {...props}/>,
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
})