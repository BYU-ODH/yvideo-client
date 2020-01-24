import React, { useState } from 'react'
import { connect } from 'react-redux'

// TODO: Edit this so it doesn't break the container pattern
import axios from 'axios'

import { roles } from 'models/User'

import {
	collectionService,
	contentService,
	interfaceService,
	resourceService,
	adminService,
} from 'services'

import CreateContent from 'components/modals/components/CreateContent'

const CreateContentContainer = props => {

	const {
		// addResource,
		admin,
		adminContent,
		collections,
		// content,
		getCollections,
		getContent,
		// getResources,
		modal,
		// search,
		toggleModal,
	} = props

	const [tab, setTab] = useState(`url`)
	const [data, setData] = useState({
		url: ``,
		file: ``,
		resourceId: ``,
		contentType: `video`,
		title: ``,
		description: ``,
		keywords: [],
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

	const handleTypeChange = e => {
		const contentType = e.target.dataset.type
		setData({
			...data,
			contentType,
		})
	}

	const fakeHandler = () => {
		return
	}

	const handleFile = e => {
		const { files } = e.target
		if (files.length <= 0) return

		const file = files[0]

		setData({
			...data,
			file: file.name,
		})
	}

	const addKeyword = element => {
		if (element.id !== `keyword-datalist-input` || element.value === ``) return

		setData({
			...data,
			keywords: [...data.keywords, element.value],
		})

		document.getElementById(`create-content-form`).reset()
	}

	const handleSubmit = async e => {
		e.preventDefault()

		await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/content/create/${tab}?collectionId=${modal.collectionId}&annotations=false`, {
			method: `POST`,
			data: JSON.stringify(data),
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`,
			},
		}).catch(err => console.error(err))

		toggleModal()

		await getCollections(admin, true)

		const contentIds = collections[modal.collectionId].content.map(item => item.id)
		getContent(contentIds, true)
	}

	const handleSubmitFile = e => {
		e.preventDefault()
		document.getElementById(`real-file-form`).dispatchEvent(new Event(`submit`))
	}

	const submitFile = async e => {
		e.preventDefault()

		const data = new FormData(e.target)

		const results = await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/content/create/${tab}?collectionId=${modal.collectionId}&annotations=false`,
			{
				method: `POST`,
				data,
				withCredentials: true,
			})
			.catch(err => console.error(err))

		toggleModal()

		await getCollections(admin, true)

		const contentIds = [...collections[modal.collectionId].content.map(item => item.id), results.data.id]
		await getContent(contentIds, true)
	}

	const remove = e => {
		const badkeyword = e.target.dataset.keyword
		setData({
			...data,
			keywords: data.keywords.filter(keyword => keyword !== badkeyword),
		})
	}

	const viewstate = {
		adminContent,
		data,
		tab,
	}

	const handlers = {
		changeTab,
		fakeHandler,
		handleFile,
		handleSubmit,
		handleSubmitFile,
		handleTextChange,
		handleTypeChange,
		onKeyPress,
		remove,
		submitFile,
		toggleModal,
	}

	return <CreateContent viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	adminContent: store.adminStore.data,
	modal: store.interfaceStore.modal,
	admin: store.authStore.user.roles.includes(roles.admin),
	collections: store.collectionStore.cache,
	content: store.contentStore.cache,
})

const mapDispatchToProps = {
	search: adminService.search,
	getCollections: collectionService.getCollections,
	getContent: contentService.getContent,
	toggleModal: interfaceService.toggleModal,
	getResources: resourceService.getResources,
	addResource: resourceService.addResource,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContentContainer)