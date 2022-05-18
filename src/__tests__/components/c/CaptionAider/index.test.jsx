import React from 'react'
import { mount } from 'enzyme'
import CaptionAider from '../../../../components/c/CaptionAider'
import { BrowserRouter } from 'react-router-dom'

const ref = React.createRef()
const mockref = ref

const viewstate = {
	target:mockref,
}

describe(`CaptionAider test`, () => {
	it(`test render CaptionAider`, ()=> {
		const wrapper = mount(
			<BrowserRouter>
				<CaptionAider viewstate={viewstate} />
			</BrowserRouter>,
		)
		expect(wrapper.contains(<div id='bottomContainer' ref={viewstate.target} />)).toEqual(true)
	})
})
