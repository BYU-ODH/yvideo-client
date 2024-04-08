import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Overlay } from 'components'

import { Wrapper, Comets, Welcome, Logo, Button } from './styles'

const Landing = props => {

	const {
		overlay,
	} = props.viewstate

	const {
		toggleOverlay,
		handleLogin,
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

			<Welcome>
				<div>
					<Logo />
					<h1>Y-VIDEO</h1>
				</div>
				<div className='button-wrapper'>
					<Button id='primary' className='primary' onClick={handleLogin}>Sign In</Button>
					<Button className='secondary' onClick={toggleOverlay}>About</Button>
					<Button className='secondary'><Link to={`/search-public-collections`} className='inactive'>Public Videos</Link></Button>
					{/* <Button className='secondary' onClick={toggleOverlay}>Public</Button> */}
				</div>

			</Welcome>

			{ overlay && <Overlay toggleOverlay={toggleOverlay} /> }
		</Wrapper>
	)
}

export default Landing
