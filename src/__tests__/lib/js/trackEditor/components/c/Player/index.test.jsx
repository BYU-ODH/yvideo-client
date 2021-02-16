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
		let wrapper = mount(
			<BrowserRouter>
				<Player { ...props } />
			</BrowserRouter>,
		)
		// console.log(wrapper.debug())
		// wrapper.find('ReactPlayer').simulate('Duration', { duration: 12 })
		wrapper.find("ReactPlayer").simulate('Progress')
	})
})