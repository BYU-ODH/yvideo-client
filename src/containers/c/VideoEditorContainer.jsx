import React, { useEffect, useState, useRef } from 'react'
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
		subContentId,
		getStreamKey,
		streamKey,
		toggleModal,
		toggleTip,
		contentError,
	} = props

	const {contentId} = useParams()

	const [url, setUrl] = useState(``)
	const [eventsArray, setEventsArray] = useState([])
	const [currentContent, setCurrentContent] = useState({})
	const [timelineMinimized, setTimelineMinimized] = useState(false)
	const [videoLength, setVideoLength] = useState(0)

	const controllerRef = useRef(null)

	useEffect(() => {

		if(!content.hasOwnProperty(contentId))
			getContent(contentId)

		if(content[contentId] !== undefined){
			setCurrentContent(content[contentId])
			setEventsArray(content[contentId].settings.annotationDocument)
			setEvents(content[contentId].settings.annotationDocument)
			// we only want to set the url if it is not set.
			if(url === ``){
				if(content[contentId].url !== ``)
					setUrl(content[contentId].url)
				else {
					// CHECK RESOURCE ID
					if(content[contentId].resourceId !== `00000000-0000-0000-0000-000000000000` && streamKey === ``){
						// VALID RESOURCE ID SO WE KEEP GOING TO FIND STREAMING URL
						getStreamKey(content[contentId].resourceId, content[contentId].settings.targetLanguages)
					} else if (streamKey !== `` && url === ``)
						setUrl(`${process.env.REACT_APP_YVIDEO_SERVER}/api/media/stream-media/${streamKey}`)
						// console.log('URL SHOULD BE ,', `${process.env.REACT_APP_YVIDEO_SERVER}/api/media/stream-media/${streamKey}` )
				}
			}
		}
	}, [content, resource, eventsArray, currentContent, streamKey, url, subContentId])

	const handleShowTip = (tipName, position) => {
		toggleTip({
			component: Tooltip,
			props: {
				name: tipName,
				position,
			},
		})
	}

	const handleShowHelp = () => {
		toggleModal({
			component: HelpDocumentation,
			props: { name: `Track Editor`},
		})
	}

	const togglendTimeline = () => {
		setTimelineMinimized(!timelineMinimized)
	}

	const getVideoDuration = (duration) => {
		setVideoLength(duration)
	}

	const viewstate = {
		currentContent,
		url,
		eventsArray,
		contentError,
		controllerRef,
		videoLength,
	}

	const handlers = {
		toggleTip,
		handleShowTip,
		handleShowHelp,
		togglendTimeline,
		getVideoDuration,
	}

	return <VideoEditor
		viewstate={viewstate}
		setEvents={setEvents}
		updateContent={updateContent}
		activeUpdate={activeUpdate}
		handlers={handlers}/>
}

const mapStoreToProps = ({ contentStore, resourceStore }) => ({
	resource: resourceStore.cache,
	content: contentStore.cache,
	streamKey: resourceStore.streamKey,
	contentError: contentStore.errorMessage,
})

const mapThunksToProps = {
	setEvents: interfaceService.setEvents,
	getResource: resourceService.getResources,
	getContent: contentService.getContent,
	getStreamKey: resourceService.getStreamKey, // file media
	updateContent: contentService.updateContent,
	activeUpdate: subtitlesService.activeUpdate,
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
}

export default connect(mapStoreToProps, mapThunksToProps)(VideoEditorContainer)
