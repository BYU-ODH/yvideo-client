import styled from 'styled-components'

export const Style = styled.div`

	margin-top: 8.4rem;
	height: calc(100vh - 8.4rem);
	overflow: hidden;
	cursor: ${props => !props.mouseInactive || !props.started || !props.playing ? `default` : `none`};

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
		height: 100%;
		position: relative;
		background-color: black;
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
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: black;
		z-index: 100;
		top: 0;
	}
	& #pauseMessage{
		& button{
			font-size: 1.5rem;
    	background: transparent;
    	border: none;
    	outline: none;
			position: absolute;
			display: inline-block;
    	cursor: pointer;
			top: 90%;
			left: 90%;
		}
	}
	& #alertMessage{
		& button{
			font-size: 1rem;
			background: transparent;
			border: none;
			outline: none;
			position: absolute;
			display: inline-block;
			cursor: pointer;
			top: 80%;
			left: 80%;
			align: bottom-right;
		}
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
		background-color: ${props => props.subtitletext === `` ? `transparent` : `rgba(0, 0, 0, 0.5)`};
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
export const PauseMessage = styled.div`
	padding: 1%;
	width: 90% !important;
	height: 50% !important;
	font-size: 1.5rem;
	position: absolute;
	display: block;
	top: 15%;
	left: 5%;
	border-width: 1px;
	border-radius: 1px;
	border-style: solid;
	border-color: var(--navy-blue);
	cursor: pointer;
	justify-content: center;
	background-color: rgba(241, 241, 244, 0.79);
	z-index: 10000;
	visibility: hidden
`

export const AlertMessage = styled.div`
	padding: 2vh;
	width: 30% !important;
	height: 15% !important;
	font-size: 1.5rem;
	position: absolute;
	top: 40%;
	left: 30%;
	border: 1px solid white;
	border-radius: 1px;
	cursor: pointer;
	background-color: rgba(241, 241, 244, 0.80);
	z-index: 10000;
	visibility: hidden;
`

export const PlayButton = styled.img`
	display: ${props => props.playing ? `none` : `block`};
	width: 15rem;
	height: 15rem;
	position: relative;
	margin: auto;
	top: ${props => props.isLandscape ? `20%` : `40%`};
	cursor: pointer;
	border-radius: 50%;
	z-index: 100;
	opacity: ${props => !props.started ? 1 : 0};
	transition: opacity 0.5s ease-in-out;

	@media screen and (max-width: 425px){
		width: 12rem;
		height: 12rem;
		top: 30%;
	}
	@media screen and (max-width: 320px){
		width: 10rem;
		height: 10rem;
		top: 25%;
	}
	& :hover {
  	/* transform: rotate(360deg); */
	}
`

export default Style
