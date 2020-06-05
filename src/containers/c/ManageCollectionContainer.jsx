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
	} = props

	const [isContent, setIsContent] = useState(true)
	const [isEditingCollectionName, setIsEditingCollectionName] = useState(false)
	const [collectionName, setCollectionName] = useState(collection.name)

	// console.log(`content`)
	console.log(content) // this is the one we want
	// console.log(`collection.content`)
	console.log(collection.content)

	// console.log(Object.keys(content).length === 0 ? collection.content.map(item => parseInt(item.id)) : Object.keys(content).map(item => parseInt(item)))

	useEffect(() => {
		// createContent updates only content not collection.content
		const ids = Object.keys(content).length === 0 ? collection.content.map(item => parseInt(item.id)) : Object.keys(content).map(item => parseInt(item))
		// const ids = collection.content.map(item => parseInt(item.id))
		// console.log(ids)
		getContent(ids)
		getCollectionContent(collection.id, true) // collection.content is not updated yet, need to update collection.content first before getting data
		setCollectionName(collection.name)
	}, [collection.content, collection.id, collection.name, content, getCollectionContent, getContent])

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

	// const tempCheck = () => {
	// 	const tempContents = []
	// 	if(Object.keys(content).length !== collection.content.length)
	// 		Object.keys(content).map(item => tempContents.push(item))
	// 	else
	// 		collection.content.map(item => tempContents.push(content[item.id]))
	// 	return tempContents
	// }

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
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCollectionContainer)
