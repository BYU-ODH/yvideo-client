/* eslint-disable no-prototype-builtins */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
	userService,
} from 'services'

import { Root } from 'components'

const RootContainerComponent = props => {

	// store
	const {
		user,
		loading,
		tried,
	} = props

	// thunks
	const {
		getUser,
	} = props

	useEffect(() => {
		if (!user && !tried) getUser()
	}, [getUser, tried, user])

	const viewstate = {
		user,
		loading,
	}

	return <Root viewstate={viewstate} />
}

const mapStoreToProps = ({ authStore, userStore }) => ({
	user: userStore.user,
	loading: authStore.loading || userStore.loading,
	tried: userStore.tried,
})

const mapDispatchToProps = {
	getUser: userService.getUser,
}

export const RootContainer = connect(mapStoreToProps, mapDispatchToProps)(RootContainerComponent)