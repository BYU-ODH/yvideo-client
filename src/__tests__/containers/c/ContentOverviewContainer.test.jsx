import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../containers/c/ContentOverviewContainer'
import { Provider } from 'react-redux'
import * as testutil from '../../testutil/testutil'
import { BrowserRouter } from 'react-router-dom'


const content = testutil.content[0]

let props = {
	content,
	removeCollectionContent: jest.fn(),
	updateContent: jest.fn(),
	adminRemoveCollectionContent: jest.fn(),
	isLabAssistant: false
}

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

	it(`ContentOverviewContainer should render`, ()=> {
		// test viewstate made correctly
		const viewstate = wrapper.find(`ContentOverview`).props().viewstate
		expect(viewstate.content.name).toBe(`testname`)
		expect(viewstate.content.contentType).toBe(`video`)
		expect(viewstate.content.thumbnail).toBe(`test@thumbnail.com`)
		expect(viewstate.content.physicalCopyExists).toBe(false)
		expect(viewstate.content.isCopyrighted).toBe(false)
		expect(viewstate.content.expired).toBe(true)
		expect(viewstate.content.resourceId).toBe(`5ebdaef833e57cec218b457c`)

		// console.log(wrapper.find(`ContentOverview`).instance().props.handlers)

		// simulate edit button clicks, it should show 3 other buttons when it is clicked
		expect(wrapper.find(`button`).props().children).toBe(`Edit`)
		wrapper.find(`button`).simulate(`click`)

		expect(wrapper.find(`button`).at(0).props().children).toBe(`Unpublish`)
		expect(wrapper.find(`button`).at(1).props().children).toBe(`Delete`)
		expect(wrapper.find(`button`).at(2).props().children).toBe(`Save`)
	})

	it(`Unpublish event handler test`, ()=> {

		expect(wrapper.find(`button`).props().children).toBe(`Edit`)
		wrapper.find(`button`).simulate(`click`)
		expect(wrapper.find(`button`).at(0).props().children).toBe(`Unpublish`)

		expect(wrapper.find(`ContentOverview`).props().viewstate.content.published).toBe(true)
		wrapper.find(`button`).at(0).simulate(`click`)
		expect(wrapper.find(`ContentOverview`).props().viewstate.content.published).toBe(false)
	})

	it(`delete event handler test`, ()=> {

		expect(wrapper.find(`button`).props().children).toBe(`Edit`)
		wrapper.find(`button`).simulate(`click`)
		expect(wrapper.find(`button`).at(0).props().children).toBe(`Unpublish`)

		// method should not be called before click
		expect(props.removeCollectionContent).not.toHaveBeenCalled()
		wrapper.find(`button`).at(1).simulate(`click`)

		// check to see if clicking button fires the method
		setTimeout(() => {
			expect(props.removeCollectionContent).toHaveBeenCalled()
		}, 500)

		//if isLabAssistant = true

	})

	it(`save event handler test`, ()=> {

		expect(wrapper.find(`button`).props().children).toBe(`Edit`)
		wrapper.find(`button`).simulate(`click`)
		expect(wrapper.find(`button`).at(2).props().children).toBe(`Save`)

		// edit event handler
		expect(wrapper.find(`ContentOverview`).props().viewstate.editing).toBe(true)
		wrapper.find(`button`).at(2).simulate(`click`)
		setTimeout(() => {
			expect(wrapper.find(`ContentOverview`).props().viewstate.editing).toBe(false)
		}, 500)
	})

	// TODO: need to figure out which store it updates.
	it(`toggle, tags and description test`, ()=> {

		// click edit-button. It updates display without wrapper.update().
		// click edit button trigger drop down menu.
		expect(wrapper.find({"className" : `tag-input`}).length).toBe(0)
		wrapper.find({"className" : `edit-button`}).at(0).simulate(`click`)
		expect(wrapper.find({"className" : `tag-input`}).length).toBe(1)

		// add input and add tags
		wrapper.find({"className" : `tag-input`}).at(0).simulate(`change`, {target: {value: `testaddedtag`}})
		expect(wrapper.find(`Tag`).length).toBe(0)
		wrapper.find({"className" : `add-tag`}).at(0).simulate(`click`)
		expect(wrapper.find(`Tag`).length).toBe(1)

		// remove tag
		wrapper.find(`Tag`).find(`button`).at(0).simulate(`click`)
		expect(wrapper.find(`Tag`).length).toBe(0)

		// definition toggle
		expect(wrapper.find({"className" : `definitions-toggle`}).props().on).toBe(false)
		wrapper.find({"className" : `definitions-toggle`}).simulate(`click`)
		expect(wrapper.find({"className" : `definitions-toggle`}).props().on).toBe(true)

		// captions toggle
		expect(wrapper.find({"className" : `captions-toggle`}).props().on).toBe(false)
		wrapper.find({"className" : `captions-toggle`}).simulate(`click`)
		expect(wrapper.find({"className" : `captions-toggle`}).props().on).toBe(true)

		// add input and add words
		wrapper.find({"className" : `tag-input`}).at(0).simulate(`change`, {target: {value: `testaddedword`}})
		expect(wrapper.find(`Tag`).length).toBe(0)
		wrapper.find({"className" : `add-tag`}).at(0).simulate(`click`)
		expect(wrapper.find(`Tag`).length).toBe(1)

		// add word
		wrapper.find(`Tag`).find(`button`).at(0).simulate(`click`)
		expect(wrapper.find(`Tag`).length).toBe(0)

		//edit button
	})
})