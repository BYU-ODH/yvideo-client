import React, { Component } from 'react'

import { connect } from 'react-redux'
import { load, loaded, getCollections, getRecent } from 'redux/actions'

import { withRouter } from 'react-router-dom'

import PreviewCollection from './previews/PreviewCollection'
import PreviewVideo from './previews/PreviewVideo'

import { Container, Content, PreviewEmpty } from './styles'

export class Dashboard extends Component {

	constructor(props) {
		super(props)
		this.state = {
			error: false
		}
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

		setTimeout(() => {
			loaded()
		}, 500)
	}

	componentWillUnmount = () => {
		this.props.load()
	}

	render() {
		const { recent, collectionsCache } = this.props
		const { collections = {} } = collectionsCache

		const modRec = recent.slice(0, 4)
		const modColl = Object.keys(collections).slice(0, 4) || null

		return (
			<Container>
				<Content header>
					<p>Recently Viewed</p>
				</Content>
				<Content>
					{
						modRec !== undefined && modRec.length !== 0 ?
						modRec.map(item => <PreviewVideo key={item.id} data={item} />)
							:
							<PreviewEmpty>no videos :(</PreviewEmpty>
					}
				</Content>
				<Content header>
					<p>Collections</p>
				</Content>
				<Content>
					{
						modColl !== null && modColl.length > 0 ?
							modColl.map(id => <PreviewCollection key={id} data={collections[id]} />)
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
	collectionsCache: state.collectionsCache,
	recent: state.recent
})

const mapDispatchToProps = {
	load,
	loaded,
	getCollections,
	getRecent
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
