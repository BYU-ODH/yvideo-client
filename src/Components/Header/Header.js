import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from './Nav/Logo/Logo'
import Nav from './Nav/Nav'

const StyledHeader = styled.div`
	height: 8.4rem;
	width: 100%;
	/* box-shadow: 0 -.5rem 3rem 0 rgba(0,0,0,0.25); */
	/* padding: 0 2.4rem; */
	display: flex;
	align-items: center;
	justify-content: space-between;

	position: fixed;
	background-color: white;
`

export class Header extends Component {
	render() {
		return (
			<StyledHeader>
				<Logo />
				<Nav />
			</StyledHeader>
		)
	}
}

export default Header
