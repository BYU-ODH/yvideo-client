import React from 'react'
import { mount } from 'enzyme'
import LabAssistant from '../../../../components/c/LabAssistant/index'
import { BrowserRouter } from 'react-router-dom'

const viewstate = {
	data: [
		{
			email: `test@email.com`,
			id: 22,
			lastLogin: `2020-05-14T19:53:02.807Z`,
			linked: `-1`,
			name: `professor testname`,
			roles: [`admin`],
			username: `testusername`,
		},
		{
			email: `test2@email.com`,
			id: 23,
			lastLogin: `2020-05-14T19:53:02.807Z`,
			linked: `-1`,
			name: `professor testname2`,
			roles: [`admin`],
			username: `testusername2`,
		},
	],
	placeholder: `Search for a professor`,
	searchCategory: `testquery`,
	isSubmitted: true,
}

const handlers = {
	handleSubmit: jest.fn(),
	updateSearchBar: jest.fn(),
}

const props = {
	viewstate,
	handlers,
}

describe(`admin dashboard test`, () => {
	it(`should be true`, () => {
		const wrapper = mount(
			<BrowserRouter>
				<LabAssistant {...props}/>
			</BrowserRouter>,
		)

		expect(wrapper.contains(<td data-testid='name'>professor testname</td>)).toEqual(true)
		expect(wrapper.contains(<td data-testid='name'>professor testname2</td>)).toEqual(true)
		// href="/lab-assistant-manager/22"

		const testViewstate = wrapper.props().children.props.viewstate.data
		expect(testViewstate[0].email).toBe(`test@email.com`)
		expect(testViewstate[0].name).toBe(`professor testname`)
		expect(testViewstate[0].roles[0]).toBe(`admin`)
		expect(testViewstate[0].username).toBe(`testusername`)

		expect(testViewstate[1].email).toBe(`test2@email.com`)
		expect(testViewstate[1].name).toBe(`professor testname2`)
		expect(testViewstate[1].roles[0]).toBe(`admin`)
		expect(testViewstate[1].username).toBe(`testusername2`)
	})
})