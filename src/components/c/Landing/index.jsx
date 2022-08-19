import React, { PureComponent, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Overlay } from 'components'

import { Wrapper, Comets, Welcome, Logo, Button, AlertMessage } from './styles'

import {isMobile, isIE, isSafari, isFirefox, isMobileSafari, isIOS, isChrome } from 'react-device-detect'


class Landing extends PureComponent {
	render() {
		const {
			overlay,
		} = this.props.viewstate

		const {
			toggleOverlay,
			handleLogin,
			// checkBrowser,
			// handlePublicCollections,
		} = this.props.handlers

		var alertMessage
		// if(!isChrome || isMobile)

		const checkBrowser = () => {

		//safari
			if(isSafari)
				alertMessage = "video playback doesn’t work on safari, we recommend Chrome."
			//ios
			if(isIOS && isMobile)
				alertMessage = "video playback doesn’t work on the IOS system, please use a different device."

			document.getElementById('alertMessage').style.visibility = `visible`
			const alertMessageButton = `<button type='button' onclick={alertMessage.style.visibility='hidden'}>Close</button>`
			document.getElementById('alertMessage').innerHTML = alertMessage + alertMessageButton
		}



		return (
			<Wrapper>
				<Comets className='left' />
				<Comets className='right' />

				<Welcome>
					<div>
						<Logo />
						<h1>Y-VIDEO</h1>
					</div>
				<AlertMessage id='alertMessage'>{checkBrowser}</AlertMessage>

					<div className='button-wrapper'>
						<Button id='primary' className='primary' onClick={handleLogin}>Sign In</Button>
						<Button className='secondary' onClick={toggleOverlay}>About</Button>
						<Button className='secondary'><Link to={`/search-public-collections`}>Public Videos</Link></Button>
						{/* <Button className='secondary' onClick={toggleOverlay}>Public</Button> */}
					</div>

				</Welcome>

				{ overlay && <Overlay toggleOverlay={toggleOverlay} /> }
			</Wrapper>
		)
	}
}

export default Landing
