import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Controller from '../../../../components/c/Controller/index'
import Style, {TimeBar, ToggleCarat, Blank, Censor, Comment, Subtitles } from '../../../../components/c/Controller/styles'
import { BrowserRouter} from 'react-router-dom'

const props = {
	getVideoTime: jest.fn(),
	reactPlayer: jest.fn(),
	setActiveCensorPosition: jest.fn(),
}
const reactPlayer = { props: {
	playing: false,
	volume: 1,
	muted: false,
	playbackRate: 1,
} }
const played = 0

describe(`Controller test`, () => {
	it(`simulate onClick`, ()=> {
			const wrapper = shallow(<Controller {...props}/>)
			// console.log(wrapper.debug())

		wrapper.find('button').at(0).simulate('click')
		wrapper.find('button').at(1).simulate('click')

		wrapper.find(Blank).simulate('ContextMenu', { preventDefault: () => {}	})
		wrapper.find('ReactPlayer').simulate('ContextMenu', { preventDefault: () => {}	})
		wrapper.find('ReactPlayer').simulate('Ready', reactPlayer)
		wrapper.find('ReactPlayer').simulate('Error')
		wrapper.find('ReactPlayer').simulate('Play')
		wrapper.find('ReactPlayer').simulate('Pause')
		wrapper.find('ReactPlayer').simulate('Duration')
		// wrapper.find('progress').simulate('click')
	})
	// it(`simulate onClick`, ()=> {
	// 	const mElement = { style: {width: "0"} }
	// 	// const elementMock = { addEventListener: jest.fn() }

	// 	const width = document.getElementById = jest.fn().mockReturnValueOnce(mElement)
	// 	// const listener = document.getElementById = jest.fn().mockImplementation(() => elementMock)
	// 	const wrapper = shallow(<Controller {...props}/>,{ attachTo: width })
	// 	wrapper.find('ReactPlayer').simulate('Progress', played)

	// })
})