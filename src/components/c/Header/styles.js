import styled from 'styled-components'

import { Link } from 'react-router-dom'

import HexLogo from 'assets/hexborder.svg'

const Style = styled.div`
	height: var(--navbar-height);
	width: 100%;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: row;

	border-bottom: ${props => props.border ? `1px solid #c4c4c4` : `none`};

	position: fixed;
	top: 0px;
	right: 0px;
	background-color: ${props => props.backgroundColor};

	z-index: 25;

	& > button {
		background-color: #0157b8;
		border: none;
		color: white;
		padding: 1rem;
		border-radius: .3rem;
		margin-right: 5rem;
		cursor: pointer;
		margin-buttom: 2rem;
	}
`

export default Style

export const LogoWrapper = styled(Link)`
	display: flex;
	align-items: center;

	text-decoration: none;
	color: black;
	display: flex;
	align-items: center;
	margin-left: 2.4rem;
`

export const Name = styled.h1`
	font-family: 'Roboto Mono';
	font-weight: bold;
	font-size: 1.5rem;
	line-height: 2.1rem;
	margin: 1.8rem 3rem 0 1.3rem;

	z-index: 2;

	background: linear-gradient(to right, #0582CA 0%, #002E5D 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`

export const Shadow = styled.h1`
	position: absolute;
	z-index: 1;

	color: white;

	font-family: 'Roboto Mono';
	font-weight: bold;
	font-size: 1.5rem;
	line-height: 2.1rem;
	margin: 0 0 0 4.9rem;

	text-shadow: -.125rem 0 white, 0 .125rem white, .125rem 0 white, 0 -.125rem white, -.125rem .125rem white, .125rem .125rem white, .125rem -.125rem white, -.125rem -.125rem white;
`

export const Logo = styled.div`
	background: url(${HexLogo}) no-repeat center;
	background-size: contain;
	height: 3.0rem;
	width: 3.0rem;
	margin-top: 1.8rem;
`

export const ReleaseBanner = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	box-sizing: border-box;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1.5rem;

	padding: .8rem 4rem;

	background-color: var(--navy-blue);
	color: white;
	font-size: 1.4rem;
	box-shadow: 0 .2rem .6rem rgba(0, 0, 0, 0.2);

	& p {
		margin: 0;
		text-align: center;
	}

	& a {
		color: white;
		font-weight: bold;
		text-decoration: underline;
	}

	&& > button {
		position: absolute;
		right: 1.5rem;
		margin: 0;
		padding: 0 .6rem;
		background: transparent;
		border: none;
		border-radius: .3rem;
		color: white;
		font-size: 2rem;
		line-height: 1;
		cursor: pointer;

		&:hover, &:focus {
			background-color: rgba(255, 255, 255, 0.2);
		}
	}
`
