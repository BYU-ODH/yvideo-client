import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../containers/c/ContentSettingsContainer'
import { Provider } from 'react-redux'
import * as testutil from '../../testutil/testutil'

const content = testutil.content[0]
const resources = testutil.resources

const props = {
	content,
	getResources: jest.fn(),
	handlers: {
		setContentState: jest.fn(),
		setShowing: jest.fn(),
	},
	loading: false,
	resources,
	showing: true,
}

describe(`content settings container test`, () => {
	it(`viewstate should be true`, ()=> {
		const wrapper = shallow(
			<Container store={testutil.store} {...props} />,
		).childAt(0).dive()

		const viewstate = wrapper.props().viewstate

		expect(viewstate.showing).toBe(true)

		// content
		expect(viewstate.content.name).toBe(`testname`)
		expect(viewstate.content.contentType).toBe(`video`)
		expect(viewstate.content.thumbnail).toBe(`test@thumbnail.com`)
		expect(viewstate.content.physicalCopyExists).toBe(false)
		expect(viewstate.content.isCopyrighted).toBe(false)
		expect(viewstate.content.expired).toBe(true)
		expect(viewstate.content.resourceId).toBe(`5ebdaef833e57cec218b457c`)
		expect(viewstate.content.published).toBe(true)

		// content setttings
		expect(viewstate.content.settings.allowDefinitions).toBe(false)
		expect(viewstate.content.settings.showAnnotations).toBe(false)
		expect(viewstate.content.settings.showCaptions).toBe(false)
		expect(viewstate.content.settings.showWordList).toBe(false)
		expect(viewstate.content.settings.aspectRatio).toBe(`1.77`)

		// content resource
		expect(viewstate.content.resource.id).toBe(`resourceId`)
		expect(viewstate.content.resource.title).toBe(`resource title`)
		expect(viewstate.content.resource.description).toBe(`description`)
		expect(viewstate.content.resource.type).toBe(`video`)
		expect(viewstate.content.resource.dateAdded).toBe(`1591672795`)
		expect(viewstate.content.resource.dateModified).toBe(`1591672795`)
		expect(viewstate.content.resource.status).toBe(`normal`)
		expect(viewstate.content.resource.clientUser.id).toBe(`user:22`)
		expect(viewstate.content.resource.client.id).toBe(`byu_demo`)
		expect(viewstate.content.resource.client.name).toBe(`BYU Demos`)
		expect(viewstate.content.resource.content.files[0].streamUri).toBe(`https://www.youtube.com/watch?v=H_431Dxt-4c`)
		expect(viewstate.content.resource.content.files[0].bytes).toBe(0)
		expect(viewstate.content.resource.content.files[0].representation).toBe(`original`)
		expect(viewstate.content.resource.content.files[0].quality).toBe(1)
		expect(viewstate.content.resource.content.files[0].mime).toBe(`video/x-youtube`)
		expect(viewstate.content.resource.content.files[0].mimeType).toBe(`video/x-youtube`)
	})

	it(`mount`, ()=> {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props} />
			</Provider>,
		)

		const contentSettings = wrapper.find(`ContentSettings`)

		// clicking toggle triggers handleToggle and setContentState
		expect(props.handlers.setContentState).not.toHaveBeenCalled()
		const buttons = contentSettings.find(`button`)
		buttons.forEach( (button, index) => {
			contentSettings.find(`button`).at(index).simulate(`click`)
			expect(props.handlers.setContentState).toHaveBeenCalledTimes(index + 1)
		})

		// clicking radio triggers handleRatio and setContentState
		const radios = contentSettings.find({"type" : `radio`})
		radios.forEach((radio, index) => {
			contentSettings.find({"type" : `radio`}).at(index).simulate(`change`, {target: {checked: true}})
			expect(props.handlers.setContentState).toHaveBeenCalledTimes(index + 5)
		})
		// total number of setContentState is called so far
		expect(props.handlers.setContentState).toHaveBeenCalledTimes(13)

		// input text to the description triggers setContentState
		contentSettings.find(`textarea`).simulate(`change`, {target: {value: `text`}})
		expect(props.handlers.setContentState).toHaveBeenCalledTimes(14)

		contentSettings.find({"type" : `text`}).simulate(`change`, {target: {value: `tag`}})
		setTimeout(() => {
			expect(props.handlers.setContentState).toHaveBeenCalledTimes(15)
		}, 500)
	})
})