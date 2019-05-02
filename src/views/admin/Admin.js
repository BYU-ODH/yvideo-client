import React, { Component } from 'react'
import { connect } from 'react-redux'

import { load, loaded, adminOn, adminOff, getCollections } from './../../redux/actions'

import { withRouter } from 'react-router-dom'

import {
	AdminStyled,
	SideIcons,
	SideMenu,
	Content,
	Selector,
	SelectorIcons
} from './styles'

export class Admin extends Component {

	componentDidMount = async () => {
		const { adminOn, getCollections, loaded } = this.props

		adminOn()

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
		const { page } = this.props.match.params
		return (
			<AdminStyled>
				<SelectorIcons position={page} />
				<Selector position={page} />
				<SideIcons>
				</SideIcons>
				<SideMenu>
				</SideMenu>
				<Content>
				</Content>
			</AdminStyled>
		)
	}
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
	getCollections,
	load,
	loaded,
	adminOn,
	adminOff
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin))
