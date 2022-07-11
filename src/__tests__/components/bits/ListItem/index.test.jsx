import React from 'react'
import ListItem from '../../../../components/bits/ListItem/index'
import { render, screen, cleanup, waitFor } from '@testing-library/react'
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
	isDropDown: false
}

const dropProps = {
	data: {
		id: `110`,
		name: `testname`,
		thumbnail: `test@thumbnail`,
		translation: `testTranslation`,
		captions: [],
		annotations: [],
	},
	isDropDown: true,
	togglePanel: jest.fn(),
}

const wrapper =
	<BrowserRouter>
		<ListItem {...props} />
	</BrowserRouter>

const dropWrapper =
	<BrowserRouter>
		<ListItem {...dropProps} />
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
	it(`test render ListItem with `, async () => {
		render(dropWrapper)
		expect(dropWrapper).toBeDefined()
		const user = userEvent.setup()

		const name = screen.queryByText(/testname/i)
		const img = screen.queryByRole(`img`)
		const carrot = screen.queryByTestId(`carrot`)
		const listItem = screen.queryByTestId(`list-item`)

		expect(screen.queryByRole(`link`)).toBeNull()

		expect(name).not.toBeNull()
		expect(img).not.toBeNull()
		expect(screen.queryByAltText(``)).toEqual(img)

		expect(carrot).not.toBeNull()
		expect(carrot).toHaveStyle(`transform: rotate(0deg)`)

		await user.click(listItem)
	})
})