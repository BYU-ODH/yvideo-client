import React, { Component } from 'react'
import { connect } from 'react-redux'

import { HeaderContainer } from './styles'

import Logo from './Logo'

export class Header extends Component {
	render() {
		const { lost, border } = this.props
		return (
			<HeaderContainer lost={lost} border={border}>
				<Logo />
			</HeaderContainer>
		)
	}
}

const mapStateToProps = state => ({
	lost: state.lost,
	border: state.headerBorder
})

export default connect(mapStateToProps)(Header)
