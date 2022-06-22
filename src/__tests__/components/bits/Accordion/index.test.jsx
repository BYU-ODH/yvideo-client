import React from 'react'
import AccordionMenu from '../../../../components/bits/Accordion/index'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const props = {
	active: true,
}

const wrapper =
<AccordionMenu {...props} />

const wrapperWithContent = // This is to test that with 2+ contents, the accordion displays them all
	<AccordionMenu {...props}>
		<div>test1</div>
		<div>test2</div>
	</AccordionMenu>

describe(`AccordionMenu test`, () => {
	describe(`Simulate onClick`, () => {
		it(`Carrot rotation`, async () => {
			render(wrapper)
			const user = userEvent.setup()

			const accordButton = screen.getByTestId(`accordion`)
			const carrot = screen.getByTestId(`carrot`)

			await user.click(accordButton)
			expect(carrot).toHaveStyle(`transform: rotate(0deg)`)

			await user.click(accordButton)
			expect(carrot).toHaveStyle(`transform: rotate(-180deg)`)
		})

		it(`No contents`, async () => {
			render(wrapper)
			const user = userEvent.setup()

			const accordButton = screen.getByTestId(`accordion`)
			const list = screen.getByTestId(`list`)

			await user.click(accordButton)
			expect(list).toHaveStyle(`height: 0px`)

			await user.click(accordButton)
			expect(list).toHaveStyle(`height: calc(4.16rem * 0)`)
		})
		// With just 1 content it seems to not create the children key and it doesn't work
		it(`2+ Contents`, async () => {
			render(wrapperWithContent)
			const user = userEvent.setup()

			const accordButton = screen.getByTestId(`accordion`)
			const list = screen.getByTestId(`list`)
			const contents = screen.queryAllByText(/test/i)

			await user.click(accordButton)
			expect(list).toHaveStyle(`height: 0px`)

			await user.click(accordButton)
			expect(list).toHaveStyle(`height: calc(4.16rem * 2)`)
			expect(contents).not.toBeNull()

		})
	})
})