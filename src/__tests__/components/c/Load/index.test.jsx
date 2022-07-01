import React from 'react'
import { mount } from 'enzyme'
import Load from '../../../../components/c/Load/index'
import { BrowserRouter } from 'react-router-dom'

describe(`Load test`, () => {
	it(`wrapper`, () => {
		const parent = mount(
			<div id='load'></div>,
		)
		document.getElementById = jest.fn((tag) => parent.instance())
		mount(
			<BrowserRouter>
				<Load />
			</BrowserRouter>,
		)
	})
})