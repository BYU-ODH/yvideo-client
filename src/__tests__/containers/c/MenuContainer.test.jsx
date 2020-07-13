import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Container from '../../../containers/c/MenuContainer'
import * as testutil from '../../testutil/testutil'

const user = testutil.user

const props = {
	isAdmin: true,
	isProf: false,
	isStudent: false,
	logout: jest.fn(),
	menuActive: false,
	toggleMenu: jest.fn(),
	user,
}

describe(`MenuContainer test`, () => {

	it(`should get correct viewstate`, () => {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = wrapper.props().viewstate

		expect(viewstate.isProf).toBe(false)
		expect(viewstate.isAdmin).toBe(true)

		// viewstate user
		expect(viewstate.user.email).toBe(`email@testemail.com`)
		expect(viewstate.user.lastLogin).toBe(`2020-05-14T19:53:02.807Z`)
		expect(viewstate.user.name).toBe(`testname`)
		expect(viewstate.user.roles[0]).toBe(`admin`)
		expect(viewstate.user.username).toBe(`testusername`)

	})

	it(`mount`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)
	})
})