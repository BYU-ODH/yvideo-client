import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { HeaderContainer } from './styles'

import Logo from './Logo'

export class Header extends Component {
	render() {
		const { lost } = this.props
		return (
			<HeaderContainer lost={lost}>
				<Logo />
				{/* <button onClick={this.props.toggleMenu}>Toggle Menu</button> */}
			</HeaderContainer>
		)
	}
}

const mapStateToProps = state => {
	return {
		lost: state.lost
	}
}

export default withRouter(connect(mapStateToProps)(Header))
