import React from 'react'
import Tag from '../../../../components/bits/Tag'
import { Remove } from '../../../../components/bits/tag/styles'
import { shallow, mount, render } from 'enzyme'
import { BrowserRouter} from 'react-router-dom'

const props = {
	id: `resourceId`,
	title: `resource title`,
	description: `description`,
	keywords: [`test`],
	words:[`wordTest`],
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

}

const handlers = {
	removeTag: jest.fn(),
	removeWord: jest.fn(),
}

describe(`tag test`, () => {
	it(`mou removeTag`, () => {
		const button = shallow(<Remove onClick={handlers.removeTag} data-value={props} />)
		button.find(`StyledComponent`).simulate(`click`)
		expect(handlers.removeTag.mock.calls.length).toEqual(1)
	})
	it(`mou removeTag`, () => {
		const wrapper = mount(
			<BrowserRouter>
				<Tag {...props} />
			</BrowserRouter>,
		)
	})
})