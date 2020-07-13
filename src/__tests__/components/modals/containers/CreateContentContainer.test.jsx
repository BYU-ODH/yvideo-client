import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../../components/modals/containers/CreateContentContainer'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const collections = testutil.collections

const modal = testutil.modal

const props = {
	adminContent: ``,
	adminCreateContent: jest.fn(),
	adminCreateContentFromResource: jest.fn(),
	createContent: jest.fn(),
	collections,
	modal,
	search: jest.fn(),
	toggleModal: jest.fn(),
	getCollections: jest.fn(),
}

describe(`CreateContentContainer test`, () => {

	it(`should get viewstate correctly`, ()=> {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		// test viewstate made correctly
		const viewstate = wrapper.props().viewstate
		expect(viewstate.adminContent[0].email).toBe(`test@email.com`)
		expect(viewstate.adminContent[0].name).toBe(`testname`)
		expect(viewstate.adminContent[0].roles[0]).toBe(`admin`)
		expect(viewstate.adminContent[0].username).toBe(`testusername`)
	})

	it(`should rerender when new content is added`, ()=> {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)

		const viewstate = wrapper.find(`CreateContent`).props().viewstate

		// console.log(viewstate)
		// console.log(wrapper.debug())
	})
})