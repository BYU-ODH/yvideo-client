import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Container from '../../../containers/c/SubtitlesContainer'
import * as testutil from '../../testutil/testutil'

const props = {
	currentTime: 10,
	handleShowSubtitle: jest.fn(),
	duration: 10,
}

// TODO: need to find how to pass match as a param, useParams.
describe(`Subtitles container test`, () => {
	it(`wrapper: currentTime >= start && currentTime <= end)`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)
		expect(wrapper).toBeDefined()
	})
	it(`wrapper: currentTime > end || currentTime < start`, () => {
		props.currentTime = 300
		props.active = 0
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)
		expect(wrapper).toBeDefined()
	})
	it(`subtitles[active] === undefined`, () => {
		const wrapper = mount(
			<Provider store={testutil.store2}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)
		expect(wrapper).toBeDefined()
	})
})