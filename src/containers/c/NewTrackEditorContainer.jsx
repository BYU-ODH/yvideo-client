import React, { useEffect } from 'react'

import { connect } from 'react-redux'

import { Controller, VideoControls, TrackEditor } from 'components'

import { interfaceService } from 'services'

const TrackEditorContainer = props => {

	const {
		setHeaderBorder,
	} = props

	const viewstate = {
		url: `https://www.youtube.com/watch?v=Enz9qD4bQYo`,
	}

	useEffect(() => {
		setHeaderBorder(true)
		return () => {
			setHeaderBorder(false)
		}
	}, [setHeaderBorder])

	return <Controller videocontrols={VideoControls} trackeditor={TrackEditor} viewstate={viewstate} />
}

const mapStoreToProps = () => ({

})

const mapThunksToProps = {
	setHeaderBorder: interfaceService.setHeaderBorder,
}

export default connect(mapStoreToProps, mapThunksToProps)(TrackEditorContainer)
