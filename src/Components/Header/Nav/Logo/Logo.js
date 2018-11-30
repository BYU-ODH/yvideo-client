import React, { Component } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import HexLogo from './../../../../HexLogo2.svg'

const StyledTitle =
	styled.h1`
		font-family: 'Roboto Mono';
		font-weight: bold;
		font-size: 1.8rem;
		line-height: 2.1rem;
		margin: 0 0 0 1.3rem;
	`,

	StyledTitleWrapper = styled(Link)`
		display: flex;
		align-items: center;

		text-decoration: none;
		color: black;
		display: flex;
		align-items: center;
		margin-left: 2.4rem;
	`

export default class Title extends Component {
	render() {
		return (
			<StyledTitleWrapper to='/'>
				<embed src={HexLogo} width='36' height='36' />
				<StyledTitle>YVIDEO</StyledTitle>
			</StyledTitleWrapper>
		)
	}
}
