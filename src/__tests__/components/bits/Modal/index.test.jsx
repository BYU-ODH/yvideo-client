import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Modal from '../../../../components/bits/Modal/index'
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'
// jest.mock('react-dom')

describe(`Modal test`, () => {
	it(`wrapper`, ()=> {

		let wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Modal {...initialProps} />
				</BrowserRouter>
			</Provider>,
		)

		const classList = { add: jest.fn(), remove: jest.fn() };
    // expect(classList.add).toBeCalledWith('active');

	})
})