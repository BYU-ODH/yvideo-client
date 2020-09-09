import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { connect } from 'react-redux'

import { interfaceService, resourceService, contentService, subtitlesService } from 'services'

import { TrackEditor } from 'components'

import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

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

		getStreamKey,
		streamKey,
		toggleModal,
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
		console.log(`more testing`,testsubs)
		setSubs(testsubs !== undefined?testsubs:[])
	}
	const getAllSubtitles = async() => {
		const testsubs = await getSubtitles(id)
		console.log(`more testing`,testsubs)
		setSubs(testsubs !== undefined?testsubs:[])
	}
	useEffect(() => {
		// console.log('use effecct')
		if(!content.hasOwnProperty(id)){
			console.log(`this is happening`)
			getData()
		}

		if(content[id] !== undefined){
			// getAllSubtitles()
			setCurrentContent(content[id])
			setEventsArray(content[id].settings.annotationDocument)
			setEvents(content[id].settings.annotationDocument)
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
		console.log(eventsArray,subs)
	}, [content, resource, eventsArray, currentContent,subs,setSubs,streamKey])

	const createAndAddSub = async () =>{
		console.log(allSubs)
		const subtitles = [...allSubs]
		subtitles.map((item)=>console.log(`AAAAg`,item))
		console.log(subtitles)
		try{
			for(let i = 0; i<subtitles.length;i++){
				if (subtitles[i][`id`] === ``){
					subtitles[i][`content-id`] = id
					subtitles[i][`content`] = JSON.stringify(subtitles[i][`content`])
					const subId = await createSubtitle(subtitles[i])
					subtitles[i][`id`] = subId
					subtitles[i][`content`] = JSON.parse(subtitles[i][`content`])
					console.log(`subid`,subId)
					console.log(subtitles[i])
				}else if(subtitles[i][`id`] !== ``)
					updateSubtitle(subtitles[i])

			}
			// setAllSubs(subtitles)
			// console.log(subtitles)
		}catch(error){

		}

	}
	console.log(subs)
	console.log(allSubs)
	const deleteSubs = async(subs) =>{
		deleteSubtitle(subs)
	}
	const setAllSubs = (subs) =>{
		console.log(subs)
		setSubtitles(subs)
	}
	// console.log(eventsArray)

	// console.log(eventsArray)

	const handleShowHelp = () => {
		toggleModal({
			component: HelpDocumentation,
			props: { name: `Track Editor`},
		})
	}

	const viewstate = {
		currentContent,
		url,
		eventsArray,
		subs,
		allSubs,
	}

	return <TrackEditor viewstate={viewstate} setEvents={setEvents} updateContent={updateContent} createSub={createAndAddSub} setAllSubs={setAllSubs} activeUpdate={activeUpdate} deleteSubtitles={deleteSubs} handleShowHelp={handleShowHelp}/>
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
}

export default connect(mapStoreToProps, mapThunksToProps)(TrackEditorContainer)
