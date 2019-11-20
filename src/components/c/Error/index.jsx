import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { interfaceService } from 'services'

import { SError, SLink } from './styles'

class Error extends PureComponent {
	componentDidMount = () => {
		this.props.setLost(true)
	}

	componentWillUnmount = () => {
		this.props.setLost(false)
	}

	render() {
		const { error, message } = this.props
		return (
			<SError>
				<h1>{error}</h1>
				<h2>{message}</h2>
				<SLink to={`/`}>Go back home</SLink>
			</SError >
		)
	}
}

const mapDispatchToProps = {
	setLost: interfaceService.setLost,
}

export default connect(null, mapDispatchToProps)(Error)
