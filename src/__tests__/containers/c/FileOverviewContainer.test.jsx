import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../containers/c/FileOverviewContainer'
import { Provider } from 'react-redux'
import * as testutil from '../../testutil/testutil'
import { BrowserRouter } from 'react-router-dom'

const file = testutil.file1

// handleFileMetadata:jest.fn(),
// handleUpdateFile:jest.fn(),
// handleRemoveFile:jest.fn(),
// handleFileVersion:jest.fn(),
const props = {
	file,
	langs:[`lang1`],
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

	it(`FileOverviewContainer should contain viewstate`, ()=> {
		const sWrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = sWrapper.find(`FileOverview`).props().viewstate
		expect(viewstate.file).toBe(file)
	})

	it(`FileOverviewContainer should render`, ()=> {
		// make sure there is at least one file
		expect(wrapper.find({className: `file-column`}).length).not.toBe(0)

		// TODO: need to figure out how to check that if the drop down menu is changed. It trigers the function, but not sure where that is stored.
		wrapper.find({className: `file-change-lang`}).at(1).simulate(`change`, {target: {value: `lang2`}})

		wrapper.find({className: `edit-file-button`}).at(1).simulate(`click`)

		wrapper.find({className: `remove-file-button`}).at(1).simulate(`click`)
	})
})