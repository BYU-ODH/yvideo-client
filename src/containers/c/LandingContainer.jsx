import React, { useState } from 'react'
import { connect } from 'react-redux'

import { authService } from 'services'

import { Landing } from 'components'

import {isMobile, isSafari, isIOS } from 'react-device-detect'

const LandingContainer = props => {

	const {
		login,
	} = props

	const [overlay, setOverlay] = useState(false)
	const [isAlertMessage, setIsAlertMessage] = useState(false)
	const [alertMessage, setAlertMessage] = useState(``)
	const toggleOverlay = () => {
		setOverlay(!overlay)
	}

	const handlePublicCollections = e => {
		// if(e) console.log(e.target.value)
	}

	const handleLogin = e => {
		e.preventDefault()
		login()
	}

	const checkBrowser = () => {
		// safari
		if(isSafari) {
			setAlertMessage(`video playback doesn't work on safari, we recommend Chrome.`)
			setIsAlertMessage(true)
		}else if(isIOS && isMobile) { // ios
			setAlertMessage(`video playback doesn't work on the IOS system, please use a different device.`)
			setIsAlertMessage(true)
		}
	}

	const toggleAlertMessage = () => {
		const alert = document.getElementById(`alertMessage`)
		if (alert)
			alert.style.visibility = `hidden`
	}

	const viewstate = {
		overlay,
		alertMessage,
		isAlertMessage,
	}

	const handlers = {
		toggleOverlay,
		handleLogin,
		handlePublicCollections,
		checkBrowser,
		toggleAlertMessage,
	}

	return <Landing viewstate={viewstate} handlers={handlers} />

}

const mapDispatchToProps = {
	login: authService.login,
}

export default connect(null, mapDispatchToProps)(LandingContainer)
