import styled from 'styled-components'

const Style = styled.div`
	background-color: white;
	overflow: hidden;
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

export const Timeline = styled.div`

	--scale: ${props => props.scale};
	--timeline-start: 16rem;
	--header-height: 5rem;
	/*
	--dark-gray: #303030;
	--light-gray: #4F4F4F;
	--lighter-gray: #565656;
	color: #5F5F5F; */

	position: relative;
	height: ${props => props.minimized ? `0vh` : `30vh`};
	box-sizing: border-box;
	transition: height .5s cubic-bezier(0, 0, 0, 1.07);
	cursor: ${props => props.cursor};
  	background-color: transparent;
	z-index: 0;
	overflow-y: scroll;
	overflow-x: hidden;

	& .zoom-controls {
		width: calc(100% - 35rem);
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
					width: ${props => props.zoom !== 0 ? `${props.zoom}%` : `100%`} !important;
					height: 100% !important;
					background-color: var(--light-blue);
					border-radius: 20px;
				}
			}

			& #time-indicator-container {
				height: 27vh;
				width: calc(100% - 162px);
				position: absolute;
				overflow-x: scroll;
				overflow-y: hidden;
				pointer-events: none;
				bottom: 0px;

				& #layer-time-indicator {
					height: 10px;
					position: absolute;
					background-color: transparent;

					& #layer-time-indicator-line {
						position: absolute;
						height: calc(27vh - 40px);
						background-color: transparent;
						border-right: 2px solid red;
						z-Index: 20;
						/* border-right: 2px dotted red; */
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
		justify-content: flex-start;
		box-sizing: border-box;
		position: relative;
		cursor: pointer;
		border-bottom: 1px solid #555;
		border-right: 1px solid var(--light-blue);
		transition: .5s;
		background-color: var(--navy-blue);
		border-bottom: 1px solid;
		border-color: white;

		& .handleFocus{
			display: flex;
			width: 90%;
			align-items: center;
		}

		& .trashIcon{
			padding: 0.6rem;
			transform: scale(0.8)
		}

		& .saveIcon {
			padding: 0 2.5px;
    	transform: scale(0.7);
		}

		& p {
			padding-left: 2rem;
			color: black;
			font-size: 1.5rem;
			& .layer-delete {
				margin: auto auto -3px 15px;
				opacity: 0.3;

				transition: .5s ease;
				:hover {
					opacity: 1;
				}
			}
		}
	}
`
export const Icon = styled.div`
  background: url(${props => props.src}) center no-repeat;
  width: 20px;
  height: 15px;

	:hover {
		cursor: pointer;
	}
`
export const EventList = styled.div`
	--minimized: ${props => props.minimized};

	width: ${props => props.minimized !== false ? `4rem` : `35rem`};
	height: calc(100vh - var(--navbar-height));
	background: ${props => props.minimized !== false ? `var(--navy-blue)` : `white !important`};
	transition: .5s;
	z-index: 12;
	overflow: hidden;
	border-left: 1px solid black;

	& > header {
		height: 5rem;
		background: var(--navy-blue);
		border-bottom: 5px solid var(--light-blue);

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
				color: white;
				cursor: pointer;
				width: 100%;
				height: 100%;
				font-size: 1.7rem;
				display: flex;
				border: none;
				background-color: transparent;

				transition: .5s ease;

				:hover {
					background-color: var(--light-blue);
				}

				& span, img {
					margin: auto;
				}
			}
			& > .disable {
				color: grey;
				cursor: no-drop;
				:hover {
					background-color: transparent;
				}
			}
		}
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
	/* border: 5px solid var(--light-blue); */
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