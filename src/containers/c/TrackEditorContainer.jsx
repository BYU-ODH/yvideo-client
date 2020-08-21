import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { connect } from 'react-redux'

import { interfaceService, resourceService, contentService } from 'services'

import { TrackEditor } from 'components'

import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

const TrackEditorContainer = props => {

	const {
		content,
		resource,
		setEvents,
		getResource,
		getContent,
		updateContent,
		getStreamKey,
		streamKey,
		toggleModal,
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
			if(content[id].url !== ''){
				setUrl(content[id].url)
			}
			else {
				//CHECK RESOURCE ID
				if(content[id].resourceId !== '00000000-0000-0000-0000-000000000000' && streamKey === ''){
					//VALID RESOURCE ID SO WE KEEP GOING TO FIND STREAMING URL
					getStreamKey(content[id].resourceId, content[id].settings.targetLanguages)
				}
				else if (streamKey !== '' && url === ''){
					setUrl(`${process.env.REACT_APP_YVIDEO_SERVER}/api/media/stream-media/${streamKey}`)
					//console.log('URL SHOULD BE ,', `${process.env.REACT_APP_YVIDEO_SERVER}/api/media/stream-media/${streamKey}` )
				}
			}
		}

	}, [content, resource, eventsArray, currentContent, streamKey])

	//console.log(eventsArray)

	const handleShowHelp = () => {
		toggleModal({
			component: HelpDocumentation,
			props: { name: 'Track Editor'},
		})
	}

	const viewstate = {
		currentContent,
		url,
		eventsArray,
	}

	return <TrackEditor viewstate={viewstate} setEvents={setEvents} updateContent={updateContent} handleShowHelp={handleShowHelp}/>
}

const mapStoreToProps = ({ contentStore, resourceStore }) => ({
	resource: resourceStore.cache,
	content: contentStore.cache,
	streamKey: resourceStore.streamKey,
})

const mapThunksToProps = {
	setEvents: interfaceService.setEvents,
	getResource: resourceService.getResources,
	getContent: contentService.getContent,
	getStreamKey: resourceService.getStreamKey,
	updateContent: contentService.updateContent,
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStoreToProps, mapThunksToProps)(TrackEditorContainer)
