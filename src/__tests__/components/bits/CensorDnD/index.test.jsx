import React from 'react'
import { shallow, mount, render } from 'enzyme'
import CensorDnD from '../../../../components/bits/CensorDnD/index'
import { BrowserRouter} from 'react-router-dom'
import {CloseBox, BeforeButton, AfterButton} from '../../../../components/bits/CensorDnD/styles'


const props = {
	// handleUpdateCensorPosition: jest.fn(),
	// handleUpdateCensorResize: jest.fn(),
	// setCensorEdit: jest.fn(),
	// seekTo: jest.fn(),
	// censorEdit: -1,
	censorValues: {},
	// screenHeight: 100,
}

describe(`Captcha test`, () => {
	it(`simulate onClick`, ()=> {
		const wrapper = mount(
			<BrowserRouter>
				<CensorDnD {...props}/>
			</BrowserRouter>,
		)
		console.log(wrapper.debug())
		let item = wrapper.find('BeforeButton').simulate('click');
		expect(item).toBeDefined();
		// wrapper.find('Rnd').simulate('ResizeStop')
		// expect(onResizeStop).toHaveBeenCalled();
		// wrapper.find('CloseBox').simulate('click')
		// expect(onClick).toHaveBeenCalled();
		// wrapper.find('AfterButton').simulate('click')
		// expect(onClick).toHaveBeenCalled();
	})
})