import React from 'react'
import Tag from '../../../../components/bits/Tag'
import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

const props = {
	id: `resourceId`,
	title: `resource title`,
	description: `description`,
	keywords: [`test`],
	words: [`wordTest`],
	languages: { iso639_3: [] },
	files: [
		{
			'file-version': `test version`,
			filepath: `test file path`,
			id: `test id`,
			metadata: `metadata`,
			'resource-id': `test  id`,
		},
	],
	type: `video`,
	dateAdded: `123123123`,
	dateModified: `123123123`,
	status: `normal`,
	clientUser: { id: `user:2` },
	client: { id: `test`, name: `test` },
	content: { files: [[Object]] },
	onClick: jest.fn(),
	children: `test`,

}

const handlers = { // eslint-disable-line no-unused-vars
	removeTag: jest.fn(),
	removeWord: jest.fn(),
}

const wrapper =
<BrowserRouter>
	<Tag {...props} />
</BrowserRouter>

describe(`tag test`, () => {
	beforeEach(() => {
		render(wrapper)
	})
	afterEach(() => {
		jest.resetAllMocks()
		cleanup()
	})
	it(`mou removeTag`, () => {
		const Remove = screen.getByTestId(`remove`)
		fireEvent.click(Remove)

		expect(props.onClick).toHaveBeenCalledTimes(1)
		expect(screen.getByText(/test/)).toBeVisible()

	})
})