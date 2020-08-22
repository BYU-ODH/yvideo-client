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
		allSubs,
		getSubtitles,
		updateSubtitle,
		createSubtitle,
		setSubtitles,
		activeUpdate,
		deleteSubtitle,

	} = props

	const {id} = useParams()

	const [url, setUrl] = useState(``)
	const [eventsArray, setEventsArray] = useState([])
	const [currentContent, setCurrentContent] = useState({})
	const [subs,setSubs] = useState([])

	const getData = async() => {
		// console.log(`these subs are`, subs)
		await getContent([id])
		const testsubs = await getSubtitles(id)
		setSubs(testsubs !== undefined?testsubs:[])
	}
	useEffect(() => {
		// console.log('use effecct')
		if(!content.hasOwnProperty(id))
			getData()

		if(content[id] !== undefined){
			setCurrentContent(content[id])
			setEventsArray(content[id].settings.annotationDocument)
			setEvents(content[id].settings.annotationDocument)
			setUrl(content[id].url)
		}
		console.log(eventsArray,subs)
	}, [content, resource, eventsArray, currentContent,subs,setSubs])

	const createAndAddSub = async (subtitles) =>{
		console.log(subtitles)
		try{
			for(let i = 0; i<subtitles.length;i++){
				if (subtitles[i][`id`] === ``){
					subtitles[i][`content-id`] = id
					console.log(subtitles[i])
					const subId = await createSubtitle(subtitles[i])
					subtitles[i][`id`] = subId
					console.log(`subid`,subId)
				}else if(subtitles[i][`id`] !== ``)
					updateSubtitle(subtitles[i])
			}
		}catch(error){

		}

	}
	const deleteSubs = async(subs) =>{
		deleteSubtitle(subs)
	}
	// console.log(eventsArray)
	const viewstate = {
		currentContent,
		url,
		eventsArray,
		subs,
	}

	return <TrackEditor viewstate={viewstate} setEvents={setEvents} updateContent={updateContent} createSub={createAndAddSub} setAllSubs={setSubtitles} activeUpdate={activeUpdate} deleteSubtitles={deleteSubs}/>
}

const mapStoreToProps = ({ contentStore, resourceStore, subtitlesStore }) => ({
	resource: resourceStore.cache,
	content: contentStore.cache,
	allSubs: subtitlesStore.cache,
	subContentId: subtitlesStore.contentId,
})

const mapThunksToProps = {
	setEvents: interfaceService.setEvents,
	getResource: resourceService.getResources,
	getContent: contentService.getContent,
	updateContent: contentService.updateContent,
	getSubtitles: subtitlesService.getSubtitles,
	setSubtitles: subtitlesService.setSubtitles,
	deleteSubtitle: subtitlesService.deleteSubtitle,
	updateSubtitle: subtitlesService.updateSubtitle,
	createSubtitle: subtitlesService.createSubtitle,
	activeUpdate: subtitlesService.activeUpdate,
	setSubContentId: subtitlesService.setContentId,
}

export default connect(mapStoreToProps, mapThunksToProps)(TrackEditorContainer)
