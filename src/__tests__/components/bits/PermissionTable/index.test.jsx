import React from 'react'
import { shallow, mount } from 'enzyme'
import PermissionTable from '../../../../components/bits/PermissionTable'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'
import { Table, RemoveButton } from '../../../../components/bits/PermissionTable/styles'

const data =
[
	{
		email: `test@email.com`,
		id: 22,
		lastLogin: `2020-05-14T19:53:02.807Z`,
		linked: `-1`,
		name: `testname`,
		roles: [`admin`],
		username: `testusername`,
		column: `Department`,
	},
]

const props = {
	data,
}

describe(`Permission Table test`, () => {
	it(`mount`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<PermissionTable {...props} />
				</BrowserRouter>
			</Provider>,
		)
		const item = wrapper.find({"className": `item`}).at(0)
		expect(item.text()).toEqual(`test@email.com`)
	})

	it(`RemoveButton onClick`, ()=> {
		const mockCallBack = jest.fn()
		const button = shallow(<RemoveButton onClick={mockCallBack}/>)
		button.find(`StyledComponent`).simulate(`click`)
		expect(mockCallBack.mock.calls.length).toEqual(1)
	})
})