import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Container from '../../../containers/c/LabAssistantManagerContainer'
import * as testutil from '../../testutil/testutil'

const content = testutil.content

const collection1 = {
	archived: false,
	content,
	id: 0,
	name: `Collection 1`,
	owner: 22,
	published: true,
	thumbnail: `test@thumbnail`,
}
const collection2 = {
	archived: true,
	content,
	id: 1,
	name: `Collection 2`,
	owner: 22,
	published: false,
	thumbnail: `test@thumbnail`,
}

const collection3 = {
	archived: false,
	content,
	id: 2,
	name: `Collection 3`,
	owner: 22,
	published: false,
	thumbnail: `test@thumbnail`,
}

const collections = [
	collection1,
	collection2,
	collection3,
]

const professor = testutil.professor1

const props = {
	admin: true,
	collections,
	professor,
	searchCollections: jest.fn(),
	setHeaderBorder: jest.fn(),
	setProfessor: jest.fn(),
	toggleModal: jest.fn(),
}

jest.mock(`react-router-dom`, () => ({
	...jest.requireActual(`react-router-dom`), // use actual for all non-hook parts
	useParams: () => ({
		professorId: `22`,
		collectionId: `0`,
	}),
	useRouteMatch: () => ({ url: `/lab-assistant-manager/22/0` }),
}))

describe(`LabAssistantManagerContainer container test`, () => {

	it(`test props should be true`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props} createNew={jest.fn()}/>
				</BrowserRouter>
			</Provider>,
		)

		const viewstate = wrapper.find(`Manager`).props().viewstate

		// // viewstate path
		expect(viewstate.path).toBe(`lab-assistant-manager/22`)

		// // viewstate user
		expect(viewstate.user.email).toBe(`test1@email.com`)
		expect(viewstate.user.lastLogin).toBe(`2020-05-14T19:53:02.807Z`)
		expect(viewstate.user.name).toBe(`testname professor1`)
		expect(viewstate.user.roles).toBe(0)
		expect(viewstate.user.username).toBe(`testusername`)
	})

	it(`render`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)

		expect(wrapper.find({"className" : `collection-username`}).text()).toBe(`testname professor1's Collections`)
		expect(wrapper.find({"className" : `link`}).length).toBe(6)

		// TODO: need to figure out how to check the toggle
		wrapper.find({"className" : `collection-create`}).at(0).simulate(`click`)
	})

	it(`render without collections`, () => {
		const wrapper = mount(
			<Provider store={testutil.emptyStore}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)
		expect(wrapper.find({"className" : `no-collections`}).text()).toBe(`testname professor1 does not have any collections`)
	})
})