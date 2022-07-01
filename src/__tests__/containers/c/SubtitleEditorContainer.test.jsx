
import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Container from '../../../containers/c/SubtitleEditorContainer'
import Modal from '../../../components/modals/containers/SubtitlesModalContainer'
import { act } from 'react-dom/test-utils'
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
	allSubs: [
		{
			content: [{start: 10, end: 20, text: `test`}, {start: 0, end: 10, text: `test`}, {start: 20, end: 30, text: `test`}],
		},
	],
	handlers: {
		openSubModal: jest.fn(),
		setSideEditor: jest.fn(),
	},
	viewstate: {
		showSideEditor: true,
	},
}
const createModProps = {
	mode: `create`,
	handleAddSubLayer: jest.fn(),
	handleAddSubLayerFromFile: jest.fn(),
	setIsReady: jest.fn(),
	index: 0,
}

const deleteModProps = {
	mode: `delete`,
	deleteTitle: `testSubs`,
	handleDeleteSubLayer: jest.fn(),
	index: 0,
}
const mock = {x: 100, y: 50}
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
	useRouteMatch: () => ({ url: `/lab-assistant-manager/22/0` }),
}))

// jest.mock(`react`, () => {
// 	const originReact = jest.requireActual(`react`)
// 	const mUseRef = jest.fn()
// 	return {
// 		...originReact,
// 		useRef: mUseRef,
// 	}
// })

