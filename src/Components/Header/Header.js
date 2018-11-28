import React, { Component } from 'react'

import styled from 'styled-components'
import Logo from './../../HexLogo2.svg'

const StyledHeader = styled.div`
	height: 8.4rem;
	/* box-shadow: 0 -.5rem 3rem 0 rgba(0,0,0,0.25); */
	padding: 0 2.4rem;
	display: flex;
	align-items: center;
	justify-content: space-between;

	& > div {
		display: flex;
		align-items: center;
	}
`,

	Title = styled.h1`
		font-family: 'Roboto Mono';
		font-weight: bold;
		font-size: 1.8rem;
		line-height: 2.1rem;
		margin: 0 0 0 1.3rem;
	`

export class Header extends Component {
	render() {
		return (
			<StyledHeader>
				<div>
					<embed src={Logo} width='36' height='36' />
					<Title>YVIDEO</Title>
				</div>
				<div>
					<a href='https://ayamelbeta.byu.edu/auth/cas'>Log In</a>
				</div>
			</StyledHeader>
		)
	}
}

export default Header
