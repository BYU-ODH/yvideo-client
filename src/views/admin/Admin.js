import React, { Component } from 'react'
import { connect } from 'react-redux'
import { load, loaded, adminOn, adminOff } from './../../redux/actions'

import { withRouter } from 'react-router-dom'

export class Admin extends Component {

	componentDidMount = async () => {
		const { loaded, adminOn } = this.props

		adminOn()

		setTimeout(() => {
			loaded()
		}, 500)
	}

	componentWillUnmount = () => {
		const { load, adminOff } = this.props

		load()
		adminOff()
	}

	render() {
		return (
			<div>
				Admin
			</div>
		)
	}
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
	load,
	loaded,
	adminOn,
	adminOff
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin))
