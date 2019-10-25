import React from 'react'

export class BasicError extends React.Component {
	componentDidMount() {
		console.log(this.props)
	}

	render() {
		return (
			<div>
				<h1>Error</h1>
				<p></p>
			</div>
		)
	}
}

export default BasicError