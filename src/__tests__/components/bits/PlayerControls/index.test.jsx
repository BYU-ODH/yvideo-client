import React, { useState, useEffect } from 'react'
import { shallow, mount } from 'enzyme'
import PlayerControls from '../../../../components/bits/PlayerControls'
import Style, { PlayPause, ClosedCaptions, Fullscreen, Volume, 	Speed, } from '../../../../components/bits/PlayerControls/styles'
import clockIcon from '../../../../components/bits/PlayerControls/styles'


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
	},
	viewstate : {
		fullscreen: "fullscreen",
		displaySubtitles: {
			language: "English"
		},
		progress: {
			played: "played"
		},
		isCaption: true,
		subtitles: [{
			content: [{
				end: 24.201520912547526,
				start: 3.2319391634980987,
				text: "First Line"
			}],
			id: 1,
			language: "English",
			title: "Test"
			}]
	}
}

it(`Fullscreen onClick`, ()=> {
	const mockCallBack = jest.fn()
	const button = shallow(<Fullscreen onClick={mockCallBack}/>)
	button.find('StyledComponent').simulate('click')
	expect(mockCallBack.mock.calls.length).toEqual(1)
})
it(`Speed onClick`, ()=> {
	const mockCallBack = jest.fn()
	const button = shallow(<Speed src={clockIcon} onClick={mockCallBack}/>)
	button.find('StyledComponent').simulate('click')
	expect(mockCallBack.mock.calls.length).toEqual(1)
})
it(`PlayPause onClick`, ()=> {
	const mockCallBack = jest.fn()
	const button = shallow(<PlayPause onClick={mockCallBack}/>)
	button.find('StyledComponent').simulate('click')
	expect(mockCallBack.mock.calls.length).toEqual(1)
})
it(`ClosedCaptions onClick`, ()=> {
	const mockCallBack = jest.fn()
	const button = shallow(<ClosedCaptions onClick={mockCallBack}/>)
	button.find('StyledComponent').simulate('click')
	expect(mockCallBack.mock.calls.length).toEqual(1)
})

it(`simulate input`, ()=> {
	props.viewstate.isCaption = false
	const wrapper = shallow(<PlayerControls {...props}/>)
	wrapper.find(Speed).simulate('click')
	expect(wrapper.text().includes(`Playback Rate`)).toBe(true)
	wrapper.find('input').at(0).simulate('click', { target: { value: 3.0 } })
	let checked = wrapper.find('[value=3.0]').first()
	expect(checked).toBeDefined()

	wrapper.find('input').at(1).simulate('click', { target: { value: 2.0 } })
	checked = wrapper.find('[value=2.0]').first()
	expect(checked).toBeDefined()

	wrapper.find('input').at(2).simulate('click', { target: { value: 1.5 } })
	checked = wrapper.find('[value=1.5]').first()
	expect(checked).toBeDefined()

	wrapper.find('input').at(3).simulate('click')
	checked = wrapper.find('[value="Normal"]').first()
	expect(checked).toBeDefined()

	wrapper.find('input').at(4).simulate('click', { target: { value: 0.5 } })
	checked = wrapper.find('[value=0.5]').first()
	expect(checked).toBeDefined()

	wrapper.find('input').at(5).simulate('click', { target: { value: 0.25 } })
	checked = wrapper.find('[value=0.25]').first()
	expect(checked).toBeDefined()
})

it(`simulate isCaption`, ()=> {
	props.viewstate.isCaption = true;
	const wrapper = shallow(<PlayerControls {...props}/>)
	wrapper.find(".menu-modal").simulate('MouseLeave')
	expect(wrapper.text().includes(`Select Caption`)).toBe(true)

	const mockCallBack = jest.fn()
	const input = shallow(<input key="1" type="button" value="English" onClick={mockCallBack}/>)
	input.find('input').simulate('click')
	expect(mockCallBack.mock.calls.length).toEqual(1)
})

it(`simulate setShowSpeed`, ()=> {
	props.viewstate.isCaption = true
	const wrapper = shallow(<PlayerControls {...props}/>)
	wrapper.find(Speed).simulate('click')
	wrapper.find(".menu-modal").at(0).simulate('MouseLeave')
})

it(`simulate setIsCaption`, ()=> {
	props.viewstate.isCaption = true
	props.handlers.handleShowSubtitle = jest.fn()

	const wrapper = shallow(<PlayerControls {...props}/>)
	wrapper.find(Speed).simulate('click')
	wrapper.find(ClosedCaptions).simulate('click')
})