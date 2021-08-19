import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Status from '../../../../../../../lib/js/trackEditor/components/c/Status/index'
import Style, { ToggleButton } from '../../../../../../../lib/js/trackEditor/components/c/Status/styles'
import { BrowserRouter} from 'react-router-dom'


const props = {
	viewstate: {
		playing: true ,
		muted: true ,
		currentTime: '123' ,
		totalTime: '123' ,
		minimized: true ,
	},
	handlers : {
		togglePlay: jest.fn(),
		toggleMuted: jest.fn(),
		toggleMinimize: jest.fn(),
		handleVideoScrubChange: jest.fn(),
	},
}


describe(`Status test`, () => {
	it(`wrapper`, ()=> {
		let wrapper = mount(
			<BrowserRouter>
				<Status { ...props } />
			</BrowserRouter>,
		)
		wrapper.find(ToggleButton).simulate('click')
	})
	it(`wrapper`, ()=> {
		props.viewstate.minimized = false
		let wrapper = mount(
			<BrowserRouter>
				<Status { ...props } />
			</BrowserRouter>,
		)
		wrapper.find(ToggleButton).simulate('click')
	})
})