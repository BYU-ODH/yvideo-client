import React from 'react'
import { mount } from 'enzyme'
import Container from '../../../containers/c/BreadcrumbContainer'
import * as testutil from '../../testutil/testutil'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

describe(`BreadcrumbContainer`, () => {

	it(`BreadcrumbContainer`, async() => {

		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container/>
				</BrowserRouter>
			</Provider>,
		)
		expect(wrapper.contains(`Home`)).toEqual(true)
		expect(wrapper.contains(`Manage Collections`)).toEqual(true)
		expect(wrapper.contains(`Video Editor`)).toEqual(true)
		wrapper.find(`button`).at(0).simulate(`click`)
		wrapper.find(`button`).at(1).simulate(`click`)
		wrapper.find(`button`).at(2).simulate(`click`)
	})
	it(`BreadcrumbContainer 1`, async() => {

		const wrapper = mount(
			<Provider store={testutil.store2}>
				<BrowserRouter>
					<Container/>
				</BrowserRouter>
			</Provider>,
		)
		expect(wrapper.contains(`Home`)).toEqual(true)
		expect(wrapper.contains(`Manage Collections`)).toEqual(true)
		wrapper.find(`button`).at(0).simulate(`click`)
		wrapper.find(`button`).at(1).simulate(`click`)
	})
	it(`BreadcrumbContainer 1`, async() => {

		const wrapper = mount(
			<Provider store={testutil.emptyStore}>
				<BrowserRouter>
					<Container/>
				</BrowserRouter>
			</Provider>,
		)
		expect(wrapper).toBeDefined()
	})
})