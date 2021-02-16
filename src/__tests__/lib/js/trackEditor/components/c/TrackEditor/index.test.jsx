import React from 'react'
import { shallow, mount, render } from 'enzyme'
import TrackEditor from '../../../../../../../lib/js/trackEditor/components/c/TrackEditor/index'
import { BrowserRouter} from 'react-router-dom'

const props = {
	viewstate: {
		content: '' ,
		playing: true ,
		muted: true ,
		minimized: true ,
		currentTime: '123' ,
		totalTime: '123' ,
	},
	handlers : {
		ogglePlay: jest.fn(),
		toggleMinimize: jest.fn(),
		toggleMuted: jest.fn(),
		handleVideoScrubChange: jest.fn(),
		handleTotalTimeChange: jest.fn(),
		handleCurrentTimeChange: jest.fn(),
		handleSetPlayerRef: jest.fn(),
	},
}

describe(`TrackEditor test`, () => {
	it(`TrackEditor`, ()=> {
		let wrapper = mount(
			<BrowserRouter>
				<TrackEditor { ...props } />
			</BrowserRouter>,
		)
	})
})