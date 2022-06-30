import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../containers/c/AdminContainer'
import * as testutil from '../../testutil/testutil'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import AdminService from '../../../services/s/admin.redux'
import thunk from 'redux-thunk'
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

const category = testutil.adminCategory

const searchResults = [
	{
		email: `test@test.com`,
		id: 0,
		"last-login": `2020-05-29T20:45:58.551Z`,
		"account-name": `testname`,
		"account-type": [`admin`],
		username: `searchResults testusername`,
	},
]

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

		expect(viewstate.category).toEqual(category)
	})
})

describe(`admin container mount`, () => {

	let adminServiceConstructor
	let mockStore
	let dispatch
	let getState
	let apiProxy

	// reset store
	beforeEach(() => {
		adminServiceConstructor = new AdminService()

		mockStore = createStore(
			adminServiceConstructor.reducer,
			{
				data: [],
				cache: {},
				professors: [],
				professor: {},
				professorCollections: null,
				profCollectionContent: null,
				loading: false,
				lastFetched: 0,
				lastFetchedProfContent: 0,
				lastFetchedProfessors: 0,
				lastFetchedCollections: 0,
				adminStore: {
					data: [],
					cache: {},
					professors: [],
					professor: {},
					professorCollections: {

					},
					profCollectionContent: null,
					loading: false,
					lastFetched: 0,
					lastFetchedProfContent: 0,
					lastFetchedProfessors: 0,
					lastFetchedCollections: 0,
				},
			},
			composeWithDevTools(
				applyMiddleware(thunk.withExtraArgument(proxies)),
			),
		)
		dispatch = store.dispatch
		getState = store.getState
		apiProxy = proxies.apiProxy
	})

	// TODO: submit does not change the searchQuery state, need to figure out how to check
	it(`mount admin container`, async() => {

		const wrapper = mount(
			<Provider store={mockStore}>
				<BrowserRouter>
					<Container/>
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
		await adminServiceConstructor.search(`user`, `searchResults testusername`, true)(dispatch, getState, { apiProxy })
		// TODO: it is updating store in admin service, but not the store that passed in
	})
})