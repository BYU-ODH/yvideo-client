import React, { Component } from 'react'
import { connect } from 'react-redux'

import { load, loaded } from './../../redux/actions'

import { Link, withRouter } from 'react-router-dom'

import Overlay from './Overlay'

import { Container, Comets, Welcome, Logo, Button } from './styles'

class Landing extends Component {
	constructor(props) {
		super(props)

		this.state = {
			overlay: false
		}
	}

	componentDidMount = () => {
		setTimeout(() => {
			this.props.loaded()
		}, 500)
	}

	componentWillUnmount = () => {
		this.props.load()
	}

	toggleAbout = () => {
		this.setState({
			overlay: !this.state.overlay
		})
	}

	render() {
		return (
			<Container>
				<Comets className='left' />
				<Comets className='right' />
				<Welcome>
					<div>
						<Logo />
						<h1>YVIDEO</h1>
					</div>
					<div className='button-wrapper'>
						<Button as={Link} to={`/login`} className='primary'>Sign In</Button>
						<Button className='secondary' onClick={this.toggleAbout}>About</Button>
					</div>
				</Welcome>
				{
					this.state.overlay ?
						<Overlay toggleAbout={this.toggleAbout} />
						:
						``
				}
			</Container>
		)
	}
}

const mapDispatchToProps = {
	load,
	loaded
}

export default withRouter(connect(null, mapDispatchToProps)(Landing))
