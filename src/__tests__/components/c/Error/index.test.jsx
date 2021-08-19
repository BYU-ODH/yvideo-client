import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Error from '../../../../components/c/Error'
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'



describe(`Error test`, () => {
	it(`wrapper`, ()=> {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Error />
				</BrowserRouter>
			</Provider>,
		)
		wrapper.unmount()
	})
})