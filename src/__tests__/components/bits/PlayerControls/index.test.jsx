import React, { useState, useEffect } from 'react'
import { shallow, mount } from 'enzyme'
import PlayerControls from '../../../../components/bits/PlayerControls'
import Style, { PlayPause, ClosedCaptions, Fullscreen, Volume, 	Speed, Book, Help } from '../../../../components/bits/PlayerControls/styles'
import clockIcon from '../../../../components/bits/PlayerControls/styles'
import { BrowserRouter} from 'react-router-dom'

const props = {
	handlers : {
		handlePause: jest.fn(),
		handlePlay: jest.fn(),
		handlePlaybackRateChange: jest.fn(),
		handleSeekChange: jest.fn(),
		handleToggleFullscreen: jest.fn(),
		handleMuted: jest.fn(),
		handleUnmuted: jest.fn(),
		handleVolumeChange: jest.fn(),
		setIsCaption: jest.fn(),
		handleChangeSubtitle: jest.fn(),
		setShowTranscript: jest.fn(),
		handleShowSubtitle: jest.fn(),
		handleShowTip: jest.fn(),
		handleShowHelp: jest.fn(),
		toggleTip: jest.fn(),
		handleAspectRatio: jest.fn(),
	},
	viewstate : {
		fullscreen: true,
		displaySubtitles: {
			language: `English`,
		},
		progress: {
			played: `played`,
		},
		playing:true,
		isCaption: true,
		isAdmin: true,
		isProf: true,
		isMobile: true,
		clipTime: [1,2,3],
		duration: 120,
		subtitles: [
			{
				content: [
					{
						end: 24.201520912547526,
						start: 3.2319391634980987,
						text: `First Line`,
					},
				],
				id: 1,
				language: `English`,
				title: `Test`,
			},
		],
	},

	skipArray: []
}

describe(`Style onclick`, () => {

	let wrapper
	beforeEach(() => {
		wrapper = mount(
			<BrowserRouter>
				<PlayerControls {...props}/>
			</BrowserRouter>,
		)
	})

	it(`Fullscreen onClick`, ()=> {
		const button = wrapper.find(Fullscreen).simulate(`click`)
		expect(button).toBeDefined()
	})
	it(`Speed onMouseEnter`, ()=> {
		const button = wrapper.find(Speed).simulate(`mouseEnter`)
		expect(button).toBeDefined()
	})
	it(`Speed onMouseLeave`, ()=> {
		const button = wrapper.find(Speed).simulate(`mouseLeave`)
		expect(button).toBeDefined()
	})
	it(`PlayPause onClick`, ()=> {
		const button = wrapper.find(PlayPause).simulate(`click`)
		expect(button).toBeDefined()
	})
	it(`ClosedCaptions onClick`, ()=> {
		const button = wrapper.find(ClosedCaptions).simulate(`click`)
		expect(button).toBeDefined()
	})
	it(`ClosedCaptions onMouseEnter`, ()=> {
		const button = wrapper.find(ClosedCaptions).simulate(`mouseEnter`)
		expect(button).toBeDefined()
	})
	it(`ClosedCaptions onMouseLeave`, ()=> {
		const button = wrapper.find(ClosedCaptions).simulate(`mouseLeave`)
		expect(button).toBeDefined()
	})
	it(`Book onClick`, ()=> {
		const button = wrapper.find(Book).simulate(`click`)
		expect(button).toBeDefined()
	})
	it(`Help onClick`, ()=> {
		const button = wrapper.find(Help).simulate(`click`)
		expect(button).toBeDefined()
	})
	it(`Help onMouseEnter`, ()=> {
		const button = wrapper.find(Help).simulate(`mouseEnter`)
		expect(button).toBeDefined()
	})
	it(`Help onMouseLeave`, ()=> {
		const button = wrapper.find(Help).simulate(`mouseLeave`)
		expect(button).toBeDefined()
	})
})

it(`simulate input`, ()=> {
	props.viewstate.isCaption = false
	const wrapper = shallow(<PlayerControls {...props}/>)
	wrapper.find(Speed).simulate(`click`)
	expect(wrapper.text().includes(`Playback Rate`)).toBe(true)
	wrapper.find(`input`).at(0).simulate(`click`, { target: { value: 0.5 } })
	let checked = wrapper.find(`[value=0.5]`).first()
	expect(checked).toBeDefined()

	wrapper.find(`input`).at(1).simulate(`click`, { target: { value: 0.6 } })
	checked = wrapper.find(`[value=0.6]`).first()
	expect(checked).toBeDefined()

	wrapper.find(`input`).at(2).simulate(`click`, { target: { value: 0.7 } })
	checked = wrapper.find(`[value=0.7]`).first()
	expect(checked).toBeDefined()

	wrapper.find(`input`).at(3).simulate(`click`, { target: { value: 0.8 } })
	checked = wrapper.find(`[value=0.8]`).first()
	expect(checked).toBeDefined()

	wrapper.find(`input`).at(4).simulate(`click`, { target: { value: 0.9 } })
	checked = wrapper.find(`[value=0.9]`).first()
	expect(checked).toBeDefined()

	wrapper.find(`input`).at(5).simulate(`click`)
	checked = wrapper.find(`[value="Normal"]`).first()
	expect(checked).toBeDefined()

	wrapper.find(`input`).at(6).simulate(`click`, { target: { value: 1.25 } })
	checked = wrapper.find(`[value=1.25]`).first()
	expect(checked).toBeDefined()

	wrapper.find(`input`).at(7).simulate(`click`, { target: { value: 1.5 } })
	checked = wrapper.find(`[value=1.5]`).first()
	expect(checked).toBeDefined()

	wrapper.find(`input`).at(8).simulate(`click`, { target: { value: 1.75 } })
	checked = wrapper.find(`[value=1.75]`).first()
	expect(checked).toBeDefined()

	wrapper.find(`input`).at(9).simulate(`click`, { target: { value: 2.0 } })
	checked = wrapper.find(`[value=2.0]`).first()
	expect(checked).toBeDefined()

})

it(`simulate isCaption`, ()=> {
	props.viewstate.isCaption = true
	const wrapper = shallow(<PlayerControls {...props}/>)
	wrapper.find(`.menu-modal`).simulate(`MouseLeave`)
	expect(wrapper.text().includes(`Select Caption`)).toBe(true)

	const mockCallBack = jest.fn()
	const input = shallow(<input key='1' type='button' value='English' onClick={mockCallBack}/>)
	input.find(`input`).simulate(`click`)
	expect(mockCallBack.mock.calls.length).toEqual(1)
})

it(`simulate setShowSpeed`, ()=> {
	props.viewstate.isCaption = true
	const wrapper = shallow(<PlayerControls {...props}/>)
	wrapper.find(Speed).simulate(`click`)
	wrapper.find(`.menu-modal`).at(0).simulate(`MouseLeave`)
})

it(`simulate setShowSpeed`, ()=> {
	props.viewstate.isCaption = true
	props.viewstate.isAdmin = false
	props.viewstate.isProf = false
	const wrapper = shallow(<PlayerControls {...props}/>)
	wrapper.find(`.menu-modal`).at(0).simulate(`MouseLeave`)
})

it(`simulate setIsCaption`, ()=> {
	props.viewstate.isCaption = true
	props.handlers.handleShowSubtitle = jest.fn()

	const wrapper = shallow(<PlayerControls {...props}/>)
	wrapper.find(Speed).simulate(`click`)
	wrapper.find(ClosedCaptions).simulate(`click`)
})
