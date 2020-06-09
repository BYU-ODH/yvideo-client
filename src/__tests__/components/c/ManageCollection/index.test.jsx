import React from 'react'
import { shallow, mount } from 'enzyme'
import ManageCollection from '../../../../components/c/ManageCollection/index'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const content = testutil.content

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
			<Provider store={testutil.store}>
				<ManageCollection {...props}/>,
			</Provider>,
		)

		// console.log(wrapper.debug())
	})
})