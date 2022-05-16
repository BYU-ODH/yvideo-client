import React from 'react'
import { mount } from 'enzyme'
import VideoContainer from '../../../../components/c/VideoContainer'
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'
import { act } from 'react-dom/test-utils'

const props = {
	url: `url`,
	getDuration: jest.fn(),
	handleLastClick: jest.fn(),
	getVideoTime: jest.fn(),
	events: [
		{
			end: 10,
			icon: `/static/media/event_skip.cbe8f9bf.svg`,
			layer: 0,
			start: 0,
			type: `Skip`,
			position: { x: 10, y: 50},
		},
		{
			end: 10,
			icon: `/static/media/event_censor.cbe8f9bf.svg`,
			layer: 0,
			start: 0,
			type: `Censor`,
			position: [
				{ x: 10, y: 50},
				{ x: 5, y: 30},
			],
		},
		{
			end: 10,
			icon: `/static/media/event_pause.cbe8f9bf.svg`,
			layer: 0,
			start: 0,
			type: `Pause`,
			position: { x: 10, y: 50},
		},
		{
			end: 10,
			icon: `/static/media/event_pause.cbe8f9bf.svg`,
			layer: 0,
			start: 0,
			type: `Pause`,
			position: { x: 10, y: 50},
		},
		{
			end: 10,
			icon: `/static/media/event_mute.cbe8f9bf.svg`,
			layer: 0,
			start: 0,
			type: `Mute`,
			position: { x: 10, y: 50},
		},
	],
	updateEvents: jest.fn(),
	eventToEdit: 1,
	activeCensorPosition: 0,
	setActiveCensorPosition: jest.fn(),
	subtitles: {},
	handleScroll: jest.fn(),
	editorType: `video`,
	aspectRatio: [16,9],
}

const reactPlayerProps = {
	playing: false,
	volume: 1,
	muted: true,
	playbackRate: 1,
}

window.ResizeObserver =
	window.ResizeObserver ||
	jest.fn().mockImplementation(() => ({
		disconnect: jest.fn(),
		observe: jest.fn(),
		unobserve: jest.fn(),
	}))

describe(`VideoContainer test`, () => {
	const setup = () => mount(
		<Provider store={testutil.store}>
			<BrowserRouter>
				<VideoContainer {...props} />
			</BrowserRouter>
		</Provider>,
	)

	const map = {}
	const boundingMock = {x: 100, y: 50, left: 10, right: 10000, offsetX: 10, width: 10}
	const scrubberMock = {
		value: 0,
		style: {
			width: 0 ,
			visibility: 0,
			transform: 0,
			right: 10,
		},
		clientWidth: 10,
		scrollLeft: 10,
		addEventListener: (e, cb) => {
			map[e] = cb
		},
		getBoundingClientRect: () => {
			return boundingMock
		},
		remove: () => {},
		children: [{ className: `className1` }, { className: `className2` }],
		removeChild: () => {},
		appendChild: () => {},
	}

	document.getElementById = jest.fn(() => scrubberMock)
	//TODO: test fix
	const map1 = {}
	window.addEventListener = jest.fn((event, cb) => {
		map1[event] = cb
	})
	// TODO: This still needs fixin'
		// it(`keyup`, () => {
		// setup()
		// act(() => {
		// 	map1.keyup({ code: `ArrowRight` })
		// 	map1.keyup({ code: `ArrowLeft` })
		// 	map1.keyup({ code: `Comma` })
		// 	map1.keyup({ code: `Period` })
		// 	map1.keyup({ code: `default` })
		// })
	// })

	it(`wrapper simulate click`, ()=> {
		const wrapper = setup()
		wrapper.find(`CensorDnD`).prop(`handleUpdateCensorPosition`)({ x: 10, y: 10 })
		wrapper.find(`CensorDnD`).prop(`handleUpdateCensorResize`)({width: 10, height: 10}, { x: 10, y: 10 })
		wrapper.find(`CensorDnD`).prop(`seekTo`)({pageX: 10, currentTarget: { getBoundingClientRect: () => {
			return boundingMock
		}}}, 100)

		act(() => {
			wrapper.find(`ReactPlayer`).prop(`onContextMenu`)({ preventDefault: () => {}	})
			// wrapper.find(`ReactPlayer`).prop(`onReady`)({ props: reactPlayerProps })
			wrapper.find(`ReactPlayer`).prop(`onError`)()
			wrapper.find(`ReactPlayer`).prop(`onPlay`)()
			wrapper.find(`ReactPlayer`).prop(`onPause`)()
			wrapper.find(`ReactPlayer`).prop(`onDuration`)( 100 )
			wrapper.find(`ReactPlayer`).prop(`onProgress`)({played: 1, playedSeconds: 0})
			// wrapper.find(`.play-btn`).prop(`onClick`)()
			// wrapper.find(`.play-btn`).prop(`onClick`)()
			// wrapper.find(`.mute`).prop(`onClick`)()
			wrapper.find(`#time-bar`).prop(`onMouseLeave`)()
			wrapper.find(`#timeBarProgress`).prop(`onClick`)({pageX: 10, currentTarget: { getBoundingClientRect: () => {
				return {x: 100, y: 50, right: 10000}
			}}}, 100)
		})
	})
	it(`keyup`, () => {
		props.activeCensorPosition = -1
		const wrapper = setup()
		wrapper.find(`.blank`).at(0).prop(`onClick`)({ clientX: 60, clientY: 50 })
	})
	it(`empty event`, () => {
		props.events = []
		const wrapper = setup()
		wrapper.find(`.blank`).at(0).prop(`onClick`)({ clientX: 60, clientY: 50 })
	})
})
