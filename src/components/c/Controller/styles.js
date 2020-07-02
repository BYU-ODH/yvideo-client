import styled from 'styled-components'

import carat from 'assets/carat_white.svg'

const Style = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	/* max-height: 65vh; */
	z-index: 20;

	& .video {
		height: calc(100% - 50px) !important;
		width: 100% !important;
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

	position: relative;
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
		overflow-x: scroll;
		overflow-y: hidden;

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
				position: relative;
				height: .75rem;
				flex: 1;
				z-index: 20;

				& #time-bar-container {
					position: absolute;
					height: .75rem;
				}

				& .total {
					position: absolute;
				}

				& #time-dot {
					position: absolute;
					float: left;
					top: -2px;
					left: ${props => props.played ? (`calc(${props.played * 100}% - 7px)`) : (`calc(${props.played * 100}% - 7px)`)};
					margin: 0px;
					width: 12px;
					height: 12px;
					background-color: red;
					border: 2px solid white;
					border-radius: 50%;
				}

				& #time-indicator {
					position: absolute;
					float: left;
					top: 0px;
					left: ${props => props.played * 100}%;
					margin: 0px;
					width: 2px;
					height: 100vh;
					background-color: red;
					z-index: 20;
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
	background-color: ${props => props.blank ? ('black') : ('transparent')};
	z-index: 10;
	width: 100%;
	height: 91.5%;
`
export const Censor = styled.div`
	--top: ${props => props.y !== 0 ? `${props.y}%` : `0%`};
	--left: ${props => props.x !== 0 ? `${props.x}%` : `0%`};
	--wProp: ${props => props.wProp !== 0 ? `${props.wProp}%` : '0%'};
	--hProp: ${props => props.hProp !== 0 ? `${props.hProp}%` : '0%'};

	/* TIME X Y WIDTH HEIHT */
	/* FIND BLUR EFFECT */

	position: absolute;
	top: calc((var(--top)) - (var(--hProp)/2)) !important;
	left: calc(var(--left) - (var(--wProp)/2)) !important;
	width: var(--wProp);
	height: var(--hProp);
	transition: .5s ease;
	& canvas {
		width: 100%;
		height: 100%;
		background-color: transparent;
		backdrop-filter: ${ props => props.active ? ('blur(30px)') : 'blur(0px)' };
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
