import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from './Logo'

const StyledHeader = styled.div`
	height: 8.4rem;
	width: 100%;
	/* box-shadow: 0 -.5rem 3rem 0 rgba(0,0,0,0.25); */
	/* padding: 0 2.4rem; */
	display: flex;
	align-items: center;

	position: fixed;
	background-color: ${props => props.lost ? 'transparent' : 'white'};

	z-index: 16;
`

export class Header extends Component {
	render() {
		return (
			<StyledHeader lost={this.props.lost}>
				<Logo />
				{/* <button onClick={this.props.toggleMenu}>Toggle Menu</button> */}
			</StyledHeader>
		)
	}
}

export default Header
