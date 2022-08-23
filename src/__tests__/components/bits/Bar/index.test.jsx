import React from 'react'
import Bar from '../../../../components/bits/Bar'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Bar needs logic updates for interplay between clip bar and skip bar
// And needs to have all skips disabled when clip bar is active
const skipProps = {
	duration: 1000,
	skipArray: [
		// { start: 0, end: 100, type: 'skip' },
		// { start: 400, end: 900, type: 'skip' },
		{ start: 0, end: 990, type: `skip` },
	],
	handleClick: jest.fn(),
	progress: 0,
}
const clipProps = {
	duration: 1000,
	skipArray: [{ start: 0, end: 100, type: `skip` }],
	clipTime: [200, 300],
	clipPercent: [.20, .30],
	handleClick: jest.fn(),
	progress: 0,
}

const skipWrapper =
	<Bar {...skipProps} />

const clipWrapper =
	<Bar {...clipProps} />

describe(`Bar test`, () => {
	describe(`Skip tests`, () => {
		beforeEach(() => {
			render(skipWrapper)
		})
		afterEach(() => {
			jest.resetAllMocks()
			cleanup()
		})
		it(`Should render gray bar with skips`, () => {
			expect(screen.queryAllByTestId(`gray-bar`)).not.toBeNull()
			expect(screen.queryByTestId(`yellow-bar`)).toBeNull()
		})
		it(`Onclick`, async () => {
			const user = userEvent.setup()
			const bar = screen.getByTestId(`bar`)

			await user.click(bar)
			expect(skipProps.handleClick).toHaveBeenCalled()
		})
	})
	describe(`Clip tests`, () => {
		beforeEach(() => {
			render(clipWrapper)
		})
		afterEach(() => {
			jest.resetAllMocks()
			cleanup()
		})
		it(`Should render yellow bar with clips`, () => {
			expect(screen.queryAllByTestId(`gray-bar`)).not.toBeNull()
			expect(screen.queryAllByTestId(`yellow-bar`)).not.toBeNull()
		})
		it(`Onclick`, async () => {
			const user = userEvent.setup()
			const bar = screen.getByTestId(`bar`)

			await user.click(bar)
			expect(clipProps.handleClick).toHaveBeenCalled()
		})
	})
})