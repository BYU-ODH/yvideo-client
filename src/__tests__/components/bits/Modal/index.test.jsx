import React from 'react'
import { mount } from 'enzyme'
import Modal from '../../../../components/bits/Modal/index'
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'
// jest.mock('react-dom')

describe(`Modal test`, () => {
	it(`componentDidUpdate: classList: active`, () => {
		const parent = mount(
			<div id='modal'></div>,
		)
		document.getElementById = jest.fn((tag) => parent.instance())
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Modal />
				</BrowserRouter>
			</Provider>,
		)
		expect(wrapper).toBeDefined()
	})
	// it('componentDidUpdate: classList: hidden', () => {
	// 	let parent = mount(
	// 		<div id='modal'></div>
	// 	)
	// 	document.getElementById = jest.fn((tag) => parent.instance())
	// 	let wrapper = mount(
	// 		<Provider store={testutil.store2}>
	// 			<BrowserRouter>
	// 				<Modal />
	// 			</BrowserRouter>
	// 		</Provider>
	// 	)
	// 	wrapper.setProps({ active: true });
	// 	wrapper.update();
	// })
})