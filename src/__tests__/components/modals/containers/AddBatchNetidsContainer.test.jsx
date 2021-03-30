import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../../components/modals/containers/AddBatchNetidsContainer'
import { CancelButton, Form } from '../../../../components/modals/components/AddBatchNetids/styles'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const props = {
	updateMany: jest.fn(),
	toggleModal: jest.fn(),
	setLoaded: jest.fn(),
	handleIdChange: jest.fn(),
}

describe(`AddBatchNetidsContainer test`, () => {
	it(`should get viewstate correctly`, ()=> {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()
	})

	it(`should pass event handlers test`, async()=> {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)
		let button = wrapper.find(Form).simulate(`submit`);
		expect(button).toBeDefined();
		button = wrapper.find(`textarea`).simulate(`change`, {target: {value: `test`}});
		expect(button).toBeDefined();
		button = wrapper.find(`textarea`).simulate(`change`, {target: {value: `t`}});
		expect(button).toBeDefined();
		button = wrapper.find(CancelButton).simulate(`click`);
		expect(button).toBeDefined();
	})
})