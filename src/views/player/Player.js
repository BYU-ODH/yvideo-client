import React, { Component } from 'react'
import { connect } from 'react-redux'

import { load, loaded } from './../../redux/actions'

import { withRouter } from 'react-router-dom'

import { Ayamel, ResourceLibrary } from 'yvideojs'
import 'yvideojs/css/player.css'

import ContentLoader from './../../js/yvideojs/contentRendering/ContentLoader'

class Player extends Component {
	constructor(props) {
		super(props)
		this.state = {
			videoUrl: `${process.env.REACT_APP_YVIDEO_SERVER}/api/content/${props.videoId}`,
			owner: false,
			userId: 0,
			collectionId: 0,
			content: null
		}
		ResourceLibrary.setBaseUrl(`https://api.ayamel.org/api/v1/`)
	}

	componentDidMount() {

		setTimeout(() => {
			this.props.loaded()
		}, 500)

		fetch(this.state.videoUrl, { credentials: `include` })
			.then(response => {
				return response.json()
			})
			.then(content => {
				this.setState({
					content
				})
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
					screenAdaption: {
						fit: true,
						scroll: true,
						padding: 61
					},
					aspectRatio: Ayamel.aspectRatios.hdVideo,
					startTime: `0`,
					endTime: `-1`,
					callback() {
						console.log(`contentloader callback...`)
					}
				})
			})
			.catch(err => console.error(err))
	}

	componentWillUnmount() {
		this.props.load()
	}

	render() {
		return (
			<div id='contentHolder'>
			</div>
		)
	}
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
	load,
	loaded
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Player))