import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../../components/modals/containers/ManageFilesContainer'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const props = {
	files: [testutil.file1, testutil.file2],
	toggleModal: jest.fn(),
}

describe(`ManageFilesContainer test`, () => {

	it(`should get viewstate correctly`, ()=> {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		// test viewstate made correctly
		const viewstate = wrapper.props().viewstate
		expect(viewstate.files).toEqual([testutil.file1, testutil.file2])
	})

	it(`should pass event handlers test`, ()=> {

		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)

		expect(wrapper.find({className: `file-column`}).length).toBeGreaterThanOrEqual(2)
		wrapper.find({className: `manage-files-cancel`}).at(0).simulate(`click`)
	})
})