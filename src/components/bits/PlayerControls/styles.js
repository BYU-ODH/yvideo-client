import styled from 'styled-components'

import closedCaption from 'assets/controls_closed_captions.svg'
import enterFullscreen from 'assets/controls_enter_fullscreen.svg'
import exitFullscreen from 'assets/controls_exit_fullscreen.svg'
import pauseIcon from 'assets/controls_pause.svg'
import playIcon from 'assets/controls_play.svg'

const Style = styled.div`
	position: absolute;
	bottom: 0;

	height: 5rem;
	width: 100%;

	background: rgba(0,0,0,0.5);

	display: grid;

	grid-template-rows: .5rem auto;
	grid-template-areas:
		"scrubber scrubber"
		"left right";

	& .right {
		grid-area: right;
		display: flex;
		flex-direction: row-reverse;
	}

	& .left {
		grid-area: left;
		display: flex;
	}
`

export default Style

export const PlayPause = styled.button`
	background: url(${props => props.playing ? pauseIcon : playIcon}) center no-repeat;
	background-size: contain;
`

export const ClosedCaptions = styled.button`
	background: url(${closedCaption}) center no-repeat;
	background-size: contain;
`

export const Fullscreen = styled.button`
	background: url(${props => props.fullscreen ? exitFullscreen : enterFullscreen}) center no-repeat;
	background-size: contain;
`