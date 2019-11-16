/* eslint-disable no-prototype-builtins */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import services from 'services'

import { Root } from 'components'

const RootContainer = props => {

	// store
	const {
		user,
		loading,
		tried,
	} = props

	// thunks
	const {
		checkAuth,
	} = props

	useEffect(() => {
		if (!user && !tried) checkAuth()
	}, [checkAuth, tried, user])

	const viewstate = {
		user,
		loading,
	}

	return <Root viewstate={viewstate} />
}

const mapStoreToProps = ({ authStore }) => ({
	user: authStore.user,
	loading: authStore.loading,
	tried: authStore.tried,
})

const mapDispatchToProps = {
	checkAuth: services.authService.checkAuth,
}

export default connect(mapStoreToProps, mapDispatchToProps)(RootContainer)
