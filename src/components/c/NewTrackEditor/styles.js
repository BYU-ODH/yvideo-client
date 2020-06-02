import styled from 'styled-components'

import carat from 'assets/carat_white.svg'

import menu from 'assets/menu-white.svg'

const Style = styled.div`

	background-color: white;
	overflow: hidden;

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
		width: 100%;
		background-color: navy;
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
	height: ${props => props.minimized ? `var(--header-height)` : `30vh`};
	box-sizing: border-box;
	transition: height .5s cubic-bezier(0, 0, 0, 1.07);
	cursor: ${props => props.cursor};
	display: flex;
	flex-direction: column;

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
			height: 100%;
			display: block;
	}

	& .layer {
		display: flex;
		width: 100%;
		height: 46px;
		border-right: 1px solid var(--light-blue);
	}

		& .handle {
				width: 160px !important;
				min-width: 160px;
				height: 46px;
				display: inline-flex;
				align-items: center;
				justify-content: flex-start;
				box-sizing: border-box;
				position: relative;
				cursor: pointer;

				border-bottom: 1px solid #555;
				border-right: 1px solid var(--light-blue);

				& p {
					padding-left: 2rem;
					color: black;
				}
				transition: .5s;
		}

		& .active-layer {
			background-color: var(--light-blue);
			& p {
				color: white;
				font-size: 1.6rem;
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

  display: flex;
  align-items: center;
  justify-content: center;

  outline: none;
  cursor: pointer;
`

export const EventList = styled.div`

	width: 35rem;
	height: calc(100vh - var(--navbar-height));
	background: transparent !important;

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
			font-size: 1.5rem;

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

export const SideEditor = styled.div`
	padding: 20px;

	& .closeEditor {
		width: 100%;
		text-align: right;
		cursor: pointer;
	}

	& .center {
		width: 100%;
		display: flex;
		font-size: 1.5rem;

		& input {
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
`

