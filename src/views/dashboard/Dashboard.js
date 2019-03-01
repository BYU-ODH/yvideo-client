import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loaded, found, getCollectionPreview, getCollectionRecent } from '../../redux/actions'

import PreviewCollection from './previews/PreviewCollection'
import PreviewVideo from './previews/PreviewVideo'

import { Container, Content } from './styles'

export class Dashboard extends Component {

	componentDidMount = async () => {
		const { found, getCollectionPreview, getCollectionRecent, loaded } = this.props

		found()

		console.clear()

		try {
			await getCollectionPreview()
		} catch (error) {
			console.log(error)
		}

		try {
			await getCollectionRecent()
		} catch (error) {
			console.log(error)
		}

		setTimeout(() => {
			loaded()
		}, 1000)
	}

	render() {
		const { recent, preview, userAuth } = this.props
		return (
			<Container>
				<Content>
					<p>Recently Viewed</p>
				</Content>
				<Content>
					{
						recent !== [] ? recent.map(item =>
							<PreviewVideo key={item.contentId} data={item} />)
							:
							<li>Uh Oh</li>
					}
				</Content>
				<Content>
					<p>Collections</p>
				</Content>
				<Content>
					{
						preview !== [] ? preview.map(item =>
							<PreviewCollection
								key={item.id}
								thumb={item.url}
								name={item.name}
								length={item.contentCount}
							/>) : <li>Uh Oh</li>
					}
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	userAuth: state.userAuth,
	preview: state.preview,
	recent: state.recent
})

const mapDispatchToProps = {
	loaded,
	found,
	getCollectionPreview,
	getCollectionRecent
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
