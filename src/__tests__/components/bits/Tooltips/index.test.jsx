import React from 'react'
import { shallow, mount } from 'enzyme'
import ToolTip from '../../../../components/bits/Tooltips/index'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const props = {
	tip: {
		active: true,
		props : {
			name: `help`,
			position: {
				width: 20,
				x: 136,
				y: 108,
			},
		},
	},
}

describe(`ToolTip test`, () => {
	it(`tip.active is true`, () => {
		const vElement = { style: { visibility: `visible`, opacity: 1 } }
	 	document.getElementById = jest.fn((tag) => {
			return vElement
		 })

		const wrapper = mount(
			<Provider store={testutil.store}>
				<ToolTip {...props}/>
			</Provider>,
		)
		expect(wrapper).toBeDefined()
	})
	it(`tip.active is false`, () => {
		const vElement = { style: { visibility: `hidden`, opacity: 0 } }
	 	document.getElementById = jest.fn((tag) => {
			return vElement
		 })

		const wrapper = mount(
			<Provider store={testutil.emptyStore}>
				<ToolTip {...props}/>
			</Provider>,
		)
		expect(wrapper).toBeDefined()
	})
	it(`window.innerWidth < 600`, () => {
		const vElement = { style: { visibility: `hidden` } }
	 	document.getElementById = jest.fn((tag) => {
			return vElement
		 })
		 global.innerWidth = 500
		const wrapper = mount(
			<Provider store={testutil.emptyStore}>
				<ToolTip {...props}/>
			</Provider>,
		)
		expect(wrapper).toBeDefined()
	})
})