import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../../components/modals/containers/HelpDocumentationContainer'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const props = {
	name: `Track Editor`,
	toggleModal: jest.fn(),
}

describe(`HelpDocumentationContainer test`, () => {
	it(`test props should be true`, () => {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = wrapper.props().viewstate
		expect(viewstate.name).toBe(`Track Editor`)
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
})