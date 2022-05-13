import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Load from '../../../../components/c/Load/index'
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'

describe(`Load test`, () => {
	it(`wrapper`, ()=> {
		const parent = mount(
			<div id='load'></div>,
		)
		document.getElementById = jest.fn((tag) => parent.instance())
		const wrapper = mount(
			<BrowserRouter>
				<Load />
			</BrowserRouter>,
		)
	})
})