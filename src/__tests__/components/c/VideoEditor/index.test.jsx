import React from 'react'
import { mount } from 'enzyme'
import VideoEditor from '../../../../components/c/VideoEditor'
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'
import { act } from 'react-dom/test-utils'

const handlers = {
	handleShowTip: jest.fn(),
	toggleTip: jest.fn(),
	handleShowHelp: jest.fn(),
}

const viewstate = {
	eventsArray: [
		{
			end: 10,
			icon: `/static/media/event_skip.cbe8f9bf.svg`,
			layer: 0,
			start: 0,
			type: `Skip`,
			position: { x: 10, y: 50},
		},
		{
			end: 15.63888888888889,
			halfLayer: 0,
			icon: `/static/media/event_censor.2d09c134.svg`,
			layer: 3,
			position: { x: 50, y: 50},
			start: 5.638888888888889,
			type: `Censor`,
		},
	],
	content: {
		authKey: `5377628e855d31ad4d84a8fdedf5758b`,
		clips: ``,
		collectionId: `f20a6546-1960-4271-a315-b022177458c0`,
		contentType: `video`,
		dateValidated: ``,
		description: `test`,
		expired: false,
		fullVideo: false,
		id: `0`,
		isCopyrighted: false,
		name: `testname`,
		physicalCopyExists: false,
		published: true,
		requester: ``,
		resource: {keywords: ``},
		resourceId: `00000000-0000-0000-0000-000000000000`,
		settings: {},
		thumbnail: `https://i.ytimg.com/vi/HK7SPnGSxLM/default.jpg`,
		url: ``,
		views: 0,
	},
	contentError: `error message`,
	url: `test url`,
}

const props = {
	setEvents: jest.fn(),
	updateContent: jest.fn(),
	handlers,
	viewstate,
}
window.ResizeObserver =
	window.ResizeObserver ||
	jest.fn().mockImplementation(() => ({
		disconnect: jest.fn(),
		observe: jest.fn(),
		unobserve: jest.fn(),
	}))
