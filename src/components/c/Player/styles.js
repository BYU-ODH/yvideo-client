import styled from 'styled-components'

export const Style = styled.div`

	margin-top: 8.4rem;
	height: calc(100vh - 8.4rem);
	overflow: hidden;

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
		height: 100%;
	}
`

export const Blank = styled.div`
	position: absolute;
	background-color: ${props => props.blank ? `black` : `transparent`};
	z-index: 10;
	width: 100%;
	height: 100%;
	top: 0px;
	& .censorBox{
	position: absolute;
	transition-timing-function: linear;
		& canvas {
			width: 100%;
			height: 100%;
			background-color: transparent;
			backdrop-filter: ${props => props.active ? `blur(30px)` : `blur(30px)`};
		}
	}
	& .comment{
	position: absolute;
	font-size: 2rem;
	color: white;
	z-index: 15;
	}
	& #blankBox{
		position:absolute;
		width: 100%;
		height: 100%;
		background-color: black;
		z-index: 100;
		top:0;
	}
`
export const Comment = styled.div`
	--x: ${props => props.commentX !== 0 ? `${props.commentX}%` : `0%`};
	--y: ${props => props.commentY !== 0 ? `${props.commentY}%` : `0%`};

	position: absolute;
	top: var(--y);
	left: calc(var(--x));
	font-size: 2rem;
	color: white; style={{ w}}
	z-index: 15;
`
export const Censor = styled.div`
	position: absolute;
	& canvas {
		width: 100%;
		height: 100%;
		background-color: transparent;
		backdrop-filter: ${props => props.active ? `blur(30px)` : `blur(0px)`};
	}
`
export const Subtitles = styled.div`
	position: absolute;
	bottom: 80px;
	color: #ffffff;
	z-index: 20;
	height: 80px;
	width: 100%;

	& h3 {
		background-color: ${props => props.subtitleText ===`` ? `transparent` : `rgba(0,0,0,0.5)`};
		padding: 3px;
		font-size: 1.8rem;
		text-align: center;
		margin: auto;
		width: auto;
		height: auto;
		max-width: 60%;
		line-height: 1.5;
		letter-spacing: .7px;
	}
`

export const PlayButton = styled.img`
	display: ${props => props.playing ? `none` : `block`}
	width: 15rem;
	height: 15rem;
	position: relative;
	margin: auto;
	top: ${props => props.isLandscape ? `20%` : `40%`};
	cursor: pointer;
	transition: 3s ease;
	border-radius: 50%;
	z-index: 100;

	& :hover {
  	/* transform: rotate(360deg); */
	}
`

export default Style
