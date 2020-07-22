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

	const [url, setUrl] = useState('')
	const [eventsArray, setEventsArray] = useState([])
	const [currentContent, setCurrentContent] = useState({})

	//console.log(content)

	useEffect(() => {
		//console.log('use effecct')
		if(!content.hasOwnProperty(id)){
			getContent([id])
		}

		if(content[id] !== undefined){
			//console.log(content[id].settings.annotationDocument)
			setCurrentContent(content[id])
			setEventsArray(content[id].settings.annotationDocument)
			setEvents(content[id].settings.annotationDocument)
			setUrl(content[id].url)
		}

	}, [content, resource, eventsArray, currentContent])

	//console.log(eventsArray)

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