describe(`VideoEditor testing`, () => {
	let wrapper
	jest.useFakeTimers()
	jest.spyOn(global, `setTimeout`)
	beforeEach(() => {
		wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<VideoEditor {...props} />
				</BrowserRouter>
			</Provider>,
		)
	})

	const listenerMock = {offsetX: 100}
	const boundingMock = {x: 100, y: 50, right: 10000}
	const classMock = [{ clientWidth: 10, value: 10, style: {width: 10}},{ clientWidth: 10, value: 10, style: {width: 10}}]
	const scrubberMock = { scrollLeft: 10, style: {color: `red`},
		addEventListener: () => {
			return listenerMock
		},
		getBoundingClientRect: () => {
			return boundingMock
		} }
	document.getElementById = jest.fn((tag) => {
		return scrubberMock
	})
	document.getElementsByClassName = jest.fn((tag) => {
		return classMock
	})

	it(`Layer 0: Skip`, ()=> {

		wrapper.find(`.plusIcon`).at(0).simulate(`click`)
		act(() => {
			jest.advanceTimersByTime(100)
		})
		wrapper.find(`.handle`).at(0).simulate(`click`)

		act(() => {
			wrapper.find(`ReactPlayer`).prop(`onDuration`)(200)
		})

		expect(wrapper.find(`.sideTabInput`).at(0).props().value).toBe(`00:00.00`)
		wrapper.find(`.sideTabInput`).at(0).simulate(`change`, { target: { value: `00:01.30` } })
		expect(wrapper.find(`.sideTabInput`).at(0).props().value).toBe(`00:01.30`)

		wrapper.find(`.sideTabInput`).at(0).simulate(`change`, { target: { value: `10:01.30` } })
		wrapper.find(`.sideTabInput`).at(1).simulate(`change`, { target: { value: `10:01.30` } })
		wrapper.find(`.sideTabInput`).at(1).simulate(`change`, { target: { value: `00:01.30` } })
		wrapper.find(`.sideTabInput`).at(1).simulate(`change`, { target: { value: `03:01.30` } })
		wrapper.find(`.sideTabInput`).at(0).simulate(`change`, { target: { value: `03:10.30` } })

		wrapper.find(`.video`).at(0).prop(`handleScroll`)(0, true)

		wrapper.find(`.sideTabInput`).at(0).prop(`onMouseEnter`)(
			{
				target:
			{ getBoundingClientRect: () => {
				return boundingMock
			}}
				, currentTarget: {offsetWidth: 10},
			})
		wrapper.find(`.sideTabInput`).at(0).prop(`onMouseLeave`)()
		wrapper.find(`.sideTabInput`).at(0).prop(`onKeyUp`)(
			{ stopPropagation: () => {
				return `stopPropagation`
			}},
		)
		wrapper.find(`.sideTabInput`).at(1).prop(`onMouseEnter`)(
			{
				target:
			{ getBoundingClientRect: () => {
				return boundingMock
			}}
				, currentTarget: {offsetWidth: 10},
			})
		wrapper.find(`.sideTabInput`).at(1).prop(`onMouseLeave`)()
		wrapper.find(`.sideTabInput`).at(1).prop(`onKeyUp`)(
			{ stopPropagation: () => {
				return `stopPropagation`
			}},
		)
	})

	it(`Layer 3: Censor`, ()=> {
		act(() => {
			wrapper.find(`ReactPlayer`).prop(`onDuration`)(200)
		})
		expect(wrapper.contains(<label>Blur Times</label>)).toEqual(false)
		const party = wrapper.find(`.plusIcon`)
		wrapper.find(`.plusIcon`).at(12).simulate(`click`)
		act(() => {
			jest.advanceTimersByTime(100)
		})
		expect(wrapper.contains(<label>Blur Times</label>)).toEqual(true)

		wrapper.find(`.addCensor`).simulate(`click`)
		wrapper.find(`.handle`).at(2).simulate(`click`)
		wrapper.find(`.censorRow`).prop(`onChange`)({ target: { value: 0.0 } }, 0, 1)
		wrapper.find(`.blank`).at(0).prop(`onClick`)( { clientX: 60, clientY: 50 })

		wrapper.find(`.trashIcon`).simulate(`click`)
		wrapper.find(`.closeEditor`).simulate(`click`)
	})

	it(`Rnd`, ()=> {
		act(() => {
			wrapper.find(`ReactPlayer`).prop(`onDuration`)(200)
		})

		wrapper.find(`.plusIcon`).at(0).simulate(`click`)
		wrapper.find(`.handle`).at(0).simulate(`click`)

		wrapper.find(`.play-btn`).simulate(`click`)
		wrapper.find(`.play-btn`).simulate(`click`)

		act(() => {
			jest.advanceTimersByTime(100)
		})

		wrapper.find(`.layer-event`).at(0).prop(`onDragStop`)(``, {d: {x: -10000}})
		wrapper.find(`.layer-event`).at(0).prop(`onDragStop`)(``, {d: {x: 10000}})

		wrapper.find(`.layer-event`).at(0).prop(`onResizeStop`)(``, `left`, ``, {width: 10000}, ``)
		wrapper.find(`.layer-event`).at(0).prop(`onResizeStop`)(``, `right`, ``, {width: 10000}, ``)

		act(() => {
			wrapper.find(`.total`).prop(`onClick`)({pageX: 10,
				currentTarget:
				{ getBoundingClientRect: () => {
					return boundingMock
				}}}, 50)
			// wrapper.find(`ReactPlayer`).prop(`onProgress`)(0.1, 0)
		})
	})

	it(`zoom-indicator`, ()=> {
		act(() => {
			wrapper.find(`ReactPlayer`).prop(`onDuration`)(200)
			wrapper.find(`Rnd`).forEach(e =>e.prop(`onDragStop`)(``, {x: 0}))
			wrapper.find(`Rnd`).forEach(e =>e.prop(`onDragStop`)(``, {x: 10}))
			wrapper.find(`Rnd`).forEach(e =>e.prop(`onDragStop`)(``, {x: -10}))
			wrapper.find(`Rnd`).forEach(e =>e.prop(`onResizeStop`)( { x: 318, y: 574}, `right`, ``, {width: 144, height: 0} , `` ))

			wrapper.find(`Rnd`).at(0).prop(`onMouseEnter`)(
				{ target:
					{ getBoundingClientRect: () => {
						return boundingMock
					}}
				, currentTarget: {offsetWidth: 10},
				},
			)
			wrapper.find(`Rnd`).at(0).prop(`onMouseLeave`)()
		})
	})

	it(`empty eventsArray`, async ()=> {
		props.viewstate.eventsArray = []
		wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<VideoEditor {...props} />
				</BrowserRouter>
			</Provider>,
		)
		act(() => {
			wrapper.find(`ReactPlayer`).prop(`onDuration`)(200)
		})
		wrapper.find(`.plusIcon`).at(0).simulate(`click`)

		act(() => {
			wrapper.find(`Rnd`).forEach(e=>e.prop(`onDragStop`)(``, {x: 10}))
			jest.advanceTimersByTime(100)
		})
		// await wrapper.find(`.handleSaveAnnotation`).simulate(`click`)
		// wrapper.find(`.helpIcon`).simulate(`click`)

		const mockUrl = new URL(`https://example.com`)
		mockUrl.createObjectURL = jest.fn()
		delete window.URL
		window.URL = mockUrl

		// wrapper.find(`.handleExportAnnotation`).simulate(`click`)
		wrapper.find(`.deleteEventButton`).simulate(`click`)
	})

	it(`halfLayer eventsArray`, async ()=> {
		window.ResizeObserver =
	window.ResizeObserver ||
	jest.fn().mockImplementation(() => ({
		disconnect: jest.fn(),
		observe: jest.fn(),
		unobserve: jest.fn(),
	}))
		props.viewstate.eventsArray = [
			{
				end: 10,
				icon: `/static/media/event_skip.cbe8f9bf.svg`,
				layer: 0,
				start: 0,
				type: `Skip`,
				position: { x: 10, y: 50},
				halfLayer: true,
			},
		]
		wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<VideoEditor {...props} />
				</BrowserRouter>
			</Provider>,
		)
		// await wrapper.find(`.handleSaveAnnotation`).simulate(`click`)
	})

})