import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loaded } from './../redux/actions'

export class Landing extends Component {
	componentDidMount = () => {
		setTimeout(() => {
			this.props.loaded()
		}, 1000)
	}

	render() {
		return (
			<div>
				<h1>Landing</h1>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
	loaded
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
