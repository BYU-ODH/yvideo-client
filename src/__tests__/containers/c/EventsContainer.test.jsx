import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import Container from '../../../containers/c/EventsContainer'
import * as testutil from '../../testutil/testutil'
import { BrowserRouter } from 'react-router-dom'

const props = {
	events: [`Skip`, `Mute`, `Pause`, `Comment`, `Blank`],
	currentTime: `123`,
	duration: `456`,
	handleSeek: jest.fn(),
	handleMute: jest.fn(),
	handlePause: jest.fn(),
	handleUnMute: jest.fn(),
	handleBlank: jest.fn(),
	handleShowComment: jest.fn(),
	handleCensorActive: jest.fn(),
}

describe(`EventsContainer test`, () => {
	it(`test props should be true`, () => {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).childAt(0).dive()

		const viewstate = wrapper.props().viewstate
	})

	it(`check correct form of landing`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)
	})
})