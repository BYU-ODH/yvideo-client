import React from 'react'
import { shallow, mount } from 'enzyme'
import EventCard from '../../../../components/bits/EventCard/index'
import { BrowserRouter} from 'react-router-dom'
import Style, { I } from '../../../../components/bits/EventCard/styles'
import { useDrag } from 'react-dnd'

describe(`event card`, () => {
	it(`menu options`, ()=> {
		// const event = [
		// 	{
		// 		type: `Skip`,
		// 		icon: `assets/test.svg`,
		// 		start: 0,
		// 		end: 10,
		// 		layer: 0,
		// 	},
		// ]

		// let wrapper = mount(
		// 	<BrowserRouter>
		// 		<EventCard  event={event}/>
		// 	</BrowserRouter>,
		// )

		// let mockIsLoggedIn = false
		// let mockref = "ref"

		// jest.mock('../../../../components/bits/EventCard/index', () => {
		// 	return jest.fn(() => {
		// 		isDragging: mockIsDragging;
		// 		ref: mockref;
		// 	})
		// })

		// console.log(wrapper.debug())
		// const ref = React.createRef()
		// mockIsDragging = true
		// mockref = ref
		// expect(wrapper).not.toBeNull()

	})
})