import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { connect } from 'react-redux'

import { interfaceService, resourceService, contentService, subtitlesService } from 'services'

import { ClipEditor } from 'components'

import { Tooltip } from 'components/bits'

import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

const ClipEditorContainer = props => {

	const {
		content,
		resource,
		setEvents,
		getResource,
		getContent,
		updateContent,
		allSubs,
		getSubtitles,
		updateSubtitle,
		createSubtitle,
		setSubtitles,
		activeUpdate,
		deleteSubtitle,
		subContentId,
		getStreamKey,
		streamKey,
		toggleModal,
		toggleTip,
		setSubContentId,
		setBreadcrumbs,
	} = props

	const {id} = useParams()

	const [url, setUrl] = useState(``)
	const [eventsArray, setEventsArray] = useState([])
	const [currentContent, setCurrentContent] = useState({})
	const [subs,setSubs] = useState([])

	const [sKey, setKey] = useState(``)
	const [isStreamKeyLoaded, setIsStreamKeyLoaded] = useState(false)

	useEffect(() => {

		if (!content.hasOwnProperty(id))
			getContent(id)

		if(content[id]) {
			setCurrentContent(content[id])
			setEventsArray(content[id].settings.annotationDocument)
			setEvents(content[id].settings.annotationDocument)
			setBreadcrumbs({path:[`Home`, `Manage Collections`, `Clip Manager`], collectionId: content[id].collectionId, contentId: content[id].id})

			if(content[id].url !== ``)
				setUrl(content[id].url)
			else {
				setKey(``)
				setUrl(``)

				if(content[id].resourceId && !isStreamKeyLoaded){
					getStreamKey(content[id].resourceId, content[id].settings.targetLanguage)
					setIsStreamKeyLoaded(true)
				}

				if(streamKey)
					setKey(streamKey)

				if (sKey !== ``)
					setUrl(`${process.env.REACT_APP_YVIDEO_SERVER}/api/partial-media/stream-media/${sKey}`)

			}
		}
	}, [content, resource, eventsArray, currentContent, streamKey, url, sKey])

	const handleShowHelp = () => {
		toggleModal({
			component: HelpDocumentation,
			props: { name: `Clip Manager`},
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
		subs,
		allSubs,
	}

	const handlers = {
		toggleTip,
		handleShowTip,
	}

	return <ClipEditor
		viewstate={viewstate}
		updateContent={updateContent}
		activeUpdate={activeUpdate}
		handleShowHelp={handleShowHelp}
		handlers={handlers}/>
}

const mapStoreToProps = ({ contentStore, resourceStore, subtitlesStore }) => ({
	resource: resourceStore.cache,
	content: contentStore.cache,
	allSubs: subtitlesStore.cache,
	subContentId: subtitlesStore.contentId,
	streamKey: resourceStore.streamKey,
})

const mapThunksToProps = {
	setEvents: interfaceService.setEvents,
	getResource: resourceService.getResources,
	getContent: contentService.getContent,
	getStreamKey: resourceService.getStreamKey,
	updateContent: contentService.updateContent,
	getSubtitles: subtitlesService.getSubtitles,
	setSubtitles: subtitlesService.setSubtitles,
	deleteSubtitle: subtitlesService.deleteSubtitle,
	updateSubtitle: subtitlesService.updateSubtitle,
	createSubtitle: subtitlesService.createSubtitle,
	activeUpdate: subtitlesService.activeUpdate,
	setSubContentId: subtitlesService.setContentId,
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
	setBreadcrumbs: interfaceService.setBreadcrumbs,
}

export default connect(mapStoreToProps, mapThunksToProps)(ClipEditorContainer)
