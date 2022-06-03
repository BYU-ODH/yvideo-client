import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { interfaceService, resourceService, contentService, subtitlesService } from 'services'
import { SubtitleEditor } from 'components'
import { Tooltip } from 'components/bits'
import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

import SubtitlesModal from 'components/modals/containers/SubtitlesModalContainer'

const SubtitlesEditorContainer = props => {

	const {
		content,
		resource,
		setEvents,
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
		contentError,
		subtitleError,
		setBreadcrumbs,
		getFiles,
	} = props

	const {id} = useParams() // content id

	const [calledGetSubtitles, setCalledGetSubtitles] = useState(false)
	const [url, setUrl] = useState(``)
	const [eventsArray, setEventsArray] = useState([])
	const [showSideEditor, setSideEditor] = useState(false)
	const [currentContent, setCurrentContent] = useState({})
	const [subs,setSubs] = useState([])
	const [sKey, setKey] = useState(``)
	const [isStreamKeyLoaded, setIsStreamKeyLoaded] = useState(false)
	const [aspectRatio,setAspectRatio] = useState([16,9])

	const getAllSubtitles = async() => {
		const testsubs = await getSubtitles(id)
		const returnThis = testsubs !== undefined ? testsubs : []
		return returnThis
	}

	useEffect(() => {
		if(!content.hasOwnProperty(id)) // eslint-disable-line no-prototype-builtins
			getContent(id)

		if(content[id] !== undefined){
			setCurrentContent(content[id])
			setEventsArray(content[id].settings.annotationDocument)
			setEvents(content[id].settings.annotationDocument)
			setBreadcrumbs({path:[`Home`, `Manage Collections`, `Subtitle Editor`], collectionId: content[id].collectionId, contentId: content[id].id})

			if(content[id].url !== ``)
				setUrl(content[id].url)
			if(content[id].url.includes(`youtube`)){
				const fetchData = async() => {
					const rawData = await fetch(`https://www.youtube.com/oembed?url=${content[id].url}&format=JSON`,{method:`GET`})
					const data = await rawData.json()
					if(data.hasOwnProperty(`width`) && data.hasOwnProperty(`height`)) // eslint-disable-line no-prototype-builtins
						setAspectRatio([data.width,data.height])

					return data
				}
				const d =fetchData() // eslint-disable-line no-unused-vars
			} else {
				setKey(``)
				setUrl(``)
				// CHECK RESOURCE ID
				if(content[id].resourceId && !isStreamKeyLoaded){
					// VALID RESOURCE ID SO WE KEEP GOING TO FIND STREAMING URL
					getStreamKey(content[id].resourceId, content[id].settings.targetLanguage)
					setIsStreamKeyLoaded(true)
				}
				if (streamKey){
					// setUrl(`${process.env.REACT_APP_YVIDEO_SERVER}/api/partial-media/stream-media/${streamKey}`)
					setKey(streamKey)
				}
				if (sKey !== ``)
					setUrl(`${process.env.REACT_APP_YVIDEO_SERVER}/api/partial-media/stream-media/${sKey}`)
				// eslint-disable-next-line no-unused-vars
				const files = Promise.resolve(getFiles(sKey)).then((value)=>{
					if (value){
						const file = value.find(element => element[`file-version`].includes(content[id].settings.targetLanguage) !== false)
						if (file[`aspect-ratio`])
							setAspectRatio(file[`aspect-ratio`].split(`,`))
					}
				})
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [content, resource, eventsArray, currentContent, subs, streamKey, url, subContentId, getContent, sKey, calledGetSubtitles, allSubs])

	useLayoutEffect( () => {
		// once the url is set we can get subtitles
		if(!calledGetSubtitles) {
			getSubtitles(id)
			setCalledGetSubtitles(true)
		} else
			setSubs(allSubs)
			// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [calledGetSubtitles, content, subs, allSubs])

	const createAndAddSub = async () => {
		const subtitles = [...allSubs]
		try {
			for(let i = 0; i<subtitles.length;i++) {
				if (subtitles[i][`id`] === ``) {
					subtitles[i][`content-id`] = id
					const subId = await createSubtitle(subtitles[i])
					subtitles[i][`id`] = subId
					subtitles[i][`content`] = JSON.parse(subtitles[i][`content`])
				}else if(subtitles[i][`id`] !== ``)
					updateSubtitle(subtitles[i])
			}
		}catch(error){
			console.error(error) // eslint-disable-line no-console
		}

	}

	const deleteSubs = (subs) => {
		deleteSubtitle(subs)
	}
	const setAllSubs = (subs) => {
		setSubtitles(subs)
	}

	const handleShowHelp = () => {
		toggleModal({
			component: HelpDocumentation,
			props: { name: `Subtitle Editor`},
		})
	}

	const handleShowTip = (tipName, position) => {

		// console.log(position)
		toggleTip({
			component: Tooltip,
			props: {
				name: tipName,
				position,
			},
		})
	}

	const openSubModal = (
		isReady, setIsReady,
		subModalMode,
		deleteTitle,
		handleAddSubLayer,
		handleAddSubLayerFromFile,
		handleDeleteSubLayer,
		index,
	) => {
		props.toggleModal({
			component: SubtitlesModal,
			props: {
				isReady,
				setIsReady,
				mode: subModalMode,
				deleteTitle,
				handleAddSubLayer,
				handleAddSubLayerFromFile,
				handleDeleteSubLayer,
				index,
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
		aspectRatio,
		showSideEditor,
	}

	const handlers = {
		toggleTip,
		handleShowTip,
		handleShowHelp,
		openSubModal,
		setSideEditor,
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
	getFiles: resourceService.getFiles,
}

export default connect(mapStoreToProps, mapThunksToProps)(SubtitlesEditorContainer)
