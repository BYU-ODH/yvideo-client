import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../../components/modals/containers/CreateResourceContainer'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const props = {
	toggleModal: jest.fn(),
	addResource: jest.fn(),
	user: testutil.user,
}

describe(`CreateResourceContainer test`, () => {

	it(`should get viewstate correctly`, ()=> {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		// test viewstate made correctly
		const viewstate = wrapper.props().viewstate
		expect(viewstate.user).toBe(testutil.user)
		expect(viewstate.data.resourceName).toBe(``)
		expect(viewstate.data.resourceType).toBe(`video`)
	})

	it(`should pass event handlers test`, ()=> {

		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)

		// update title
		expect(wrapper.find(`#create-resource-name`).props().value).toBe(``)
		wrapper.find(`#create-resource-name`).simulate(`change`, {target: { name: `resourceName`, value: `changed resource name` }})
		expect(wrapper.find(`#create-resource-name`).props().value).toBe(`changed resource name`)

		// update requester email
		expect(wrapper.find(`#create-resource-requester-email`).props().value).toBe(``)
		wrapper.find(`#create-resource-requester-email`).simulate(`change`, {target: { name: `requesterEmail`, value: `chagned@email.com` }})
		expect(wrapper.find(`#create-resource-requester-email`).props().value).toBe(`chagned@email.com`)

		// update resource type
		expect(wrapper.find(`#create-resource-type-video`).at(0).props().selected).toBe(true)

		wrapper.find(`#create-resource-type-audio`).at(0).simulate(`click`)
		expect(wrapper.find(`#create-resource-type-audio`).at(0).props().selected).toBe(true)

		wrapper.find(`#create-resource-type-image`).at(0).simulate(`click`)
		expect(wrapper.find(`#create-resource-type-image`).at(0).props().selected).toBe(true)

		wrapper.find(`#create-resource-type-text`).at(0).simulate(`click`)
		expect(wrapper.find(`#create-resource-type-text`).at(0).props().selected).toBe(true)

		// create and cancel
		wrapper.find(`#create-resource-create`).at(0).simulate(`click`)

		wrapper.find(`#create-resource-cancel`).at(0).simulate(`click`)

		wrapper.find(`form`).simulate(`submit`, { preventDefault() {} })
	})
})