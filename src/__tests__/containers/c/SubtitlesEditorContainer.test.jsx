
import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Container from '../../../containers/c/SubtitlesEditorContainer'
import { Timeline, EventList } from '../../../components/c/SubtitleEditor'
import { Icon } from '../../../components/bits/SubtitleEditorSideMenu/styles'
// import { interfaceService } from 'services'
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

jest.mock(`react-router-dom`, () => ({
	...jest.requireActual(`react-router-dom`), // use actual for all non-hook parts
	useParams: () => ({
		id: 0,
	}),
	useRouteMatch: () => ({ url: `/lab-assistant-manager/22/0` }),
}))

jest.mock(`react`, () => {
	const originReact = jest.requireActual(`react`)
	const mUseRef = jest.fn()
	return {
		...originReact,
		useRef: mUseRef,
	}
})

jest.mock(`react`, () => ({
	...jest.requireActual(`react`),
	useRef: () => ({
		current: {
			scrollHeight: 50,
			clientHeight: 100,
		},
	}),
}))

describe(`SubtitlesEditorContainer testing`, () => {
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

	it(`Add subtitle`, () => {
		// Add subtitle Layer
		expect(wrapper.contains(<h1>Choose an Option</h1>)).toEqual(false)
		wrapper.find(`.setSubModalVisible`).simulate(`click`)
		expect(wrapper.contains(<h1>Choose an Option</h1>)).toEqual(true)
		expect(wrapper.contains(`No Language`)).toEqual(false)
		wrapper.find(`.modalButton`).at(0).simulate(`click`)
		expect(wrapper.contains(`No Language`)).toEqual(true)

		// Edit title
		expect(wrapper.contains(`Updated Title`)).toEqual(false)
		wrapper.find(`.editIcon`).at(0).simulate(`click`)
		wrapper.find(`.sideTabInput`).at(0).simulate(`change`, { target: { value: `Updated Title` } })
		wrapper.find(`.saveIcon`).at(0).simulate(`click`)
		expect(wrapper.contains(`Updated Title`)).toEqual(true)

		wrapper.find(`.save`).simulate(`click`)

		// Allow skip
		wrapper.find(`.allow-event`).prop(`onMouseLeave`)()

		// Delete Subtitle
		wrapper.find(`.subtitle-delete`).simulate(`click`)

		// Delete Layer
		wrapper.find(`.trashIcon`).at(0).simulate(`click`)

		wrapper.find(`.play-btn`).simulate(`click`)
		wrapper.find(`.play-btn`).simulate(`click`)
	})

	it(`SubtitleEditorSideMenu: Edit text & time $ plus button`, () => {
		// Add subtitle Layer
		wrapper.find(`.setSubModalVisible`).simulate(`click`)
		wrapper.find(`.modalButton`).at(0).simulate(`click`)

		// edit text & time
		wrapper.find(`.handleFocus`).simulate(`click`)
		wrapper.find(`.subText`).at(0).simulate(`change`, { target: { value: `Updated text` } })
		expect(wrapper.find(`textarea`).props().value).toBe(`Updated text`)
		wrapper.find(`#subStart0`).simulate(`click`)
		wrapper.find(`ReactPlayer`).prop(`onDuration`)(200)

		// wrapper.find(`.play-btn`).simulate(`click`)

		// Edit start time
		expect(wrapper.find(`#subStart0`).at(0).props().value).toBe(`00:00.00`)
		wrapper.find(`#subStart0`).simulate(`change`, { target: { value: `00:01.30` } })
		expect(wrapper.find(`#subStart0`).at(0).props().value).toBe(`00:01.30`)

		// Edit end time
		expect(wrapper.find(`#subEnd0`).at(0).props().value).toBe(`00:02.00`)
		wrapper.find(`#subEnd0`).simulate(`change`, { target: { value: `00:02.30` } })
		expect(wrapper.find(`#subEnd0`).at(0).props().value).toBe(`00:02.30`)

		// Simulate top plus icon
		wrapper.find(`.initial`).at(0).simulate(`click`)
		expect(wrapper.find(`#subStart0`).props().value).toBe(`00:00.00`)

		// Simulate middle plus icon
		wrapper.find(Icon).at(4).simulate(`click`)
		expect(wrapper.find(`#subStart2`).props().value).toBe(`00:02.30`)
		expect(wrapper.find(`#subEnd2`).props().value).toBe(`00:04.30`)
		wrapper.find(`#subEnd2`).simulate(`change`, { target: { value: `03:19.00` } })
		expect(wrapper.find(`#subEnd2`).props().value).toBe(`03:19.00`)

		// Simulate button plus icon
		wrapper.find(`#icon2`).at(0).simulate(`click`)
		expect(wrapper.find(`#subEnd3`).props().value).toBe(`03:20.00`)

		// Incomplete input time
		wrapper.find(`#subEnd2`).prop(`onBlur`)( { target: { value: `03:` } })
		wrapper.find(`#subEnd2`).simulate(`click`)
		expect(wrapper.find(`#subEnd2`).props().value).toBe(`03:00.00`)
	})

	it(`SubtitlesLayer: drag and drop`, () => {
		// Add subtitle Layer
		wrapper.find(`.setSubModalVisible`).simulate(`click`)
		wrapper.find(`.modalButton`).at(0).simulate(`click`)

		wrapper.find(`Rnd`).simulate(`click`)
		wrapper.find(`Rnd`).prop(`onDrag`)( {x: 67}, {start: 34, end: 36, text: ``} )
		wrapper.find(`Rnd`).prop(`onResizeStop`)( { x: 318, y: 574}, `right`, ``, {width: 144, height: 0} , `` )
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
		wrapper.find(`Rnd`).prop(`onDragStop`)( ``, {d: {x: 10}})
		// wrapper.find(`Rnd`).prop(`onMouseEnter`)()
		wrapper.find(`Rnd`).prop(`onMouseLeave`)()


		console.log(wrapper.debug())


	})

})