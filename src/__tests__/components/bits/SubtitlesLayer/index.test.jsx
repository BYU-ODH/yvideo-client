import React from 'react'
import { shallow, mount } from 'enzyme'
import SubtitlesLayer from '../../../../components/bits/SubtitlesLayer'
import { BrowserRouter } from 'react-router-dom'
import { Rnd } from 'react-rnd'
import { useDrop } from 'react-dnd'

const subs = {
	end: 6.349206349206349,
	start: 1.0582010582010581,
	text: `123`,
}

const props = {
	subs,
}

describe(`Subtitles Layer test`, () => {
	it(`mount`, () => {
		// let wrapper = mount(
		// 	<BrowserRouter>
		// 		<SubtitlesLayer {...props} />
		// 	</BrowserRouter>
		// )

		// headers = wrapper.find({"className": "subs"}).at(0)
		// console.log(headers.debug())
	})

	// it(`toggleEditor onClick`, ()=> {
	// 	const mockCallBack = jest.fn();
	// 	const button = shallow(<Rnd onClick={mockCallBack}/>);
	// 	console.log(button.debug())
	//   button.find('Draggable').simulate('click');
	// 	expect(mockCallBack.mock.calls.length).toEqual(1);
	// })
})