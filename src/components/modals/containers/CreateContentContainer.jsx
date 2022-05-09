import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
	contentService,
	collectionService,
	interfaceService,
	adminService,
	resourceService,
	languageService,
} from 'services'

import CreateContent from 'components/modals/components/CreateContent'

const CreateContentContainer = props => {

	const {
		adminContent,
		adminCreateContent,
		adminGetCollectionContent,
		createContent,
		modal,
		toggleModal,
		getCollections,
		resourceContent,
		searchResource,
		getAccess,
		user,
		getLanguages,
		allLanguages,
		getFiles,
	} = props

	const [tab, setTab] = useState(`url`)
	const [hideResources, setHide] = useState(true)
	const [searchQuery, setSearchQuery] = useState(``)
	const [selectedResourceId, setSelectedResourceId] = useState(``)
	const [selectedResourceName, setSelectedResourceName] = useState(``)
	const [isResourceSelected, setIsResourceSelected] = useState(false)
	const [languages, setLanguages] = useState([])
	const [isTyping, setIsTyping] = useState(false)
	const [isCalled, setIsCalled] = useState(false)
	const [blockLeave, setBlock] = useState(false)
	const [isAccess, setIsAccess] = useState(true)
	const [resourceFiles, setResourceFiles] = useState()

	const [data, setData] = useState({
		url: ``,
		resourceId: ``,
		contentType: `video`,
		title: ``,
		description: ``,
		resource: {
			keywords: [],
		},
		thumbnail: ``,
		targetLanguage: ``,
		fileId: "00000000-0000-0000-0000-000000000000",
	})

	useEffect(() => {
		getLanguages()
		if(resourceContent[selectedResourceId] !== undefined && isResourceSelected){

			const langs = resourceContent[selectedResourceId].allFileVersions ? (resourceContent[selectedResourceId].allFileVersions.split(`;`)) : ([])
			const finalLanguages = []
			langs.forEach((element, i) => {
				if(element === ``)
					delete langs[i]
				else {
					const newLetter = element[0].toUpperCase()
					element = newLetter + element.slice(1)
					finalLanguages.push(element)
				}
			})
			setLanguages(finalLanguages)
		}

		if(isTyping){
			setTimeout(() => {
				setIsTyping(false)
				setIsCalled(false)
			}, 1000)
		} else{
			if (searchQuery.length > 0 && searchQuery.match(/^[0-9a-zA-Z]+$/) && !isTyping) {
				if(!isCalled){
					searchResource(searchQuery)
					setHide(false)
					setIsCalled(true)
				}
			}else
				setHide(true)
		}

		if(blockLeave)
			window.onbeforeunload = () => true

		else
			window.onbeforeunload = undefined

		return () => {
			window.onbeforeunload = undefined
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resourceContent, selectedResourceId, searchQuery, isTyping, blockLeave, isResourceSelected])

	const changeTab = e => {
		setTab(e.target.name)
	}

	const onKeyPress = e => {
		if (e.which === 13) {
			e.preventDefault()
			addKeyword(e.target)
		}
	}

	const handleTextChange = e => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		})
		if(e.target.name === "fileId"){
			setData({
				...data,
				targetLanguage: resourceFiles.filter(file => file.id === e.target.value)[0]['file-version']
			})
		}
		setBlock(true)
	}

	const handleSearchTextChange = e => {
		const { value } = e.target
		setSearchQuery(value)

		if(isResourceSelected && value === ``)
			setIsResourceSelected(false)

		if(!isTyping)
			setIsTyping(true)
	}

	const handleSelectResourceChange = async (e, resource) => {
		const access = await getAccess(resource.id)
		let theAccess = true

		if(access.length !== 0) {
			for (let i = 0; i < access.length; i++) {
				if(user.username === access[i].username) {
					setIsAccess(true)
					theAccess = true
					setData({
						...data,
						title: resource.resourceName,
					})
					break
				}
				if(i === access.length -1) {
					setIsAccess(false)
					theAccess = false

				}
			}
		} else
			theAccess = false

		if(theAccess) {
			setSelectedResourceName(resource.resourceName)
			setSelectedResourceId(resource.id)
			setIsResourceSelected(true)

			// get files that attached to the resource
			const files = await getFiles(resource.id)
			setResourceFiles(files)
		} else {
			setSelectedResourceName(``)
			setSelectedResourceId(``)
			setIsResourceSelected(false)
		}
		setSearchQuery(``)
		setHide(true)
	}

	const handleTypeChange = e => {
		const contentType = e.target.dataset.type
		setData({
			...data,
			contentType,
		})
		setBlock(true)
	}

	const addKeyword = element => {
		if (element.id !== `keyword-datalist-input` || element.value === ``) return

		setData({
			...data,
			resource: {
				keywords: [...data.resource.keywords, element.value],
			},
		})

		document.getElementById(`create-content-form`).reset()
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		let tags = ``

		if(data.resource.keywords.length !== 0){
			data.resource.keywords.forEach((element, i) => {
				if(i !== data.resource.keywords.length -1)
					tags += `${element}; `
				else
					tags += `${element}`
			})
		}

		const videoId = new URL(data.url).search.split(`=`)[1]

		if(data.targetLanguage === ``){
			alert(`Please, select a valid language`)
			return
		}

		const backEndData = {
			"allow-definitions": true,
			"url": data.url,
			"allow-captions": true,
			"content-type": data.contentType,
			"resource-id": `00000000-0000-0000-0000-000000000000`,
			tags,
			"thumbnail": `https://i.ytimg.com/vi/${videoId}/default.jpg`,
			"file-version": data.targetLanguage,
			"file-id": '00000000-0000-0000-0000-000000000000',
			"collection-id": modal.collectionId,
			"published": true,
			"views": 0,
			"annotations": ``,
			"title": data.title,
			"allow-notes": true,
			"description": data.description,
			"words": ``,
			"clips": ``,
		}

		if(modal.isLabAssistantRoute){
			await adminCreateContent(backEndData)
			adminGetCollectionContent(modal.collectionId, true)
		} else{
			await createContent(backEndData)
			getCollections(true)
		}
		toggleModal()
		setBlock(false)
	}

	const handleAddResourceSubmit = async (e) => {
		e.preventDefault()

		if(data.targetLanguage === ``){
			alert(`Please, select a valid language`)
			return
		}

		//FIND IF THE COLLECTION IS PUBLIC
		//IF COLLECTION IS PUBLIC COPYRITED RESOURCES CANNOT BE ADDED TO IT
		if(modal.props !== undefined && modal.props.isPublic && resourceContent[selectedResourceId].copyrighted){
			alert('The resource you are trying to add is copyrighted and cannot be added to a public collection')
			return;
		}

		// CONTENT FROM RESOURCE WILL HAVE AN EMPTY STRING IN THE URL
		// EVERY VIDEO HAS A FILE PATH BUT WE NEED TO GET A FILE KEY IN ORDER TO BE ABLE TO STREAM A VIDEO
		// THE FILE KEY WILL ACT AS PART OF THE URL WHERE WE WILL GET THE VIDEO URL: /api/media/stream-media/{file-key}

		const backEndData = {
			"allow-definitions": true,
			"url": ``,
			"allow-captions": true,
			"content-type": data.contentType,
			"resource-id": selectedResourceId,
			"tags": ``,
			"clips": ``,
			"words": ``,
			"thumbnail": `empty`,
			"file-version": data.targetLanguage,
			"file-id": data.fileId,
			"collection-id": modal.collectionId,
			"published": true,
			"views": 0,
			"annotations": ``,
			"title": data.title,
			"allow-notes": true,
			"description": data.description,
		}

		if(modal.isLabAssistantRoute){
			await adminCreateContent(backEndData)
			adminGetCollectionContent(modal.collectionId, true)
		} else{
			await createContent(backEndData)
			getCollections(true)
		}
		toggleModal()
	}

	const remove = e => {
		const badkeyword = e.target.dataset.keyword
		setData({
			...data,
			resource: {
				keywords: data.resource.keywords.filter(keyword => keyword !== badkeyword),
			},
		})
		setBlock(true)
	}

	const removeResource = () => {
		setSelectedResourceName(``)
		setIsResourceSelected(false)
	}

	const viewstate = {
		adminContent,
		data,
		searchQuery,
		tab,
		resourceContent,
		hideResources,
		selectedResourceId,
		selectedResourceName,
		languages,
		isResourceSelected,
		isAccess,
		allLanguages,
		resourceFiles,
	}

	const handlers = {
		changeTab,
		handleAddResourceSubmit,
		handleSearchTextChange,
		handleSelectResourceChange,
		handleSubmit,
		handleTextChange,
		handleTypeChange,
		onKeyPress,
		remove,
		removeResource,
		toggleModal,
	}

	return <CreateContent viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	admin: store.authStore.user.roles === 0,
	user: store.authStore.user,
	adminContent: store.adminStore.data,
	resourceContent: store.resourceStore.cache,
	modal: store.interfaceStore.modal,
	collections: store.collectionStore.cache,
	allLanguages: store.languageStore.cache.langs,
})

const mapDispatchToProps = {
	adminCreateContent: adminService.createContent,
	adminGetCollectionContent: adminService.getCollectionContent,
	adminCreateContentFromResource: adminService.createContentFromResource,
	createContent: contentService.createContent,
	toggleModal: interfaceService.toggleModal,
	search: adminService.search,
	searchResource: resourceService.search,
	getCollections: collectionService.getCollections,
	getAccess: resourceService.readAccess,
	getFiles: resourceService.getFiles,
	getLanguages: languageService.get,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContentContainer)