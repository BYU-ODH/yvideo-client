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

	const updateEvents = (index, event, layerIndex) => {
		let canAccessDom = false
		if(showSideEditor && eventListMinimized === false){
			canAccessDom = true
			document.getElementById(`sideTabMessage`).style.color=`red`
		}

		const currentEvents = [...allEvents]

		// check start event times
		if(event.start < 0){
			event.start = 0
			if(canAccessDom)
				document.getElementById(`sideTabExplanation`).innerText=`Changed start time to 0`

		} else if(event.start >= 100) {
			event.start = 95
			event.end = 100
			if(canAccessDom)
				document.getElementById(`sideTabExplanation`).innerHTML=`Start time cannot be larger than ${videoLength} <br/> Changed values to match criteria`

		} else if(event.start > event.end){
			if(canAccessDom)
				document.getElementById(`sideTabExplanation`).innerHTML=`Start time cannot be larger than end time <br/> Change values to match criteria`
		}

		// check end event times
		if(event.end <= event.start){
			if(canAccessDom){
				document.getElementsByClassName(`sideTabInput`)[1].value=event.end
				document.getElementById(`sideTabMessage`).innerHTML=`Please, enter a number bigger than star time`
			}
		} else if(event.end > 100){
			// event.end = 100
			if(canAccessDom){
				document.getElementById(`sideTabMessage`).innerHTML=`Please, enter a number less than ${videoLength}`
				document.getElementById(`sideTabExplanation`).innerHTML=`End time cannot be larger than ${videoLength} <br/> Change value to ${videoLength} or less`
			}
		}

		if(event.start >= 0 && event.start < event.end && event.end <= 100){
			if(canAccessDom){
				document.getElementById(`sideTabMessage`).style.color=`green`
				document.getElementById(`sideTabMessage`).innerHTML=`Start and end times have been updated correctly`
				document.getElementById(`sideTabExplanation`).innerHTML=``
			}
		}

		currentEvents[index] = event

		setAllEvents(currentEvents)
		setEvents(currentEvents)
		setDisplayLayer(layerIndex)
		setEventToEdit(index)
		setSideEditor(true)
	}

	const handleLastClick = (height, width, x, y, time) => {

		if(eventToEdit < allEvents.length && allEvents[eventToEdit].type === `Censor`){
			// console.log('%c Added position', 'color: red; font-weight: bold; font-size: 1.2rem;')
			const index = eventToEdit
			const cEvent = allEvents[index]
			const layer = cEvent.layer

			if(cEvent.position[`${time.toFixed(1)}`] !== undefined)
				cEvent.position[`${time.toFixed(1)}`] = [x / width * 100, (y-86) / height * 100, cEvent.position[`${time.toFixed(1)}`][2], cEvent.position[`${time.toFixed(1)}`][3]]
			else
				cEvent.position[`${time.toFixed(1)}`] = [x / width * 100, (y-86) / height * 100, 30, 40]

			updateEvents(index, cEvent, layer)
		}
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
		handleLastClick,
		updateEvents,
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
