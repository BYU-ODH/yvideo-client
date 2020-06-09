import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../containers/c/AdminContainer'
import * as testutil from '../../testutil/testutil'
import { BrowserRouter } from 'react-router-dom'

describe(`admin container test`, () => {
	it(`test props should be true`, () => {
		const wrapper = shallow(
			<Container store={testutil.store}/>,
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
				<Container store={testutil.store}/>
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