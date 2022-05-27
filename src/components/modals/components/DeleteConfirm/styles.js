import styled from 'styled-components'
import HexLogo from 'assets/hexborder.svg'

export const ConfirmDeleteBox = styled.div`
	position: fixed;
	display: flex;
	top: 0px;
	left: 0px;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0,0,0, 0.2);
`
export const ConfirmBox = styled.div`
	display: grid;
  grid-template-columns: auto;
	margin: auto;
	min-width: 460px;
	height: 360px;
	background-color: white;
	box-shadow: 0 2px 5px -1px rgba(0,0,0,0.3);
	border-radius: 10px;

	& p {
		line-height: 2.5rem;
		margin: 5rem;
		padding: 2px;
		text-align: center;
		font-size: 17px;
		word-wrap: break-word;
	}

	& div {
		display: flex;
		width: 100%;
		margin: auto;

		& div {
			margin: auto auto auto 15rem;
			width: 20rem;
		}

		& p {
			font-size: 3rem;
			text-align: left;
			width: 250%;
			margin: auto;
		}

		& button {
			font-size: 2rem;
			background-color: white;
			border: none;
			border-radius: 3px;
			text-align: center;
			width: 12rem;
			height: 4rem;
			margin: auto auto 2rem auto;
			cursor: pointer;
			transition: .5s;
			color: black;
			box-shadow: 0 2px 5px -1px rgba(0,0,0,0.15);

			&:focus{
				outline: 0;
			}
			&:hover {
				color: #0582CA;
				box-shadow: 0 3px 6px -2px rgba(5, 130, 202,0.9);
			}
		}
	}
`
export const ConfirmButton = styled.button`
	border: 2px solid #FA6F5C !important;
	color: red !important;
	&:hover {
		box-shadow: 0 3px 6px -2px rgba(250, 111, 92,0.9) !important;
	}
	&:active{
		color: white !important;
		background-color: red !important;
	}
`

export const Logo = styled.div`
	position: relative;
	background: url(${HexLogo}) no-repeat left;
	background-size: contain;
	height: 7rem;
`