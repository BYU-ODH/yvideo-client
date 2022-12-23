import styled from 'styled-components'

import pauseIcon from 'assets/controls_pause.svg'
import playIcon from 'assets/controls_play.svg'

export const Style = styled.div `

	margin-top: 8.4rem;
	margin-bottom: 4rem;
	height: calc(100vh - 8.4rem);
	overflow: hidden;
	width: 100%;
	#header-container {
		display: flex;
		justify-content: center;
	}


	& > div {
		& .ayamelPlayer,
		& .videoBox,
		& .mediaPlayer {
			width: 100% !important;
			height: 70vh;
		}
		& .sliderContainer {
			padding-bottom: 0 !important;
		}
	}

	& .player-wrapper {
		height:100%;
		position: relative;
		background-color: black;
		height: 90%;
	}
`
export const PlayButton = styled.img`
	display: ${props => props.playing ? `none` : `block`}
	width: 15rem;
	height: 15rem;
	position: relative;
	margin: auto;
	// top: ${props => props.isLandscape ? `20%` : `40%`};
	cursor: pointer;
	transition: 3s ease;
	border-radius: 50%;
	z-index: 1000;

	& :hover {
  	/* transform: rotate(360deg); */
	}
`

export const PlayPause = styled.button`
	background: url(${props => props.playing ? pauseIcon : playIcon}) center no-repeat;
`
export const ClosePreview = styled.span`
	height: 30px;
	width: 30px;

	& img {
		width: 30px;
		height: 30px;
    position: absolute;
    top: 87px;
    right: 50px;

	:hover {
		cursor: pointer;
	}
`

export default Style
