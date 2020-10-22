import styled from 'styled-components'

import closedCaption from 'assets/controls_closed_captions.svg'
import closedCaptionOff from 'assets/controls_closed_captions_off.svg'
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

	& .speed {
		position: absolute;
		right: 10px;
		bottom: 60px;
		width: 150px;
		height: 230px;
		background-color: white;
		display: flex;
		flex-direction: column;

		& h3 {
			display: flex;
			padding: 2px;
			margin-bottom: 2px;
			font-weight: 400 !important;
			border-bottom: 1px solid black;
			height: 20px;
			text-align: left;
			align-items: center;
		}

		& div {
			position: relative;

			& input {
				position: relative;
				width: 100%;
				height: 30px;
				font-size: 13px;
				font-weight: 500;
				margin: 2px 0px 2px 0px;
				transition: .5s ease;
				text-align: left;
				border: none;
				background-color: white;

				:hover {
					background-color: var(--navy-blue);
					color: white;
				}
			}
		}

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
	background: ${props => props.isCaptions !== false ? (`url(${closedCaption}) center no-repeat`) : (`url(${closedCaptionOff}) center no-repeat`)};
	/* background: url(${closedCaptionOff}) center no-repeat; */
`

export const Fullscreen = styled.button`
	background: url(${props => props.fullscreen ? exitFullscreen : enterFullscreen}) center no-repeat;
`
export const Speed = styled.img`
	width: 20px;
	height: 20px;
`