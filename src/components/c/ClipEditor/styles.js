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
					}

					& #layer-time-indicator-line-shadow {
						position: absolute;
						width: 2px;
						height: calc(27vh - 40px);
						background-color: rgba(5, 130, 202, 0.7);
						z-Index: 20;
						visibility: hidden;
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

		.flex {
			display: flex;
			width: 100%;
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

		& p {
			padding-left: 2rem;
			color: black;
			font-size: 1.5rem;
		}
	}

	& .skip-handle {
		width: 162px !important;
		min-width: 162px;
		height: 31px;
		display: inline-flex;
		align-items: center;
		justify-content: flex-start;
		box-sizing: border-box;
		position: relative;
		border-bottom: 1px solid #555;
		border-right: 1px solid var(--light-blue);
		transition: .5s;

		& p {
			padding-left: 2rem;
			font-size: 1.5rem;
		}

		& > .allow-event {
			position: relative;
			display: flex;
			transform: scale(1.5);
			margin-left: 1.5rem;

		}
	}
`
export const AnnotationMessage = styled.div`
	position: fixed;
	margin-top: calc(40vh - 150px);
	margin-left: calc(60vw - 400px);
	width: 400px;
	height: 150px;
	z-index: 30;
	background-color: var(--light-blue);
	display: flex;
	border: 5px solid var(--light-blue);
	border-radius: 25px;

	transition: 1s ease;

	& h2 {
		margin: auto;
		color: white;
		font-size: 2.5rem;
	}
`
export const SideEditor = styled.div`
	--minimized: ${props => props.minimized};

	width: ${props => props.minimized !== false ? `4rem` : `35rem`};
	height: calc(100vh - var(--navbar-height));
	background: ${props => props.minimized !== false ? `var(--navy-blue)` : `white !important`};
	transition: .5s;
	z-index: 20;
	//overflow: hidden;
	overflow-y: scroll;
	border-left: 1px solid black;

	& .center {
		width: 100%;
		display: flex;
		font-size: 1.5rem;

		& .side-tab-input {
			margin: auto 10px auto auto !important;
			padding: 0px 10px;
			width: 120px;
			height: 4rem;
			margin: 10px;
			border: 1px solid var(--royal-blue);
		}

		& label {
			margin: 15px auto 15px auto;
			width: 150px;
			text-align: left;
		}
	}

	& tr {
		& i {
			opacity: 0%;
		}
	}

	& td {
		:hover {
			& i {
				opacity: 100%;
				-webkit-filter: invert(50%);
				filter: invert(50%);
			}
		}
	}

	& i {
		z-index: 25 !important;
		position: absolute;
		padding-top: 5px;
		right: 14px;
		cursor: pointer;
		:hover{
			-webkit-filter: invert(0%) !important;
			filter: invert(0%) !important;
		}
	}

	&  input {
		position: relative;
		box-sizing: border-box;
		padding-right: 5px;
	}

	& > header {
		height: 5rem;
		background: var(--navy-blue);

		border-bottom: 5px solid var(--light-blue);

		& > .allow-event {
			position: relative;
			float: left;
			height: 100%;
			display: flex;
			transform: scale(1.5);
			margin-top: 3rem;
			margin-left: 1rem;
		}

		& > .headerTitle {
			color: white;
			line-height: 5rem;
			font-size: 18px;
			margin-left: 1rem;
		}

		& > .side-button {
			position: relative;
			float: right;
			width: 8rem;
			height: 100%;
			display: flex;


			& .fa-check {
				color: green;
				padding-top: 20px;
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
			& > .disable {
				color: grey;
				cursor: no-drop;
				:hover {
					background-color: transparent;
				}
			}
		}
	}

	& > .eventsList {
		display: ${props => props.minimized !== false ? `none` : `visible`}
		padding: 3rem;
	}
	& .sub-card {
		padding-left: 3rem;
		padding-right: 3rem;
	}
	& .content-cancel {
		margin: 0px .5rem 0px .5rem;
		color: #0582ca;
		:hover {
			background-color: #0582ca;
			color: #ffffff;
		}
	}

	& .content-delete {
		color: var(--red);
		border: 2px solid var(--red);
		:hover {
			background-color: var(--red);
			color: #ffffff;
		}
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
	& .clipItems {
		font-size: 1.4rem;
		& label {
			margin: 15px 5px 15px 15px;
			width: 150px;
			text-align: left;
		}

		& .table-header {
			width: 90%;
			margin-left: 10px;
			margin-top: 8px;
			margin-bottom: 5px;
			& th {
				width: 30%;
			}
		}

		& #clipMessage{
			margin: 1rem 0 1rem 1rem;
		}
	}
	& .clipList {
		height: auto;
		max-height: 30vh;
		overflow-y: scroll;
		position: relative;

			& .singleClip {
				display: flex;
				padding: 0.5rem;

				& .clipTd {
					position: relative;
					box-sizing: border-box;
					display: inline-flex;
					padding-right: 5px;
					width: 30% !important;
					margin: auto;
					& input {
						margin: auto;
						width: 90% !important;
						&::-webkit-inner-spin-button {
							-webkit-appearance: none;
							margin: 0;
						}
					}
					& .deleteTd {
						display: inline-flex;
						font-size: 16px !important;
					}

						}
					}
			}
			& .trashIcon {
				margin-left: -7%;
				cursor: pointer;
			}
		}
		& .clipActive {
			background-color: #eee;
		}

		& #loader {
			background-color: rgba(196, 196, 196, 0.7);
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: bolder;
		}
	}

`
export const Icon = styled.div`
	/* transform: rotate(45deg); */
  background: url(${props => props.src}) center no-repeat;
  width: 20px;
  height: 20px;
	margin-left: 1rem;
	cursor: pointer;
`

export const Button = styled.button`
	font-size: 1.5rem;
	color: ${props => props.color || `#0582ca`};
	background: transparent;
	border: 2px solid #0582ca;
	border-radius: 1rem;
	outline: none;
	cursor: pointer;
	padding: 3px;
`
