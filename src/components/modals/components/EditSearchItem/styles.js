import styled from 'styled-components'
import HexLogo from 'assets/hexborder.svg'

export const Center = styled.div`
	z-index: 10;
	width: 180px;
	height: auto;
	background-color: white;
	box-shadow: 0 2px 5px -1px rgba(0,0,0,0.3);
	border-radius: 3px;

	@media (max-width: 450px){
		width: 160px;
		left: 50% !important;
	}

`
export const Modal = styled.div`
	padding: 1rem;
`
export const Options = styled.div`
	display: grid;
	font-size: 2rem;
  grid-template-columns: auto;
	& button {
		margin: auto;
		position: relative;
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

		&:focus{
			outline: 0;
		}

		&:hover {
			color: #0582CA;
		}

		& a{
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
		}

		@media (max-width: 450px){
			width: 10rem;
			font-size: 1.7rem;
		}
	}
`
export const Close = styled.button`
	float: right;
	background-color: white;
	border: none;
	border-radius: 10px;
	cursor: pointer;
	transition: 1s;
	&:hover {
		color: white;
		background-color: rgba(5, 130, 202, 0.5);
	}
`
export const Delete = styled.button`
	color: red !important;
	background: none !important;
	background-color: white !important;

	&:hover {
		border: 2px solid #FA6F5C !important;
		box-shadow: 0 3px 6px -2px rgba(250, 111, 92,0.9) !important;
	}

	&:active{
		background-color: red !important;
		color: white !important;
	}
`
export const ConfirmDelete = styled.div`
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
	width: 400px;
	height: 300px;
	background-color: white;
	box-shadow: 0 2px 5px -1px rgba(0,0,0,0.3);
	border-radius: 10px;

	& p {
		line-height: 2.5rem;
		margin: auto;
		padding: 2px;
		text-align: center;
		font-size: 20px;
		word-wrap: break-word;
	}

	& div {
		display: flex;
		width: 100%;
		margin: auto;

		& button {
			font-size: 2rem;
			background-color: white;
			border: 2px solid #0582CA;
			border-radius: 3px;
			text-align: center;
			width: 12rem;
			height: 4rem;
			margin: auto auto 2rem auto;
			cursor: pointer;
			transition: .5s;
			color: #0582CA;

			&:focus{
				outline: 0;
			}
			&:hover {
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
`
export const Logo = styled.div`
	background: url(${HexLogo}) no-repeat center;
	background-size: contain;
	height: 7rem;
	width: 7rem;
`