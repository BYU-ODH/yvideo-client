import styled from 'styled-components'

import closedCaption from 'assets/controls_closed_captions.svg'
import enterFullscreen from 'assets/controls_enter_fullscreen.svg'
import exitFullscreen from 'assets/controls_exit_fullscreen.svg'
import pauseIcon from 'assets/controls_pause.svg'
import playIcon from 'assets/controls_play.svg'
import volumeIcon from 'assets/controls_volume.svg'
import volumeIconMute from 'assets/controls_muted.svg'

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
	z-index: 20;

	& .right {
		grid-area: right;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
	}

	& .left {
		grid-area: left;
		display: flex;
		align-items: center;
	}

	& > div > button {
		height: 2rem;
		width: 2rem;
		background-size: contain;
		border: none;
		margin: 1rem;
		outline: none;
	}

	& button {
		cursor: pointer;
	}
`

export default Style

export const PlayPause = styled.button`
	background: url(${props => props.playing ? pauseIcon : playIcon}) center no-repeat;
`

export const Volume = styled.button`
	background: ${ props => props.muted ? `url(${volumeIconMute}) center no-repeat` : (`url(${volumeIcon}) center no-repeat`) };
`

export const ClosedCaptions = styled.button`
	background: url(${closedCaption}) center no-repeat;
`

export const Fullscreen = styled.button`
	background: url(${props => props.fullscreen ? exitFullscreen : enterFullscreen}) center no-repeat;
`