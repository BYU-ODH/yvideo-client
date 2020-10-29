import React, { useState, useEffect } from 'react'
import { shallow, mount } from 'enzyme'
import PlayerControls from '../../../../components/bits/PlayerControls'
import Style, { PlayPause, ClosedCaptions, Fullscreen, Volume, 	Speed, } from '../../../../components/bits/PlayerControls/styles'
import { BrowserRouter } from 'react-router-dom'
import { Scrubber, VolumeScrubber } from 'components/bits'
import sinon from "sinon";


const setIsCaption = jest.fn()

const props = {
	handlers : {
		handleToggleFullscreen: jest.fn(),
		setIsCaption: jest.fn(),
	},
	viewstate : {
		fullscreen: "fullscreen",
		progress: {
			played: "played"
		}
	}
}


it(`PlayerControls onChange`, ()=> {
	const mockCallBack = jest.fn();
	const button = shallow(<Fullscreen onClick={mockCallBack}/>);
	button.find('StyledComponent').simulate('click');
	expect(mockCallBack.mock.calls.length).toEqual(1);
})
it(`PlayerControls onChange`, ()=> {
	const mockCallBack = jest.fn();
	const button = shallow(<Speed onClick={mockCallBack}/>);
	button.find('StyledComponent').simulate('click');
	expect(mockCallBack.mock.calls.length).toEqual(1);
})
it(`PlayerControls onChange`, ()=> {
	const mockCallBack = jest.fn();
	const button = shallow(<PlayPause onClick={mockCallBack}/>);
	button.find('StyledComponent').simulate('click');
	expect(mockCallBack.mock.calls.length).toEqual(1);
})
it(`PlayerControls onChange`, ()=> {
	const mockCallBack = jest.fn();
	const button = shallow(<ClosedCaptions onClick={mockCallBack}/>);
	button.find('StyledComponent').simulate('click');
	expect(mockCallBack.mock.calls.length).toEqual(1);
})

// it(`TrackEditorSideMenu onChange`, ()=> {
	// 	const [showSpeed, setShowSpeed] = useState(false)
	// 	const handleClick = sinon.spy();
	// 	let wrapper = shallow(<PlayerControls setShowSpeed={handleClick} {...props}/>);
	// 	console.log(wrapper.debug())
	// 	wrapper.find('.menu-modal').at(1).prop('onMouseLeave')()
	// 	expect(handleClick.calledOnce).toBe(true);
	// })

// it(`PlayerControls onChange`, ()=> {
// 	const mockCallBack = jest.fn();
// 	const button = shallow(<Scrubber handleClick={mockCallBack}/>);
// 	button.find('StyledComponent').simulate('click');
// 	expect(mockCallBack.mock.calls.length).toEqual(1);
// })
