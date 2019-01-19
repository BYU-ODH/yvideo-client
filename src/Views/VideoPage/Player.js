import React, { Component } from 'react'

export default class Player extends Component {
	constructor(props) {
		super(props)

		this.state = {
			videoUrl: 'http://ayamelbeta.byu.edu/api/content/784'
		}
	}

	componentWillMount = () => {
		// fetch(this.state.videoUrl)
		// 	.then(response => {
		// 		return response.json()
		// 	})
		// 	.then(myJson => {
		// 		console.log(JSON.stringify(myJson))
		// 	})

	}

	render() {
		return (
			<div id='contentHolder'>

			</div>
		)
	}
}