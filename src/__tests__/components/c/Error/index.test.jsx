import React from 'react'
import {render, screen, cleanup} from '@testing-library/react'
import Error from '../../../../components/modals/components/Error'
import userEvent from '@testing-library/user-event'

const props = {
	viewstate: {
		errorMessage: ``,
	},
	handlers: {
		toggleModal: jest.fn(),
	},
}

const wrapper=
	<Error {...props}/>

const errorForbidden = `403 forbidden`
const errorUnauthenticated = `401 unauthenticated`
const errorServer = `500 Server Error`
describe(`Error Message Test`, () => {
	// beforeEach(() => {
	// 	render(wrapper)
	// })
	afterEach(() => {
		jest.restoreAllMocks()
		cleanup()
	})

	it(`should render page`, () => {
		render(wrapper)
		expect(wrapper).toBeDefined()
	})

	it(`Error 1 test`, () => {
		props.viewstate.errorMessage = errorUnauthenticated
		render(wrapper)
		const title = (/401 Unauthenticated/i)
		const message = (/If you have an account,/i)

		expect(props.viewstate.errorMessage).toContain(`401`)
		expect(screen.getByText(title)).not.toBeNull()
		expect(screen.queryByText(message)).not.toBeNull()

	})

	it(`Error 2 funcatinality test with buttons`, async () => {
		props.viewstate.errorMessage = errorForbidden
		render(wrapper)
		const title = (/403 forbidden/i)
		const message = (/You don't have access to this content/i)
		const user = userEvent.setup()

		expect(props.viewstate.errorMessage).toContain(`403`)
		expect(screen.getByText(title)).not.toBeNull()
		expect(screen.queryByText(message)).not.toBeNull()

		const backBtn = screen.queryByRole(`button`, {name: `Go Back`})
		await user.click(backBtn)
		expect(props.handlers.toggleModal).toHaveBeenCalled()
	})

	it(`Error 3 test`, () => {
		props.viewstate.errorMessage = errorServer
		render(wrapper)
		const title = (/500 Server Error/i)
		const message = (/We are currently experiencing server issues,/i)

		expect(props.viewstate.errorMessage).toContain(`500`)
		expect(screen.getByText(title)).not.toBeNull()
		expect(screen.queryByText(message)).not.toBeNull()
	})

})
