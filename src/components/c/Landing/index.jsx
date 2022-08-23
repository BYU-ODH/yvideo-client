import React, { PureComponent, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Overlay } from 'components'

import { Wrapper, Comets, Welcome, Logo, Button, AlertMessage } from './styles'

import { isIOS, isSafari } from 'react-device-detect'

class Landing extends PureComponent {
	render() {
		const {
			overlay,
		} = this.props.viewstate

		const {
			toggleOverlay,
			handleLogin,
		} = this.props.handlers

		const checkBrowser = () => {
			let alertMessage

			//safari
			if(isSafari)
				alertMessage = `Video playback does not currently work on Safari. We recommend using Chrome instead.`
			//ios
			if(isIOS)
				alertMessage = `Video playback does not currently work on iOS devices. Please use a different device."

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
