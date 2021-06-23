import React from 'react'
import { shallow, mount } from 'enzyme'
import { render, ReactDOM } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute  } from 'react-router'
import Container from '../../../../components/modals/containers/HelpDocumentationContainer'
import { CloseHelp } from '../../../../components/modals/components/HelpDocumentation/styles'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const props = {
	name: `Video Editor`,
	toggleModal: jest.fn(),
	viewstate: {
		help: {
			htmlInstruction: 'instruction'
		}
	}
}

describe(`HelpDocumentationContainer test`, () => {
	it(`test props should be true`, () => {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = wrapper.props().viewstate
		expect(viewstate.name).toBe(`Video Editor`)
	})

	it(`test props should be true`, () => {
		props.name = `Manage Collections`
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = wrapper.props().viewstate
		expect(viewstate.name).toBe(`Manage Collections`)
	})

	it(`test props should be true`, () => {
		props.name = `Home Page`
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = wrapper.props().viewstate
		expect(viewstate.name).toBe(`Home Page`)
	})
	it(`test props should be true`, () => {
		const div = document.createElement('content');
		const wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>, div
		)
		console.log(wrapper.debug())
		const button = wrapper.find(CloseHelp).simulate('click')
		expect(button).toBeDefined()
	})
})