// jest.mock(`react`, () => ({
// 	...jest.requireActual(`react`),
// 	useRef: () => ({
// 		current: {
// 			// scrollTo: () => {},
// 			// scrollHeight: 100,
// 			// clientHeight: 50,
// 		},
// 	}),
// }))
describe(`SubtitleEditorContainer testing`, () => {
	let wrapper
	beforeEach(() => {
		wrapper = mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Container {...props}/>
					<Modal {...createModProps}/>
					<Modal {...deleteModProps}/>
				</BrowserRouter>
			</Provider>
		)
	})

	jest.useFakeTimers()
	jest.spyOn(global, `setTimeout`)

	const listenerMock = {offsetX: 100}
	const boundingMock = {x: 100, y: 50}
	const scrubberMock = {
		scrollLeft: 10, style: {color: `red`},
		addEventListener: () => {
			return listenerMock
		},
		getBoundingClientRect: () => {
			return boundingMock
		},
	}
	document.getElementById = jest.fn((tag) => {
		return scrubberMock
	})

	it(`Add subtitle`, () => {
		act(() => {
			wrapper.find(`ReactPlayer`).prop(`onDuration`)(200)
		})

		expect(wrapper.contains(<h1>Choose an Option</h1>)).not.toEqual(false)
		wrapper.find(`.setSubModalVisible`).simulate(`click`)
		expect(wrapper.contains(<h1>Choose an Option</h1>)).toEqual(true)
		expect(wrapper.contains(`No Language`)).toEqual(false)
		wrapper.find(`.modalButton`).at(0).simulate(`click`)

		// Edit title
		expect(wrapper.contains(`Updated Title`)).toEqual(false)
		wrapper.find(`.editIcon`).at(0).simulate(`click`)
		wrapper.find(`.sideTabInput`).at(0).simulate(`change`, { target: { value: `Updated Title` } })
		wrapper.find(`.saveIcon`).at(0).simulate(`click`)
		expect(wrapper.contains(`Updated Title`)).toEqual(true)

		wrapper.find(`.save`).simulate(`click`)

		wrapper.find(`.switch-toggle`).at(0).simulate(`click`)

		act(() => {
			wrapper.find(`.play-btn`).simulate(`click`)
			wrapper.find(`.play-btn`).simulate(`click`)
		})

		wrapper.find(`.trashIcon`).at(0).simulate(`click`)
		wrapper.find(`.url-content-cancel`).at(0).simulate(`click`)
		wrapper.find(`.url-content-delete`).at(0).simulate(`click`)
	})

	// it(`SubtitleEditorSideMenu: Edit text & time $ add top button`, () => {
	// 	act(() => {
	// 		wrapper.find(`ReactPlayer`).prop(`onDuration`)(200)
	// 	})

	// 	const chicken = wrapper.find({"id": `subtitleEditorSideMenu`})

	// 	wrapper.find(`.modalButton`).at(0).simulate(`click`)
	// 	wrapper.find(`.setSubModalVisible`).simulate(`click`)

	// 	wrapper.find(`.subText`).simulate(`change`, { target: { value: `Updated text` } })
	// 	expect(wrapper.find(`textarea`).props().value).toBe(`Updated text`)
	// 	wrapper.find(`#subStart0`).simulate(`click`)

	// 	expect(wrapper.find(`#subStart0`).at(0).props().value).toBe(`00:00.00`)
	// 	wrapper.find(`#subStart0`).simulate(`change`, { target: { value: `00:01.30` } })
	// 	expect(wrapper.find(`#subStart0`).at(0).props().value).toBe(`00:01.30`)

	// 	expect(wrapper.find(`#subEnd0`).at(0).props().value).toBe(`00:02.00`)
	// 	wrapper.find(`#subEnd0`).simulate(`change`, { target: { value: `00:02.30` } })
	// 	expect(wrapper.find(`#subEnd0`).at(0).props().value).toBe(`00:02.30`)

	// 	wrapper.find(`#subStart0`).simulate(`change`, { target: { value: `00:03.30` } })
	// 	wrapper.find(`#subStart0`).simulate(`change`, { target: { value: `` } })
	// 	wrapper.find(`#subStart0`).simulate(`change`, { target: { value: `10:03.30` } })

	// 	wrapper.find(`#subStart0`).simulate(`change`, { target: { value: `00:01.30` } })

	// 	wrapper.find(`#subEnd0`).simulate(`change`, { target: { value: `` } })
	// 	wrapper.find(`#subEnd0`).simulate(`change`, { target: { value: `10:03.30` } })
	// 	wrapper.find(`#subEnd0`).simulate(`change`, { target: { value: `00:01.20` } })

	// 	wrapper.find(`#subEnd0`).simulate(`change`, { target: { value: `00:02.20` } })

	// 	wrapper.find(`.initial`).at(0).simulate(`click`)
	// 	expect(wrapper.find(`#subStart0`).props().value).toBe(`00:00.00`)
	// 	expect(wrapper.find(`#subEnd0`).props().value).toBe(`00:01.30`)

	// 	wrapper.find(`#subStart1`).simulate(`change`, { target: { value: `00:01.20` } })
	// 	wrapper.find(`#subEnd0`).simulate(`change`, { target: { value: `00:01.30` } })
	// 	wrapper.find(`#subStart1`).simulate(`change`, { target: { value: `00:02.00` } })

	// 	expect(wrapper.find(`#subStart0`).props().value).toBe(`00:00.00`)
	// 	expect(wrapper.find(`#subEnd0`).props().value).toBe(`00:01.30`)
	// 	expect(wrapper.find(`#subStart1`).props().value).toBe(`00:02.00`)
	// 	expect(wrapper.find(`#subEnd1`).props().value).toBe(`00:02.20`)
	// })

	// it(`SubtitleEditorSideMenu: add middle and bottom button & onBlur`, () => {
	// 	act(() => {
	// 		wrapper.find(`ReactPlayer`).prop(`onDuration`)(200)
	// 	})

	// 	wrapper.find(`.setSubModalVisible`).simulate(`click`)
	// 	wrapper.find(`.modalButton`).at(0).simulate(`click`)
	// 	wrapper.find(`.iconBottom`).at(0).simulate(`click`)
	// 	expect(wrapper.find(`#subStart1`).props().value).toBe(`00:02.00`)
	// 	expect(wrapper.find(`#subEnd1`).props().value).toBe(`00:04.00`)

	// 	wrapper.find(`#subStart1`).simulate(`change`, { target: { value: `00:03.00` } })
	// 	wrapper.find(`#subEnd1`).simulate(`change`, { target: { value: `03:19.00` } })

	// 	wrapper.find(`.iconBottom`).at(0).simulate(`click`)
	// 	expect(wrapper.find(`#subStart1`).props().value).toBe(`00:02.00`)
	// 	expect(wrapper.find(`#subEnd1`).props().value).toBe(`00:03.00`)

	// 	wrapper.find(`.iconBottom`).at(8).simulate(`click`)
	// 	expect(wrapper.find(`#subStart3`).props().value).toBe(`03:19.00`)
	// 	expect(wrapper.find(`#subEnd3`).props().value).toBe(`03:20.00`)

	// 	act(() => {
	// 		wrapper.find(`#subStart3`).prop(`onBlur`)( { target: { value: `03:` } })
	// 	})
	// 	wrapper.find(`#subEnd2`).simulate(`click`)
	// 	expect(wrapper.find(`#subStart3`).props().value).toBe(`03:00.00`)

	// 	act(() => {
	// 		wrapper.find(`#subEnd3`).prop(`onBlur`)( { target: { value: `03:01` } })
	// 	})
	// 	wrapper.find(`#subEnd2`).simulate(`click`)
	// 	expect(wrapper.find(`#subEnd3`).props().value).toBe(`03:01.00`)
	// })

	// it(`SubtitleEditorSideMenu: delete sub`, () => {
	// 	act(() => {
	// 		wrapper.find(`ReactPlayer`).prop(`onDuration`)(200)
	// 	})

	// 	wrapper.find(`.setSubModalVisible`).simulate(`click`)
	// 	wrapper.find(`.modalButton`).at(0).simulate(`click`)

	// 	wrapper.find(`.iconBottom`).at(0).simulate(`click`)

	// 	wrapper.find(`#subStart1`).simulate(`change`, { target: { value: `10:00.00` } })
	// 	wrapper.find(`.subtitle-delete`).at(1).simulate(`click`)

	// 	wrapper.find(`.iconBottom`).at(0).simulate(`click`)
	// 	wrapper.find(`#subEnd1`).simulate(`change`, { target: { value: `10:00.00` } })
	// 	wrapper.find(`.subtitle-delete`).at(1).simulate(`click`)

	// 	wrapper.find(`.iconBottom`).at(0).simulate(`click`)
	// 	wrapper.find(`.iconBottom`).at(5).simulate(`click`)
	// 	wrapper.find(`#subEnd1`).simulate(`change`, { target: { value: `01:00.00` } })
	// 	wrapper.find(`.subtitle-delete`).at(0).simulate(`click`)
	// 	wrapper.find(`.subtitle-delete`).at(0).simulate(`click`)

	// 	wrapper.find(`.iconBottom`).at(0).simulate(`click`)
	// 	wrapper.find(`.iconBottom`).at(5).simulate(`click`)
	// 	wrapper.find(`#subStart1`).simulate(`change`, { target: { value: `01:00.00` } })
	// 	wrapper.find(`.subtitle-delete`).at(0).simulate(`click`)
	// 	wrapper.find(`.subtitle-delete`).at(0).simulate(`click`)
	// })

	it(`SubtitlesLayer: drag and drop`, () => {

		wrapper.find(`.setSubModalVisible`).simulate(`click`)
		wrapper.find(`.modalButton`).at(0).simulate(`click`)

		wrapper.find(`Rnd`).forEach((comp) => {
			comp.simulate(`click`)
		})
		wrapper.find(`Rnd`).forEach((comp) => {
			comp.prop(`onDrag`)( {x: 67}, {start: 34, end: 36, text: ``} )
		})
		wrapper.find(`Rnd`).forEach((comp) => {
			comp.prop(`onResizeStop`)({ x: 318, y: 574 }, `right`, ``, {width: 144, height: 0} , ``)
		})
		wrapper.find(`Rnd`).at(0).prop(`onMouseEnter`)(
			{ target:
				{ getBoundingClientRect: () => {
					return mock
				}}
			, currentTarget: {offsetWidth: 10},
			},
		)
	})

	it(`Zoom control`, () => {
		wrapper.find(`.setSubModalVisible`).simulate(`click`)
		wrapper.find(`.modalButton`).at(0).simulate(`click`)

		wrapper.find(`.setSubModalVisible`).simulate(`click`)
		wrapper.find(`.modalButton`).at(0).simulate(`click`)

		window.onload = function () {
			document.getElementsByClassName(`events`).clientWidth = jest.fn((tag) => {
				return 1100
			})

			document.getElementById(`time-bar`).scrollLeft = jest.fn(() => {
				return 0
			})
			document.getElementById(`time-indicator-container`).scrollLeft = jest.fn((tag) => {
				return 0
			})
		}
		wrapper.find(`Rnd`).forEach(comp => {
			comp.prop(`onDragStop`)( ``, {d: {x: 10}})
		})
		// wrapper.find(`Rnd`).prop(`onMouseLeave`)()

	})
})