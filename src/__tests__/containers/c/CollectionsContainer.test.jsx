import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Container from '../../../containers/c/CollectionsContainer'
import * as testutil from '../../testutil/testutil'

const content = testutil.content

const collections = testutil.collections

const props = {
	collections,
	content,
	displayBlocks: false,
	getCollections: jest.fn(),
	getContent: jest.fn(),
	isAdmin: true,
	isProf: false,
	setHeaderBorder: jest.fn(),
	toggleCollectionsDisplay: jest.fn(),
}

describe(`collection container test`, () => {

	it(`collections container check viewstate`, () => {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = wrapper.find(`Collections`).props().viewstate

		expect(viewstate.isProf).toBe(false)
		expect(viewstate.isAdmin).toBe(true)
		expect(viewstate.displayBlocks).toBe(true)

		expect(viewstate.collections[0].archived).toBe(false)
		expect(viewstate.collections[0].id).toBe(0)
		expect(viewstate.collections[0].name).toBe(`Collection 1`)
		expect(viewstate.collections[0].owner).toBe(22)
		expect(viewstate.collections[0].published).toBe(true)
		expect(viewstate.collections[0].thumbnail).toBe(`test@thumbnail`)

		expect(viewstate.contentIds[0]).toBe(0)
	})

	it(`mount`, () => {

		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container props={props}/>
				</BrowserRouter>,
			</Provider>,
		)
	})
})