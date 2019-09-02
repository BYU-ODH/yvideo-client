import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getResources, updateContent } from 'redux/actions'

import LazyImage from 'components/lazyImage/LazyImage'

import ContentSettings from './contentSettings/ContentSettings'

import {
	Container,
	Preview,
	EditButton,
	Icon,
	TitleEdit,
	PublishButton
} from './styles'

class Overview extends Component {
	constructor(props) {
		super(props)

		this.state = {
			editing: false,
			content: {
				authKey: ``,
				collectionId: -1,
				contentType: ``,
				dateValidated: ``,
				description: ``,
				expired: false,
				fullVideo: false,
				id: null,
				isCopyrighted: false,
				name: ``,
				physicalCopyExists: false,
				published: false,
				requester: ``,
				resourceId: ``,
				thumbnail: ``,
				views: 0,
				resource: {
					keywords: []
				},
				settings: {
					allowDefinitions: false,
					annotationDocument: [],
					aspectRatio: `1.77`,
					captionTrack: [],
					description: ``,
					showAnnotations: false,
					showCaptions: false,
					showTranscripts: false,
					showWordList: false,
					targetLanguages: []
				}
			}
		}
	}

	componentDidMount = () => {
		const { content } = this.props

		this.setState({
			content
		})
	}

	shouldComponentUpdate = nextProps => {
		const contentPropChanged = this.props.content !== nextProps.content
		const contentStateChanged = this.props.content !== this.state.content

		const update = contentPropChanged || contentStateChanged

		return update
	}

	componentDidUpdate = prevProps => {
		const contentPropChanged = this.props.content !== prevProps.content
		// const contentStateChanged = this.props.content !== this.state.content
		// const contentDefined = this.props.content !== undefined

		const update =
			contentPropChanged
		// || contentStateChanged
		// || contentDefined

		const { content, resourceCache } = this.props
		if (update) {
			this.setState({
				content: {
					...content,
					resource: resourceCache.resources[content.resourceId]
				},
				editing: false
			})
		}
	}

	handlers = {
		handleEdit: e => {
			e.preventDefault()

			const { content, editing } = this.state

			if (editing) this.props.updateContent(content)
			else {
				this.props.getResources(content.resourceId, resource => {

					const { keywords } = resource

					const keywordsArr = keywords === `` ? [] : keywords.split(/[ ,]+/)

					this.setState({
						content: {
							...content,
							description: resource.description,
							resource: {
								...resource,
								keywords: keywordsArr
							}
						}
					})
				})
			}

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

		console.log(content.name)

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
						<LazyImage src={content.thumbnail} />
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
				{isFetching || <ContentSettings handlers={this.handlers} content={this.state.content} editing={editing} />}
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	resourceCache: state.resourceCache
})

const mapDispatchToProps = {
	getResources,
	updateContent
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
