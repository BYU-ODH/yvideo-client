import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Header } from 'components'

export const RELEASE_BANNER_KEY = `yvideo-2-release-banner-dismissed`

// local calendar date, e.g. "2026-11-24"; dismissal only lasts for the day it was made
export const todayString = () => {
	const now = new Date()
	const pad = n => String(n).padStart(2, `0`)
	return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

const isBannerDismissed = () => {
	try {
		return window.localStorage.getItem(RELEASE_BANNER_KEY) === todayString()
	} catch (e) {
		return false
	}
}

const HeaderContainer = props => {

	const {
		lost,
		border,
		editorStyle,
		user,
		hasCollectionPermissions,
	} = props

	const [bannerDismissed, setBannerDismissed] = useState(isBannerDismissed)

	// admins (0), lab assistants (1), instructors (2), and student TAs
	const isEligibleRole = user?.roles !== undefined && user?.roles !== null && user.roles <= 2
	const isTA = hasCollectionPermissions?.[`ta-permission`] === true
	const showReleaseBanner = (isEligibleRole || isTA) && !bannerDismissed

	const dismissReleaseBanner = () => {
		setBannerDismissed(true)
		try {
			window.localStorage.setItem(RELEASE_BANNER_KEY, todayString())
		} catch (e) {
			// localStorage unavailable; banner stays dismissed for this session only
		}
	}

	const viewstate = {
		lost,
		border,
		editorStyle,
		showReleaseBanner,
	}

	const handlers = {
		dismissReleaseBanner,
	}

	return <Header viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	lost: store.interfaceStore.lost,
	border: store.interfaceStore.headerBorder,
	editorStyle: store.interfaceStore.editorStyle,
	user: store.authStore.user,
	hasCollectionPermissions: store.authStore.permissions,
})

export default connect(mapStateToProps)(HeaderContainer)
