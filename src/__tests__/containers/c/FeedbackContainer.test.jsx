import React from 'react'
import { mount } from 'enzyme'
import Container from '../../../containers/c/FeedbackContainer'
import { Provider } from 'react-redux'
import * as testutil from '../../testutil/testutil'
import { BrowserRouter } from 'react-router-dom'

describe(`manage collection test`, () => {

	let wrapper
	beforeEach(() => {
		wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container/>
				</BrowserRouter>
			</Provider>,
		)
	})

	it(`FeedbackContainer`, () => {
		let button = wrapper.find(`input`).at(0).simulate(`change`, { target: { value: `name` } })
		expect(button).toBeDefined()
		button = wrapper.find(`input`).at(1).simulate(`change`, { target: { value: `email` } })
		expect(button).toBeDefined()
		button = wrapper.find(`input`).at(2).simulate(`change`, { target: { value: `subject` } })
		expect(button).toBeDefined()
		button = wrapper.find(`textarea`).at(0).simulate(`change`, { target: { value: `text` } })
		expect(button).toBeDefined()
		button = wrapper.find(`input`).at(3).simulate(`change`, { target: {files: [{attachment: `path`}]} })
		expect(button).toBeDefined()
		wrapper.find(`.test-mailing`).simulate(`submit`)
	})

})