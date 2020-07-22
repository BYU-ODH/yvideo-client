import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../containers/c/AdminContainer'
import * as testutil from '../../testutil/testutil'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import proxies from 'proxy'
import store from 'services/store'

const user = testutil.user

const data = [user]

const props = {
	data,
	clean: jest.fn(),
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
		expect(props.data[0].roles).toBe(0)
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
		expect(viewstate.data[0].roles).toBe(0)
		expect(viewstate.data[0].username).toBe(`testusername`)
	})

	// TODO: submit does not change the searchQuery state, need to figure out how to check
	it(`mount admin container`, async() => {

		const searchResults = [
			{
				email:`test@test.com`,
				id:22,
				"last-login":`2020-05-29T20:45:58.551Z`,
				"account-name":`testname`,
				linked:-1,
				"account-type": [`admin`],
				username: `testusername`,
				published: false,
				archived: false,
			},
		]

		const wrapper = mount(
			<Provider store={store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)

		proxies.apiProxy.admin.search.get = jest.fn()
		proxies.apiProxy.admin.search.get.mockImplementationOnce(()=>{
			return Promise.resolve(searchResults)
		})

		// test the search query
		const viewstate = wrapper.find(`Admin`).props().viewstate
		expect(viewstate.searchQuery).toBe(``)
		wrapper.find({"type" : `search`}).simulate(`change`, {target: {value: `testusername`}})
		expect(wrapper.find({"type" : `search`}).props().value).toBe(`testusername`)
		wrapper.find({"id" : `searchSubmit`}).at(0).simulate(`submit`)

		// TODO: it is updating store in admin service, but not the store that passed in
	})
})