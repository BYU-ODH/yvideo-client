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
		updateContent,
	} = props

	const {id} = useParams()

	const [resourceId, setResourceId] = useState(0)
	const [eventsArray, setEventsArray] = useState([])
	const [currentContent, setCurrentContent] = useState({})

	let url = ''

	useEffect(() => {
		console.log('use effecct')
		if(!content.hasOwnProperty(id)){
			getContent([id])
		}

		if(content[id] !== undefined){
			setCurrentContent(content[id])
			setEventsArray(content[id].settings.annotationDocument)
			setResourceId(content[id].resourceId)
			getResource(content[id].resourceId)
		}

	}, [content, resource, eventsArray, currentContent])


	if(resource[resourceId] != undefined){
		//console.log(resource[resourceId].content.files[0].streamUri)
		url = resource[resourceId].content.files[0].streamUri
	}

	//console.log(currentContent)

	const viewstate = {
		currentContent,
		url,
		eventsArray,
	}

	return <TrackEditor viewstate={viewstate} setEvents={setEvents} updateContent={updateContent}/>
}

const mapStoreToProps = ({ contentStore, resourceStore }) => ({
	resource: resourceStore.cache,
	content: contentStore.cache,
})

const mapThunksToProps = {
	setEvents: interfaceService.setEvents,
	getResource: resourceService.getResources,
	getContent: contentService.getContent,
	updateContent: contentService.updateContent,
}

export default connect(mapStoreToProps, mapThunksToProps)(TrackEditorContainer)
