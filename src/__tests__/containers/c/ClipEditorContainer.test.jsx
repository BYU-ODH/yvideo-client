import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Container from '../../../containers/c/ClipEditorContainer'
import * as testutil from '../../testutil/testutil'

const props = {
	setEvents: jest.fn(),
	getResource: jest.fn(),
	getContent: jest.fn(),
	getStreamKey: jest.fn(),
	updateContent: jest.fn(),
	getSubtitles: jest.fn(),
	setSubtitles: jest.fn(),
	deleteSubtitle: jest.fn(),
	updateSubtitle: jest.fn(),
	createSubtitle: jest.fn(),
	activeUpdate: jest.fn(),
	setSubContentId: jest.fn(),
	toggleModal: jest.fn(),
	toggleTip: jest.fn(),
	setBreadcrumbs: jest.fn(),
}

describe(`Simulate Event`, () => {
	let wrapper
	beforeEach(() => {
		wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)
	})

	window.ResizeObserver =
	window.ResizeObserver ||
	jest.fn().mockImplementation(() => ({
		disconnect: jest.fn(),
		observe: jest.fn(),
		unobserve: jest.fn(),
	}))

	it(`Add subtitle`, () => {
		expect(wrapper.contains(<th align='center'>Title</th>)).toEqual(true)
		wrapper.find(`#add-button`).at(0).simulate(`click`)
		wrapper.find(`input`).at(0).simulate(`click`)
		wrapper.find(`ReactPlayer`).prop(`onDuration`)(200)
		expect(wrapper.find(`input`).at(0).props().value).toBe(``)
		expect(wrapper.find(`input`).at(1).props().value).toBe(`00:00.00`)
		expect(wrapper.find(`input`).at(2).props().value).toBe(`01:00.00`)
		wrapper.find(`input`).at(0).simulate(`change`, { target: { value: `Updated text` } })
		expect(wrapper.find(`input`).at(0).props().value).toBe(`Updated text`)
		wrapper.find(`input`).at(1).simulate(`change`, { target: { value: `02:30.00` } })
		expect(wrapper.find(`input`).at(1).props().value).toBe(`02:30.00`)

		wrapper.find(`input`).at(1).prop(`onBlur`)({ target: { value: `02:` } })
		wrapper.find(`input`).at(0).simulate(`click`)
		expect(wrapper.find(`input`).at(1).props().value).toBe(`02:00.00`)

		expect(wrapper.contains(<i className='fa fa-check'></i>)).toEqual(false)
		wrapper.find(`.side-button`).simulate(`click`)
		wrapper.update()
		// expect(wrapper.contains(<i className='fa fa-check'></i>)).toEqual(true)
	})
})
