import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { Router, BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Container from '../../../containers/c/ManagerContainer'
import { interfaceService } from 'services'
import * as testutil from '../../testutil/testutil'

const collections = testutil.collections

const props = {
	admin: true,
	collections,
	getCollections: jest.fn(),
	setHeaderBorder: jest.fn(),
	toggleModal: interfaceService.toggleModal,
}

const emptyProps = {
	admin: true,
	collections: {},
	getCollections: jest.fn(),
	setHeaderBorder: jest.fn(),
	toggleModal: jest.fn(),
}

// TODO: need to find how to pass match as a param, useParams.
describe(`manager container test`, () => {

	jest.mock(`react-router-dom`, () => ({
		params: jest.fn().mockReturnValue({ id: `0` }),
	}))

	it(`manager container check viewstate`, () => {

		const history = createMemoryHistory()
		const route = `'/manager/:id?'`
		history.push(route)

		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)

		// // check each collection link
		// wrapper.find({"className" : `link`}).forEach((link, index) => {
		// 	expect(link.props().children.props.to).toBe(`/manager/${index}`)
		// })

		// TODO: how to properly test toggleModal is initiated. I cannot find the way to see the interfaceStore is updated
		wrapper.find({"className" : `collection-create`}).at(0).simulate(`click`)

		wrapper.find({"className" : `help-document`}).simulate(`click`)
	})

	it(`mount container with empty store`, () => {
		const wrapper = mount(
			<Provider store={testutil.emptyStore}>
				<BrowserRouter>
					<Container {...emptyProps}/>
				</BrowserRouter>
			</Provider>,
		)
		expect(wrapper.find({"className" : `no-collections-body`}).at(0).props().children).toBe(`Select a Collection to get started.`)
	})
})