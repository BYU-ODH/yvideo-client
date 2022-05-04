import React from 'react'
import { shallow, mount } from 'enzyme'
import Admin from '../../../../components/c/Admin/index'
import { BrowserRouter} from 'react-router-dom'

let viewstate = {
	category:{
		Collections:{
			name: `Collections`,
			placeholder: `Search for a collection`,
			url: `collection`,
		},
		Content: {
			name: `Content`,
			placeholder: `Search for content`,
			url: `content`,
		},
		Users: {
			name: `Users`,
			placeholder: `Search for a user`,
			url: `user`,
		},
	},
	data: [
		{
			email: `test@email.com`,
			id: 22,
			lastLogin: `2020-05-14T19:53:02.807Z`,
			linked: `-1`,
			name: `testname`,
			roles: [`admin`],
			username: `testusername`,
		},
	],
	placeholder: `Search for a user`,
	searchCategory: `Users`,
	searchQuery: `test`,
}

const handlers = {
	updateCategory: jest.fn(),
	updateSearchBar: jest.fn(),
	handleSubmit: jest.fn(),
	toggleMenu: jest.fn(),
	handleConfirmDelete: jest.fn(),
}

const tipHandlers = {
	tipHandlers: jest.fn(),
}

// TODO: need to check again for the updated admin dashboard
describe(`admin dashboard test`, () => {
	it(`should be true`, ()=> {
		const wrapper = mount(
			<BrowserRouter>
				<Admin viewstate={viewstate} handlers={handlers} tipHandlers={tipHandlers}/>
			</BrowserRouter>,
		)

		expect(wrapper.contains(<td>testusername</td>)).toEqual(true)
		expect(wrapper.contains(<td>testname</td>)).toEqual(true)
		expect(wrapper.contains(<td>admin</td>)).toEqual(true)
		expect(wrapper.contains(<td>test@email.com</td>)).toEqual(true)
		// expect(wrapper.contains(<td>Thu May 14 2020</td>)).toEqual(true)

		const category = wrapper.find(`#categorySelect`).at(2)
		expect(category.props().children[0].props.value).toBe(`Collections`)
		expect(category.props().children[1].props.value).toBe(`Content`)
		expect(category.props().children[2].props.value).toBe(`Users`)
	})
	it(`data is empty `, ()=> {
		viewstate.data = []
		const wrapper = mount(
			<BrowserRouter>
				<Admin viewstate={viewstate} handlers={handlers} tipHandlers={tipHandlers}/>
			</BrowserRouter>,
		)
		expect(wrapper.contains(<p>No users matched your search</p>)).toEqual(true)
	})
	it(`data is null `, ()=> {
		viewstate.data = null
		const wrapper = mount(
			<BrowserRouter>
				<Admin viewstate={viewstate} handlers={handlers} tipHandlers={tipHandlers}/>
			</BrowserRouter>,
		)
		expect(wrapper.contains(<p></p>)).toEqual(true)
	})
})