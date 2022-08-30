import React from 'react'
import {render, screen, cleanup, fireEvent, waitFor, act} from '@testing-library/react'
import AddUsers from '../../../../components/modals/components/AddUsers'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import * as testutil from '../../../testutil/testutil'

const props = {
	viewstate:{
		usernames: ``,
		addedUsersResult: {failResult: [`failtest`], successResult: [`successtest`]},
		isSubmitted: true,
	},
	handlers: {
		handleSubmit: jest.fn(),
		handleIdChange: jest.fn(),
		handleClose: jest.fn(),
	},
}

const wrapper=
		<AddUsers {...props} />
describe(`AddUsers test`, () => {
	beforeEach(() => {
		render(wrapper)
	})

	afterEach(() => {
		jest.resetAllMocks()
		cleanup()
	})

	it(`should render page`, () => {
		expect(wrapper).toBeDefined()
	})

	it(`content functionality test`, async () => {
		// this is not here becasue isSubmitted is true
		expect(screen.queryByText(/Paste a list of usernames, one per line./i)).toBeNull()

		const user = userEvent.setup()

		const closebtn = screen.queryByRole(`button`, {name: `Close`})
		const submitbtn = screen.queryByRole(`button`, {name: `Submit`})

		await user.click(closebtn)
		await user.click(submitbtn)

		expect(props.handlers.handleClose).toHaveBeenCalled()

	})

	it(`submit`, () => {
		fireEvent.submit(screen.getByTestId(`form`))
		expect(props.handlers.handleSubmit).toHaveBeenCalled()

	})

	it(`textarea text`, async () => {
		const textArea = screen.getByTestId(`success-text-area`)
		expect(textArea.value).toBe(``)
		fireEvent.change(textArea, {target:{value: [`test`]}})
		expect(props.handlers.handleIdChange).toHaveBeenCalled()
	})
})
