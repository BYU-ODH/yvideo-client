import React, { Component } from 'react'
import { connect } from 'react-redux'

import { load, loaded, adminOn, adminOff, getCollections, toggleBorder } from './../../redux/actions'

import { withRouter } from 'react-router-dom'

import { SAdmin, SideIcons, SideMenu, Content } from './styles'

export class Admin extends Component {

	componentDidMount = async () => {
		const { adminOn, getCollections, loaded, toggleBorder } = this.props

		adminOn()
		toggleBorder()

		try {
			await getCollections()
		} catch (error) {
			console.log(error)
		}

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
			<SAdmin>
				<SideIcons></SideIcons>
				<SideMenu></SideMenu>
				<Content></Content>
			</SAdmin>
		)
	}
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
	getCollections,
	toggleBorder,
	load,
	loaded,
	adminOn,
	adminOff
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin))
