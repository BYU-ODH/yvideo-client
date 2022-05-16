import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { connect } from 'react-redux'

import { interfaceService, resourceService, contentService, subtitlesService } from 'services'

import { VideoEditor } from 'components'

import { Tooltip } from 'components/bits'

import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'
// import { resource } from 'src/__tests__/testutil/testutil'

const VideoEditorContainer = props => {

	const {
		contentCache,
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
		getFiles,
		resource,
		// resourcetest,
	} = props

	const {id} = useParams()

	const [url, setUrl] = useState(``)

	const [eventsArray, setEventsArray] = useState([])
	const [timelineMinimized, setTimelineMinimized] = useState(false)
	// eslint-disable-next-line no-unused-vars
	const [videoLength, setVideoLength] = useState(0)
	// eslint-disable-next-line no-unused-vars
	const [activeCensorPosition, setActiveCensorPosition] = useState(-1)

	const [content, setContent] = useState({})
	const [sKey, setKey] = useState(``)
	const [isStreamKeyLoaded, setIsStreamKeyLoaded] = useState(false)
	const [aspectRatio,setAspectRatio] = useState([16,9])
	useEffect(() => {
		if (!contentCache.hasOwnProperty(id)) // eslint-disable-line no-prototype-builtins
			getContent(id)

		if(contentCache[id]) {
			setContent(contentCache[id])
			setEventsArray(contentCache[id].settings.annotationDocument)
			setEvents(contentCache[id].settings.annotationDocument)
			setBreadcrumbs({path:[`Home`, `Manage Collections`, `Video Editor`], collectionId: contentCache[id].collectionId, contentId: contentCache[id].id})

			if(contentCache[id].url !== ``){
				setUrl(contentCache[id].url)
				if(contentCache[id].url.includes(`youtube`)){
					const fetchData = async() => {
						const rawData = await fetch(`https://www.youtube.com/oembed?url=${contentCache[id].url}&format=JSON`,{method:`GET`})
						const data = await rawData.json()
						if(data.hasOwnProperty(`width`) && data.hasOwnProperty(`height`)) // eslint-disable-line no-prototype-builtins
							setAspectRatio([data.width,data.height])

						return data
					}
					const d =fetchData() // eslint-disable-line no-unused-vars
				}
			} else {
				setKey(``)
				setUrl(``)

				if(contentCache[id].resourceId && !isStreamKeyLoaded){
					getStreamKey(contentCache[id].resourceId, contentCache[id].settings.targetLanguage)
					setIsStreamKeyLoaded(true)
				}
				if(streamKey)
					setKey(streamKey)

				if (sKey !== ``)
					setUrl(`${process.env.REACT_APP_YVIDEO_SERVER}/api/partial-media/stream-media/${sKey}`)
				if (resourceIdStream !== ``){
					// eslint-disable-next-line no-unused-vars
					const files = Promise.resolve(getFiles(resourceIdStream)).then((value)=>{
						if (value){
							const file = value.find(element => element[`file-version`].includes(contentCache[id].settings.targetLanguage) !== false)
							if (file[`aspect-ratio`])
								setAspectRatio(file[`aspect-ratio`].split(`,`))
						}
					})
				}
				if(resource[resourceIdStream]){
					if(resource[resourceIdStream][`files`]){
						// eslint-disable-next-line no-unused-vars
						const file = resource[resourceIdStream][`files`].find(element => element[`file-version`].includes(contentCache[id].settings.targetLanguage) !== false)
					}
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contentCache, getContent, streamKey, content, sKey, eventsArray])
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
		eventsArray,
		content,
		contentError,
		url,
		aspectRatio,
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
		handlers={handlers}
	/>
}

const mapStoreToProps = ({ contentStore, resourceStore }) => ({
	resource: resourceStore.cache,
	contentCache: contentStore.cache,
	streamKey: resourceStore.streamKey,
	resourceIdStream: resourceStore.resourceIdStreamKey,
	contentError: contentStore.errorMessage,
	resourcetest: resourceStore,
})

const mapThunksToProps = {
	setEvents: interfaceService.setEvents,
	getResource: resourceService.getResources,
	getContent: contentService.getContent,
	getStreamKey: resourceService.getStreamKey, // file media
	getFiles: resourceService.getFiles,
	updateContent: contentService.updateContent,
	activeUpdate: subtitlesService.activeUpdate,
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
	setBreadcrumbs: interfaceService.setBreadcrumbs,
}

export default connect(mapStoreToProps, mapThunksToProps)(VideoEditorContainer)
