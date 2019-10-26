import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { HeaderContainer } from './styles'

import Logo from './Logo'

export class Header extends Component {
	render() {
		const { lost, onAdmin } = this.props
		return (
			<HeaderContainer lost={lost} border={onAdmin}>
				<Logo />
			</HeaderContainer>
		)
	}
}

const mapStateToProps = state => ({
	lost: state.lost,
	onAdmin: state.onAdmin
})

export default withRouter(connect(mapStateToProps)(Header))
