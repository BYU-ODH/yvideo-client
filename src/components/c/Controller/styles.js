import styled, { keyframes } from 'styled-components'

import carat from 'assets/carat_white.svg'
import logo from 'assets/hexborder.svg'

const Style = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 20;
	overflow-y: visible;


	& .video {
		height: calc(100% - 50px) !important;
		width: 70% !important;
	}

	& .subtitle {
		height: calc(100% - 50px) !important;
		width:  100% !important;
	}

	& .clip {
		height: calc(100% - 50px) !important;
		width:  100% !important;
	}

	& .timeBar {
		/* width: calc(100% + 35rem) !important; */
		/* justify-content: space-between; */
	}

	& .loading-spinner{
		position: fixed;
		top: 30%;
		left: 35%;
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

	height: var(--header-height);
	box-sizing: border-box;
	transition: height .5s cubic-bezier(0, 0, 0, 1.07);
	cursor: ${props => props.cursor};
	display: flex;
	flex-direction: column;

	/* z-index: 20; */

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
				width: 5rem;
				display: flex;
				justify-content: center;
				align-items: center;
				z-index: 20;
			}

			& > #time-bar {
				overflow-x: scroll;
				overflow-y: hidden;
				position: relative;
				height: 50px;
				flex: 1;
				z-index: 20;

				& #time-bar-container {
					margin-top: 20px;
					position: absolute;
					height: .75rem;
					width: 100% !important;

					& #timeBarProgress {
						/* width: calc(100% - 5rem) !important; */
					}
				}

				& .total {
					position: absolute;
				}

				& #time-dot {
					position: absolute;
					top: 2px;
					float: left;
					margin: 0px;
					width: 4px;
					height: 100%;
					background-color: transparent;
				}
			}
		}

		& button {

			height: 1.5rem;
			width: 1.5rem;

			margin: 0 1.5rem;
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
				margin: 0 2rem 0 0;
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
`
export const Censor = styled.div`
	position: absolute;
	transition-timing-function: linear;
	& canvas {
		width: 100%;
		height: 100%;
		background-color: transparent;
		backdrop-filter: ${props => props.active ? `blur(30px)` : `blur(30px)`};
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
export const Subtitles = styled.div`
	position: absolute;
	height: 10%;
	bottom:0;
	background-color: rgba(0,0,0,0.5);
	font-size: 1.5rem;
	color: #ffffff;
	z-index: 20;
	// width: 100%;
	width: ${props => props.type === `video` ? `70%` : `100%`};
	text-align: center;
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

	/* position: fixed;
	top: 30%;
	left: 30%;
	display: flex;
	align-items: center;
	justify-content: center; */

	animation: ${rotate} 2.5s ease-in-out infinite;
`