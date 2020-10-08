import React from 'react'
import { shallow, mount } from 'enzyme'
import PermissionTable from '../../../../components/bits/PermissionTable'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const data = {
	email: `test@email.com`,
	id: 22,
	lastLogin: `2020-05-14T19:53:02.807Z`,
	linked: `-1`,
	name: `testname`,
	roles: [`admin`],
	username: `testusername`,
	column: `Department`,
}

const props = {
	data,
}

describe(`content overview test`, () => {
	it(`mount`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<PermissionTable {...props} />
				</BrowserRouter>
			</Provider>,
		)

		wrapper.find(`.tr`).forEach((node, index) => {
				expect(node.text()).toEqual(`Department`)

		})


	})
})