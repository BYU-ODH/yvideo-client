import React, { useState } from 'react'
import { connect } from 'react-redux'

import { authService } from 'services'

import { Landing } from 'components'

import { isMobile, isSafari, isIOS } from 'react-device-detect'
import Swal from 'sweetalert2'

const LandingContainer = props => {

	const {
		login,
	} = props

	const [overlay, setOverlay] = useState(false)
	const toggleOverlay = () => {
		setOverlay(!overlay)
	}

	const handleLogin = e => {
		e.preventDefault()
		login()
	}

	const checkBrowser = () => {
		if(isSafari){
			Swal.fire({
				text: `Video playback does not currently work on Safari. Please use a chromium-based browser, like Chrome`,
				icon: `warning`,
				confirmButtonText: `Ok`,
			}).then((result) => {
				if (result.isConfirmed)
					Swal.close()
			}).catch((error) => {
				Swal.fire(`An error has occurred`, error.message, `error`)
			})
		} else if(isIOS && isMobile){
			Swal.fire({
				text: `Video playback does not currently work on iOS. Please use a different device.`,
				icon: `warning`,
				confirmButtonText: `Ok`,
			}).then((result) => {
				if (result.isConfirmed)
					Swal.close()
			}).catch((error) => {
				Swal.fire(`An error has occurred`, error.message, `error`)
			})
		}
	}

	const viewstate = {
		overlay,
	}

	const handlers = {
		toggleOverlay,
		handleLogin,
		checkBrowser,
	}

	return <Landing viewstate={viewstate} handlers={handlers} />

}

const mapDispatchToProps = {
	login: authService.login,
}

export default connect(null, mapDispatchToProps)(LandingContainer)
