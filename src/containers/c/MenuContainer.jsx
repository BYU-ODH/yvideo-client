import React from 'react'
import { connect } from 'react-redux'

import services from 'services'

import { Menu } from 'components'

import { getInitials } from 'lib/util'

const MenuContainer = props => {

	const {
		user,
		isProf,
		isAdmin,
		menuActive,
		logout,
		toggleMenu,
		editorStyle,
	} = props

	const handleLogout = async e => {
		e.preventDefault()
		await logout()
	}

	const viewstate = {
		user,
		initials: getInitials(user.name),
		menuActive,
		isProf,
		isAdmin,
		editorStyle,
	}

	const handlers = {
		toggleMenu,
		handleLogout,
	}

	return <Menu viewstate={viewstate} handlers={handlers} />
}

const mapStoreToProps = ({ authStore, interfaceStore }) => ({
	user: authStore.user,
	isProf: authStore.user.roles.includes(`professor`),
	isAdmin: authStore.user.roles.includes(`admin`),
	isStudent: authStore.user.roles.includes(`student`),
	menuActive: interfaceStore.menuActive,
	editorStyle: interfaceStore.editorStyle,
})

const mapDispatchToProps = {
	logout: services.authService.logout,
	toggleMenu: services.interfaceService.toggleMenu,
}

export default connect(mapStoreToProps, mapDispatchToProps)(MenuContainer)
