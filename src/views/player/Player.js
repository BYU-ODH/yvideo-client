import React, { Component } from 'react'

import { connect } from 'react-redux'
import { load, loaded, getCollections, getRecent } from './../../redux/actions'

import { withRouter } from 'react-router-dom'

import axios from 'axios'

import { Ayamel, ResourceLibrary } from 'yvideojs'
import 'yvideojs/css/player.css'

import ContentLoader from './../../js/yvideojs/contentRendering/ContentLoader'

import PreviewCollection from './../dashboard/previews/PreviewCollection'
import PreviewVideo from './../dashboard/previews/PreviewVideo'
import { Container, Content, PreviewEmpty } from './../dashboard/styles'

import { PlayerCssFix } from './styles'

class Player extends Component {
	constructor(props) {
		super(props)
		this.state = {
			owner: false,
			userId: 0,
			collectionId: 0,
			content: null
		}
		ResourceLibrary.setBaseUrl(`https://api.ayamel.org/api/v1/`)
	}

	componentDidMount= async () => {

		const { getCollections, getRecent, loaded } = this.props

		try {
			await getCollections()
		} catch (error) {
			console.warn(error)
			this.setState({ error: true })
		}

		try {
			await getRecent()
		} catch (error) {
			console.warn(error)
			this.setState({ error: true })
		}

		axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/content/${this.props.videoId}/addview`, { withCredentials: true })
			.catch(() => {
				console.warn(`429 (Too Many Requests): View count can only increase once per minute`)
			})

		axios(`${process.env.REACT_APP_YVIDEO_SERVER}/api/content/${this.props.videoId}`, { withCredentials: true })
			.then(response => {
				return response.data
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
					screenAdaption: false,
					aspectRatio: Ayamel.aspectRatios.hdVideo,
					startTime: `0`,
					endTime: `-1`,
					callback() {
						setTimeout(() => {
							loaded()
						}, 500)
					}
				})

			})
			.catch(err => console.error(err))
	}

	componentWillUnmount = () => {
		this.props.load()
	}

	render() {
		const { recent, collections } = this.props

		const modRec = recent.slice(0, 4)
		const modColl = collections.slice(0, 4)

		return (
			<Container>
				<PlayerCssFix id='contentHolder' />

				<Content header>
					<p>Recently Viewed</p>
				</Content>
				<Content>
					{
						modRec !== undefined && modRec.length !== 0 ?
							modRec.map(item => <PreviewVideo key={item.contentId} data={item} />)
							:
							<PreviewEmpty>no videos :(</PreviewEmpty>
					}
				</Content>
				<Content header>
					<p>Collections</p>
				</Content>
				<Content>
					{
						modColl !== undefined && modColl.length !== 0 ?
							modColl.map(item => <PreviewCollection key={item.id} data={item} />)
							:
							<PreviewEmpty>no collections :(</PreviewEmpty>
					}
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	userInfo: state.userInfo,
	collections: state.collections,
	recent: state.recent
})

const mapDispatchToProps = {
	load,
	loaded,
	getCollections,
	getRecent
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Player))