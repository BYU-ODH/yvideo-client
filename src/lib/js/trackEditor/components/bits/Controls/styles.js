import styled from 'styled-components'

// Copied from components/bits/PlayerControls

import closedCaption from 'assets/controls_closed_captions.svg'
import enterFullscreen from 'assets/controls_enter_fullscreen.svg'
import exitFullscreen from 'assets/controls_exit_fullscreen.svg'
import pauseIcon from 'assets/controls_pause.svg'
import playIcon from 'assets/controls_play.svg'
import volumeUpIcon from 'assets/controls_volume_up-rounded.svg'
import volumeMutedIcon from 'assets/controls_volume_mute-rounded.svg'
import visibiltyOnIcon from 'assets/visibility_on-outlined.svg'
import visibiltyOffIcon from 'assets/visibility_off-outlined.svg'

// import { Icon } from 'src/components/bits/ListItem/styles'

const Style = styled.div`
	position: inline-block;
	/* display: flex;
	justify-content: center; */
	bottom: 0;

	height: 5rem;
	width: 100%;

	/* display: grid; */

	/* grid-template-rows: .5rem auto;
	grid-template-areas:
		"scrubber scrubber"
		"left right"; */

	/* & .right {
		grid-area: right;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
	} */

	& .left {
		/* grid-area: left; */
		display: flex;
		align-items: center;
	}

//TODO: Improve button styling
	& > div > button {
		height: 2rem;
		width: 2rem;
		/* background-size: contain; */
		border: 1px black solid;
		/* border: none; */
		margin: .5rem;
		margin-left: 1.5rem;
		outline: none;
		padding: 1.5rem;
		background-color: #0157b8;
		box-shadow: 1px;
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
	margin-left: 1.5rem;
	color: #606060;
`

const IconButton = styled.div`
height: 2rem;
width: 2rem;
cursor: pointer;
/* background-color: blue; */
`
// Based off of IconButton
// TODO: Toggle on visible setting?
export const Visible = styled(IconButton)`
margin-left: 1.25rem;
background: url(${visibiltyOnIcon}) center no-repeat;
background-size: 1.75rem;
/* padding: .02rem; */
border: 1px rgba(209, 209, 209, 0.8)solid;
border-radius:.35rem;
`

export const Volume = styled(IconButton)`
margin-left: 1.25rem;
/* background: url(${volumeUpIcon}) center no-repeat; */
background: url(${props => props.muted ? volumeMutedIcon : volumeUpIcon}) center no-repeat;

background-size: 2rem;
`

// export const Volume = styled.button`
// 	background: url(${volumeIcon}) center no-repeat;
// `

// export const ClosedCaptions = styled.button`
// 	background: url(${closedCaption}) center no-repeat;
// `

// export const Fullscreen = styled.button`
// 	background: url(${props => props.fullscreen ? exitFullscreen : enterFullscreen}) center no-repeat;
// `

export { Style }