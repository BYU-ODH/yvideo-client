import React, { useState } from 'react'
import { connect } from 'react-redux'

import { authService } from 'services'

import { Landing } from 'components'

import { isMobile, isSafari, isIOS } from 'react-device-detect'

const LandingContainer = props => {

	const {
		login,
	} = props

	const [overlay, setOverlay] = useState(false)
	const [isAlertMessage, setIsAlertMessage] = useState(false)
	const [alertMessage, setAlertMessage] = useState(``)
	const [disabled, setDisabled] = useState(false)
	const toggleOverlay = () => {
		setOverlay(!overlay)
	}

	const handleLogin = e => {
		e.preventDefault()
		login()
	}

	const checkBrowser = () => {
		// safari
		if(isSafari) {
			setAlertMessage(`Video playback does not currently work on Safari. Please use a chromium-based browser, like Chrome.`)
			setIsAlertMessage(true)
			setDisabled(true)
		}else if(isIOS && isMobile) { // ios
			setAlertMessage(`Video playback does not currently work on iOS. Please use a different device.`)
			setIsAlertMessage(true)
			setDisabled(true)
		}
	}

	const toggleAlertMessage = () => {
		setDisabled(false)
		const alert = document.getElementById(`alertMessage`)
		if (alert)
			alert.style.visibility = `hidden`
	}

	const viewstate = {
		overlay,
		alertMessage,
		isAlertMessage,
		disabled,
	}

	const handlers = {
		toggleOverlay,
		handleLogin,
		checkBrowser,
		toggleAlertMessage,
	}

	return <Landing viewstate={viewstate} handlers={handlers} />

}

const mapDispatchToProps = {
	login: authService.login,
}

export default connect(null, mapDispatchToProps)(LandingContainer)
