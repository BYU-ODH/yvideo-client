import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Load from '../../../../components/c/Load/index'
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'


describe(`Load test`, () => {
	it(`wrapper`, ()=> {
		let parent = mount(
			<div id='load'></div>
		)
		document.getElementById = jest.fn((tag) => parent.instance())
		let wrapper = mount(
				<BrowserRouter>
					<Load />
				</BrowserRouter>
		)
	})
})