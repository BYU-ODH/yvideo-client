import React, { useState, useEffect } from 'react'

import ContentSettings from './contentSettings/ContentSettings'

import { connect } from 'react-redux'
import { getCollection, getResource } from 'redux/actions'

import { Container, Preview, Thumbnail, EditButton, Icon } from './styles'

const Overview = props => {

	const [loaded, setLoaded] = useState(false)
	const [editing, setEdit] = useState(false)
	const [content, setContent] = useState(null)

	const { video, cache } = props
	const { id, thumbnail, name } = video

	useEffect(() => {

		setEdit(false)
		setContent(cache.contentCache[video.id] ? cache.contentCache[video.id] : null)

		const temp = new Image()
		temp.src = video.thumbnail
		temp.onload = () => {
			setLoaded(true)
		}
	}, [cache.contentCache, video])

	const handleEdit = async e => {
		if (content === null) {
			await props.getCollection(id, result => {
				setContent(result)
				cache.setContentCache({
					...cache.contentCache,
					[id]: result
				})
				console.log(`content`, result)
			})
		}
		setEdit(!editing)
	}

	return (
		<Container>
			<Preview>
				<div>
					<Thumbnail src={thumbnail} loaded={loaded} />
				</div>
				<div>
					<h4>{name}</h4>
					<ul>
						<Icon className='translation' checked={true} />
						<Icon className='captions' checked={true} />
						<Icon className='annotations' checked={true} />
					</ul>
					<em>{video.published ? `Published` : `Unpublished`}</em>
				</div>
				<div>
					<EditButton onClick={handleEdit}>{editing ? `Save` : `Edit`}</EditButton>
				</div>
			</Preview>
			<ContentSettings active={editing} data={{}} />
		</Container>
	)
}

const mapStateToProps = state => ({
	collection: state.collection,
	resource: state.resource
})

const mapDispatchToProps = {
	getCollection,
	getResource
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
