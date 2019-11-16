import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Header } from 'components'

export class HeaderContainer extends Component {
	render() {

		const {
			lost,
			onAdmin,
		} = this.props

		const viewstate = {
			lost,
			onAdmin,
		}

		return <Header viewstate={viewstate} />
	}
}

const mapStateToProps = state => ({
	lost: state.lost,
	onAdmin: state.onAdmin,
})

export default connect(mapStateToProps)(HeaderContainer)
