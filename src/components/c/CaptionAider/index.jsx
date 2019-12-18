import React, { PureComponent, createRef } from 'react'

import { Ayamel, ResourceLibrary } from 'yvideojs'

import ContentLoader from 'lib/js/contentRendering/ContentLoader'

import Style from './styles'
import 'yvideojs/css/player.css'

export default class CaptionAider extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			owner: false,
			userId: 0,
			collectionId: 0,
			content: null,
		}
		ResourceLibrary.setBaseUrl(`https://api.ayamel.org/api/v1/`)
	}

	contentHolder = createRef(null)

	render() {

		return (
			<Style>
				<div ref={this.contentHolder} />
			</Style>
		)
	}

	componentDidUpdate = async () => {
		try {
			// Render the content
			ContentLoader.render({
				ContentLoader,
				content: this.props.content,
				userId: this.props.userId,
				owner: true,
				teacher: false,
				collectionId: 0,
				holder: this.contentHolder.current,
				annotate: true,
				open: true,
				screenAdaption: false,
				aspectRatio: Ayamel.aspectRatios.hdVideo,
				startTime: `0`,
				endTime: `-1`,
			})
		} catch (error) {
			console.error(error)
		}
	}
}