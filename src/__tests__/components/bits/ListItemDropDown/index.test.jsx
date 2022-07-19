import React from 'react'
import ListItemDropDown from '../../../../components/bits/ListItemDropDown/index'
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
		clips:
		`{
			"0": {
			"start": 0,
			"end": 70,
			"title": "testTitle"
			}
		}`,
	},
	isDropDown: false
}

const wrapper =
	<BrowserRouter>
		<ListItemDropDown {...props} />
	</BrowserRouter>

props.isDropDown = true

const dropDownWrapper =
	<BrowserRouter>
		<ListItemDropDown {...props} />
	</BrowserRouter>

describe(`ListItem test (not dropDown)`, () => {
	beforeEach(() => {
		render(wrapper)
	})
	afterEach(() => {
		jest.resetAllMocks()
		cleanup()
	})
	it(`test render ListItem`, () => {
		expect(screen.getByTestId(`list-item`)).toBeDefined()
		const link = screen.queryByRole(`link`)
		const name = screen.queryByText(/testname/i)
		const img = screen.queryByRole(`img`)

		expect(link).not.toBeNull()
		expect(link).toHaveAttribute(`href`, `/player/${props.data.id}`)

		expect(name).not.toBeNull()

		expect(img).not.toBeNull()
		expect(screen.queryByAltText(``)).toEqual(img)
	})
})

describe(`ListItem test (dropDown)`, () => {
	beforeEach(() => {
		render(dropDownWrapper)
	})
	afterEach(() => {
		jest.resetAllMocks()
		cleanup()
	})
	it(`test render ListItem`, async () => {
		const user = userEvent.setup()
		const listItem = screen.getByTestId(`list-item-dropDown`) // difference
		expect(listItem).toBeDefined() // difference

		const name = screen.queryByText(/testname/i)
		const img = screen.queryByRole(`img`)
		const carrot = screen.queryByTestId(`carrot`)

		expect(name).not.toBeNull()
		expect(img).not.toBeNull()
		expect(screen.queryByAltText(``)).toEqual(img)

		expect(carrot).not.toBeNull()
		expect(carrot).toHaveStyle(`transform: rotate(0deg)`)

		await user.click(listItem)

		expect(carrot).toHaveStyle(`transform: rotate(-180deg)`)
	})

	it(`test render dropDown body`, async () => {
		const listItem = screen.getByTestId(`list-item-dropDown`) // difference
		expect(listItem).toBeDefined()

		const links = screen.queryAllByRole(`link`)
		const clipTitle = screen.queryByText(`Clip - ${JSON.parse(props.data.clips)[0].title}`)
		const times = screen.getByText(/[0-9]\:[0-9]/i)

		expect(links).not.toBeNull()
		expect(links[0]).toHaveAttribute(`href`, `/player/${props.data.id}`)
		expect(links[1]).toHaveAttribute(`href`, `/player/${props.data.id}/0`)

		expect(clipTitle).not.toBeNull()

		expect(times).toHaveTextContent(`00:00`)
		expect(times).toHaveTextContent(`01:10`)

	})
})