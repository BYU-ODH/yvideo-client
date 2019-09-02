import React, { Component } from 'react'

import { connect } from 'react-redux'

import { getContent, toggleModal, updateCollectionStatus } from 'redux/actions'

import Overview from './content/Overview'
import Permissions from './permissions/Permissions'

import CreateContent from 'components/forms/CreateContent'

import {
	Container,
	PublishButton,
	ArchiveButton,
	TabHeader,
	Selector,
	Tab,
	NewContent,
	Icon
} from './styles'

import plus from 'assets/collections/plus_gray.svg'

class Editor extends Component {

	state = {
		isContent: true
	}

	componentDidUpdate = prevProps => {
		if (this.props.collectionId !== prevProps.collectionId) {
			const collection = this.props.collectionsCache.collections[this.props.collectionId]
			if (collection !== undefined) this.fetchContent(collection)
		}
	}

	fetchContent = collection => {
		const contentIds = collection.content.map(item => item.id)
		if (contentIds.length > 0) this.props.getContent(contentIds)
	}

	togglePublish = e => {
		e.preventDefault()
		const collection = this.props.collectionsCache.collections[this.props.collectionId]
		this.props.updateCollectionStatus(collection.id, collection.published ? `unpublish` : `publish`)
		this.fetchContent(collection)
	}

	createContent = () => {
		this.props.toggleModal({
			component: CreateContent,
			collectionId: this.props.collection.id
		})
	}

	archive = e => {
		e.preventDefault()
		const collection = this.props.collectionsCache.collections[this.props.collectionId]
		this.props.updateCollectionStatus(collection.id, `archive`)
		this.fetchContent(collection)
	}

	setTab = isContent => {
		this.setState({ isContent })
	}

	render() {

		const { isContent } = this.state

		const { collections } = this.props.collectionsCache
		const collection = collections[this.props.collectionId]

		if (collection === undefined) return null
		return (
			<Container>
				<header>
					<div>
						<h6>{collection.name}</h6>
					</div>
					<div>
						<PublishButton published={collection.published} onClick={this.togglePublish}>{collection.published ? `Unpublish` : `Publish`}</PublishButton>
						<ArchiveButton onClick={this.archive}>Archive</ArchiveButton>
					</div>
				</header>
				<TabHeader>
					<button onClick={() => this.setTab(true)}>Content</button>
					<button onClick={() => this.setTab(false)}>Permissions</button>
					<Selector isContent={isContent} />
				</TabHeader>
				<Tab>
					{
						isContent ?
							collection.content.map((item, index) => {
								return <Overview key={index} collectionId={collection.id} contentId={item.id} />
							})
							:
							<Permissions collection={collection} />
					}
					{isContent &&
						<NewContent onClick={this.createContent}><Icon src={plus} /></NewContent>
					}
				</Tab>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	collectionsCache: state.collectionsCache
})

const mapDispatchToProps = {
	getContent,
	toggleModal,
	updateCollectionStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
