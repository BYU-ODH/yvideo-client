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

		return (
			<Container>
				<Content>
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
				<Content>
					<p>Collections</p>
				</Content>
				<Content>
					{
						collections !== undefined && collections.length !== 0 ?
							collections.map(item => <PreviewCollection key={item.id} data={item} />)
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
