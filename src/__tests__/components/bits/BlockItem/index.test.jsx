import React from 'react'
import { shallow } from 'enzyme'
import BlockItem from '../../../../components/bits/BlockItem/index'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link } from 'react-router-dom'
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

const state = {
	img: `test@thumbbnail`,
	loaded: false,
}

const wrapper =
<BrowserRouter>
	<BlockItem {...props} state={state}/>
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
		expect(name).not.toBeNull()
	})
})