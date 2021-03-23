import React from 'react'
import { shallow, mount } from 'enzyme'
import ToolTip from '../../../../components/bits/Tooltips/index'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const toolTip = testutil.toolTip

const props = {
	tip: {
		active: true,
		props : {
			name: 'help',
			position: {
				width: 20,
				x: 136,
				y: 108
			}
		},
	}
}

describe(`Subtitles Layer test`, () => {
	it(`mount`, () => {
		const vElement = { style: { visibility: "visible" } }
		const oElement = { style: { opacity: 1} }
	 	const visibility = document.getElementById = jest.fn().mockReturnValueOnce(vElement)
	 	const opacity = document.getElementById = jest.fn().mockReturnValueOnce(oElement)

		let wrapper = shallow(
			<Provider store={testutil.store}>
				<ToolTip {...props}/>
			</Provider>, {attachTo: visibility}
		)
		console.log(wrapper.debug())
	})
})