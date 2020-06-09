import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../containers/c/ContentOverviewContainer'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
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
	})
})