import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../containers/c/ContentOverviewContainer'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as testutil from '../../testutil/testutil'

const content = testutil.content[0]

const props = {
	content,
	removeCollectionContent: jest.fn(),
	updateContent: jest.fn(),
}

describe(`manage collection test`, () => {
	it(`ContentOverviewContainer should render`, ()=> {

		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>,
			</Provider>,
		)

		// test viewstate made correctly
		const viewstate = wrapper.find(`ContentOverview`).props().viewstate
		expect(viewstate.content.id).toBe(115)
		expect(viewstate.content.name).toBe(`testname`)
		expect(viewstate.content.contentType).toBe(`video`)
		expect(viewstate.content.collectionId).toBe(85)
		expect(viewstate.content.thumbnail).toBe(`test@thumbnail.com`)
		expect(viewstate.content.physicalCopyExists).toBe(false)
		expect(viewstate.content.isCopyrighted).toBe(false)
		expect(viewstate.content.expired).toBe(true)
		expect(viewstate.content.resourceId).toBe(`5ebdaef833e57cec218b457c`)

		// simulate edit button clicks, it should show 3 other buttons when it is clicked
		expect(wrapper.find(`button`).props().children).toBe(`Edit`)
		wrapper.find(`button`).simulate(`click`)

		expect(wrapper.find(`button`).at(0).props().children).toBe(`Unpublish`)
		expect(wrapper.find(`button`).at(1).props().children).toBe(`Delete`)
		expect(wrapper.find(`button`).at(2).props().children).toBe(`Save`)
	})

	it(`Unpublish event handler test`, ()=> {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>,
			</Provider>,
		)
		expect(wrapper.find(`button`).props().children).toBe(`Edit`)
		wrapper.find(`button`).simulate(`click`)
		expect(wrapper.find(`button`).at(0).props().children).toBe(`Unpublish`)

		expect(wrapper.find(`ContentOverview`).props().viewstate.content.published).toBe(true)
		wrapper.find(`button`).at(0).simulate(`click`)
		expect(wrapper.find(`ContentOverview`).props().viewstate.content.published).toBe(false)
	})

	it(`delete event handler test`, ()=> {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>,
			</Provider>,
		)
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
	})

	it(`save event handler test`, ()=> {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>,
			</Provider>,
		)
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
})