import React, { Component } from 'react'
import { connect } from 'react-redux'

import { load, loaded, found } from './../redux/actions'

import { Container } from './styles'

export class Collection extends Component {
	componentDidMount = () => {
		this.props.found()
		setTimeout(() => {
			this.props.loaded()
		}, 500)
	}

	componentWillUnmount = () => {
		this.props.load()
	}

	render() {
		return (
			<Container>
				<h1>Collections</h1>
			</Container>
		)
	}
}

const mapDispatchToProps = {
	load,
	loaded,
	found
}

export default connect(null, mapDispatchToProps)(Collection)
