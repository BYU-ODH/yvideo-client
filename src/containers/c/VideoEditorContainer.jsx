import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { connect } from 'react-redux'

import { interfaceService, resourceService, contentService, subtitlesService } from 'services'

import { VideoEditor } from 'components'

import { Tooltip } from 'components/bits'

import DialogBox from 'components/modals/components/DialogBox'

import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

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
		// TODO: This is related to the other TODO in this file around line 90
		// resource,
	} = props

	const {id} = useParams()

	const [url, setUrl] = useState(``)

	const [eventsArray, setEventsArray] = useState([])
	const [content, setContent] = useState({})
	const [sKey, setKey] = useState(``)
	const [isStreamKeyLoaded, setIsStreamKeyLoaded] = useState(false)
	const [aspectRatio, setAspectRatio] = useState([16, 9])
	useEffect(() => {
		if (!contentCache.hasOwnProperty(id)) // eslint-disable-line no-prototype-builtins
			getContent(id)

		if(contentCache[id]) {
			setContent(contentCache[id])
			setEventsArray(contentCache[id].settings.annotationDocument)
			setEvents(contentCache[id].settings.annotationDocument)
			setBreadcrumbs({path: [`Home`, `Manage Collections`, `Video Editor (${contentCache[id].name})`], collectionId: contentCache[id].collectionId, contentId: contentCache[id].id})

			if(contentCache[id].url !== ``){
				setUrl(contentCache[id].url)
				if(contentCache[id].url.includes(`youtube`)){
					async () => { // eslint-disable-line no-unused-expressions
						const rawData = await fetch(`https://www.youtube.com/oembed?url=${contentCache[id].url}&format=JSON`, {method: `GET`})
						const data = await rawData.json()
						if(data.hasOwnProperty(`width`) && data.hasOwnProperty(`height`)) // eslint-disable-line no-prototype-builtins
							setAspectRatio([data.width, data.height])

						return data
					}
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
					Promise.resolve(getFiles(resourceIdStream)).then((value) => {
						if (value){
							const file = value.find(element => element[`file-version`].includes(contentCache[id].settings.targetLanguage) !== false)
							if (file?.[`aspect-ratio`])
								setAspectRatio(file[`aspect-ratio`].split(`,`))
						}
					})
				}
				// TODO: figure out what this was for
				// if(resource[resourceIdStream]){
				// 	if(resource[resourceIdStream][`files`]){
				// 		const file = resource[resourceIdStream][`files`].find(element => element[`file-version`].includes(contentCache[id].settings.targetLanguage) !== false)
				// 	}
				// }
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contentCache, getContent, streamKey, content, sKey, eventsArray])

	const handleShowHelp = () => {
		toggleModal({
			component: HelpDocumentation,
			props: { name: `Video Editor` },
		})
	}

	const handleShowTip = (tipName, position, secValue) => {
		toggleTip({
			component: Tooltip,
			props: {
				name: tipName,
				position,
				secValue,
			},
		})
	}

	const handleNavigation = (confirmNavigation, cancelNavigation) => {
		toggleModal({
			component: DialogBox,
			props: {
				confirmNavigation,
				cancelNavigation,
				toggleModal,
			},
		})

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
		handleNavigation,
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
