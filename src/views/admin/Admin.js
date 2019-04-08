import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loaded, found, getCollections, toggleBorder } from './../../redux/actions'

import { SAdmin, SideIcons, SideMenu, Content } from './styles'

export class Admin extends Component {

	componentDidMount = async () => {
		const { found, getCollections, loaded, toggleBorder } = this.props

		found()
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
		this.props.load()
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
	loaded,
	found,
	getCollections,
	toggleBorder
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
