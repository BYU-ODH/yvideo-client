import React from 'react'
import EventCard from '../../../../components/bits/EventCard/index'
import { BrowserRouter} from 'react-router-dom'
import { render, screen, cleanup /* fireEvent*/ } from '@testing-library/react'

const event =
	{
		type: `Skip`,
		icon: `assets/test.svg`,
		start: 0,
		end: 10,
		layer: 0,
	}

const props = {
	event,
}

const	wrapper =
	<BrowserRouter>
		<EventCard {...props}/>
	</BrowserRouter>

describe(`event card`, () => {
	afterEach(() => {
		jest.resetAllMocks()
		cleanup()
	})
	it(`EventCard renders`, () => {
		render(wrapper)
		expect(screen.queryByText(/Skip/i)).not.toBeNull()
		expect(screen.queryByAltText(`icon`)).not.toBeNull()
	})

	it(`Skip renders`, () => {
		render(wrapper)
		expect(screen.queryByText(/Skip/i)).not.toBeNull()
	})

	it(`Mute renders`, () => {
		event.type = `Mute`
		render(wrapper)
		expect(screen.queryByText(/Mute/i)).not.toBeNull()
	})

	it(`Pause renders`, () => {
		event.type = `Pause`
		render(wrapper)
		expect(screen.queryByText(/Pause/i)).not.toBeNull()
	})

	it(`Comment renders`, () => {
		event.type = `Comment`
		render(wrapper)
		expect(screen.queryByText(/Comment/i)).not.toBeNull()
	})

	it(`Blur renders`, () => {
		event.type = `Censor`
		render(wrapper)
		expect(screen.queryByText(/Blur/i)).not.toBeNull()
	})

	it(`Blank renders`, () => {
		event.type = `Blank`
		render(wrapper)
		expect(screen.queryByText(/Blank/i)).not.toBeNull()
	})

})