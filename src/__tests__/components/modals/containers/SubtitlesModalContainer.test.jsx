import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import '@testing-library/dom'
import { Provider } from 'react-redux'
import Container from '../../../../components/modals/containers/SubtitlesModalContainer'
import { BrowserRouter } from 'react-router-dom'
import * as testutil from '../../../testutil/testutil'

const createProps = {
	mode: `create`,
	handleAddSubLayer: jest.fn(),
	handleAddSubLayerFromFile: jest.fn(),
	setIsReady: jest.fn(),
}

const deleteProps = {
	mode: `delete`,
	deleteTitle: `testSubs`,
	handleDeleteSubLayer: jest.fn(),
}

const createWrapper =
<Provider store={testutil.emptyStore}>
	<BrowserRouter>
		<Container {...createProps} />
	</BrowserRouter>
</Provider>

const deleteWrapper =
<Provider store={testutil.emptyStore}>
	<BrowserRouter>
		<Container {...deleteProps} />
	</BrowserRouter>
</Provider>

describe(`Subtitles Modal test`, () => {
	describe(`Create onclick tests`, () => {
		beforeEach(() => {
			render(createWrapper)
		})
		afterEach(() => {
			jest.resetAllMocks()
			cleanup()
		})
		it(`render create`, () => {
			expect(screen.getByText(/Choose an Option/)).toBeVisible()
			expect(screen.getByText(/Start from scratch/)).toBeVisible()
		})

		it(`From scratch create onClick`, async () => {
			const user = userEvent.setup()
			const button = screen.getByTestId(`modalButton1`)

			await user.click(button)
			expect(createProps.handleAddSubLayer).toHaveBeenCalled()
		})

		it(`File input create onClick`, async () => {
			const user = userEvent.setup()
			const button = screen.getByTestId(`modalButton2`)
			await user.click(button)

			// The button is set up to do nothing if there is no file input
			expect(createProps.handleAddSubLayerFromFile).not.toHaveBeenCalled()
		})

		it(`close create onClick`, async ()=> {
			const user = userEvent.setup()
			const closeButton = screen.getByAltText(`close`)

			await user.click(closeButton)
		})
	})

	describe(`File Upload onclick tests`, () => {
		let vttFile
		let srtFile
		beforeEach(() => {
			render(createWrapper)
			vttFile = new File(['(⌐□_□)'], 'test.vtt', { kind: 'subtitles', type: 'text/vtt' })
			srtFile = new File(['(⌐□_□)'], 'test.srt', { kind: 'subtitles', type: 'text/plain' })
		})
		afterEach(() => {
			jest.resetAllMocks()
			cleanup()
		})

		it(`onClick createLayer fromFile (1)`, async () => {
			const user = userEvent.setup()
			const button = screen.getByTestId(`modalButton2`)
			const fileInput = screen.getByTestId(`subFileInput`)

			await waitFor(() => fireEvent.change(fileInput, { target: { files: [vttFile] } }))
			expect(fileInput.files[0].name).toBe(`test.vtt`)
			expect(fileInput.files.length).toBe(1)
			await user.click(button)

			await waitFor(() => fireEvent.change(fileInput, { target: { files: [srtFile] } }))
			expect(fileInput.files[0].name).toBe(`test.srt`)
			expect(fileInput.files.length).toBe(1)

			await user.click(button)
			expect(createProps.handleAddSubLayerFromFile).toHaveBeenCalledTimes(2)
		})

		it(`onClick createLayer fromFile (2 || >2)`, async () => {
			const user = userEvent.setup()
			const button = screen.getByTestId(`modalButton2`)
			const fileInput = screen.getByTestId(`subFileInput`)

			await waitFor(() => fireEvent.change(fileInput, { target: { files: [vttFile, srtFile] } }))
			expect(fileInput.files[0].name).toBe(`test.vtt`)
			expect(fileInput.files[1].name).toBe(`test.srt`)
			expect(fileInput.files.length).toBe(2)

			await user.click(button)
			expect(createProps.handleAddSubLayerFromFile).not.toHaveBeenCalled()
		})
	})

	describe(`Delete onclick tests`, () => {
		beforeEach(() => {
			render(deleteWrapper)
		})
		afterEach(() => {
			jest.resetAllMocks()
			cleanup()
		})
		it(`render delete`, () => {
			const deleteTitle = deleteProps.deleteTitle
			expect(deleteTitle).toBe(`testSubs`)
			expect(screen.getByText(/Are you sure you want to delete the subtitle track:/)).toBeVisible()
			expect(screen.getByText(new RegExp(`${deleteTitle}`))).toBeVisible()
		})

		it(`Cancel delete onClick`, async () => {
			const user = userEvent.setup()
			const cancel = screen.getByText(/Cancel/i)

			await user.click(cancel)
		})

		it(`Confirm delete onClick`, async () => {
			const user = userEvent.setup()
			const deleteButton = screen.getByText(/Delete/)

			await user.click(deleteButton)
			expect(deleteProps.handleDeleteSubLayer).toHaveBeenCalled()
		})
	})

})
