import React from 'react'
import { shallow, mount, render } from 'enzyme'
import TrackItemHandler from '../../../../../../../lib/js/trackEditor/components/c/TrackItemHandler/index'
import { BrowserRouter} from 'react-router-dom'


describe(`TrackItemHandler test`, () => {
	it(`TrackItemHandler`, ()=> {
		let wrapper = mount(
			<BrowserRouter>
				<TrackItemHandler />
			</BrowserRouter>,
		)
		expect(wrapper.contains(<h1>Track Item</h1>)).toEqual(true)
	})
})