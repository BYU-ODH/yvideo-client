import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Timeline from '../../../../../../../lib/js/trackEditor/components/c/Timeline/index'
import { BrowserRouter} from 'react-router-dom'


describe(`Timeline test`, () => {
	it(`Timeline onClick`, ()=> {
		let wrapper = mount(
			<BrowserRouter>
				<Timeline />
			</BrowserRouter>,
		)
		console.log(wrapper.debug())
	})
})