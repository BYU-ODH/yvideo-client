import React from 'react'

import { connect } from 'react-redux'

import { Controller, VideoControls, TrackEditor } from 'components'

const TrackEditorContainer = () => {

	const viewstate = {
		url: `https://www.youtube.com/watch?v=Enz9qD4bQYo`,
	}

	return <Controller videocontrols={VideoControls} trackEditor={TrackEditor} viewstate={viewstate} />
}

const mapStoreToProps = store => ({

})

const mapThunksToProps = {

}

export default connect(mapStoreToProps, mapThunksToProps)(TrackEditorContainer)
