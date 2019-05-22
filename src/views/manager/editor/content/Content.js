import React, { useState, useEffect } from 'react'

import ContentSettings from './contentSettings/ContentSettings'

import { Container, Preview, Thumbnail, EditButton, Icon } from './styles'

const Overview = props => {

	const { video } = props

	const [loaded, setLoaded] = useState(false)
	const [editing, setEdit] = useState(false)

	const { thumbnail, name, translation, captions, annotations } = video

	useEffect(() => {
		const temp = new Image()
		temp.src = video.thumbnail
		temp.onload = () => {
			setLoaded(true)
		}
	})

	const handleEdit = e => {
		e.preventDefault()
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
						<Icon className='translation' checked={translation} />
						<Icon className='captions' checked={captions} />
						<Icon className='annotations' checked={annotations} />
					</ul>
					<em>{video.published ? `Published` : `Unpublished`}</em>
				</div>
				<div>
					<EditButton onClick={handleEdit}>Edit</EditButton>
				</div>
			</Preview>
			<ContentSettings active={editing} />
		</Container>
	)
}

export default Overview
