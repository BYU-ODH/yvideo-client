import React from 'react'
import { shallow, mount } from 'enzyme'
import MutationObserver from 'mutation-observer'
import Container from '../../../containers/c/ResourceOverviewContainer'
import { Provider } from 'react-redux'
import * as testutil from '../../testutil/testutil'
import { BrowserRouter } from 'react-router-dom'
import proxies from 'proxy'

const props = {
	resource: testutil.resource,
	editResource: jest.fn(),
	resourceCache: jest.fn(),
	updateAllFileVersions: jest.fn(),
	fileId: jest.fn(),
	getLangs: jest.fn(),
	getResourceFiles: jest.fn(),
}

proxies.apiProxy.language.get = jest.fn()
proxies.apiProxy.language.get.mockImplementation( () => {
	return Promise.resolve(`Korean;Japanese;`)
})

proxies.apiProxy.resources.files = jest.fn()
proxies.apiProxy.resources.files.mockImplementation( () => {
	return Promise.resolve([testutil.file1])
})

global.MutationObserver = MutationObserver

// TODO: need to fix `UnhandledPromiseRejectionWarning`. This is from the not mocked functions from the child componenet
describe(`manage collection test`, () => {

	it(`ResourceOverview should contain viewstate`, () => {
		const sWrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = sWrapper.find(`ResourceOverview`).props().viewstate
		expect(viewstate.resourceCache).toBe(testutil.store.getState().resourceStore.cache)
	})

	it(`ResourceOverview should render`, async () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)

		// // make sure there is at least one file
		expect(wrapper.find({id: `resource-name`}).props().children).toBe(`test resource name`)
		wrapper.find({id: `resource-edit`}).at(0).simulate(`click`)
	})
})