import React from 'react'
import { mount } from 'enzyme'
import SubtitlesLayer from '../../../../components/bits/SubtitlesLayer'
import { BrowserRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'

const subs = [
	{
		end: 10,
		start: 1,
		text: `First`,
	},
	{
		end: 70,
		start: 60,
		text: `Second`,
	},
	{
		end: 101,
		start: 120,
		text: `Third`,
	},
	{
		end: 0,
		start: -1,
		text: `Forth`,
	},
]

const props = {
	subs,
	videoLength: 100,
	displayLayer: 1,
	width: 10,
	sideEditor: jest.fn(),
	updateSubs: jest.fn(),
	handleEventPosition: jest.fn(),
	setEventSeek: jest.fn(),
	setIsReady: jest.fn(),
}

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
// 			offsetWidth: 10,
// 			offsetHeight: 10,
// 		},
// 	}),
// }))

describe(`Subtitles Layer test`, () => {
	const mockElementClass = [{ style: {width: 10} }, { style: {width: 10} }]
	const mockElementId = { style: {width: 10} }
	document.getElementById = jest.fn((tag) => {
		return mockElementId
	})
	document.getElementsByClassName = jest.fn((tag) => {
		return mockElementClass
	})
	it(`event simulate onResizeStop`, () => {
		const wrapper = mount(
			<BrowserRouter>
				<SubtitlesLayer {...props} />
			</BrowserRouter>,
		)
		expect(wrapper.contains(<p>First</p>)).toEqual(true)
		expect(wrapper.contains(<p>Second</p>)).toEqual(true)

		act(() => {
			wrapper.find(`Rnd`).at(0).prop(`onResizeStop`)(``, `right`, ``, { width: 10 }, ``)
			wrapper.find(`Rnd`).at(0).prop(`onResizeStop`)(``, `left`, ``, { width: 10 }, ``)

			wrapper.find(`Rnd`).at(1).prop(`onResizeStop`)(``, `right`, ``, { width: 10 }, ``)
			wrapper.find(`Rnd`).at(1).prop(`onResizeStop`)(``, `left`, ``, { width: 5 }, ``)
			wrapper.find(`Rnd`).at(1).prop(`onResizeStop`)(``, `left`, ``, { width: 10 }, ``)

			wrapper.find(`Rnd`).at(2).prop(`onResizeStop`)(``, `right`, ``, { width: 10 }, ``)
			wrapper.find(`Rnd`).at(2).prop(`onResizeStop`)(``, `left`, ``, { width: 10 }, ``)

			wrapper.find(`Rnd`).at(3).prop(`onResizeStop`)(``, `right`, ``, { width: 10 }, ``)
			wrapper.find(`Rnd`).at(3).prop(`onResizeStop`)(``, `left`, ``, { width: 10 }, ``)
		})
	})

	it(`event simulate onDrag`, () => {
		props.subs =
		[
			{
				end: 0,
				start: -1,
				text: `Forth`,
			},
			{
				end: 10,
				start: 1,
				text: `First`,
			},
			{
				end: 101,
				start: 120,
				text: `Third`,
			},

		]
		const wrapper = mount(
			<BrowserRouter>
				<SubtitlesLayer {...props} />
			</BrowserRouter>,
		)

		act(() => {
			wrapper.find(`Rnd`).at(0).prop(`onDrag`)(``, { x: 10 })
			wrapper.find(`Rnd`).at(1).prop(`onDrag`)(``, { x: 10 })
			wrapper.find(`Rnd`).at(1).prop(`onDrag`)(``, { x: -20 })
			wrapper.find(`Rnd`).at(2).prop(`onDrag`)(``, { x: 10 })
		})
	})

	it(`event simulate, one sub`, () => {
		props.subs =
		[
			{
				end: 10,
				start: 1,
				text: `First`,
			},
		]
		const wrapper = mount(
			<BrowserRouter>
				<SubtitlesLayer {...props} />
			</BrowserRouter>,
		)

		act(() => {
			wrapper.find(`Rnd`).prop(`onResizeStop`)(``, `right`, ``, { width: 10 }, ``)
			wrapper.find(`Rnd`).prop(`onResizeStop`)(``, `left`, ``, { width: 10 }, ``)

			wrapper.find(`Rnd`).prop(`onDrag`)(``, { x: 10 })

			wrapper.find(`Rnd`).simulate(`click`)

		})
	})
})
