import styled from 'styled-components'

import carat from 'assets/carat_white.svg'

const Style = styled.div`
	width: 100%;
	height: 100%;
	position: relative;

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

	& > header {
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
			}

			& > div {
				position: relative;

				flex: 1;
				height: .75rem;

				& > span {
					position: absolute;
					display: block;
					height: 100%;

					&.total {
						background-color: rgba(255, 255, 255, 0.7);
						width: 100%;
					}
					&.current {
						background-color: var(--light-blue);
						width: ${props => props.played * 100}%;

						& >span {
							display: block;
							position: relative;
							float: right;
							top: 0;
							height: 100vh;
							width: 2px !important;
							background-color: red;
							z-index: 20;

							&.current-time {
								z-index: 20;

								& #timeDot {
									position: absolute;
									top: -3px;
									right: -6px;
									height: 10px !important;
									width: 10px !important;
									background-color: red;
									border: 3px solid white;
									border-radius: 50%;
								}
							}
						}

					}
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

export const ToggleCarat = styled.button`
	height: 2rem;
	width: 2rem;
	border: none;
	outline: none;
	cursor: pointer;
	background: url(${carat}) center no-repeat;
	background-size: contain;
	padding: 0;

	transform: rotate(-90deg);
	transition: transform .25s ease-in-out;

	&.minimized {
		transform: rotate(90deg);
	}
`
export const Blank = styled.div`

	position: absolute;
	background-color: ${props => props.blank ? ('black') : ('transparent')};
	z-index: 10;
	width: 100%;
	height: 91.5%;


	& p {
		margin: 10% 0px 0px 5%;
		font-size: 2rem;
		color: white;
	}
`