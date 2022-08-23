import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../../components/modals/containers/DeleteConfirmContainer'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const props = {
	type: `resource`,
	menuItemInfo: ``,
	id: 0,
	selectedFile: ``,
	resources: testutil.resourcesNew,
	toggleModal: jest.fn(),
	removeResource: jest.fn(),
	removeFile: jest.fn(),
	editFileResource: jest.fn(),
	adminDeleteCollection: jest.fn(),
	adminDeleteUser: jest.fn(),
	adminDeleteContent: jest.fn(),
	editResource: jest.fn(),
}

describe(`ManageFilesContainer test`, () => {

	it(`should get viewstate correctly`, () => {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		// test viewstate made correctly
		const viewstate = wrapper.props().viewstate
		expect(viewstate.resources).toEqual(testutil.resourcesNew)
	})

	it(`should pass event handlers test with resource`, async () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)
		expect(wrapper.text().includes(`Are you sure you want to delete`)).toBe(true)
		expect(wrapper.text().includes(`resourcename0`)).toBe(true)

		// TODO: cannot get to resource service removeResource
		wrapper.find(`#confirm-delete`).at(0).simulate(`click`)
	})

	it(`should pass event handlers test with Users`, async () => {
		props.type = `Users`
		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)
		expect(wrapper.text().includes(`Are you sure you want to delete`)).toBe(true)

		// TODO: cannot get to resource service removeResource
		wrapper.find(`#confirm-delete`).at(0).simulate(`click`)
	})

	it(`should pass event handlers test with Collections`, async() => {
		props.type = `Collections`
		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)
		expect(wrapper.text().includes(`Are you sure you want to delete`)).toBe(true)

		// TODO: cannot get to resource service removeResource
		wrapper.find(`#confirm-delete`).at(0).simulate(`click`)
	})

	it(`should pass event handlers test with Content`, async() => {
		props.type = `Content`
		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)
		expect(wrapper.text().includes(`Are you sure you want to delete`)).toBe(true)

		// TODO: cannot get to resource service removeResource
		wrapper.find(`#confirm-delete`).at(0).simulate(`click`)
	})

	it(`should pass event handlers test with file`, async() => {
		props.type = `file`
		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)
		expect(wrapper.text().includes(`Are you sure you want to delete`)).toBe(true)

		// TODO: cannot get to resource service removeResource
		wrapper.find(`#confirm-delete`).at(0).simulate(`click`)
	})
})
