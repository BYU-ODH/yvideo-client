import React from 'react'
import { shallow, mount, render } from 'enzyme'
import TimeBar from '../../../../../../../lib/js/trackEditor/components/bits/TimeBar/index'
import { BrowserRouter} from 'react-router-dom'


const props = {
	viewstate: {
		currentTime : '' ,
		totalTime: '',
	},
	handlers : {
		handleVideoScrubChange: jest.fn(),
	},
}

describe(`TimeBar test`, () => {
	it(`TimeBar`, ()=> {
		let wrapper = mount(
			<BrowserRouter>
				<TimeBar { ...props } />
			</BrowserRouter>,
		)
		// console.log(wrapper.debug())
	})
})