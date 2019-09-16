import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getResources, updateContent } from 'redux/actions'

import ContentSettings from './contentSettings/ContentSettings'
import Content from 'models/Content'

import {
	Container,
	Preview,
	EditButton,
	Icon,
	TitleEdit,
	PublishButton,
	Thumbnail
} from './styles'

class Overview extends Component {

	state = {
		editing: false,
		content: new Content()
	}

	componentDidMount = () => {
		this.setState({
			content: this.props.content,
			editing: false
		})
	}

	componentDidUpdate = prevProps => {

		const { content, contentCache, resourceCache } = this.props

		const idChanged = content !== prevProps.content
		const contentCacheChanged = contentCache !== prevProps.contentCache
		const resourceCacheChanged = resourceCache !== prevProps.resourceCache

		const changed = idChanged || contentCacheChanged || resourceCacheChanged

		if (changed) {

			const newContent = content
			let newEditing = false

			if (resourceCacheChanged) {
				const newResource = resourceCache.resources[newContent.resourceId]
				if (newResource !== undefined) {
					newContent.description = newResource.description
					newContent.resource = newResource
					newEditing = true
				}
			}

			this.setState({
				content: newContent,
				editing: newEditing
			})
		}
	}

	handlers = {
		handleEdit: e => {
			e.preventDefault()

			const { content, editing } = this.state

			if (editing) this.props.updateContent(content)

			else this.props.getResources(this.props.content.resourceId)

			this.setState({
				editing: !editing
			})

		},
		handleNameChange: e => {
			this.setState({
				content: {
					...this.state.content,
					name: e.target.value,
					resource: {
						...this.state.content.resource,
						title: e.target.value
					}
				}
			})
		},
		handleToggle: e => {
			const { key } = e.target.dataset
			this.setState({
				content: {
					...this.state.content,
					settings: {
						...this.state.content.settings,
						[key]: !this.state.content.settings[key]
					}
				}
			})
		},
		handleDescription: e => {
			const { content } = this.state
			this.setState({
				content: {
					...content,
					description: e.target.value,
					resource: {
						...content.resource,
						description: e.target.value
					},
					settings: {
						...content.settings,
						description: e.target.value
					}
				}
			})
		},
		handleRatio: e => {
			const { content } = this.state
			const { settings } = content

			this.setState({
				content: {
					...content,
					settings: {
						...settings,
						aspectRatio: e.target.value
					}
				}
			})
		},
		addTag: newTags => {
			const { keywords } = this.state.content.resource
			const tags = [...newTags, ...keywords]
			this.setState({
				content: {
					...this.state.content,
					resource: {
						...this.state.content.resource,
						keywords: tags
					}
				}
			})
		},
		removeTag: e => {
			e.preventDefault()
			this.setState({
				content: {
					...this.state.content,
					resource: {
						...this.state.content.resource,
						keywords: this.state.content.resource.keywords.filter(item => item !== e.target.dataset.value)
					}
				}
			})
		},
		togglePublish: e => {
			e.preventDefault()
			this.setState({
				content: {
					...this.state.content,
					published: !this.state.content.published
				}
			})
		}
	}

	render() {

		const { editing, content } = this.state

		if (content === undefined) return null

		const { handleNameChange, handleEdit, togglePublish } = this.handlers

		const {
			allowDefinitions,
			showCaptions,
			showAnnotations
		} = content.settings

		const { isFetching } = this.props.resourceCache

		return (
			<Container>
				<Preview>
					<div>
						<Thumbnail src={content.thumbnail} />
					</div>
					<div>
						{editing ?
							<TitleEdit type='text' value={content.name} onChange={handleNameChange} />
							:
							<h4>{content.name}</h4>}
						<ul>
							<Icon className='translation' checked={allowDefinitions} />
							<Icon className='captions' checked={showCaptions} />
							<Icon className='annotations' checked={showAnnotations} />
						</ul>
						{
							editing ?
								<PublishButton published={content.published} onClick={togglePublish}>{content.published ? `Unpublish` : `Publish`}</PublishButton>
								:
								<em>{content.published ? `Published` : `Unpublished`}</em>
						}
					</div>
					<div>
						<EditButton onClick={handleEdit}>{editing ? `Save` : `Edit`}</EditButton>
					</div>
				</Preview>
				{
					editing ?
						isFetching || <ContentSettings handlers={this.handlers} content={this.state.content} editing={editing} />
						: null
				}
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	resourceCache: state.resourceCache,
	contentCache: state.contentCache
})

const mapDispatchToProps = {
	getResources,
	updateContent
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
