import React from 'react'
import { shallow, mount, render } from 'enzyme'
import CensorDnD from '../../../../components/bits/CensorDnD/index'
import { BrowserRouter} from 'react-router-dom'
import {CloseBox, BeforeButton, AfterButton} from '../../../../components/bits/CensorDnD/styles'


const props = {
	handleUpdateCensorPosition: jest.fn(),
	handleUpdateCensorResize: jest.fn(),
	setCensorEdit: jest.fn(),
	seekTo: jest.fn(),
	censorEdit: '1',
	censorValues: { '0': [ 0, 0, 800, 600 ], '1': [ 0, 0, 800, 600 ] },
	// screenHeight: 100,
}

describe(`CensorDnD test`, () => {
	it(`simulate BeforeButton onClick `, ()=> {
		const wrapper = mount(
			<BrowserRouter>
				<CensorDnD {...props}/>
			</BrowserRouter>,
		)
		let item = wrapper.find(BeforeButton).simulate('click', 0);
		expect(item).toBeDefined();
		item = wrapper.find(CloseBox).simulate('click');
		expect(item).toBeDefined();
	})
	it(`simulate AfterButton onClick`, ()=> {
		props.censorEdit = '0'
		props.censorValues =  { '0': [ 0, 0, 800, 600 ], '1': [ 0, 0, 800, 600 ], '2': [ 0, 0, 800, 600 ] }
		const wrapper = mount(
			<BrowserRouter>
				<CensorDnD {...props}/>
			</BrowserRouter>,
		)
		console.log(wrapper.debug())
		let item = wrapper.find(AfterButton).simulate('click');
		expect(item).toBeDefined();
	})
	it(`if censorEdit === -1`, ()=> {
		props.censorEdit = '-1'
		props.censorValues =  {}
		const wrapper = mount(
			<BrowserRouter>
				<CensorDnD {...props}/>
			</BrowserRouter>,
		)
		expect(wrapper).toBeDefined()
	})
})