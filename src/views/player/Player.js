/* eslint-disable no-unused-vars */

import React, { Component } from 'react'

import { connect } from 'react-redux'
import { load, loaded, getCollections, getRecent } from 'redux/actions'

import {
	Redirect,
	withRouter
} from 'react-router-dom'

import axios from 'axios'

import { Ayamel, ResourceLibrary } from 'yvideojs'
import 'yvideojs/css/player.css'

import ContentLoader from 'js/yvideojs/contentRendering/ContentLoader'

import PreviewCollection from 'views/dashboard/previews/PreviewCollection'
import PreviewVideo from 'views/dashboard/previews/PreviewVideo'
import { Container, Content, PreviewEmpty } from 'views/dashboard/styles'

import { diff, isEmptyObject } from 'js/util'

import { PlayerCssFix } from './styles'

class Player extends Component {
	constructor(props) {
		super(props)
		this.state = {
			owner: false,
			userId: 0,
			collectionId: 0,
			content: null,
			error: null
		}
		ResourceLibrary.setBaseUrl(`https://api.ayamel.org/api/v1/`)
	}

	shouldComponentUpdate = (nextProps, nextState) => {

		const propDiff = diff(this.props, nextProps)
		const stateDiff = diff(this.state, nextState)

		// console.log(`propDiff`, propDiff)
		// console.log(`stateDiff`, stateDiff)

		const collectionsFetched = propDiff.collectionsCache !== undefined && !!propDiff.collectionsCache.lastFetched

		// console.log(`collectionsFetched`, collectionsFetched)

		const changed = collectionsFetched

		return changed
	}

	render() {

		// console.error(`Player: render`)

		const { recent, collectionsCache } = this.props

		const collections = Object.keys(collectionsCache.collections).map(key => collectionsCache.collections[key])

		const modRec = recent.slice(0, 4)
		const modColl = collections.slice(0, 4)

		console.log(`Whoa, bessy`, this.state.error)

		// if (this.state.error) return <Redirect to={`/error/${this.state.error}?`} />

		return (
			<Container>
				<PlayerCssFix id='contentHolder' />

				<Content header>
					<p>Recently Viewed</p>
				</Content>
				<Content>
					{
						modRec !== undefined && modRec.length !== 0 ?
							modRec.map((item, key) => <PreviewVideo key={key} data={item} />)
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
							modColl.map((item, key) => <PreviewCollection key={key} data={item} />)
							:
							<PreviewEmpty>no collections :(</PreviewEmpty>
					}
				</Content>
			</Container>
		)
	}

	componentDidMount = async () => {

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
						}
					})
				} catch (error) {
					console.log(`gross2`)
					console.log(error)
					this.setState({
						error
					})
				}

			})
	}

	componentWillUnmount = () => {
		this.props.load()
	}

}

const mapStateToProps = ({ userInfo, collectionsCache, recent }) => ({ userInfo, collectionsCache, recent })

const mapDispatchToProps = {
	load,
	loaded,
	getCollections,
	getRecent
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Player))