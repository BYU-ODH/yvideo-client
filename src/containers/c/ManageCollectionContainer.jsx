import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

import { collectionService, contentService, interfaceService } from 'services'

import { ManageCollection } from 'components'

import CreateContentContainer from 'components/modals/containers/CreateContentContainer'

import { objectIsEmpty } from 'lib/util'

const ManageCollectionContainer = props => {

	const {
		admin,
		collection,
		content,
		setContent,
		getCollections,
		updateCollectionName,
		updateCollectionStatus,
	} = props

	const [isContent, setIsContent] = useState(true)
	const [isEditingCollectionName, setIsEditingCollectionName] = useState(false)
	const [collectionName, setCollectionName] = useState(collection.name)

	useEffect(() => {
		getCollections(true)
		if(collection.content.length > 0){
			if(content[collection.content[0].id]){
				//console.log('got cached content')
			}
			else {
				//console.log('setting content')
				const allContent = {}
				collection.content.forEach(item => {
					allContent[item.id] = item
				})
				setContent(allContent, true)
			}
		}
		else {
			//console.log('no content')
		}
		setCollectionName(collection.name)
	}, [collection.name, getCollections])

	const toggleEdit = e => {
		setIsEditingCollectionName(!isEditingCollectionName)
		if (isEditingCollectionName)
			updateCollectionName(collection.id, collectionName, null)
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

	const unarchive = e => {
		e.preventDefault()
		updateCollectionStatus(collection.id, `unarchive`)
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
		admin,
		isEditingCollectionName,
		collection,
		collectionName,
		content: collection.content.map(item => content[item.id]),
		isContent,
	}

	const handlers = {
		unarchive,
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
	admin: store.authStore.user.roles,
})

const mapDispatchToProps = {
	setContent: contentService.setContent,
	getCollections: collectionService.getCollections,
	toggleModal: interfaceService.toggleModal,
	updateCollectionName: collectionService.updateCollectionName,
	updateCollectionStatus: collectionService.updateCollectionStatus,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCollectionContainer)