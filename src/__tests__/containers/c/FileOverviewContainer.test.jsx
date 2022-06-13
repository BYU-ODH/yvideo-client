import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import '@testing-library/dom'
import Container from '../../../containers/c/FileOverviewContainer'
import { Provider } from 'react-redux'
import * as testutil from '../../testutil/testutil'
import { BrowserRouter } from 'react-router-dom'

const file = testutil.file1

const props = {
	file,
	langs: [`lang1`, `lang2`, `lang3`],
	handleFileMetadata: jest.fn(),
	handleFileVersion: jest.fn(),
	handleUpdateFile: jest.fn(),
	handleRemoveFile: jest.fn(),
}

const wrapper =
	<Provider store={testutil.store}>
		<BrowserRouter>
			<Container {...props}/>
		</BrowserRouter>
	</Provider>

// TODO: need to fix `UnhandledPromiseRejectionWarning`. This is from the not mocked functions from the child componenet
describe(`File Overview test`, () => {
	describe(`File display`, () => {
		beforeEach(() => {
			render(wrapper)
		})
		it(`FileOverview should display files`, () => {
			expect(screen.getByText(/Path:/)).toBeVisible()
			//This comes from the testutil file
			expect(screen.getByText(/test file path/)).toBeVisible()
		})
	})

	describe(`File Overview events`, () => {
		beforeEach(() => {
			render(wrapper)
		})
		afterEach(() => {
			jest.resetAllMocks()
			cleanup()
		})
		it(`Edit title`, async () => {
			// make sure there is at least one file
			expect(screen.getByText(/test file path/)).toBeVisible()

			const titleEdit = screen.getByTestId(`title-edit`)
			await waitFor(() =>
				fireEvent.change(titleEdit, {target: {value: `new title`}}))

			expect(titleEdit.value).toEqual(`new title`)
		})

		it(`Edit version`, async () => {
			const user = userEvent.setup()
			// make sure there is at least one file
			expect(screen.getByText(/test file path/)).toBeVisible()

			const select = screen.getByRole(`combobox`)
			const options = screen.getAllByTestId(`select-option`)

			expect(options[0].selected).toBeTruthy() // test version
			expect(screen.getByText(/test version/)).toBeVisible()

			await waitFor(() => user.selectOptions(select, `lang2`))

			expect(options[0].selected).toBeFalsy() // test version
			expect(options[1].selected).toBeFalsy() // lang1
			expect(options[2].selected).toBeTruthy() // lang2
			expect(screen.getByText(/lang2/)).toBeVisible()
			expect(options[3].selected).toBeFalsy() // lang3
		})

		it(`Delete file`, async () => {
			// make sure there is at least one file
			expect(screen.getByText(/test file path/)).toBeVisible()

			const user = userEvent.setup()
			const removeFileButton = screen.getByTestId(`remove-file-button`)

			await waitFor(() => user.click(removeFileButton))
		})
	})
})