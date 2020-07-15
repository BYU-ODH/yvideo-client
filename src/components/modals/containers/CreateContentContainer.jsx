import React, { useState } from 'react'
import { connect } from 'react-redux'

import Content from 'models/Content'

import {
	contentService,
	interfaceService,
	adminService,
} from 'services'

import CreateContent from 'components/modals/components/CreateContent'

const CreateContentContainer = props => {

	const {
		adminContent,
		adminCreateContent,
		adminCreateContentFromResource,
		createContent,
		modal,
		search,
		toggleModal,
	} = props

	const [tab, setTab] = useState(`url`)
	const [searchQuery, setSearchQuery] = useState(``)
	const [selectedResource, setSelectedResource] = useState(``)
	const [data, setData] = useState({
		url: ``,
		resourceId: ``,
		contentType: `video`,
		title: ``,
		description: ``,
		resource: {
			keywords: [],
		}
		thumbnail: ``,
	})

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
		if (value.length > 1) search(`content`, value, true)
	}

	const handleSelectResourceChange = e => {
		const { target } = e
		//console.log(target.value)
		setSelectedResource(target.value)
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
			}
		})

		document.getElementById(`create-content-form`).reset()
	}

	const handleSubmit = e => {
		e.preventDefault()
		//console.log(data)
		let tags = ''

		if(data.resource.keywords.length !== 0){
			//console.log(data.resource.keywords)
			data.resource.keywords.forEach((element, i) => {

				if(i !== data.resource.keywords.length -1){
					tags += `${element}; `
				}
				else {
					tags += `${element}`
				}
			})
		}

		const videoId = new URL(data.url).search.split(`=`)[1]

		let backEndData = {

			"allow-definitions": true,
			"url": data.url,
			"allow-captions": true,
			"content-type": data.contentType,
			"resource-id": "00000000-0000-0000-0000-000000000000",
			"tags": tags,
			"thumbnail": `https://i.ytimg.com/vi/${videoId}/hq720.jpg`,
			"file-version": '',
			"collection-id": modal.collectionId,
			"views": 0,
			"annotations": "",
			"title": data.title,
			"allow-notes": true,
			"description": data.description,
		}

		if(modal.isLabAssistantRoute) adminCreateContent(backEndData)
		else createContent(backEndData)

		toggleModal()
	}

	const handleAddResourceSubmit = e => {
		e.preventDefault()
		adminCreateContentFromResource(modal.collectionId, selectedResource)
		toggleModal()
	}

	const remove = e => {
		const badkeyword = e.target.dataset.keyword
		setData({
			...data,
			resource: {
				keywords: data.keywords.filter(keyword => keyword !== badkeyword)
			},
		})
	}

	const viewstate = {
		adminContent,
		data,
		searchQuery,
		tab,
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
	modal: store.interfaceStore.modal,
	collections: store.collectionStore.cache,
})

const mapDispatchToProps = {
	adminCreateContent: adminService.createContent,
	adminCreateContentFromResource: adminService.createContentFromResource,
	createContent: contentService.createContent,
	toggleModal: interfaceService.toggleModal,
	search: adminService.search,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContentContainer)