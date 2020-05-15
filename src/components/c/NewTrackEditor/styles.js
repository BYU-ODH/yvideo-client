import styled from 'styled-components'

import carat from 'assets/carat_white.svg'

import menu from 'assets/menu-white.svg'

const Style = styled.div`

	background-color: #303030;

	padding-top: var(--navbar-height);
	height: calc(100vh - var(--navbar-height));

	display: flex;

	& > span {

		flex: 1;

		display: flex;
		flex-direction: column;

		& > .video {
			flex: 1;
		}
	}

	& video {
		height: 100%;
		width: 100%;
		background-color: navy;
	}

`

export default Style

export const Timeline = styled.div`

	--scale: ${props => props.scale};

	--timeline-start: 16rem;
	--header-height: 5rem;

	--dark-gray: #303030;
	--light-gray: #4F4F4F;
	--lighter-gray: #565656;
	/* color: #5F5F5F; */

	position: relative;
	height: ${props => props.minimized ? `var(--header-height)` : `30vh`};
	box-sizing: border-box;
	transition: height .5s cubic-bezier(0, 0, 0, 1.07);
	cursor: ${props => props.cursor};
	display: flex;
	flex-direction: column;

	& > header {
		height: var(--header-height);
		box-sizing: border-box;
		border: 1px solid #555;
		border-left: none;

		display: flex;
		align-items: center;

		& .scrubber {
			color: white;
			display: flex;
			align-items: center;
			justify-content: space-evenly;

			width: 100%;

			cursor: pointer;

			& > .time {
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
						background-color: #353535;
						width: 100%;
					}
					&.current {
						background-color: var(--royal-blue);
						width: ${props => props.played * 100}%;
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
			color: white;

			& > img {
				height: 1.5rem;
				width: 1.5rem;
				object-fit: contain;
				object-position: center;
			}

			&.play-btn {
				position: relative;

				height: var(--header-height);
				width: var(--header-height);
				margin: 0 2rem 0 0;
				border-right: 1px solid #555;

				display: flex;
				align-items: center;
				justify-content: center;

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
					border-top: 1px solid #555;
					border-right: 1px solid #555;
					background-color: #303030;
				}
			}

			&.toggle-timeline {
				& > img {
					transition: transform .5s ease-in-out;
				}
				&.minimized {
					& > img {
						transform: rotate(-180deg);
					}
				}
			}
		}
	}

	& > section {
		flex: 1;
		width: 100%;
		box-sizing: border-box;
		border-right: 1px solid #555;
		overflow-y: scroll;
		overflow-x: hidden !important;
	}

	& > span {
		display: block;
		position: absolute;
		top: calc(var(--header-height) / 2);
		left: calc(var(--timeline-start) + ( ${props => props.played} * (100vw - (350px + 45px + var(--timeline-start))) ));
		height: calc(100% - (var(--header-height) / 2));
		width: 2px;
		background-color: red;

		&.current-time {
			z-index: 20;
		}

		&.current-time-dot {
			--dot-size: 12px;

			height: var(--dot-size);
			width: var(--dot-size);

			top: calc((var(--header-height) / 2) - (var(--dot-size) / 2) + 1px);
			left: calc(var(--timeline-start) + ( ${props => props.played} * (100vw - (35rem + 4.5rem + var(--timeline-start))) ) - (var(--dot-size) / 2) + 1px);
			box-sizing: border-box;
			border-radius: 50%;
			border: 2px solid white;
		}
	}

	& .event-layers {
			height: calc(var(--header-height) - 10px)
	}

	& .layer {
		width: 100%
		height: 100%;

		display: flex;

		background-color: var(--lighter-gray);
		margin: 0px 0px 3px .5px !important;


		& .handle {
				width: 160px !important;
				min-width: 160px;
				background-color: var(--light-gray);
				height: 100%;
				display: inline-flex;
				align-items: center;
				justify-content: flex-start;
				box-sizing: border-box;
				position: relative;

				border-bottom: 1px solid #555;
				border-right: 1px solid var(--dark-gray);
				/* border-right: 4px solid var(--royal-blue); */

				& p {
					padding-left: 2rem;
					color: white;
				}
		}
	}

`

export const HandleIcon = styled.div `
	height: 2.5rem;
	width: 2.5rem;
	background: url(${menu}) center no-repeat;
	background-size: contain;
	/* display: inline-block; */
	position: absolute;
	right: 5px;
	margin: auto 0;
`

export const Icon = styled.div`
	/* transform: rotate(45deg); */
  background: url(${props => props.src}) center no-repeat;
  background-size: contain;

  height: 2rem;
  width: 2rem;
`

export const NewLayer = styled.button`
	height: 2.4rem;
	width: 2.5rem;

	margin-top: .75rem;
  margin-left: 130px;

  border: none;
  border-radius: 0.3rem;

  background-color: var(--light-gray);

  display: flex;
  align-items: center;
  justify-content: center;

  outline: none;
  cursor: pointer;
`

export const EventList = styled.div`

	width: 35rem;
	height: calc(100vh - var(--navbar-height));

	& > header {

		height: 5rem;
		background: var(--navy-blue);

		display: flex;

		border-bottom: 5px solid var(--light-blue);

		& > .carat {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding-right: 1rem;
		}

		& > .tab {
			height: 5rem;
			width: 7rem;
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;

			font-weight: 500;

			cursor: pointer;

			&.active {
				background: var(--light-blue);
			}
		}
	}

	& > .breadcrumbs {

		height: 5rem;

		display: flex;
		position: relative;

		box-sizing: border-box;

		border-bottom: 1px solid #555;

		color: white;
		font-weight: 500;

		& > span {
			height: 100%;
			width: 7rem;
			display: flex;
			justify-content: center;
			align-items: center;

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
				border-left: 1px solid #555;
			}
		}
	}

	& > .events {

		padding: 3rem;

		& .draggable-event {


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

