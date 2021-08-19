import React from 'react'
import { shallow, mount, render } from 'enzyme'
import TimelineEditor from '../../../../../../../lib/js/trackEditor/components/c/TimelineEditor/index'
// import Style, { ToggleButton } from '../../../../../../../lib/js/trackEditor/components/c/Status/styles'
import { BrowserRouter} from 'react-router-dom'


const props = {
	viewstate: {
		playing: true ,
		muted: true ,
		minimized: true ,
		currentTime: '123' ,
		totalTime: '123' ,
	},
	handlers : {
		togglePlay: jest.fn(),
		toggleMuted: jest.fn(),
		toggleMinimize: jest.fn(),
		handleVideoScrubChange: jest.fn(),
	},
}


describe(`TimelineEditor test`, () => {
	it(`wrapper`, ()=> {
		let wrapper = mount(
			<BrowserRouter>
				<TimelineEditor { ...props } />
			</BrowserRouter>,
		)
	})
	it(`wrapper`, ()=> {
		props.viewstate.minimized = false
		let wrapper = mount(
			<BrowserRouter>
				<TimelineEditor { ...props } />
			</BrowserRouter>,
		)
	})
})