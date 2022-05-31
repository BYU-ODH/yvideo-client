import React from 'react'
import { mount } from 'enzyme'
import EventCard from '../../../../components/bits/EventCard/index'
import { BrowserRouter} from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

describe(`event card`, () => {
	it(`mock useDrag`, ()=> {
		const event = [
			{
				type: `Skip`,
				icon: `assets/test.svg`,
				start: 0,
				end: 10,
				layer: 0,
			},
		]
		const	wrapper = mount( // eslint-disable-line no-unused-vars
			<BrowserRouter>
				<DndProvider backend={Backend}>
					<EventCard event={event}/>
				</DndProvider>
			</BrowserRouter>,
		)
		// render(<EventCard event={event} />)

		// fireEvent.dragStart(screen)
		// fireEvent.dragEnter(screen)
		// fireEvent.dragOver(screen)
		// fireEvent.drop(screen)
	})
})