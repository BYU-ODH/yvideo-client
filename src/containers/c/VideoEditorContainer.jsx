import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { connect } from 'react-redux'

import { interfaceService, resourceService, contentService, subtitlesService } from 'services'

import { VideoEditor } from 'components'

import { Tooltip } from 'components/bits'

import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

const VideoEditorContainer = props => {

	const {
		content,
		resource,
		setEvents,
		getContent,
		updateContent,
		activeUpdate,
		getStreamKey,
		streamKey,
		toggleModal,
		toggleTip,
		contentError,
		setBreadcrumbs,
	} = props

	const {id} = useParams() // content id

	const [url, setUrl] = useState(``)
	const [eventsArray, setEventsArray] = useState([])
	const [currentContent, setCurrentContent] = useState({})

	useEffect(() => {

		if(!content.hasOwnProperty(id))
			getContent(id)

		if(content[id] !== undefined){
			setCurrentContent(content[id])
			setEventsArray(content[id].settings.annotationDocument)
			setEvents(content[id].settings.annotationDocument)
			setBreadcrumbs({path:[`Home`, `Manage Collections`, `Video Editor`], collectionId: content[id].collectionId, contentId: content[id].id})
			// we only want to set the url if it is not set.
			if(url === ``){
				if(content[id].url !== ``)
					setUrl(content[id].url)
				else {
					// CHECK RESOURCE ID
					if(content[id].resourceId !== `00000000-0000-0000-0000-000000000000` && streamKey === ``){
						// VALID RESOURCE ID SO WE KEEP GOING TO FIND STREAMING URL
						getStreamKey(content[id].resourceId, content[id].settings.targetLanguages)
					} else if (streamKey !== `` && url === ``)
						setUrl(`${process.env.REACT_APP_YVIDEO_SERVER}/api/media/stream-media/${streamKey}`)
				}
			}
		}
	}, [content, resource, eventsArray, currentContent, streamKey, url])

	const handleShowHelp = () => {
		toggleModal({
			component: HelpDocumentation,
			props: { name: `Video Editor`},
		})
	}

	const handleShowTip = (tipName, position) => {
		toggleTip({
			component: Tooltip,
			props: {
				name: tipName,
				position,
			},
		})
	}

	const viewstate = {
		currentContent,
		url,
		eventsArray,
		contentError,
	}

	const handlers = {
		toggleTip,
		handleShowTip,
		handleShowHelp,
	}

	return <VideoEditor
		viewstate={viewstate}
		setEvents={setEvents}
		updateContent={updateContent}
		activeUpdate={activeUpdate}
		handleShowHelp={handleShowHelp}
		handlers={handlers}/>
}

const mapStoreToProps = ({ contentStore, resourceStore, subtitlesStore }) => ({
	resource: resourceStore.cache,
	content: contentStore.cache,
	streamKey: resourceStore.streamKey,
	contentError: contentStore.errorMessage,
})

const mapThunksToProps = {
	setEvents: interfaceService.setEvents,
	getResource: resourceService.getResources,
	getContent: contentService.getContent,
	getStreamKey: resourceService.getStreamKey,
	updateContent: contentService.updateContent,
	activeUpdate: subtitlesService.activeUpdate,
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
	setBreadcrumbs: interfaceService.setBreadcrumbs,
}

export default connect(mapStoreToProps, mapThunksToProps)(VideoEditorContainer)
