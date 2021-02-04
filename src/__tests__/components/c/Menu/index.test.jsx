import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Menu from '../../../../components/c/Menu/index'
import * as testutil from '../../../testutil/testutil'

const user = testutil.user

const viewstate = {
	user,
	initials: `T`,
	menuActive: true,
	isProf: false,
	isAdmin: true,
}

const handlers = {
	toggleMenu: jest.fn(),
	handleLogout: jest.fn(),
}

describe(`MenuContainer test`, () => {

	it(`shallow`, () => {
		const wrapper = shallow(
			<Menu viewstate={viewstate} handlers={handlers}/>,
		)
	})

	it(`should map to link correctly`, () => {
		const wrapper = mount(
			<BrowserRouter>
				<Menu viewstate={viewstate} handlers={handlers}/>
			</BrowserRouter>,
		)

		const links = wrapper.find(`Link`)

		links.forEach(link => {
			const to = link.props().to
			const children = link.props().children
			if(to === `/admin`)
				expect(children).toBe(`Admin Dashboard`)
			if(to === `/lab-assistant`)
				expect(children).toBe(`Lab Assistant Dashboard`)
			if(to === `/`)
				expect(children).toBe(`View Collections`)
			if(to === `/manager`) {
				if(to.createCollection === true)
					expect(children).toBe(`Create New Collection`)
				else
					expect(children).toBe(`Manage Collections`)
			}
			if(to === `/feedback`)
				expect(children).toBe(`Feedback / Issues`)
		})
	})
})