import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import Container from '../../../containers/c/CollectionPermissionsContainer'
import * as testutil from '../../testutil/testutil'
import { BrowserRouter } from 'react-router-dom'

const collection = testutil.collection

const roles = testutil.roles

const props = {
	collection,
	roles,
	getCollectionRoles: jest.fn(),
	updateCollectionRoles: jest.fn(),
}

describe(`CollectionPermissionsContainer test`, () => {

	it(`should get correct viewstate`, () => {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = wrapper.props().viewstate

		// viewstate content of collection
		expect(viewstate.collection.archived).toBe(false)
		expect(viewstate.collection.content[0].name).toBe(`testname`)
		expect(viewstate.collection.content[0].contentType).toBe(`video`)
		expect(viewstate.collection.content[0].thumbnail).toBe(`test@thumbnail.com`)
		expect(viewstate.collection.content[0].physicalCopyExists).toBe(false)
		expect(viewstate.collection.content[0].isCopyrighted).toBe(false)
		expect(viewstate.collection.content[0].expired).toBe(true)
		expect(viewstate.collection.content[0].resourceId).toBe(`5ebdaef833e57cec218b457c`)

		// viewstate collection
		expect(viewstate.collection.id).toBe(0)
		expect(viewstate.collection.name).toBe(`Collection 1`)
		expect(viewstate.collection.owner).toBe(22)
		expect(viewstate.collection.published).toBe(true)
		expect(viewstate.collection.thumbnail).toBe(`test@thumbnail`)

		// roles
		expect(viewstate.roles.admins[0].id).toBe(22)
		expect(viewstate.roles.admins[0].username).toBe(`testusername`)
		expect(viewstate.roles.admins[0].name).toBe(`testname`)
		expect(viewstate.roles.admins[0].roles[0]).toBe(`admin`)
	})

	it(`mount for behavioral test`, () => {
		const wrapper = mount(
			<Provider store={testutil.store} >
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)

		// check state before changing
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.disabled.catalog).toBe(true)
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.disabled.section).toBe(true)
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.disabled.submit).toBe(true)
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.disabled.taFaculty).toBe(true)
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.disabled.exception).toBe(true)

		// handleDepartmentChange
		// drop down select department
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.department).toBe(`*`)
		wrapper.find({"className" : `department-select`}).at(0).simulate(`change`, {target: {value: `ACC`}})
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.department).toBe(`ACC`)
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.disabled.catalog).toBe(false)
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.disabled.submit).toBe(false)

		// handleCatalogChange
		// adding new catalog
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.catalog).toBe(``)
		wrapper.find({"className" : `catalog-input`}).at(0).simulate(`change`, {target: {value: `test catalog`}})
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.catalog).toBe(`test catalog`)
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.disabled.section).toBe(false)

		// handleSectionChange
		// adding section num
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.section).toBe(``)
		wrapper.find({"className" : `section-input`}).at(0).simulate(`change`, {target: {value: 33}})
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.section).toBe(33)

		// addCourse
		// onsubmit reset values
		wrapper.find({"className" : `add-course-button`}).at(0).simulate(`click`)
		wrapper.find(`form`).at(0).simulate(`submit`)
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.department).toBe(`*`)
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.catalog).toBe(``)
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.section).toBe(``)
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.disabled.catalog).toBe(true)
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.disabled.section).toBe(true)

		// removeCourse
		// TODO: need to figure out how to check if it is actually called
		wrapper.find({"className" : `remove-button`}).at(0).simulate(`click`)

		// handleTaFacultyChange
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.taFaculty).toBe(``)
		wrapper.find({"className" : `faculty-input`}).at(0).simulate(`change`, {target: {value: `test ta input`}})
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.taFaculty).toBe(`test ta input`)
		wrapper.find({"className" : `faculty-submit`}).at(0).simulate(`submit`)
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.taFaculty).toBe(``)
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.disabled.taFaculty).toBe(false)

		// handleExceptionChange
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.exception).toBe(``)
		wrapper.find({"className" : `exceptions-input`}).at(0).simulate(`change`, {target: {value: `test exception input`}})
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.exception).toBe(`test exception input`)
		wrapper.find({"className" : `exceptions-submit`}).at(0).simulate(`submit`)
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.exception).toBe(``)
		expect(wrapper.find(`CollectionPermissions`).props().viewstate.state.disabled.exception).toBe(false)

		// TODO: need to check to see if admins and exceptions remove button need to make
	})
})