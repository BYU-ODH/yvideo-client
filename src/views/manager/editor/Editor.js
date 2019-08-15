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
	constructor(props) {
		super(props)

		this.state = {
			isContent: true,
			collection: {
				id: null,
				content: []
			}
		}
	}

	componentDidMount = () => {
		this.setState({
			collection: this.props.collection
		})
		this.fetchContent()
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		const idChanged = this.props.collection.id !== nextProps.collection.id
		const contentChanged = this.props.collection.content !== nextProps.collection.content
		const cacheChanged = this.props.contentCache !== nextProps.contentCache
		const tabChanged = this.state.isContent !== nextState.isContent

		return idChanged || contentChanged || cacheChanged || tabChanged
	}

	componentDidUpdate = prevProps => {
		const idChanged = prevProps.collection.id !== this.props.collection.id
		const contentChanged = prevProps.collection.content !== this.props.collection.content

		if (idChanged || contentChanged) {
			this.fetchContent()
			this.setState({
				collection: this.props.collection
			})
		}
	}

	fetchContent = () => {
		const contentIds = this.props.collection.content.map(item => item.id)
		this.props.getContent(contentIds)
	}

	togglePublish = e => {
		const { updateCollectionStatus, collection } = this.props
		e.preventDefault()
		updateCollectionStatus(collection.id, collection.published ? `unpublish` : `publish`)
		this.fetchContent()
	}

	createContent = () => {
		this.props.toggleModal({
			component: CreateContent,
			collectionId: this.props.collection.id
		})
	}

	archive = e => {
		const { updateCollectionStatus, collection } = this.props
		e.preventDefault()
		updateCollectionStatus(collection.id, `archive`)
		this.fetchContent()
	}

	setTab = isContent => {
		console.log(this.state.isContent)
		console.log(isContent ? `content` : `permissions`)
		this.setState({ isContent })
	}

	render() {

		const { content, isFetching } = this.props.contentCache
		const { collection, isContent } = this.state

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
							!isFetching ?
								collection.content.map((item, index) => {
									return <Overview key={index} collectionId={collection.id} content={content[item.id]} />
								})
								: null
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

const mapStateToProps = ({ contentCache }) => ({ contentCache })

const mapDispatchToProps = {
	getContent,
	toggleModal,
	updateCollectionStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
