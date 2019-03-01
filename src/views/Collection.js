import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loaded, found } from './../redux/actions'

import { Container } from './styles'

export class Collection extends Component {
	componentDidMount = () => {
		this.props.found()
		setTimeout(() => {
			this.props.loaded()
		}, 1000)
	}

	render() {
		return (
			<Container>
				<h1>Collection</h1>
			</Container>
		)
	}
}

const mapDispatchToProps = {
	loaded,
	found
}

export default connect(null, mapDispatchToProps)(Collection)
