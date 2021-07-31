import styled, { keyframes } from 'styled-components'

import carat from 'assets/carat_white.svg'

import menu from 'assets/menu-white.svg'
import plusIcon from 'assets/plus-white.svg'

const Style = styled.div`

	background-color: white;
	overflow: hidden;

	width: 100% ;
	padding-top: var(--navbar-height);
	height: calc(100vh - var(--navbar-height));
	z-index: 0;

	display: flex;

	& > span {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	* {
		&:focus {
			outline: none;
		}
	}
`
export default Style

export const ItemContainer = styled.div`
	& h4 {
		font-weight: 500;
	}
`
export const Timeline = styled.div`

	--scale: ${props => props.scale};

	--timeline-start: 16rem;
	--header-height: 5rem;

	position: relative;
	height: ${props => props.minimized ? `0vh` : `30vh`};
	width: 100%;
	box-sizing: border-box;
	transition: height .5s cubic-bezier(0, 0, 0, 1.07);
	cursor: ${props => props.cursor};
  background-color: transparent;
	/* z-index: 0; */
	overflow-y: scroll;
	overflow-x: hidden;

	& .zoom-controls {
		width: 100%;
		height: 40px;
		display: flex;
		left: 0px;
		background-color: white;
		border-bottom: 1px solid black;
		border-top: 1px solid black;
		position: fixed;
		bottom: 0px;

		& .zoom-factor {
			margin: auto;
			width: 140px;
			height: 50%;
			border-radius: 10px;
			background-color: rgba(220, 220, 220, 0.5);
			position: relative;

			& .zoom-indicator {
				width: 2rem !important;
				height: 100% !important;
				background-color: var(--light-blue);
				border-radius: 20px;
				cursor: move;
			}
		}

		& .zoom-scroll {
			width: calc(100% - 161px);
			height: calc(100%);
			border-left: 1px solid black;
			display: flex;
			flex-direction: column;
			overflow-x: scroll;

			& .zoom-scroll-container {
				margin: auto;
				width: 90%;
				height: 50%;
				border-radius: 10px;
				background-color: rgba(220, 220, 220, 0.5);
				position: relative;
				overflow: hidden;

				& .zoom-scroll-indicator {
					position: absolute;
					min-width: 5%;
					background-color: var(--light-blue);
					border-radius: 20px;
				}
			}

			& #time-indicator-container {
				height: 27vh;
				width: calc(100% - 162px);
				/* width: calc(100% - 5rem) !important; */
				position: absolute;
				overflow-x: scroll;
				overflow-y: hidden;
				pointer-events: none;
				bottom: 0px;

				& #layer-time-indicator {
					height: 10px;
					width:100%;
					position: absolute;
					background-color: transparent;

					& #layer-time-indicator-line {
						position: absolute;
						height: calc(27vh - 40px);
						background-color: transparent;
						border-right: 2px solid red;
						z-Index: 20;
					}
				}
			}
		}
	}

	& > section {
		width: 100%;
		box-sizing: border-box;
		overflow-y: scroll;
	}

	& .event-layers {
		height: 100%;
		display: block;
	}

	& .layer {
		display: flex;
		width: 100%;
		height: 46px;
	}

	& .handle {
		width: 162px !important;
		min-width: 162px;
		height: 46px;
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		position: relative;
		cursor: pointer;
		border-bottom: 1px solid;
		border-right: 1px solid;
		border-color: white;
		transition: .5s;
		background-color: var(--navy-blue);

		& .plusIcon{
			padding-right: 2rem;
		}
	}
`
export const HandleIcon = styled.div `
	height: 2.5rem;
	width: 2.5rem;
	background: url(${menu}) center no-repeat;
	background-size: contain;
	position: absolute;
	right: 5px;
	margin: auto 0;
`
export const Icon = styled.div`
  background: url(${props => props.src}) center no-repeat;
  width: 20px;
  height: 15px;
`

export const PlusIcon = styled.div`
  background: url(${plusIcon}) center no-repeat;
  width: 20px;
  height: 15px;
`

