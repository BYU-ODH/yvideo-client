import styled, { keyframes } from 'styled-components'

import LComets from 'assets/landing/CometsLeft.svg'
import RComets from 'assets/landing/CometsRight.svg'
import HexLogo from 'assets/hexborder.svg'

export const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
`

export const Comets = styled.div`
	width: 50%;
	height: 100vh;
	margin: 0;
	background-color: transparent;

	@media (max-width: 800px) {
		background-size: contain;
	}

	&.left{
		background: url(${LComets}) no-repeat bottom left;
	}

	&.right{
		background: url(${RComets}) no-repeat top right;
	}
`

export const Welcome = styled.div`
	position: fixed;
	width: 100%;
	height: 100vh;
	background: transparent;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	& > div {
		display: flex;
		justify-content: center;
		align-items: center;

		& > h1 {
			font-family: 'Roboto Mono';
			font-size: 4.8rem;
			margin: 0 0 0 2rem;
			height: 4.8rem;
			line-height: 4.8rem;

			background: linear-gradient(to right, #0582CA 0%, #002E5D 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		&.button-wrapper {
			flex-direction: column;
			margin-top: 8rem;
		}
	}
`

export const Logo = styled.div`
	background: url(${HexLogo}) no-repeat center;
	background-size: contain;
	height: 10rem;
	width: 10rem;
`

export const Button = styled.button`
	font-family: 'Roboto Mono';
	font-weight: bold;
	font-size: 2.4rem;
	padding: 1.5rem 10rem;
	border-radius: 100rem;
	border: none;
	text-transform: uppercase;
	text-decoration: none;
	margin: 0 0 2.6rem 0;
	cursor: pointer;
	outline: none;

	&.primary {
		background-color: #0582CA;
		color: white;
	}

	&.secondary {
		background-color: transparent;
		color: #0582CA;
	}
`

const fadeIn =
	keyframes`
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	`,

	fadeOut = keyframes`
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	`

export const OverlayContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100vh;

	visibility: ${props => props.out ? `hidden` : `visible`};
	animation: ${props => props.out ? fadeOut : fadeIn} .25s linear;
	transition: visibility .25s linear;

	background-color: rgba(0,0,0,0.25);

	display: flex;
	justify-content: center;
	align-items: center;

	& > div {
		background-color: white;
		box-shadow: 0px .4rem .7rem -.1rem rgba(0,0,0,0.25);

		min-width: 32rem;
		width: auto;
		padding: 6rem 15rem;

		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;

		& > button {
			background: transparent;
			border: none;
			font-size: 18px;
			color: #0582CA;
			flex-basis: 100%;
			margin-top: 5rem;
			outline: none;
			cursor: pointer;
		}

		& > div {
			width: 27.5rem;
			padding: 2rem;

			& > h3 {
				font-weight: bold;
				font-size: 1.8rem;
				text-justify: center;
				margin-bottom: 1.2rem;
			}
		}
	}
`