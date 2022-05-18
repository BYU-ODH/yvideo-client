import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../../components/modals/containers/HelpDocumentationContainer'
import { CloseHelp } from '../../../../components/modals/components/HelpDocumentation/styles'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const props = {
	name: `Video Editor`,
	toggleModal: jest.fn(),
	viewstate: {
		help: {
			htmlInstruction: `instruction`,
		},
	},
}

describe(`HelpDocumentationContainer test`, () => {
	it(`test props should be true: Track Editor`, () => {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = wrapper.props().viewstate
		expect(viewstate.name).toBe(`Video Editor`)
	})

	it(`test props should be true: Manage Collections`, () => {
		props.name = `Manage Collections`
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = wrapper.props().viewstate
		expect(viewstate.name).toBe(`Manage Collections`)
	})

	it(`test props should be true: Home Page`, () => {
		props.name = `Home Page`
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = wrapper.props().viewstate
		expect(viewstate.name).toBe(`Home Page`)
	})
	it(`test props should be true: mock document.getElementById (content)`, () => {
		const parent = mount(
			<div id='content'></div>,
		)
		document.getElementById = jest.fn((tag) => parent.instance())

		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)
		const button = wrapper.find(CloseHelp).simulate(`click`)
		expect(button).toBeDefined()
	})
})