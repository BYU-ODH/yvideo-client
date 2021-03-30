import React from 'react'
import { shallow, mount } from 'enzyme'
import SubtitlesLayer from '../../../../components/bits/SubtitlesLayer'
import { BrowserRouter } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { Rnd } from 'react-rnd'
import { useDrop } from 'react-dnd'

let subs = [{
	end: 10,
	start: 1,
	text: `123`,
	type: 'skip'
}]

const props = {
	subs,
	videoLength: 30,
	displayLayer: 1,
	sideEditor: jest.fn(),
	updateSubs: jest.fn(),
}

describe(`Subtitles Layer test`, () => {
	let wrapper
	beforeEach(() => {
		wrapper = mount(
			<BrowserRouter>
			<DndProvider backend={Backend}>
			<SubtitlesLayer {...props} />
			</DndProvider>
		</BrowserRouter>,
		)
	})
	it(`event type !== Pause`, () => {
		expect(wrapper.contains(<p>123 - From: 0.3s - To: 3.0s</p>)).toEqual(true)
			// console.log(wrapper.debug())
		// headers = wrapper.find({"className": "subs"}).at(0)
	})

	it(`event type === Pause`, () => {
		const d = { x: 2 }
		subs[0].type = 'Pause'
		wrapper = mount(
			<BrowserRouter>
				<DndProvider backend={Backend}>
					<SubtitlesLayer {...props} />
				</DndProvider>
		</BrowserRouter>,
		)
		expect(wrapper.contains(<p>Pause - At: 0.3s</p>)).toEqual(true)
		wrapper.find("Rnd").simulate('click')
	})

})