import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { connect } from 'react-redux'

import { interfaceService, resourceService, contentService, subtitlesService } from 'services'

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
		subs,
		getSubtitles,
		updateSubtitle,
		createSubtitle,
		addSubtitles,
		contentGetSubtitles,
		subtitlesIds,
	} = props

	const {id} = useParams()

	const [url, setUrl] = useState(``)
	const [eventsArray, setEventsArray] = useState([])
	const [currentContent, setCurrentContent] = useState({})

	// console.log(content)

	useEffect(() => {
		// console.log('use effecct')
		if(!content.hasOwnProperty(id))
			getContent([id])

		if(content[id] !== undefined){
			// console.log(content[id].settings.annotationDocument)
			console.log(content)
			setCurrentContent(content[id])
			setEventsArray(content[id].settings.annotationDocument)
			setEvents(content[id].settings.annotationDocument)
			setUrl(content[id].url)
			contentGetSubtitles(content[id])
			getSubtitles(subtitlesIds)

		}

	}, [content, resource, eventsArray, currentContent])

	const createAndAddSub = (newSubs) =>{
		const subtitles = newSubs
		// for (let x = 0; x < newSubs.length; x++){
		// 	console.log(`testing Subtitles`,)
		// 	const deleteSub = newSubs.find(sub => sub[`id`] === subtitles[x][`id`] )
		// 	// DELETE sub function here
		// }
		for(let i = 0; i<subtitles.length;i++){
			if (subtitles[i][`id`] === ``){
				subtitles[i][`content-id`] = id
				const subId = createSubtitle(subtitles[i])
				console.log(`subid`,subId)
			}
		}
	}
	// console.log(eventsArray)
	console.log(subs)
	const viewstate = {
		currentContent,
		url,
		eventsArray,
		subs,
	}

	return <TrackEditor viewstate={viewstate} setEvents={setEvents} updateContent={updateContent} createSub={createAndAddSub}/>
}

const mapStoreToProps = ({ contentStore, resourceStore, subtitlesStore }) => ({
	resource: resourceStore.cache,
	content: contentStore.cache,
	subs: subtitlesStore.cache,
	subtitlesIds: contentStore.subtitlesIds,
})

const mapThunksToProps = {
	setEvents: interfaceService.setEvents,
	getResource: resourceService.getResources,
	getContent: contentService.getContent,
	updateContent: contentService.updateContent,
	getSubtitles: subtitlesService.getSubtitles,
	updateSubtitle: subtitlesService.updateSubtitle,
	createSubtitle: subtitlesService.createSubtitle,
	addSubtitles: contentService.addSubtitles,
	contentGetSubtitles: contentService.getSubtitles,
}

export default connect(mapStoreToProps, mapThunksToProps)(TrackEditorContainer)
