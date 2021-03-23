import React from 'react'
import { shallow, mount } from 'enzyme'
import ToolTip from '../../../../components/bits/Tooltips/index'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const toolTip = testutil.toolTip

const props = {
	toolTip
}

describe(`Subtitles Layer test`, () => {
	it(`mount`, () => {
		let wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<ToolTip {...props} />
				</BrowserRouter>
			</Provider>,
		)
		console.log(wrapper.debug())
	})
})