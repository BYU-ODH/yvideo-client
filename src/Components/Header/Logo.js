import React, { Component } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import HexLogo from './../../Assets/HexLogo2.svg'

const StyledTitle =
	styled.h1`
		font-family: 'Roboto Mono';
		font-weight: bold;
		font-size: 1.8rem;
		line-height: 2.1rem;
		margin: 0 0 0 1.3rem;

		background: linear-gradient(to right, #0582CA 0%, #002E5D 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	`,

	StyledTitleWrapper = styled(Link)`
		display: flex;
		align-items: center;

		text-decoration: none;
		color: black;
		display: flex;
		align-items: center;
		margin-left: 2.4rem;
	`,

	StyledLogo = styled.div`
		background: url(${HexLogo}) no-repeat center;
		background-size: contain;
		height: 3.6rem;
		width: 3.6rem;
	`

export default class Title extends Component {
	render() {
		return (
			<StyledTitleWrapper to='/'>
				<StyledLogo />
				<StyledTitle>YVIDEO</StyledTitle>
			</StyledTitleWrapper>
		)
	}
}
