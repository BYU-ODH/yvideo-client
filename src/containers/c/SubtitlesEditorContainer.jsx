import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { connect } from 'react-redux'

import { interfaceService, resourceService, contentService, subtitlesService } from 'services'

import { SubtitleEditor } from 'components'

import { Tooltip } from 'components/bits'

import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

const SubtitlesEditorContainer = props => {

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
		contentError,
		subtitleError,
		setBreadcrumbs,
	} = props

	const {id} = useParams() // content id

	const [calledGetSubtitles, setCalledGetSubtitles] = useState(false)
	const [url, setUrl] = useState(``)
	const [eventsArray, setEventsArray] = useState([])
	const [currentContent, setCurrentContent] = useState({})
	const [subs,setSubs] = useState([])

	const getData = async() => {
		// console.log(`these subs are`, subs)
		// await getContent([id])
		const testsubs = await getSubtitles(id)
		// console.log(`more testing`,testsubs)
		setSubs(testsubs !== undefined?testsubs:[])
	}
	const getAllSubtitles = async() => {
		const testsubs = await getSubtitles(id)
		const returnThis = testsubs !== undefined?testsubs:[]
		return returnThis
	}

	useEffect(() => {
		// console.log('use effecct')
		if(!content.hasOwnProperty(id)){
			getContent(id)
		}

		if(content[id] !== undefined){
			setCurrentContent(content[id])
			setEventsArray(content[id].settings.annotationDocument)
			setEvents(content[id].settings.annotationDocument)
			setBreadcrumbs({path:[`Home`, `Manage Collections`, `Subtitle Editor`], collectionId: content[id].collectionId, contentId: content[id].id})
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
				}
			} else{
				// once the url is set we can get subtitles
				if(!calledGetSubtitles){
					getSubtitles(id)
					setCalledGetSubtitles(true)
				} else {
					setSubs(allSubs)
				}
			}
		}

	}, [content, resource, eventsArray, currentContent, subs, setSubs, allSubs, getSubtitles, streamKey, url, subContentId])

	const createAndAddSub = async () =>{
		const subtitles = [...allSubs]
		try{
			for(let i = 0; i<subtitles.length;i++){
				if (subtitles[i][`id`] === ``){
					subtitles[i][`content-id`] = id
					const subId = await createSubtitle(subtitles[i])
					subtitles[i][`id`] = subId
					subtitles[i][`content`] = JSON.parse(subtitles[i][`content`])
				}else if(subtitles[i][`id`] !== ``)
					updateSubtitle(subtitles[i])
			}
		}catch(error){
			console.error(error)
		}

	}

	const deleteSubs = (subs) =>{
		deleteSubtitle(subs)
	}
	const setAllSubs = (subs) =>{
		setSubtitles(subs)
	}

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

	const viewstate = {
		currentContent,
		url,
		eventsArray,
		subs,
		allSubs,
		contentError,
		subtitleError,
	}

	const handlers = {
		toggleTip,
		handleShowTip,
		handleShowHelp,
	}

	return <SubtitleEditor
		viewstate={viewstate}
		setEvents={setEvents}
		updateContent={updateContent}
		createSub={createAndAddSub}
		setAllSubs={setAllSubs}
		activeUpdate={activeUpdate}
		deleteSubtitles={deleteSubs}
		handleShowHelp={handleShowHelp}
		getAllSubtitles={getAllSubtitles}
		handlers={handlers}/>
}

const mapStoreToProps = ({ contentStore, resourceStore, subtitlesStore }) => ({
	resource: resourceStore.cache,
	content: contentStore.cache,
	allSubs: subtitlesStore.cache,
	subContentId: subtitlesStore.contentId,
	streamKey: resourceStore.streamKey,
	contentError: contentStore.errorMessage,
	subtitleError: contentStore.errorMessage,
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

export default connect(mapStoreToProps, mapThunksToProps)(SubtitlesEditorContainer)