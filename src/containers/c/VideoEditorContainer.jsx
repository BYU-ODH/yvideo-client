import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { connect } from 'react-redux'

import { interfaceService, resourceService, contentService, subtitlesService } from 'services'

import { VideoEditor } from 'components'

import { Tooltip } from 'components/bits'

import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

const VideoEditorContainer = props => {

	const {
		contentCache,
		resource,
		setEvents,
		getContent,
		updateContent,
		activeUpdate,
		getStreamKey,
		streamKey,
		resourceIdStream,
		toggleModal,
		toggleTip,
		contentError,
		setBreadcrumbs,
	} = props

	const {id} = useParams()

	const [url, setUrl] = useState(``)

	const [eventsArray, setEventsArray] = useState([])
	const [timelineMinimized, setTimelineMinimized] = useState(false)

	const [videoLength, setVideoLength] = useState(0)
	const [displayLayer, setDisplayLayer] = useState(0)
	const [eventToEdit, setEventToEdit] = useState(10000)
	const [activeCensorPosition, setActiveCensorPosition] = useState(-1)
	const [allEvents, setAllEvents] = useState(eventsArray)

	const [content, setContent] = useState({})
	const [sKey, setKey] = useState(``)

	const controllerRef = useRef(null)

	useEffect(() => {

		if (!contentCache.hasOwnProperty(id))
			getContent(id)
		else {
			setContent(contentCache[id])
			setEventsArray(contentCache[id].settings.annotationDocument)
			setEvents(contentCache[id].settings.annotationDocument)
			setBreadcrumbs({path:[`Home`, `Manage Collections`, `Video Editor`], collectionId: contentCache[id].collectionId, contentId: contentCache[id].id})

			if(contentCache[id].url !== ``)
				setUrl(contentCache[id].url)
			else {
				setKey(``)
				setUrl(``)
				if(content !== undefined){
					if(sKey === `` && contentCache[id].resourceId !== resourceIdStream)
						getStreamKey(contentCache[id].resourceId, contentCache[id].settings.targetLanguages)
					else if(streamKey)
						setKey(streamKey)

					if (sKey !== ``)
						setUrl(`${process.env.REACT_APP_YVIDEO_SERVER}/api/partial-media/stream-media/${sKey}`)

				}
			}
		}
	}, [contentCache, getContent, streamKey, content, sKey, eventsArray]) // content, resource, eventsArray, currentContent, streamKey, url, isContentChanged])

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
		content,
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
	contentCache: contentStore.cache,
	streamKey: resourceStore.streamKey,
	resourceIdStream: resourceStore.resourceIdStreamKey,
	contentError: contentStore.errorMessage,
	isContentChanged: contentStore.isContentChanged,
})

const mapThunksToProps = {
	setEvents: interfaceService.setEvents,
	getResource: resourceService.getResources,
	getContent: contentService.getContent,
	selectedContent: contentService.selectedContent,
	getStreamKey: resourceService.getStreamKey, // file media
	updateContent: contentService.updateContent,
	activeUpdate: subtitlesService.activeUpdate,
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
	setBreadcrumbs: interfaceService.setBreadcrumbs,
}

export default connect(mapStoreToProps, mapThunksToProps)(VideoEditorContainer)
