import React from 'react'
import { mount } from 'enzyme'
import Container from '../../../containers/c/CaptionAiderContainer'
import * as testutil from '../../testutil/testutil'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
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
		<Provider store={store}>
			<BrowserRouter>
				<Container {...props}/>
			</BrowserRouter>
		</Provider>,
	)

	expect(wrapper).toBeDefined()
})
