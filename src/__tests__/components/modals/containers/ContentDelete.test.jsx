import React from 'react'
import ContentDelete from '../../../../components/modals/components/ContentDelete'
import {render, screen, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const props ={
	viewstate: {
		deleteContentItem: `delete test`,
	},
	handlers: {
		toggleModal: jest.fn(),
		handleDeleteContent: jest.fn(),
	},

}

const wrapper =
	<ContentDelete {...props}/>

describe(`ContentDelete Modal test`, () => {
	beforeEach(() => {
		render(wrapper)
	})

	afterEach(() => {
		jest.resetAllMocks()
		cleanup()
	})

	it(`should render the modal`, () => {
		expect(wrapper).toBeDefined()
	})

	it(`all content functionality test`, async () => {
		const user = userEvent.setup()
		expect(screen.queryByText(/delete test/i)).not.toBeNull()

		const cancelBtn = screen.queryByRole(`button`, {name: `Cancel`})
		const deleteBtn = screen.queryByRole(`button`, {name: `Delete`})

		await user.click(cancelBtn)
		await user.click(deleteBtn)

		expect(props.handlers.toggleModal).toHaveBeenCalled()
		expect(props.handlers.handleDeleteContent).toHaveBeenCalled()

	})

})
