import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../containers/c/CaptionAiderContainer'
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


	})
