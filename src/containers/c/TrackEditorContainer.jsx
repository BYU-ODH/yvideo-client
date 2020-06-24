import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { connect } from 'react-redux'

import { interfaceService, resourceService, contentService } from 'services'

import { TrackEditor } from 'components'

// import { interfaceService } from 'services'

const TrackEditorContainer = props => {

	const {
		content,
		resource,
		setEvents,
		getResource,
		getContent,
	} = props

	const {id} = useParams()

	const [resourceId, setResourceId] = useState(0)
	let url = ''

	useEffect(() => {
		console.log('use effecct')
		if(!content.hasOwnProperty(id)){
			getContent([id])
		}

		if(content[id] !== undefined){
			setResourceId(content[id].resourceId)
			getResource(content[id].resourceId)
		}

	}, [content, resource])


	if(resource[resourceId] != undefined){
		//console.log(resource[resourceId].content.files[0].streamUri)
		url = resource[resourceId].content.files[0].streamUri
	}

	const viewstate = {
		url,
	}

	return <TrackEditor viewstate={viewstate} setEvents={setEvents}/>
}

const mapStoreToProps = ({ contentStore, resourceStore }) => ({
	resource: resourceStore.cache,
	content: contentStore.cache,
})

const mapThunksToProps = {
	setEvents: interfaceService.setEvents,
	getResource: resourceService.getResources,
	getContent: contentService.getContent,
}

export default connect(mapStoreToProps, mapThunksToProps)(TrackEditorContainer)
