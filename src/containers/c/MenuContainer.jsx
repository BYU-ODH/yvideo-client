import React from 'react'
import { connect } from 'react-redux'

import services from 'services'

import { Menu } from 'components'

import { getInitials } from 'lib/util'

const MenuContainerComponent = props => {

	const {
		user,
		isProf,
		isAdmin,
		menuActive,
		logout,
		toggleMenu,
	} = props

	const createCollection = e => {
		e.preventDefault()
		// props.toggleModal({ component: CreateCollection })
	}

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
	}

	const handlers = {
		toggleMenu,
		createCollection,
		handleLogout,
	}

	return <Menu viewstate={viewstate} handlers={handlers} />
}

const mapStoreToProps = ({ userStore, interfaceStore }) => ({
	user: userStore.user,
	isProf: userStore.user.roles.includes(`professor`),
	isAdmin: userStore.user.roles.includes(`admin`),
	isStudent: userStore.user.roles.includes(`student`),
	menuActive: interfaceStore.menuActive,
})

const mapDispatchToProps = {
	logout: services.authService.logout,
	toggleMenu: services.interfaceService.toggleMenu,
	// toggleModal: services.interfaceService.toggleModal,
}

export const MenuContainer = connect(mapStoreToProps, mapDispatchToProps)(MenuContainerComponent)