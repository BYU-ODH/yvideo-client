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
	// justify-content: space-evenly;

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
