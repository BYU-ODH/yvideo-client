import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { Overlay } from 'components'

import { Wrapper, Comets, Welcome, Logo, Button, AlertMessage } from './styles'

class Landing extends PureComponent {

	constructor(props) {
		super(props)
		this.checkBrowser = this.props.handlers.checkBrowser
	}

	componentDidMount() {
		this.checkBrowser()
	}
	render() {
		const {
			overlay,
			alertMessage,
			isAlertMessage,
		} = this.props.viewstate

		const {
			toggleOverlay,
			handleLogin,
			toggleAlertMessage,
		} = this.props.handlers

		return (
			<Wrapper>
				<Comets className='left' />
				<Comets className='right' />

				<Welcome>
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
