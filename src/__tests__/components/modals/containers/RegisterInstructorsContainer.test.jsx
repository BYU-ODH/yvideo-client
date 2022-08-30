import React from 'react'
import { mount } from 'enzyme'
import Container from '../../../../components/modals/containers/RegisterInstructorsContainer'
import { Form, Button } from '../../../../components/modals/components/RegisterInstructors/styles'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const props = {
	toggleModal: jest.fn(),
	search: jest.fn(),
}

describe(`RegisterInstructorsContainer test`, () => {

	it(`should pass event handlers test`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)
		expect(wrapper.contains(<td>testname</td>))
		expect(wrapper.contains(<td>testusername</td>))
		expect(wrapper.contains(<td>0</td>))
		expect(wrapper.contains(<td>test@email.com</td>))
		wrapper.find(`input`).simulate(`change`)
		wrapper.find(`button`).at(0).simulate(`click`)
		wrapper.find(Form).prop(`onSubmit`)()
		wrapper.find(Button).at(0).simulate(`click`)
	})
	it(`data is null`, () => {
		const wrapper = mount(
			<Provider store={testutil.emptyStore}>
				<Container {...props}/>
			</Provider>,
		)
		expect(wrapper).toBeDefined()
	})
})