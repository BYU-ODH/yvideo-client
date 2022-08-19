import React, { useState } from 'react'
import { connect } from 'react-redux'

import { authService } from 'services'

import { Landing } from 'components'

import {isMobile, isIE, isSafari, isFirefox, isMobileSafari, isIOS, isChrome } from 'react-device-detect'

const LandingContainer = props => {

	const {
		login,
	} = props

	const [overlay, setOverlay] = useState(false)

	const toggleOverlay = () => {
		setOverlay(!overlay)
	}

	const checkBrowser = () => {

		//safari
		if(isSafari)
			alert("video playback doesn’t work on safari, we recommend Chrome.")

		//ios
		if(isIOS && isMobile)
			alert("video playback doesn’t work on the IOS system, please use a different device.")

		//internet explorer
		if(isIE)
			alert("video playback doesn’t work on Internet Explorer, we recommend Chrome.")

		//firefox
		if(isFirefox)
			alert("video playback doesn’t work on Firefox, we recommend Chrome.")
	}

	const handlePublicCollections = e => {
		// if(e) console.log(e.target.value)
	}

	const handleLogin = e => {
		e.preventDefault()
		login()
	}

	const viewstate = {
		overlay,
	}

	const handlers = {
		toggleOverlay,
		handleLogin,
		handlePublicCollections,
		checkBrowser,
	}

	return <Landing viewstate={viewstate} handlers={handlers} />

}

const mapDispatchToProps = {
	login: authService.login,
}

export default connect(null, mapDispatchToProps)(LandingContainer)
