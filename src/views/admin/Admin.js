import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Admin extends Component {

	render() {
		return (
			<div>
				Admin
			</div>
		)
	}
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
