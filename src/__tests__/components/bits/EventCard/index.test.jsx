import React from 'react'
import { shallow, mount } from 'enzyme'
import EventCard from '../../../../components/bits/EventCard/index'
import { BrowserRouter} from 'react-router-dom'
import Style, { I } from '../../../../components/bits/EventCard/styles'


describe(`event card`, () => {
	it(`menu options`, ()=> {
		const event = [
			{
				type: `Skip`,
				icon: 'assets/test.svg',
				start: 0,
				end: 10,
				layer: 0,
			},
		]

		let wrapper = mount(
			<BrowserRouter>
				<EventCard  event={event}/>
			</BrowserRouter>,
		)

		console.log(wrapper.debug())
		expect(wrapper.contains(<I src={"assets/test.svg"}>Skip</I>)).toEqual(true)


	})
})