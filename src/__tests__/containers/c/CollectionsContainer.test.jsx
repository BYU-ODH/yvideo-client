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

		expect(viewstate.collections[0].archived).toBe(false)
		expect(viewstate.collections[0].id).toBe(0)
		expect(viewstate.collections[0].name).toBe(`Collection 1`)
		expect(viewstate.collections[0].owner).toBe(22)
		expect(viewstate.collections[0].published).toBe(true)
		expect(viewstate.collections[0].thumbnail).toBe(`test@thumbnail`)
	})

	it(`mount`, async() => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)
		// getcollection

		expect(wrapper.text().includes(`Collections`)).toBe(true)
		expect(wrapper.text().includes(`Manage Collections`)).toBe(true)
		expect(wrapper.find(`Link`).at(0).props().to).toEqual(`/manager`)

		expect(wrapper.text().includes(`Collection 1`)).toBe(true)
		expect(wrapper.text().includes(`testname`)).toBe(true)
		expect(wrapper.find(`Link`).at(1).props().to).toEqual(`/player/0`)

		expect(wrapper.text().includes(`Collection 2`)).toBe(true)
		expect(wrapper.text().includes(`testname2`)).toBe(true)
		expect(wrapper.find(`Link`).at(2).props().to).toEqual(`/player/1`)

		// TODO: toggle modal test need to be updated
		wrapper.find(`#collections-help-documentation`).at(0).simulate(`click`, { preventDefault () {} })
	})
})