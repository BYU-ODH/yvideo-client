import React from 'react'
import { shallow } from 'enzyme'
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import '@testing-library/dom'
import AccordionMenu from '../../../../components/bits/Accordion/index'

const props = {
	active: true,
	handleToggle: jest.fn(),
	monsole: jest.fn()
}

const wrapper = <AccordionMenu {...props}/>

describe(`AccordionMenu test`, () => {
	it(`simulate onClick`, async () => {
		render(wrapper)
		const user = userEvent.setup()
		const accordButton = screen.getByTestId(`accordion`)
		const carrot = screen.getByTestId(`carrot`)

		await user.click(accordButton)
		expect(carrot).toHaveStyle(`transform: rotate(0deg)`)
		await user.click(screen.getByTestId(`accordion`))
		expect(carrot).toHaveStyle(`transform: rotate(-180deg)`)

	})
})