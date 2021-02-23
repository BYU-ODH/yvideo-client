import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Controls from '../../../../../../../lib/js/trackEditor/components/bits/Controls/index'
import Style, { PlayPause, Time,  Volume } from '../../../../../../../lib/js/trackEditor/components/bits/Controls/styles'

import { BrowserRouter} from 'react-router-dom'
import { Duration } from 'luxon/src/duration.js'

const props = {
	viewstate: {
		playing: true ,
		muted: true ,
		currentTime: '135.5' ,
		totalTime: '111' ,
	},
	handlers : {
		toggleMuted: jest.fn(),
		togglePlay: jest.fn(),
	},
}

describe(`Controls test`, () => {
	it(`wrapper`, ()=> {
		let wrapper = mount(
			<BrowserRouter>
				<Controls { ...props } />
			</BrowserRouter>,
		)
		const time = wrapper.find(Time)
		expect(time.text()).toEqual(`02:15`)

		const playPause = wrapper.find(PlayPause).simulate('click');
		expect(playPause).toBeDefined()

		const volume = wrapper.find(Volume).simulate('click');
		expect(volume).toBeDefined()
	})
	it(`wrapper`, ()=> {
		props.viewstate.playing = false
		props.viewstate.muted = false
		let wrapper = mount(
			<BrowserRouter>
				<Controls { ...props } />
			</BrowserRouter>,
		)
		const time = wrapper.find(Time)
		expect(time.text()).toEqual(`02:15`)

		const playPause = wrapper.find(PlayPause).simulate('click');
		expect(playPause).toBeDefined()

		const volume = wrapper.find(Volume).simulate('click');
		expect(volume).toBeDefined()
	})
})