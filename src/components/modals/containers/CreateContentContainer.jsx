import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Content from 'models/Content'

import {
	contentService,
	collectionService,
	interfaceService,
	adminService,
	resourceService,
} from 'services'

import CreateContent from 'components/modals/components/CreateContent'

const CreateContentContainer = props => {

	const {
		adminContent,
		adminCreateContent,
		adminCreateContentFromResource,
		adminGetCollectionContent,
		createContent,
		modal,
		search,
		toggleModal,
		getCollections,
		resourceContent,
		searchResource,
		getFiles,
	} = props

	const [tab, setTab] = useState(`url`)
	const [hideResources, setHide] = useState(true)
	const [searchQuery, setSearchQuery] = useState(``)
	const [selectedResource, setSelectedResource] = useState(``)
	const [languages, setLanguages] = useState([])
	const [files, setFiles] = useState([])
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
		targetLanguages: ``,
	})

	useEffect(() => {
		if(resourceContent[selectedResource] !== undefined){
			const langs = resourceContent[selectedResource].allFileVersions
			setLanguages(langs.split(`;`))
			console.log(resourceContent[selectedResource])
		}

		// if(resourceContent[selectedResource].files !== undefined) {
		// 	setFiles(resourceContent.files)
		// 	console.log(files)
		// }
	}, [resourceContent, selectedResource, files])

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
	}

	const handleSearchTextChange = e => {
		const { value } = e.target
		setSearchQuery(value)
		if (value.length > 1) {
			// search(`content`, value, true)
			searchResource(value)
			setHide(false)
		} else
			setHide(true)

	}

	const handleSelectResourceChange = (e, name) => {
		const { target } = e
		setSelectedResource(target.value)
		console.log(target)
		setSearchQuery(name)
		setHide(true)
	}

	const handleTypeChange = e => {
		const contentType = e.target.dataset.type
		setData({
			...data,
			contentType,
		})
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

	// TODO: need to add create content from the resource
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

		const backEndData = {
			"allow-definitions": true,
			"url": data.url,
			"allow-captions": true,
			"content-type": data.contentType,
			"resource-id": `00000000-0000-0000-0000-000000000000`,
			tags,
			"thumbnail": `https://i.ytimg.com/vi/${videoId}/default.jpg`,
			"file-version": ``,
			"collection-id": modal.collectionId,
			"views": 0,
			"annotations": ``,
			"title": data.title,
			"allow-notes": true,
			"description": data.description,
			"published": true,
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

	const handleAddResourceSubmit = async (e) => {
		e.preventDefault()

		// CONTENT FROM RESOURCE WILL HAVE AN EMPTY STRING IN THE URL
		// EVERY VIDEO HAS A FILE PATH BUT WE NEED TO GET A FILE KEY IN ORDER TO BE ABLE TO STREAM A VIDEO
		// THE FILE KEY WILL ACT AS PART OF THE URL WHERE WE WILL GET THE VIDEO URL: /api/media/stream-media/{file-key}

		const backEndData = {
			"allow-definitions": true,
			"url": ``,
			"allow-captions": true,
			"content-type": data.contentType,
			"resource-id": selectedResource,
			"tags": ``,
			"thumbnail": `empty`,
			"file-version": data.targetLanguages,
			"collection-id": modal.collectionId,
			"views": 0,
			"annotations": ``,
			"title": data.title,
			"allow-notes": true,
			"description": data.description,
			"published": true,
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
				keywords: data.keywords.filter(keyword => keyword !== badkeyword),
			},
		})
	}

	const viewstate = {
		adminContent,
		data,
		searchQuery,
		tab,
		resourceContent,
		hideResources,
		selectedResource,
		languages,
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
		toggleModal,
	}

	return <CreateContent viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	admin: store.authStore.user.roles === 0,
	adminContent: store.adminStore.data,
	resourceContent: store.resourceStore.cache,
	modal: store.interfaceStore.modal,
	collections: store.collectionStore.cache,
})

const mapDispatchToProps = {
	adminCreateContent: adminService.createContent,
	adminGetCollectionContent: adminService.getCollectionContent,
	adminCreateContentFromResource: adminService.createContentFromResource,
	createContent: contentService.createContent,
	toggleModal: interfaceService.toggleModal,
	search: adminService.search,
	searchResource: resourceService.search,
	getFiles: resourceService.getFiles,
	getCollections: collectionService.getCollections,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContentContainer)