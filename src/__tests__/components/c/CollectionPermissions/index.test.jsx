import React from 'react'
import { mount } from 'enzyme'
import CollectionPermissions from '../../../../components/c/CollectionPermissions'
import { BrowserRouter } from 'react-router-dom'
import { Sort } from '../../../../components/c/CollectionPermissions/styles'
import * as testutil from '../../../testutil/testutil'

const collection = testutil.collection

const viewstate = {
	collection,
	user: [
		{
			username: `test`,
		},
	],
	course: [
		{
			catalog: `100`,
			department: `ENG`,
			section: `01`,
		},
	],
	users: [
		{
			[`username`]: `test`,
			[`account-name`]: `testUser`,
			[`last-login`]: `2020-05-28`,
		},
		{
			[`username`]: `test1`,
			[`account-name`]: `testUser1`,
			[`last-login`]: `2020-05-29`,
		},
	],
	userTA: [
		{
			[`account-name`]: `test1`,
			[`account-role`]: 1,
			[`account-type`]: 4,
			[`email`]: `email`,
			[`id`]: `b41e8339-8ece-4ed2-8f44-281c88433c55`,
			[`last-login`]: `na`,
			[`username`]: `qwe`,
		},
		{
			[`account-name`]: `test1`,
			[`account-role`]: 1,
			[`account-type`]: 4,
			[`email`]: `email`,
			[`id`]: `b41e8339-8ece-4ed2-8f44-281c88433c55`,
			[`last-login`]: `na`,
			[`username`]: `asd`,
		},
	],
	courses: [
		{
			[`catalog-number`]: `100`,
			department: `ENG`,
			[`section-number`]: `01`,
		},
	],
	loaded: true,
	loggedinUser: {
		role: 0,
	},
}

const handlers = {
	addCourse: jest.fn(),
	handleDepartmentChange: jest.fn(),
	handleCatalogChange: jest.fn(),
	handleSectionChange: jest.fn(),
	addUser: jest.fn(),
	handleUserChange: jest.fn(),
	AddBatchNetids: jest.fn(),
	removeCourse: jest.fn(),
	removeUser: jest.fn(),
}

const props = {
	viewstate,
	handlers,
}

describe(`CollectionPermissions test`, () => {
	it(`test render CaptionAider`, () => {
		const wrapper = mount(
			<BrowserRouter>
				<CollectionPermissions {...props} />
			</BrowserRouter>,
		)
		expect(wrapper.contains(<h4>Courses</h4>)).toEqual(true)
		expect(wrapper.contains(<th>Department</th>)).toEqual(true)
		expect(wrapper.contains(<th>Course</th>)).toEqual(true)
		expect(wrapper.contains(<th>Section</th>)).toEqual(true)
		expect(wrapper.contains(<th>Remove</th>)).toEqual(true)
		expect(wrapper.contains(<h4>Current Users</h4>)).toEqual(true)
		expect(wrapper.text().includes(`Username`)).toBe(true)
		expect(wrapper.text().includes(`Name`)).toBe(true)
		expect(wrapper.text().includes(`Last Login`)).toBe(true)
		expect(wrapper.text().includes(`Remove`)).toBe(true)
		expect(wrapper.contains(<td>ENG</td>)).toEqual(true)
		expect(wrapper.contains(<td>100</td>)).toEqual(true)
		expect(wrapper.contains(<td>01</td>)).toEqual(true)
		wrapper.find(`td`).at(3).simulate(`click`)
	})

	it(`test loaded = false`, () => {
		props.viewstate.loaded = false
		const wrapper = mount(
			<BrowserRouter>
				<CollectionPermissions {...props} />
			</BrowserRouter>,
		)
		expect(wrapper.contains(<td>test</td>)).toEqual(true)
		expect(wrapper.contains(<td>testUser</td>)).toEqual(true)
		expect(wrapper.text().includes(`2020-05-29`)).toBe(true)
		wrapper.find(`td`).at(7).simulate(`click`)

		// wrapper.setState({ sortType: { reverse: false } })
		wrapper.sortType = { reverse: false }
		wrapper.find(Sort).at(0).simulate(`click`, props.viewstate.userTA, `Username`)
		wrapper.find(Sort).at(1).simulate(`click`, props.viewstate.userTA, `Name`)
		wrapper.sortType = { reverse: true }
		wrapper.find(Sort).at(0).simulate(`click`, props.viewstate.userTA, `Username`)
		wrapper.find(Sort).at(1).simulate(`click`, props.viewstate.userTA, `Name`)
	})
})
