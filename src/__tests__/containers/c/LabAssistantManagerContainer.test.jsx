import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Container from '../../../containers/c/LabAssistantManagerContainer'
import * as testutil from '../../testutil/testutil'
import configureMockStore from 'redux-mock-store'

const thunk = require(`redux-thunk`).default
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

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
	archived: false,
	content,
	id: 1,
	name: `Collection 2`,
	owner: 22,
	published: true,
	thumbnail: `test@thumbnail`,
}

const collection3 = {
	archived: false,
	content,
	id: 2,
	name: `Collection 3`,
	owner: 22,
	published: true,
	thumbnail: `test@thumbnail`,
}

const user = testutil.user

const collections = [
	collection1,
	collection2,
]

const collections2 = [
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

const store = mockStore({
	adminStore:{
		professor,
		professorCollections: collections,
	},
	authStore:{
		user,
	},
})

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
			<Provider store={store}>
				<BrowserRouter>
					<Container {...props} createNew={jest.fn()}/>
				</BrowserRouter>
			</Provider>,
		)

		const viewstate = wrapper.find(`Manager`).props().viewstate

		// viewstate content of collection
		expect(viewstate.collection.archived).toBe(false)
		expect(viewstate.collection.content[0].name).toBe(`testname`)
		expect(viewstate.collection.content[0].contentType).toBe(`video`)
		expect(viewstate.collection.content[0].thumbnail).toBe(`test@thumbnail.com`)
		expect(viewstate.collection.content[0].physicalCopyExists).toBe(false)
		expect(viewstate.collection.content[0].isCopyrighted).toBe(false)
		expect(viewstate.collection.content[0].expired).toBe(true)
		expect(viewstate.collection.content[0].resourceId).toBe(`5ebdaef833e57cec218b457c`)

		// viewstate collection
		expect(viewstate.collection.id).toBe(0)
		expect(viewstate.collection.name).toBe(`Collection 1`)
		expect(viewstate.collection.owner).toBe(22)
		expect(viewstate.collection.published).toBe(true)
		expect(viewstate.collection.thumbnail).toBe(`test@thumbnail`)

		// viewstate path
		expect(viewstate.path).toBe(`lab-assistant-manager/22`)

		// viewstate user
		expect(viewstate.user.email).toBe(`test1@email.com`)
		expect(viewstate.user.lastLogin).toBe(`2020-05-14T19:53:02.807Z`)
		expect(viewstate.user.name).toBe(`testname professor1`)
		expect(viewstate.user.roles[0]).toBe(`admin`)
		expect(viewstate.user.username).toBe(`testusername`)

		// console.log(wrapper.debug())

		// TODO: need to figure out how to check createNew function is triggered
		// const spy = jest.spyOn(wrapper.props().children.props.children.props, `toggleModal`)
		// const spy = jest.spyOn(wrapper.find(`Connect(LabAssistantManagerContainer)`).props(), `createNew`)
		// wrapper.find(`button`).simulate(`click`)
		// expect(spy).toHaveBeenCalled()
		// wrapper.find(`Manager`).simulate(`click`)
		// wrapper.find(`button`).simulate(`click`)
		// expect(wrapper.find(`CreateCollectionContainer`).length).toBe(1)

		// wrapper.props().children.props.children.props.collections.push(collection3)
		// wrapper.setProps({collections: collections2})
		// wrapper.update()
		// console.log(wrapper.update().debug())
		// console.log(wrapper.props().children.props.children.props.collections)
	})
})