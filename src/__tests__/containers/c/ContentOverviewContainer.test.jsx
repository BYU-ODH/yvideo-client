import React from 'react'
import { mount } from 'enzyme'
import Container from '../../../containers/c/ContentOverviewContainer'
import { Provider } from 'react-redux'
import * as testutil from '../../testutil/testutil'
import { BrowserRouter } from 'react-router-dom'

const content = testutil.content[0]

const props = {
	content,
	removeCollectionContent: jest.fn(),
	updateContent: jest.fn(),
	adminRemoveCollectionContent: jest.fn(),
	isLabAssistant: false,
}
const SUPPORTED_LANGUAGES = [
	`German`,
	`Spanish`,
	`Russian`,
]
// TODO: need to fix `UnhandledPromiseRejectionWarning`. This is from the not mocked functions from the child componenet
describe(`manage collection test`, () => {
	let wrapper
	beforeEach(() => {
		wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)
	})

	it(`ContentOverviewContainer should render`, () => {
		// test viewstate made correctly
		const viewstate = wrapper.find(`ContentOverview`).props().viewstate
		expect(viewstate.content.name).toBe(`testname`)
		expect(viewstate.content.contentType).toBe(`video`)
		expect(viewstate.content.thumbnail).toBe(`test@thumbnail.com`)
		expect(viewstate.content.physicalCopyExists).toBe(false)
		expect(viewstate.content.isCopyrighted).toBe(false)
		expect(viewstate.content.expired).toBe(true)
		expect(viewstate.content.resourceId).toBe(`5ebdaef833e57cec218b457c`)

		// simulate edit button clicks, it should show 3 other buttons when it is clicked
		expect(wrapper.find(`button`).at(0).props().onClick.name).toBe(`handleEditAndTip`)
		wrapper.find(`button`).at(0).simulate(`click`)

		expect(wrapper.find(`button`).at(0).text()).toContain(`Unpublish`)
		expect(wrapper.find(`button`).at(1).text()).toContain(`Delete`)
		expect(wrapper.find(`button`).at(2).text()).toContain(`Save`)
	})

	it(`Unpublish event handler test`, () => {

		expect(wrapper.find(`button`).at(0).props().onClick.name).toBe(`handleEditAndTip`)
		wrapper.find(`button`).at(0).simulate(`click`)
		expect(wrapper.find(`button`).at(0).text()).toContain(`Unpublish`)

		expect(wrapper.find(`ContentOverview`).props().viewstate.content.published).toBe(true)
		wrapper.find(`button`).at(0).simulate(`click`)
		expect(wrapper.find(`ContentOverview`).props().viewstate.content.published).toBe(false)
	})

	it(`delete event handler test`, () => {

		expect(wrapper.find(`button`).at(0).props().onClick.name).toBe(`handleEditAndTip`)
		wrapper.find(`button`).at(0).simulate(`click`)
		expect(wrapper.find(`button`).at(0).text()).toContain(`Unpublish`)

		// method should not be called before click
		expect(props.removeCollectionContent).not.toHaveBeenCalled()
		wrapper.find(`button`).at(1).simulate(`click`)

		// check to see if clicking button fires the method
		setTimeout(() => {
			expect(props.removeCollectionContent).toHaveBeenCalled()
		}, 500)
	})

	it(`save event handler test`, () => {

		expect(wrapper.find(`button`).at(0).props().onClick.name).toBe(`handleEditAndTip`)
		wrapper.find(`button`).at(0).simulate(`click`)
		expect(wrapper.find(`button`).at(2).text()).toContain(`Save`)

		// edit event handler
		expect(wrapper.find(`ContentOverview`).props().viewstate.editing).toBe(true)
		wrapper.find(`button`).at(2).simulate(`click`)
		setTimeout(() => {
			expect(wrapper.find(`ContentOverview`).props().viewstate.editing).toBe(false)
		}, 500)
	})

	// TODO: need to figure out which store it updates.
	it(`toggle, tags and description test`, () => {

		// click edit-button. It updates display without wrapper.update().
		// click edit button trigger drop down menu.
		expect(wrapper.find({"id" : `tag-input`}).length).toBe(0)

		wrapper.find(`button`).at(0).simulate(`click`)
		expect(wrapper.find(`ContentOverview`).props().viewstate.editing).toBe(true)

		wrapper.find({"id" : `edit-button`}).at(0).simulate(`click`)
		expect(wrapper.find({"id" : `tag-input`}).length).toBe(1)

		// add input and add tags
		wrapper.find({"id" : `tag-input`}).at(0).simulate(`change`, {target: {value: `testaddedtag`}})
		expect(wrapper.find(`Tag`).length).toBe(0)
		wrapper.find({"id" : `add-tag`}).at(0).simulate(`click`)
		expect(wrapper.find(`Tag`).length).toBe(1)

		// remove tag
		wrapper.find(`Tag`).find(`button`).at(0).simulate(`click`)
		expect(wrapper.find(`Tag`).length).toBe(0)

		// definition toggle
		expect(wrapper.find({"id" : `definitions-toggle`}).props().on).toBe(false)
		wrapper.find({"id" : `definitions-toggle`}).simulate(`click`)
		if(SUPPORTED_LANGUAGES.join(``).includes(content.settings.targetLanguage))
			expect(wrapper.find({"id" : `definitions-toggle`}).props().on).toBe(true)
		else
			expect(wrapper.find({"id" : `definitions-toggle`}).props().on).toBe(false)

		// captions toggle
		expect(wrapper.find({"id" : `captions-toggle`}).props().on).toBe(false)
		wrapper.find({"id" : `captions-toggle`}).simulate(`click`)
		expect(wrapper.find({"id" : `captions-toggle`}).props().on).toBe(true)

		// add input and add words
		wrapper.find({"id" : `tag-input`}).at(0).simulate(`change`, {target: {value: `testaddedword`}})
		expect(wrapper.find(`Tag`).length).toBe(0)
		wrapper.find({"id" : `add-tag`}).at(0).simulate(`click`)
		expect(wrapper.find(`Tag`).length).toBe(1)

		// add word
		wrapper.find(`Tag`).find(`button`).at(0).simulate(`click`)
		expect(wrapper.find(`Tag`).length).toBe(0)

		// edit button
	})
})