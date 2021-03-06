import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { Router, BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Container from '../../../containers/c/ManagerContainer'
import * as testutil from '../../testutil/testutil'

const collections = testutil.collections

const props = {
	admin: true,
	collections,
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
		// const viewstate = wrapper.find(`Manager`).props().viewstate
		// console.log(viewstate)
		// console.log(wrapper.debug())

	})

	it(`mount`, () => {

	})
})