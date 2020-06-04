import React, {  } from 'react'

import { connect } from 'react-redux'

import { interfaceService } from 'services'

import { TrackEditor } from 'components'

// import { interfaceService } from 'services'

const TrackEditorContainer = props => {

	const {
		setEvents,
	} = props

	const viewstate = {
		url: `https://www.youtube.com/watch?v=Enz9qD4bQYo`,
	}

	return <TrackEditor viewstate={viewstate} setEvents={setEvents}/>
}

const mapStoreToProps = () => ({

})

const mapThunksToProps = {
	setEvents: interfaceService.setEvents,
}

export default connect(mapStoreToProps, mapThunksToProps)(TrackEditorContainer)
