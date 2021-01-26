import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import services from 'services'

import { Menu } from 'components'
import { Tooltip } from 'components/bits'

import { getInitials } from 'lib/util'

const MenuContainer = props => {

	const {
		user,
		isProf,
		isAdmin,
		isLab,
		menuActive,
		logout,
		toggleMenu,
		toggleTip,
		editorStyle,
	} = props

	const handleLogout = async e => {
		e.preventDefault()
		await logout()
	}

	const handleShowTip = (tipName, position) => {
		toggleTip({
			component: Tooltip,
			props: {
				name: tipName,
				position,
			},
		})
	}

	const viewstate = {
		user,
		initials: getInitials(user.name),
		menuActive,
		isProf,
		isAdmin,
		isLab,
		editorStyle,
	}

	const handlers = {
		toggleMenu,
		handleLogout,
		handleShowTip,
		toggleTip,
	}

	return <Menu viewstate={viewstate} handlers={handlers} />
}

const mapStoreToProps = ({ authStore, interfaceStore }) => ({
	user: authStore.user,
	isProf: authStore.user.roles === 2,
	isAdmin: authStore.user.roles === 0,
	isStudent: authStore.user.roles === 3,
	isLab: authStore.user.roles === 1,
	menuActive: interfaceStore.menuActive,
	editorStyle: interfaceStore.editorStyle,
})

const mapDispatchToProps = {
	logout: services.authService.logout,
	toggleMenu: services.interfaceService.toggleMenu,
	toggleTip: services.interfaceService.toggleTip,
}

export default connect(mapStoreToProps, mapDispatchToProps)(MenuContainer)
