import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { authService } from 'services'

import { Landing } from 'components'

const LandingContainerComponent = props => {

	const {
		login,
	} = props

	const [overlay, setOverlay] = useState(false)

	const toggleOverlay = () => {
		setOverlay(!overlay)
	}

	const history = useHistory()

	const handleLogin = e => {
		e.preventDefault()
		login()
		history.push(`/`)
	}

	const viewstate = {
		overlay,
	}

	const handlers = {
		toggleOverlay,
		handleLogin,
	}

	return <Landing viewstate={viewstate} handlers={handlers} />

}

const mapDispatchToProps = {
	login: authService.login,
}

export const LandingContainer = connect(null, mapDispatchToProps)(LandingContainerComponent)
