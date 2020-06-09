import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../containers/c/LabAssistantContainer'
import { BrowserRouter } from 'react-router-dom'
import * as testutil from '../../testutil/testutil'

describe(`lab assistant container test`, () => {

	it(`test props should be true`, () => {
		const wrapper = shallow(
			<Container store={testutil.store}/>,
		).dive()

		const props = wrapper.props()
		const professor1 = props.professors[0]
		const professor2 = props.professors[1]

		expect(professor1.email).toBe(`test1@email.com`)
		expect(professor1.id).toBe(22)
		expect(professor1.lastLogin).toBe(`2020-05-14T19:53:02.807Z`)
		expect(professor1.name).toBe(`testname professor1`)
		expect(professor1.username).toBe(`testusername`)
		expect(professor1.roles[0]).toBe(`admin`)

		expect(professor2.email).toBe(`test2@email.com`)
		expect(professor2.id).toBe(23)
		expect(professor2.lastLogin).toBe(`2020-05-14T19:53:02.807Z`)
		expect(professor2.name).toBe(`testname professor2`)
		expect(professor2.username).toBe(`testusername2`)
		expect(professor2.roles[0]).toBe(`admin`)
	})

	// useEffect is commented out
	it(`render lab asisstant component to check viewstate`, () => {
		const wrapper = mount(
			<BrowserRouter>
				<Container store={testutil.store}/>
			</BrowserRouter>,
		)

		const viewstate = wrapper.find(`LabAssistant`).props().viewstate.data
		expect(viewstate[0].email).toBe(`test1@email.com`)
		expect(viewstate[0].id).toBe(22)
		expect(viewstate[0].lastLogin).toBe(`2020-05-14T19:53:02.807Z`)
		expect(viewstate[0].name).toBe(`testname professor1`)
		expect(viewstate[0].username).toBe(`testusername`)
		expect(viewstate[0].roles[0]).toBe(`admin`)

		expect(viewstate[1].email).toBe(`test2@email.com`)
		expect(viewstate[1].id).toBe(23)
		expect(viewstate[1].lastLogin).toBe(`2020-05-14T19:53:02.807Z`)
		expect(viewstate[1].name).toBe(`testname professor2`)
		expect(viewstate[1].username).toBe(`testusername2`)
		expect(viewstate[1].roles[0]).toBe(`admin`)
	})
})