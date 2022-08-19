import React, { useState } from 'react'
import { connect } from 'react-redux'

import { authService } from 'services'

import { Landing } from 'components'

import {isMobile, isIE, isSafari, isFirefox, isIOS } from 'react-device-detect'

const LandingContainer = props => {

	const {
		login,
	} = props

	const [overlay, setOverlay] = useState(false)

	const toggleOverlay = () => {
		setOverlay(!overlay)
	}

	const checkBrowser = () => {

		// safari
		if(isSafari)
			alert(`Video playback does not currently work on Safari. For now, we recommend Chrome instead.`)

		// ios
		if(isIOS && isMobile)
			alert(`Video playback does not currently work on iOS devices. For now, please use a different device.`)

		// internet explorer
		if(isIE)
			alert(`Video playback does not currently work on Internet Explorer. For now, we recommend Chrome instead.`)

		// firefox
		if(isFirefox)
			alert(`Video playback does not currently work on Firefox. For now, we recommend Chrome instead.`)
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
