import React, { Component } from 'react'
import { connect } from 'react-redux'

import { load, loaded, found, getCollections, getRecent } from '../../redux/actions'

import PreviewCollection from './previews/PreviewCollection'
import PreviewVideo from './previews/PreviewVideo'

import { Container, Content, PreviewEmpty } from './styles'

export class Dashboard extends Component {

	componentDidMount = async () => {
		const { found, getCollections, getRecent, loaded } = this.props

		found()

		try {
			await getCollections()
		} catch (error) {
			console.log(error)
		}

		try {
			await getRecent()
		} catch (error) {
			console.log(error)
		}

		setTimeout(() => {
			loaded()
		}, 500)
	}

	componentWillUnmount = () => {
		this.props.load()
	}

	render() {
		const { recent, collections } = this.props

		const modColl = collections.slice(0, 4)

		return (
			<Container>
				<Content header>
					<p>Recently Viewed</p>
				</Content>
				<Content>
					{
						recent !== undefined && recent.length !== 0 ?
							recent.map(item => <PreviewVideo key={item.contentId} data={item} />)
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
	userAuth: state.userAuth,
	collections: state.collections,
	recent: state.recent
})

const mapDispatchToProps = {
	load,
	loaded,
	found,
	getCollections,
	getRecent
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
