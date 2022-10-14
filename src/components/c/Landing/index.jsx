import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Overlay } from 'components'

import { Wrapper, Comets, Welcome, Logo, Button, AlertMessage } from './styles'

const Landing = props => {

	const {
		overlay,
		alertMessage,
		isAlertMessage,
		disabled,
	} = props.viewstate

	const {
		toggleOverlay,
		handleLogin,
		toggleAlertMessage,
		checkBrowser,
	} = props.handlers

	useEffect(() => {
		checkBrowser()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Wrapper>
			<Comets className='left' />
			<Comets className='right' />

			<Welcome disable={disabled}>
				<div>
					<Logo />
					<h1>Y-VIDEO</h1>
				</div>
				{isAlertMessage &&
					<AlertMessage id='alertMessage'>
						<div>{alertMessage}</div>
						<button type='button' onClick={toggleAlertMessage}>Close</button>
					</AlertMessage>
				}

				<div className='button-wrapper'>
					<Button id='primary' className='primary' onClick={handleLogin} disabled={disabled}>Sign In</Button>
					<Button className='secondary' onClick={toggleOverlay} disabled={disabled}>About</Button>
					<Button className='secondary'><Link to={`/search-public-collections`} className='inactive'>Public Videos</Link></Button>
					{/* <Button className='secondary' onClick={toggleOverlay}>Public</Button> */}
				</div>

			</Welcome>

			{ overlay && <Overlay toggleOverlay={toggleOverlay} /> }
		</Wrapper>
	)
}

export default Landing
