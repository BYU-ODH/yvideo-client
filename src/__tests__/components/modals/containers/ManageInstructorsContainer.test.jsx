import React from 'react'
import { mount } from 'enzyme'
import Container from '../../../../components/modals/containers/ManageInstructorsContainer'
import { Form, AddButton, RemoveButton, Button } from '../../../../components/modals/components/ManageInstructors/styles'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const props = {
	toggleModal: jest.fn(),
	addAccess: jest.fn(),
	readAccess: jest.fn(),
	removeAccess: jest.fn(),
	resource: {
		id: `id1`,
	},
}

describe(`MorePublicCollectionsContainer test`, () => {
	it(`should pass event handlers test`, ()=> {

		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)
		wrapper.find(`input`).simulate(`change`, { target: { value: `value` } })
		wrapper.find(AddButton).simulate(`click`)
		expect(wrapper.contains(<td>yrich</td>))
		wrapper.find(RemoveButton).simulate(`click`)
		wrapper.find(Button).at(0).simulate(`click`)
		wrapper.find(Form).prop(`onSubmit`)
	})
	it(`resourceAccess is null`, ()=> {
		const wrapper = mount(
			<Provider store={testutil.emptyStore}>
				<Container {...props}/>
			</Provider>,
		)
		expect(wrapper).toBeDefined()
		expect(wrapper.contains(<>There is no registered user</>))
	})
})