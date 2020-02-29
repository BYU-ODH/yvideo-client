import styled from 'styled-components'

// Copied from components/bits/PlayerControls

import closedCaption from 'assets/controls_closed_captions.svg'
import enterFullscreen from 'assets/controls_enter_fullscreen.svg'
import exitFullscreen from 'assets/controls_exit_fullscreen.svg'
import pauseIcon from 'assets/controls_pause.svg'
import playIcon from 'assets/controls_play.svg'
import volumeIcon from 'assets/controls_volume.svg'

const Style = styled.div`
	position: inline-block;
	bottom: 0;

	height: 5rem;
	width: 100%;

  /* TODO: Find better background color */
	background: rgb(241, 241, 241);

	display: grid;

	grid-template-rows: .5rem auto;
	grid-template-areas:
		"scrubber scrubber"
		"left right";

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

//TODO: Improve button styling
	& > div > button {
		height: 2rem;
		width: 2rem;
		/* background-size: contain; */
		border: none;
		margin: .5rem;
		margin-left: 1.5rem;
		outline: none;
		padding: 1.5rem;
		background-color: #0157b8;
		box-shadow: 1px
	}
`

export const PlayPause = styled.button`
	background: url(${props => props.playing ? pauseIcon : playIcon}) center no-repeat;
	background-size: 1rem;
	&:hover {
		background-color: #004593;
		-webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
     -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
          box-shadow: inset 0px 0px 5px #c1c1c1;
   outline: none;
	}
`

export const Time = styled.div`
	margin-left: 2rem;
	color: #606060
`

export const Volume = styled.button`
	background: url(${volumeIcon}) center no-repeat;
`

export const ClosedCaptions = styled.button`
	background: url(${closedCaption}) center no-repeat;
`

export const Fullscreen = styled.button`
	background: url(${props => props.fullscreen ? exitFullscreen : enterFullscreen}) center no-repeat;
`

export { Style }