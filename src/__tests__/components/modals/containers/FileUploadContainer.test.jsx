import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../../components/modals/containers/FileUploadContainer'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const props = {
	resourceId: `0`,
	toggleModal: jest.fn(),
	uploadFile: jest.fn(),
	getFiles: jest.fn(),
	langs: [`English`, `Korean`, `Spanish`],
}

describe(`FileUploadContainer test`, () => {

	it(`should get viewstate correctly`, ()=> {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		// test viewstate made correctly
		const viewstate = wrapper.props().viewstate // eslint-disable-line no-unused-vars
	})

	it(`should pass event handlers test`, ()=> {

		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)

		// upload file
		expect(wrapper.find(`FileUpload`).props().viewstate.selectedFile).toBe(undefined)
		wrapper.find({id : `files-input`}).simulate(`change`, {target: { name: `file`, files: [`first file added`] }})
		expect(wrapper.find(`FileUpload`).props().viewstate.selectedFile).toBe(`first file added`)

		// select file version
		wrapper.find(`#categorySelect`).at(0).simulate(`change`, {target: { value: `lang1` }})

		// cannot find the way to parse FormData
		wrapper.find(`form`).simulate(`submit`, { preventDefault() {} })

		// select file version other
		expect(wrapper.find(`FileUpload`).props().viewstate.isOther).toBe(false)
		wrapper.find(`#categorySelect`).at(0).simulate(`change`, {target: { value: `Other` }})
		expect(wrapper.find(`FileUpload`).props().viewstate.isOther).toBe(true)

		// user can find type customized lang text area when user select `Other`
		expect(wrapper.find(`#type-language`).props().value).toBe(``)
		wrapper.find(`#type-language`).at(0).simulate(`change`, {target: { value: `customized lang` }})
		expect(wrapper.find(`#type-language`).props().value).toBe(`customized lang`)

		// cannot find the way to parse FormData
		wrapper.find(`form`).simulate(`submit`, { preventDefault() {} })
	})
})