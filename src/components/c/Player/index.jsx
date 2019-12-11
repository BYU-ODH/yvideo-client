import React, { PureComponent } from 'react'

import { Ayamel, ResourceLibrary } from 'yvideojs'

import ContentLoader from 'lib/js/contentRendering/ContentLoader'

import Style from './styles'

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
			<Style id='contentHolder' />
		)
	}

	componentDidMount = async () => {
		const { loaded } = this.props

		try {
			// Render the content
			ContentLoader.render({
				ContentLoader,
				content: this.state.content,
				userId: this.state.userId.toString(),
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
						loaded()
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