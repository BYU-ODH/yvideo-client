import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Player from '../../../../../../../lib/js/trackEditor/components/c/Player/index'
import { BrowserRouter} from 'react-router-dom'

const props = {
	viewstate: {
		ref : '',
		url : '',
		playing : true,
		playbackRate : 1,
		volume : 10,
		muted : true,
	},
	handlers : {
		togglePlay: jest.fn(),
		handleSetPlayerRef: jest.fn(),
		handleTotalTimeChange: jest.fn(),
		handleCurrentTimeChange: jest.fn(),
	},
}

describe(`Player test`, () => {
	it(`Player`, ()=> {
		let wrapper = shallow(<Player { ...props } />)
		wrapper.find('ReactPlayer').simulate('ref', {ref: 'test'})
		wrapper.find('ReactPlayer').simulate('Ready')
		wrapper.find('ReactPlayer').simulate('Start')
		wrapper.find('ReactPlayer').simulate('Play')
		wrapper.find('ReactPlayer').simulate('Pause')
		wrapper.find('ReactPlayer').simulate('Buffer')
		wrapper.find('ReactPlayer').simulate('Seek')
		wrapper.find('ReactPlayer').simulate('Error')
		const mProgress = {
			played: 12,
			playedSeconds: 12,
			loaded: 12,
			loadedSeconds: 12,
		}
		const mDuration = 12
		wrapper.find('ReactPlayer').simulate('Progress', {progress: mProgress})
		wrapper.find('ReactPlayer').simulate('Duration', {duration: mDuration})
	})
})