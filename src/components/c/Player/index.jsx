import React, { PureComponent } from 'react'

import { Ayamel, ResourceLibrary } from 'yvideojs'
import 'yvideojs/css/player.css'

import ContentLoader from 'lib/js/contentRendering/ContentLoader'

import Style, { Container } from './styles'

export default class Player extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			owner: false,
			userId: 0,
			collectionId: 0,
			content: null,
			error: null,
		}
		ResourceLibrary.setBaseUrl(`https://api.ayamel.org/api/v1/`)
	}

	render() {

		return (
			<Container>
				<Style id='contentHolder' />
			</Container>
		)
	}

	componentDidUpdate = async () => {
		// const { loaded } = this.props

		try {
			// Render the content
			ContentLoader.render({
				ContentLoader,
				content: this.props.content,
				userId: this.props.userId,
				owner: true,
				teacher: false,
				collectionId: 0,
				holder: document.getElementById(`contentHolder`),
				annotate: true,
				open: true,
				screenAdaption: false,
				aspectRatio: Ayamel.aspectRatios.hdVideo,
				startTime: `0`,
				endTime: `-1`,
				callback(test) {
					console.log(`test`, test)
					setTimeout(() => {
						// loaded()
					}, 500)
				},
			})
		} catch (error) {
			console.log(`gross2`)
			console.log(error)
			this.setState({
				error,
			})
		}
	}
}