import React from 'react'
import Scrubber from '../../../../components/bits/Scrubber'
import { render, screen, cleanup } from '@testing-library/react'
const props = {
	duration: 300,
	clipTime: [],
	clipPercent: [],
	progress: 0,
	active: true,
	handleClick: jest.fn(),
	skipArray: [0, 60],
}
const wrapper =
	<Scrubber {...props}/>

describe(`stock test`, () => {
	afterEach(() => {
		jest.resetAllMocks()
		cleanup()
	})

	it(`test render of the bar`, () => {
		render(wrapper)

		const scrubber = screen.getByTestId(`scrubber`)
		expect(scrubber).toBeDefined()
	})
})
