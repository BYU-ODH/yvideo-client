import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import Container from '../../../containers/c/LandingContainer'
import * as testutil from '../../testutil/testutil'
import { BrowserRouter } from 'react-router-dom'

const props = {
	login: jest.fn(),
}

describe(`LandingContainer test`, () => {
	it(`test props should be true`, () => {
		const wrapper = shallow(
			<Container store={testutil.store} {...props}/>,
		).dive()

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

		expect(wrapper.text().includes(`YVIDEO`)).toBe(true)

		wrapper.find({className: `primary`}).at(0).simulate(`click`)

		// click 'About' to show toggle modal
		expect(wrapper.find(`Overlay`).length).toBe(0)
		wrapper.find({className: `secondary`}).at(0).simulate(`click`)
		expect(wrapper.find(`Overlay`).length).toBe(1)
	})
})