import React from 'react'
import ClipLayer from '../../../../components/bits/ClipLayer'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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
		}
	},
	videoLength: 120,
	active: 1,
	index: 1,
	setStart: jest.fn(),
	setEnd: jest.fn(),
	handleEditClip: jest.fn(),
}

const wrapper =
	<ClipLayer {...props} />

describe(`ClipLayer test`, () => {
	beforeEach(() => {
		render(wrapper)
	})
	afterEach(() => {
		jest.resetAllMocks()
		cleanup()
	})
	it(`renders`, () => {
		// screen.getByText(`haha`)
		screen.getByRole(`teehee`)
	})
})