import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Container from '../../../containers/c/VideoEditorContainer'
import * as testutil from '../../testutil/testutil'

const props = {
	contentCache: {},
	setEvents: jest.fn(),
	getContent: jest.fn(),
	updateContent: jest.fn(),
	activeUpdate: jest.fn(),
	getStreamKey: jest.fn(),
	toggleModal: jest.fn(),
	toggleTip: jest.fn(),
	contentError: jest.fn(),
	setBreadcrumbs: jest.fn(),

	streamKey: `000000-000000-000000-000000`,
	resourceIdStream:  `000000-000000-00000`,
}
window.ResizeObserver =
	window.ResizeObserver ||
	jest.fn().mockImplementation(() => ({
		disconnect: jest.fn(),
		observe: jest.fn(),
		unobserve: jest.fn(),
	}))
jest.mock(`react-router-dom`, () => ({
	...jest.requireActual(`react-router-dom`), // use actual for all non-hook parts
	useParams: () => ({
		id: 0,
	}),
}))

const mockElementId = { style: {height: 10} }
document.getElementById = jest.fn((tag) => {
	return mockElementId
})

describe(`VideoEditorContainer testing`, () => {
	it(`simulate event`, () => {
		const wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)
		const mock = {x: 100, y: 50}
		// wrapper.find(`.helpIcon`).simulate(`click`)
		// wrapper.find(`.zoom-thumb`).at(0).prop(`onMouseLeave`)()
		// wrapper.find(`.zoom-thumb`).at(0).prop(`onMouseEnter`)(
		// 	{ target:
		// 		{ getBoundingClientRect: () => {
		// 			return mock
		// 		}}
		// 	, currentTarget: {offsetWidth: 10},
		// 	},
		// )

	})
	it(`contentCache[id].url === empty`, () => {
		const wrapper = mount(
			<Provider store={testutil.store2}>
				<BrowserRouter>
					<Container {...props}/>
				</BrowserRouter>
			</Provider>,
		)
		expect(wrapper).toBeDefined()
		// wrapper.find(`.helpIcon`).simulate(`click`)
	})

})
