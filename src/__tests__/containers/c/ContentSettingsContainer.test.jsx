import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../containers/c/ContentSettingsContainer'
import { Provider } from 'react-redux'
import * as testutil from '../../testutil/testutil'

const content = testutil.content[0]
const resources = testutil.resources

const props = {
	content,
	getResources: jest.fn(),
	handlers: {
		setContentState: jest.fn(),
		setShowing: jest.fn(),
	},
	loading: false,
	resources,
	showing: true,
}

// nothing to test here
// TODO: if there is any, please add here
describe(`content settings container test`, () => {
	it(`mount`, ()=> {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props} />
			</Provider>,
		)
	})
})