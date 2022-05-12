import React from 'react'
import { connect } from 'react-redux'

import services from 'services'

import { Menu } from 'components'
import { Tooltip } from 'components/bits'

import { getInitials } from 'lib/util'

const MenuContainer = props => {

	const {
		user,
		menuActive,
		logout,
		toggleMenu,
		toggleTip,
		editorStyle,
	} = props

	// const guestUser = new User({
	// 	email: `yvideo_guest`,
	// 	id: `00000000-0000-0000-0000-000000000000`,
	// 	lastLogin: `Fri Jun 04 16:04:40 MDT 2021`,
	// 	name: `yvideo guest`,
	// 	roles: 4,
	// 	username: `guest`,
	// })

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

	// const viewstate = {
	// 	user: user !== undefined && user !== null ? user : guestUser,
	// 	initials: user !== undefined && user !== null ? getInitials(user.name): getInitials(`Guest`),
	// 	menuActive,
	// 	isProf: user !== undefined && user !== null ? user.roles === 2 : false,
	// 	isAdmin: user !== undefined && user !== null ? user.roles === 0 : false,
	// 	isLab: user !== undefined && user !== null ? user.roles === 1 : false,
	// 	editorStyle,
	// }

	const viewstate = {
		user,
		initials: getInitials(user.name),
		menuActive,
		isProf: user.roles === 2,
		isAdmin:user.roles === 0,
		isLab: user.roles === 1,
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
	menuActive: interfaceStore.menuActive,
	editorStyle: interfaceStore.editorStyle,
})

const mapDispatchToProps = {
	logout: services.authService.logout,
	toggleMenu: services.interfaceService.toggleMenu,
	toggleTip: services.interfaceService.toggleTip,
}

export default connect(mapStoreToProps, mapDispatchToProps)(MenuContainer)
