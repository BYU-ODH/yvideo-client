import styled, { keyframes } from 'styled-components'
import logo from 'assets/hexborder.svg'
import carat from 'assets/carat_white.svg'

const Style = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	/* max-height: 65vh; */
	z-index: 20;
	overflow-y: visible;

	& .react-player {
		height: calc(100% - 50px) !important;
		width: ${props => props.type === `video` ? `70% !important` : `100% !important`};
	}

	& .loading-spinner{
		position: fixed;
		top: 30%;
		left: 30%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
`
export default Style

export const TimeBar = styled.div`

	--scale: ${props => props.scale};

	--timeline-start: 16rem;
	--header-height: 50px;
	/*
	--dark-gray: #303030;
	--light-gray: #4F4F4F;
	--lighter-gray: #565656;
	color: #5F5F5F; */

	/* position: relative; */
	height: var(--header-height);
	box-sizing: border-box;
	transition: height .5s cubic-bezier(0, 0, 0, 1.07);
	cursor: ${props => props.cursor};
	display: flex;
	flex-direction: column;
	z-index: 20;

	& > header {
		width: 100%;
		height: var(--header-height);
		box-sizing: border-box;
		border: 1px solid rgba(255, 255, 255, 0.8);
		border-left: none;
		display: flex;
		align-items: center;
		background-color: var(--navy-blue);

		& .scrubber {
			color: black;
			display: flex;
			align-items: center;
			justify-content: space-evenly;

			width: 100%;

			cursor: pointer;

			& > .time {
				color: white;
				position: relative;
				top: 1px;
				margin-left: 1.5rem;
				width: 5rem;
				display: flex;
				justify-content: center;
				align-items: center;
				z-index: 20;
			}

			& > #time-bar {
				cursor: default;
				overflow-x:  smooth;
				overflow-y: hidden;
				/* scroll-behavior: smooth; */
				position: relative;
				height: 50px;
				flex: 1;
				z-index: 20;

				& #time-bar-container {
					margin-top: 10px;
					position: absolute;
					height: .75rem;
					width: 100% !important;

					& #time-bar-progress {
						cursor: pointer;
						height: 30px;
						outline: none;
					}

					& #time-bar-shadow {
						position: absolute;
						top: -19px;
						float: left;
						margin: 0px;
						width: 2px;
						height: calc(27vh + 50px);
						background-color: rgba(5, 130, 202, 0.7);
						visibility: hidden;
						color: white;
						pointer-events: none;

						& #time-bar-shadow-text {
							color: white;
							font-weight: 700;
							margin-top: 10px;
							margin-left: 5px;
							position: relative;
							width: 5rem;
							height: auto;
						}
					}

				}

				& .total {
					position: absolute;
				}
			}
		}

		& button {

			height: 1.5rem;
			width: 1rem;

			margin: 0 1rem;
			padding: 0;

			border: none;
			cursor: pointer;
			background: transparent;
			outline: none;
			color: black;

			& > img {
				height: 1.5rem;
				width: 1.5rem;
				object-fit: contain;
				object-position: center;
			}

			&.play-btn {
				position: relative;
				height: calc(var(--header-height) - 2px);
				width: var(--header-height);
				margin: 0;
				border-right: 1px solid rgba(255, 255, 255, 0.8);

				display: flex;
				align-items: center;
				justify-content: center;
				background-color: var(--navy-blue);

				& > img {
					height: 2rem;
					width: 2rem;
				}

				& > span.carat {
					position: absolute;
					right: -.75rem;
					top: calc(var(--header-height) / 2);
					margin-top: -.5rem;

					height: 1rem;
					width: 1rem;

					transform-origin: .5rem .5rem;
					transform: rotate(45deg);
					border-top: 1px solid rgba(255, 255, 255, 0.8);
					border-right: 1px solid rgba(255, 255, 255, 0.8);
					background-color: white;
				}
			}
		}
	}


`
export const Blank = styled.div`
	position: absolute;
	background-color: ${props => props.blank ? `black` : `transparent`};
	z-index: 10;
	width: 100%;
	height: calc(100% - 50px);
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
`
export const Censor = styled.div`
	position: absolute;
	transition-timing-function: linear;
	& canvas {
		width: 100%;
		height: 100%;
		background-color: transparent;
		backdrop-filter: ${props => props.active ? `blur(30px)` : `blur(0px)`};
	}
`
export const Comment = styled.div`
	--x: ${props => props.commentX !== 0 ? `${props.commentX}%` : `0%`};
	--y: ${props => props.commentY !== 0 ? `${props.commentY}%` : `0%`};

	position: absolute;
	top: var(--y);
	left: calc(var(--x));
	font-size: 2rem;
	color: white;
	z-index: 15;
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

export const CloseButton = styled.div`
	float: right;
	display: inline-block;
	padding: 2px 5px;
	background: #ccc;
`

export const ToggleCarat = styled.div`
	width: 40px !important;
	height: 48px !important;
	position: absolute;
	right: 5px;
	border: none;
	outline: none;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	/* background: url(${carat}) center no-repeat; */
	/* background-size: contain; */
	padding: 0;
	background-color: var(--navy-blue);
	z-index: 20;
	transform: rotate(-90deg);
	transition: transform .25s ease-in-out;
	margin-right: 0px;

	& img {
		margin: auto;
	}

	&.minimized {
		transform: rotate(90deg);
	}
`
// export const Subtitles = styled.div`
// 	position: absolute;
// 	height: 80px;
// 	bottom: 0;
// 	font-size: 1.5rem;
// 	color: #ffffff;
// 	z-index: 20;
// 	width: 100%;
// 	text-align: center;
// 	& h3 {
// 		background-color: rgba(0, 0, 0, 0.5);
// 		padding: 3px;
// 		font-size: 1.8rem;
// 		text-align: center;
// 		margin: auto;
// 		width: auto;
// 		height: auto;
// 		max-width: 60%;
// 		line-height: 1.5;
// 		letter-spacing: .7px;
// 	}
// `

export const Subtitles = styled.div`
	position: absolute;
	height: 10%;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	font-size: 1.5rem;
	color: #ffffff;
	z-index: 20;
	// width: 100%;
	width: ${props => props.type === `video` ? `70%` : `100%`};
	text-align: center;
	white-space: pre-line;
`

const rotate = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(720deg);
	}
`

export const Spinner = styled.div`
	background: url(${logo})  no-repeat;
	background-size: cover;
	width: 15rem;
	height: 15rem;

	animation: ${rotate} 2.5s ease-in-out infinite;
`
