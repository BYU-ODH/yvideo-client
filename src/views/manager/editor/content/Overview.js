import React, { useState, useEffect } from 'react'

import ContentSettings from './contentSettings/ContentSettings'

import { connect } from 'react-redux'

import { Container, Preview, Thumbnail, EditButton, Icon } from './styles'

const Overview = props => {

	const { data } = props

	const [loaded, setLoaded] = useState(false)
	const [editing, setEditing] = useState(false)

	const [settings] = useState({
		showWordList: `false`,
		aspectRatio: `undefined`,
		allowDefinitions: `false`,
		showAnnotations: `false`,
		showCaptions:`false`,
		showTranscripts:`false`
	})

	const temp = new Image()
	temp.src = data.thumbnail
	temp.onload = () => {
		setLoaded(true)
	}

	useEffect(() => {

		setEditing(false)

		// setSettings(data.settings)

	})

	const handleEdit = async e => {
		e.preventDefault()
		setEditing(!editing)
	}

	return (
		<Container>
			<Preview>
				<div>
					<Thumbnail src={data.thumbnail} loaded={loaded} />
				</div>
				<div>
					<h4>{data.name}</h4>
					<ul>
						<Icon className='translation' checked={settings.allowDefinitions === `true`} />
						<Icon className='captions' checked={settings.showCaptions === `true`} />
						<Icon className='annotations' checked={settings.showAnnotations === `true`} />
					</ul>
					<em>{data.published ? `Published` : `Unpublished`}</em>
				</div>
				<div>
					<EditButton onClick={handleEdit}>{editing ? `Save` : `Edit`}</EditButton>
				</div>
			</Preview>
			<ContentSettings active={editing} data={settings} />
		</Container>
	)
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
