import React from 'react'
import { connect } from 'react-redux'

import { loaded, lost } from './../../redux/actions'

import { ErrorContainer, SLink } from './styles'

export class Error extends React.Component {
	componentDidMount = () => {
		this.props.lost()
		setTimeout(() => {
			this.props.loaded()
		}, 1000)
	}

	render() {
		const { error, message } = this.props
		return (
			<ErrorContainer>
				<h1>{error}</h1>
				<h2>{message}</h2>
				<SLink to={'/'}>Go back home</SLink>
			</ErrorContainer >
		)
	}
}

const mapDispatchToProps = {
	loaded,
	lost
}

export default connect(null, mapDispatchToProps)(Error)