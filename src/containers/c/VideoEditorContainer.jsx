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
		getStreamKey,
		streamKey,
		toggleModal,
		toggleTip,
		contentError,
	} = props

	const {id} = useParams()

	const [url, setUrl] = useState(``)

	const [eventsArray, setEventsArray] = useState([])
	const [currentContent, setCurrentContent] = useState({})
	const [timelineMinimized, setTimelineMinimized] = useState(false)
	const [showSideEditor, setSideEditor] = useState(false)
	const [eventListMinimized, setEventListMinimized] = useState(false)
	const [videoLength, setVideoLength] = useState(0)
	const [displayLayer, setDisplayLayer] = useState(0)
	const [eventToEdit, setEventToEdit] = useState(10000)
	const [activeCensorPosition, setActiveCensorPosition] = useState(-1)
	const [allEvents, setAllEvents] = useState(eventsArray)
	const [layers, setLayers] = useState([])

	const controllerRef = useRef(null)

	useEffect(() => {

		if(!content.hasOwnProperty(id))
			getContent(id)

		if(content[id] !== undefined){
			setCurrentContent(content[id])
			setEventsArray(content[id].settings.annotationDocument)
			setEvents(content[id].settings.annotationDocument)
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
						setUrl(`${process.env.REACT_APP_YVIDEO_SERVER}/api/partial-media/stream-media/${streamKey}`)
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
		timelineMinimized,
		displayLayer,
		allEvents,
		eventToEdit,
		activeCensorPosition,
	}

	const handlers = {
		toggleTip,
		handleShowTip,
		handleShowHelp,
		togglendTimeline,
		getVideoDuration,
		setActiveCensorPosition,
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
