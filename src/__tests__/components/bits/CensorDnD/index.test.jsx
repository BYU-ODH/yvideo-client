import React from 'react'
import { mount } from 'enzyme'
import CensorDnD from '../../../../components/bits/CensorDnD/index'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// TODO: completely rewrite because Censor is being rewritten

const props = {
	censorEdit: `1`,
	censorValues: { '0': [0, 0, 800, 600], '1': [0, 0, 800, 600] },
	// screenHeight: 100,
	handleUpdateCensorPosition: jest.fn(),
	handleUpdateCensorResize: jest.fn(),
	setCensorEdit: jest.fn(),
	seekTo: jest.fn(),

}
const wrapper =
	<BrowserRouter>
		<CensorDnD {...props}/>
	</BrowserRouter>

describe(`CensorDnD test`, () => {
	beforeEach(() => {
		render(wrapper)
	})
	afterEach(() => {
		jest.resetAllMocks()
		cleanup()
	})
	// it(`simulate BeforeButton onClick `, ()=> {
	// 	const wrapper = mount(
	// 		<BrowserRouter>
	// 			<CensorDnD {...props}/>
	// 		</BrowserRouter>,
	// 	)
	// 	let item = wrapper.find(`BeforeButton`).simulate(`click`, 0)
	// 	expect(item).toBeDefined()
	// 	item = wrapper.find(CloseBox).simulate(`click`)
	// 	expect(item).toBeDefined()
	// })
	// it(`simulate AfterButton onClick`, ()=> {
	// 	props.censorEdit = `0`
	// 	props.censorValues = { '0': [0, 0, 800, 600], '1': [0, 0, 800, 600], '2': [0, 0, 800, 600] }
	// 	const wrapper = mount(
	// 		<BrowserRouter>
	// 			<CensorDnD {...props}/>
	// 		</BrowserRouter>,
	// 	)
	// 	const item = wrapper.find(`AfterButton`).simulate(`click`)
	// 	expect(item).toBeDefined()
	// })
	it(`if censorEdit === -1`, () => {
		props.censorEdit = `-1`
		props.censorValues = {}
		const wrapper = mount(
			<BrowserRouter>
				<CensorDnD {...props}/>
			</BrowserRouter>,
		)
		expect(wrapper).toBeDefined()
	})
})