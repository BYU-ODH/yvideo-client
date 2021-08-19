import React from 'react'
import { shallow, mount } from 'enzyme'
import EventCard from '../../../../components/bits/EventCard/index'
import { BrowserRouter} from 'react-router-dom'
import Style, { I } from '../../../../components/bits/EventCard/styles'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import * as dnd from 'react-dnd'
// import { screen, render, fireEvent } from 'testing-library/react'

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
		const	wrapper = mount(
				<BrowserRouter>
					<DndProvider backend={Backend}>
						<EventCard  event={event}/>
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