export const NewLayer = styled.button`
	height: 2.4rem;
	width: 2.5rem;
	background-color: #0582ca;

	margin-top: .75rem;
	margin-left: 90px;

	border: none;
	border-radius: 0.3rem;

	display: flex;
	align-items: center;
	justify-content: center;

	outline: none;
	cursor: pointer;
`
export const EventEditor = styled.div`
	--minimized: ${props => props.minimized};

	width: ${props => props.minimized !== false ? `4rem` : `30%`};
	/* width: 4rem; */
	height: calc(68.5vh - var(--navbar-height)); // 100vh
	background: ${props => props.minimized !== false ? `var(--navy-blue)` : `white !important`};
	transition: .5s;
	z-index: 20;
	overflow: hidden;
	border-left: 1px solid black;
	position: absolute;
	right: 0%;

	& > header {
		height: 5rem;
		background: var(--navy-blue);

		border-bottom: 5px solid var(--light-blue);

		& > .carat {
			float: left;
			margin: auto 0px auto 1rem;
			align-items: center;
			padding-right: 1rem;
		}

		& > .save {
			position: relative;
			float: right;
			width: 8rem;
			height: 100%;
			display: flex;

			& i {
				line-height: 5rem;
			}

			& .fa-check {
				color: green;
			}

			& button {
				width: 100%;
				height: 100%;
				font-size: 1.7rem;
				display: flex;
				border: none;
				background-color: transparent;
				color: white;
				cursor: pointer;
				transition: .5s ease;

				:hover {
					background-color: var(--light-blue)
				}

				& span, img {
					margin: auto;
				}

			}
		}
	}

	& > .breadcrumbs {
		display: ${props => props.minimized !== false ? `none` : `flex`};

		height: 5rem;

		position: relative;

		box-sizing: border-box;

		/* border-bottom: 1px solid #555; */

		color: black;
		font-weight: 500;

		& > span {
			height: 100%;
			width: 7rem;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 1.5rem;

			border: none;
			padding: 0;
			margin: 0;

			&.carat {
				position: absolute;
				left: 6.5rem;
				top: 1.9rem;
				height: 1rem;
				width: 1rem;
				transform: rotate(45deg);
				border-top: 1px solid #555;
				border-right: 1px solid #555;
				background-color: white;
			}

			&.current {
				flex: 1;
				justify-content: flex-start;
				padding-left: 2rem;
				/* border-left: 1px solid #555; */
			}
		}
	}

	& > .eventsList {
		display: ${props => props.minimized !== false ? `none` : `visible`};
		padding: 3rem;
	}
	& .subCard {
		padding-left: 3rem;
		padding-right: 3rem;
	}

	& .deleteEventButton {
		width: 100px;
		height: 30px;
		margin: auto 10px auto auto;
		border: 2px solid #eb6e79;
		background-color: #eb6e79;
		color: white;
		font-size: 1.5rem;
		font-weight: 500;
		border-radius: 5px;
		cursor: pointer;

		&:active{
			background-color: white;
			color: #eb6e79;
			border: 2px solid #eb6e79 !important;
			outline: none;
		}
	}
`
export const EventListCarat = styled.button`
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
export const AnnotationMessage = styled.div`
	position: fixed;
	margin-top: calc(40vh - 150px);
	margin-left: calc(60vw - 400px);
	width: 400px;
	min-height: 150px;
	height: auto;
	z-index: 30;
	background-color: white;
	display: flex;
	flex-direction: column;
	border-radius: 25px;

	transition: 1s ease;

	& img {
		position: absolute;
    right: 20px;
    top: 10px;
    cursor: pointer;
	}

	& h2 {
		position: relative;
		margin: auto;
		font-size: 2.5rem;
		font-weight: 500 !important;
		padding: 5px;
	}

	& #error {
		color: red;
		font-size: 1.7rem;
	}

	& #success {
		color: green;
	}
`

export const Help = styled.img`
	width: 30px;
	height: 30px;
	margin-left: 10px;
	position: relative;
	top: 10px;
`