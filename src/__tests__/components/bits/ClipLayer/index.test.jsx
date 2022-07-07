import React from 'react'
import ClipLayer from '../../../../components/bits/ClipLayer'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

const props = {
	clipName: 0,
	clipList: {
		0: {
			start: 0,
			end: 60,
		},
		1: {
			start: 61,
			end: 120,
		},
	},
	width: 0,
	videoLength: 120,
	active: 0, // this is the index of the currently active clip
	index: 0,
	handleEditClip: jest.fn(),
}

const activeWrapper =
	<ClipLayer {...props} />

props.active = 1
const inactiveWrapper =
	<ClipLayer {...props} />

describe(`ClipLayer test`, () => {
	describe(`Active`, () => {
		beforeEach(() => {
			render(activeWrapper)
		})
		afterEach(() => {
			jest.resetAllMocks()
			cleanup()
		})
		it(`renders with active`, () => {
			const Rnd = screen.getByTestId(`Rnd`)

			expect(activeWrapper).toBeDefined()
			expect(Rnd).toHaveStyle(`background-color: var(--navy-blue)`)
		})
	})
	describe(`Inactive`, () => {
		beforeEach(() => {
			render(inactiveWrapper)
		})
		afterEach(() => {
			jest.resetAllMocks()
			cleanup()
		})
		it(`renders with inactive`, () => {
			const Rnd = screen.getByTestId(`Rnd`)
			act(() => {
				fireEvent.resize(Rnd)
			})
			fireEvent.click(Rnd)
			expect(props.handleEditClip).toHaveBeenCalled()

			expect(activeWrapper).toBeDefined()
			expect(Rnd).toHaveStyle(`background-color: #ffffff`)
		})
	})
})