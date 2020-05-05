import React, { useEffect } from 'react'

import { connect } from 'react-redux'

import { Controller, VideoControls, TrackEditor } from 'components'

import { interfaceService } from 'services'

const TrackEditorContainer = props => {

	const {
		setEditorStyle,
	} = props

	const viewstate = {
		url: `https://www.youtube.com/watch?v=Enz9qD4bQYo`,
	}

	useEffect(() => {
		setEditorStyle(true)
		return () => {
			setEditorStyle(false)
		}
	}, [setEditorStyle])

	return <Controller videocontrols={VideoControls} trackeditor={TrackEditor} viewstate={viewstate} />
}

const mapStoreToProps = () => ({

})

const mapThunksToProps = {
	setEditorStyle: interfaceService.setEditorStyle,
}

export default connect(mapStoreToProps, mapThunksToProps)(TrackEditorContainer)
