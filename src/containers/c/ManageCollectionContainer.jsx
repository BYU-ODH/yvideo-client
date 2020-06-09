import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

import { collectionService, contentService, interfaceService, adminService } from 'services'

import { ManageCollection } from 'components'

import CreateContentContainer from 'components/modals/containers/CreateContentContainer'

import { objectIsEmpty } from 'lib/util'

const ManageCollectionContainer = props => {

	const {
		collection,
		content,
		getContent,
		updateCollectionName,
		updateCollectionStatus,
		getCollectionContent,
		getCollections,
	} = props

	const [isContent, setIsContent] = useState(true)
	const [isEditingCollectionName, setIsEditingCollectionName] = useState(false)
	const [collectionName, setCollectionName] = useState(collection.name)

	useEffect(() => {
		const ids = collection.content.map(item => parseInt(item.id))

		getContent(ids)
		// collection.content is not updated yet, need to update collection.content first before getting data
		getCollectionContent(collection.id, true)
		setCollectionName(collection.name)

		// need to be better at detecting update
		if(collection.content.length !== Object.keys(content).length)
			getCollections(true)

		console.log(`test`)
	}, [collection.content, collection.id, collection.name, content, getCollectionContent, getCollections, getContent])

	console.log(content)
	console.log(collection.content)

	const toggleEdit = e => {
		setIsEditingCollectionName(!isEditingCollectionName)
		if (isEditingCollectionName)
			updateCollectionName(collection.id, collectionName)
	}

	const handleNameChange = e => {
		const { value } = e.target
		setCollectionName(value)
	}

	const togglePublish = e => {
		e.preventDefault()
		updateCollectionStatus(collection.id, collection.published ? `unpublish` : `publish`)
	}

	const createContent = () => {
		props.toggleModal({
			component: CreateContentContainer,
			collectionId: collection.id,
		})
	}

	const archive = e => {
		e.preventDefault()
		updateCollectionStatus(collection.id, `archive`)
	}

	const setTab = isContent => _e => {
		setIsContent(isContent)
	}

	if (objectIsEmpty(content) && collection.content.length) return null

	// Forces rerender when content and collection.content don't contain the same content, and when creating new content
	const contentCheck = collection.content.map(item => content[item.id])
	if (contentCheck.length > 0 &&
		(contentCheck[0] === undefined || contentCheck[contentCheck.length - 1] === undefined))
		return null

	const viewstate = {
		isEditingCollectionName,
		collection,
		collectionName,
		content: collection.content.map(item => content[item.id]),
		isContent,
	}

	const handlers = {
		toggleEdit,
		handleNameChange,
		togglePublish,
		createContent,
		archive,
		setTab,
	}

	return <ManageCollection viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	content: store.contentStore.cache,
})

const mapDispatchToProps = {
	getContent: contentService.getContent,
	toggleModal: interfaceService.toggleModal,
	updateCollectionName: collectionService.updateCollectionName,
	updateCollectionStatus: collectionService.updateCollectionStatus,
	getCollectionContent: adminService.getCollectionContent,
	getCollections: collectionService.getCollections,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCollectionContainer)
