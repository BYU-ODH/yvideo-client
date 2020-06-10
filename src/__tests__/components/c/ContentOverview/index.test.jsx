import React from 'react'
import { shallow, mount } from 'enzyme'
import ContentOverview from '../../../../components/c/ContentOverview/index'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const content = testutil.content[0]

const viewstate = {
	content,
	editing: false,
	showing: false,
}

const handlers = {
	handleNameChange: jest.fn(),
	handleRemoveContent: jest.fn(),
	handleToggleEdit: jest.fn(),
	handleTogglePublish: jest.fn(),
	setContentState: jest.fn(),
	setShowing: jest.fn(),
}

const props = {
	getResources: jest.fn(),
	viewstate,
	handlers,
	updateContent: jest.fn(),
}

describe(`content overview test`, () => {
	it(`mount`, ()=> {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<ContentOverview {...props} />
			</Provider>,
		)

		// thumbnail
		expect(wrapper.find(`img`).length).toBe(1)
		expect(wrapper.find(`img`).props().src).toBe(`test@thumbnail.com`)

		// title
		expect(wrapper.find(`h4`).length).toBe(1)
		expect(wrapper.find(`h4`).props().children).toBe(`testname`)

		// published
		expect(wrapper.find(`em`).length).toBe(1)
		expect(wrapper.find(`em`).props().children).toBe(`Published`)

		// edit button on click re rerendering behavior, click behavior should be tested in ContentOverviewContainer
		expect(wrapper.find(`.edit-button`).length).toBe(3)
		// wrapper.find(`.edit-button`).at(2).simulate(`click`)
		viewstate.editing = true
		const wrapperRerendered = mount(
			<Provider store={testutil.store}>
				<ContentOverview {...props} />
			</Provider>,
		)
		expect(wrapperRerendered.find(`ContentSettingsContainer`).length).toBe(1)
		expect(wrapperRerendered.find(`button`).length).toBe(3)
		expect(wrapperRerendered.find(`button`).at(0).props().children).toBe(`Unpublish`)
		expect(wrapperRerendered.find(`button`).at(1).props().children).toBe(`Delete`)
		expect(wrapperRerendered.find(`button`).at(2).props().children).toBe(`Save`)
	})
})