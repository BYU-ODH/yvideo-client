import React from 'react'
import { shallow, mount, render } from 'enzyme'
import TrackHandler from '../../../../../../../lib/js/trackEditor/components/c/TrackHandler/index'
import { BrowserRouter} from 'react-router-dom'


describe(`TrackHandler test`, () => {
	it(`TrackHandler`, ()=> {
		let wrapper = mount(
			<BrowserRouter>
				<TrackHandler />
			</BrowserRouter>,
		)
	})
})