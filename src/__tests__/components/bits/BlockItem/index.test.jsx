import React from 'react'
import BlockItem from '../../../../components/bits/BlockItem/index'
import { render, screen, cleanup } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

const props = {
	data: {
		contentType: `video`,
		id: 110,
		name: `testname`,
		thumbnail: `test@thumbnail`,
		views: 0,
	},
}

const wrapper =
	<BrowserRouter>
		<BlockItem {...props} />
	</BrowserRouter>

describe(`BlockItem test`, () => {
	beforeEach(() => {
		render(wrapper)
	})
	afterEach(() => {
		cleanup()
	})
	it(`test render BlockItem`, () => {
		const link = screen.queryByRole(`link`)
		const name = screen.queryByText(/testname/i)

		expect(link).not.toBeNull()
		expect(link).toHaveAttribute(`href`, `/player/${props.data.id}`)

		expect(name).not.toBeNull()
	})
})
