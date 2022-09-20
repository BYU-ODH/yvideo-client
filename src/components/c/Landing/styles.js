import styled from 'styled-components'

import LComets from 'assets/CometsLeft.svg'
import RComets from 'assets/CometsRight.svg'
import HexLogo from 'assets/hexborder.svg'

export const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
`

export const Comets = styled.div`
	flex: 1;
	height: 100vh;
	margin: 0;
	background-color: transparent;

	@media (max-width: 780px) {
		background-size: contain !important;
	}

	&.left{
		background: url(${LComets}) no-repeat bottom left;
	}

	&.right{
		background: url(${RComets}) no-repeat top right;
	}
`

export const AlertMessage = styled.div`
	padding: 1vw;
	width: 800px !important;
	height: 200px !important;
	font-size: 30px;
	position: absolute;
	top: 0%;
	border: 1px solid black;
	border-radius: 4px;
	line-height: 1.5;

	background-color: #FCFCFC;
	visibility: visible;

	& div {
		text-align: center;
	}

	& button {
		font-size: 25px;
		background: transparent;

		position: absolute;
		top: 75%;
		left: 85%;
		cursor: pointer;

		color: white;
		padding: 0.55rem 1.5rem;
		border: 3px solid var(--red);
		font-weight: bold;
		background-color: var(--red);
		border-radius: 0.3rem;
		letter-spacing: 0.05rem;

		:hover {
			background-color: var(--dark-red);
			border-color: var(--dark-red);
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
		width: 100%;
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
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		&.button-wrapper {

			flex-direction: column;
			margin-top: 8rem;

			& .inactive {
				pointer-events: ${props => props.disable ? `none` : `auto`};
			}
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
