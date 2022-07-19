import React from 'react'
import ListItem from '../../../../components/bits/ListItem/index'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

const props = {
	data: {
		id: `110`,
		name: `testname`,
		thumbnail: `test@thumbnail`,
		translation: `testTranslation`,
		captions: [],
		annotations: [],
	},
	isDropDown: false,
	togglePanel: jest.fn(),
}

const wrapper =
	<BrowserRouter>
		<ListItem {...props} />
	</BrowserRouter>

props.isDropDown = true

const dropWrapper =
	<BrowserRouter>
		<ListItem {...props} />
	</BrowserRouter>

describe(`ListItem test`, () => {
	afterEach(() => {
		jest.resetAllMocks()
		cleanup()
	})
	it(`test render ListItem`, () => {
		render(wrapper)
		expect(wrapper).toBeDefined()

		const link = screen.queryByRole(`link`)
		const name = screen.queryByText(/testname/i)
		const img = screen.queryByRole(`img`)

		expect(link).not.toBeNull()
		expect(link).toHaveAttribute(`href`, `/player/${props.data.id}`)

		expect(name).not.toBeNull()

		expect(img).not.toBeNull()
		expect(screen.queryByAltText(``)).toEqual(img)
	})
	it(`test render ListItem with dropDown`, async () => {
		render(dropWrapper)

		const user = userEvent.setup()
		expect(screen.getByTestId(`list-item-dropDown`)).toBeDefined() // difference

		const name = screen.queryByText(/testname/i)
		const img = screen.queryByRole(`img`)
		const carrot = screen.queryByTestId(`carrot`)

		expect(name).not.toBeNull()
		expect(img).not.toBeNull()
		expect(screen.queryByAltText(``)).toEqual(img)

		expect(carrot).not.toBeNull()
		expect(carrot).toHaveStyle(`transform: rotate(0deg)`)

		await user.click(screen.getByTestId(`list-item-dropDown`))
	})
})