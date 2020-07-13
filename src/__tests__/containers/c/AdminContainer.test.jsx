import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../containers/c/AdminContainer'
import * as testutil from '../../testutil/testutil'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const user = testutil.user

const data = [user]

const props = {
	clean: jest.fn(),
	data,
	search: jest.fn(),
	setHeaderBorder: jest.fn(),
}

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

	it(`viewstate should generate successfully`, () => {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = wrapper.props().viewstate

		expect(viewstate.data[0].email).toBe(`test@email.com`)
		expect(viewstate.data[0].id).toBe(22)
		expect(viewstate.data[0].lastLogin).toBe(`2020-05-14T19:53:02.807Z`)
		expect(viewstate.data[0].name).toBe(`testname`)
		expect(viewstate.data[0].roles[0]).toBe(`admin`)
		expect(viewstate.data[0].username).toBe(`testusername`)
	})

	// TODO: submit does not change the searchQuery state, need to figure out how to check
	it(`mount admin container`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container store={testutil.store} {...props}/>
				</BrowserRouter>
			</Provider>,
		)

		// test the search query
		const viewstate = wrapper.find(`Admin`).props().viewstate
		expect(viewstate.searchQuery).toBe(``)
		wrapper.find({"type" : `search`}).simulate(`change`, {target: {value: `test user`}})
		expect(wrapper.find({"type" : `search`}).props().value).toBe(`test user`)
		wrapper.find({"id" : `searchSubmit`}).at(0).simulate(`submit`)

		// test category select
		expect(viewstate.searchCategory).toBe(`Users`)
		wrapper.find({"id" : `categorySelect`}).first().simulate(`change`, {target: {value: `Collections`}})
		wrapper.update()
	})
})