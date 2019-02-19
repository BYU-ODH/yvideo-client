import React, { Component } from 'react'

export class Dashboard extends Component {
	render() {
		return (
			<div>
				<h1>Dashboard</h1>
				<button onClick={this.props.caslogout}>Log Out</button>
			</div>
		)
	}
}

export default Dashboard
