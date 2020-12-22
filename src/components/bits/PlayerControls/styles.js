import styled from 'styled-components'

import closedCaption from 'assets/controls_closed_captions.svg'
import closedCaptionOff from 'assets/controls_closed_captions_off.svg'
import enterFullscreen from 'assets/controls_enter_fullscreen.svg'
import exitFullscreen from 'assets/controls_exit_fullscreen.svg'
import pauseIcon from 'assets/controls_pause.svg'
import playIcon from 'assets/controls_play.svg'
import volumeIcon from 'assets/controls_volume.svg'
import volumeIconMute from 'assets/controls_muted.svg'
import clockIcon from 'assets/te-clock.svg'
import playerCheck from 'assets/player-check.svg'
import bookIcon from 'assets/book-open-white.svg'

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

		& img {
			margin-right: 10px;
		}
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

	& .menu-modal {
		position: absolute;
		right: 10px;
		bottom: 60px;
		width: 150px;
		height: auto;
		background-color: rgba(71, 71, 71, 0.8);
		color: white;
		display: flex;
		flex-direction: column;
		border: 2px solid (71, 71, 71, 1);
		border-radius: 5px;

		& div {
			position: relative;
		}

		& .active-value {
			background: url(${playerCheck}) center no-repeat !important;
			background-position: calc(100% - 10px) center !important;
		}
	}

	& h3 {
		display: flex;
		padding: 2px 2px 2px 5px;
		margin-bottom: 2px;
		font-weight: 500 !important;
		border-bottom: 2px solid white;
		height: 25px;
		font-size: 1.55rem;
		text-align: left;
		align-items: center;
	}

	& input {
		position: relative;
		width: 100%;
		height: 30px;
		font-size: 1.4rem;
		font-weight: 500;
		margin: 2px 0px 2px 0px;
		transition: .5s ease;
		text-align: left;
		border: none;
		background: transparent;
		color: white;

		:hover {
			background-color: rgba(5,130,202,1);
			color: white;
		}
	}
`
export default Style

export const PlayPause = styled.button`
	background: url(${props => props.playing ? pauseIcon : playIcon}) center no-repeat;
`

export const ClosedCaptions = styled.button`
	/* background: ${props => props.isCaptions !== false ? (`url(${closedCaption}) center no-repeat`) : (`url(${closedCaptionOff}) center no-repeat`)}; */
	background: url(${closedCaption}) center no-repeat;
`
export const Fullscreen = styled.button`
	width: 20px;
	height: 20px;
	background: url(${props => props.fullscreen ? exitFullscreen : enterFullscreen}) center no-repeat;
`
export const Speed = styled.button`
	width: 20px;
	height: 20px;
	background: url(${clockIcon}) center no-repeat;
`
export const Book = styled.button`
	width: 20px;
	height: 20px;
	background: url(${bookIcon}) center no-repeat;
`
export const Help = styled.img`
	margin: 0px;
	width: 22px;
	height: 22px;
`