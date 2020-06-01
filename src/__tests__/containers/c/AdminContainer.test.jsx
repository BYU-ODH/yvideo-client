import React from 'react'
import { shallow, mount } from 'enzyme'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Container from '../../../containers/c/AdminContainer'
import configureMockStore from 'redux-mock-store'

import { BrowserRouter } from 'react-router-dom'

const mockStore = configureMockStore()

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	disableLifecycleMethods: true,
})

describe(`admin container test`, () => {
	const store = mockStore({
		adminStore: {
			data: [
				{
					email: `test@email.com`,
					id: 22,
					lastLogin: `2020-05-14T19:53:02.807Z`,
					linked: `-1`,
					name: `testname`,
					roles: [`admin`],
					username: `testusername`,
				},
			],
		},
	})

	it(`test props should be true`, () => {
		const wrapper = shallow(
			<Container store={store}/>,
		).dive()

		const props = wrapper.props()
		expect(props.data[0].email).toBe(`test@email.com`)
		expect(props.data[0].id).toBe(22)
		expect(props.data[0].lastLogin).toBe(`2020-05-14T19:53:02.807Z`)
		expect(props.data[0].name).toBe(`testname`)
		expect(props.data[0].username).toBe(`testusername`)
		expect(props.data[0].roles[0]).toBe(`admin`)
	})

	it(`mount admin container`, async() => {
		const wrapper = mount(
			<BrowserRouter>
				<Container store={store}/>
			</BrowserRouter>,
		)

		const viewstate = wrapper.find(`Admin`).props().viewstate.data

		expect(viewstate[0].email).toBe(`test@email.com`)
		expect(viewstate[0].id).toBe(22)
		expect(viewstate[0].lastLogin).toBe(`2020-05-14T19:53:02.807Z`)
		expect(viewstate[0].name).toBe(`testname`)
		expect(viewstate[0].username).toBe(`testusername`)
		expect(viewstate[0].roles[0]).toBe(`admin`)
	})
})