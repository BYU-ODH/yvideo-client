import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Feedback from '../../../../components/c/Feedback/index'
import { BrowserRouter} from 'react-router-dom'
import ReactTestUtils from 'react-dom/test-utils'
import { expectation } from 'sinon'

const props = {
	viewstate: {
		email: ``,
		name: ``,
		title: ``,
		body: ``,
		file: ``,
	},
	handlers: {
		setFile: jest.fn(),
		setBody: jest.fn(),
		setTitle: jest.fn(),
		setEmail: jest.fn(),
		setName: jest.fn(),
		handleCaptcha: jest.fn(),
		handleSubmit: jest.fn(),
	},
}

describe(`Captcha test`, () => {
	it(`simulate onClick`, ()=> {
		const wrapper = mount(
			<BrowserRouter>
				<Feedback {...props} />
			</BrowserRouter>,
		)
		expect(wrapper.contains(<h1>Submit Feedback</h1>)).toEqual(true)
		let button = wrapper.find(`input`).at(0).simulate(`change`)
		expect(button).toBeDefined()
		button = wrapper.find(`input`).at(1).simulate(`change`)
		expect(button).toBeDefined()
		button = wrapper.find(`input`).at(2).simulate(`change`)
		expect(button).toBeDefined()
		button = wrapper.find(`textarea`).at(0).simulate(`change`)
		expect(button).toBeDefined()
		button = wrapper.find(`input`).at(3).simulate(`change`, { target: { files: `path` } })
		expect(button).toBeDefined()
		button = wrapper.find(`input`).at(4).simulate(`click`)
		expect(button).toBeDefined()
	})
})