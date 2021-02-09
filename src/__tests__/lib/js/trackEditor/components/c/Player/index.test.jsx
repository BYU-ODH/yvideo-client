import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Player from '../../../lib/js/trackEditor/components/c/Player/index'
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

describe(`Controls test`, () => {
	it(`PlayPause onClick`, ()=> {
		let wrapper = mount(
			<BrowserRouter>
				<Player { ...props } />
			</BrowserRouter>,
		)
		console.log(wrapper.debug())
	})
	it(`PlayPause onClick`, ()=> {
		const mockCallBack = jest.fn()
		let wrapper = shallow(<Player { ...props } onPlay={mockCallBack} />)
		console.log(wrapper.debug())
		wrapper.find('ReactPlayer').simulate('Play')

	})
})