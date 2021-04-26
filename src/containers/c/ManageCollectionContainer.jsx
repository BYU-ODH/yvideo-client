import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

import { collectionService, contentService, interfaceService } from 'services'

import { ManageCollection } from 'components'

import { Tooltip } from 'components/bits'

import CreateContentContainer from 'components/modals/containers/CreateContentContainer'

import { objectIsEmpty } from 'lib/util'

const ManageCollectionContainer = props => {

	const {
		user,
		collection,
		content,
		setContent,
		getCollections,
		updateCollectionName,
		updateCollectionStatus,
		toggleTip,
	} = props

	const [isContentTap, setIsContentTap] = useState(true)
	const [isEditingCollectionName, setIsEditingCollectionName] = useState(false)
	const [collectionName, setCollectionName] = useState(collection.name)
	const [isEdited, setIsEdited] = useState(false)

	useEffect(() => {
		if(isEdited) {
			getCollections(true)
			setCollectionName(collection.name)
			setIsContentTap(true)

			setIsEdited(false)
		}
		if(collection.content.length > 0){
			if(content[collection.content[0].id]){
				// console.log('got cached content')
			} else {
				// console.log('setting content')
				const allContent = {}
				collection.content.forEach(item => {
					allContent[item.id] = item
				})
				setContent(allContent, true)
			}
		} else {
			// console.log('no content')
		}
	}, [collection.name])

	const handleShowTip = (tipName, position) => {
		toggleTip({
			component: Tooltip,
			props: {
				name: tipName,
				position,
			},
		})
	}

	const toggleEdit = e => {
		setIsEditingCollectionName(!isEditingCollectionName)
		if (isEditingCollectionName)
			updateCollectionName(collection.id, collectionName, null)

		setIsEdited(true)
	}

	const handleNameChange = e => {
		const { value } = e.target
		setCollectionName(value)
		setIsEdited(true)
	}

	const togglePublish = e => {
		e.preventDefault()
		updateCollectionStatus(collection.id, collection.published ? `unpublish` : `publish`)
		setIsEdited(true)
	}

	const createContent = () => {
		props.toggleModal({
			component: CreateContentContainer,
			collectionId: collection.id,
		})

		setIsEdited(true)
	}

	const archive = e => {
		e.preventDefault()
		updateCollectionStatus(collection.id, `archive`)
		setIsEdited(true)
	}

	const unarchive = e => {
		e.preventDefault()
		updateCollectionStatus(collection.id, `unarchive`)
		setIsEdited(true)
	}

	const setTab = isContentTap => _e => {
		setIsContentTap(isContentTap)
	}

	if (objectIsEmpty(content) && collection.content.length) return null

	// Forces rerender when content and collection.content don't contain the same content, and when creating new content
	const contentCheck = collection.content.map(item => content[item.id])
	if (contentCheck.length > 0 &&
		(contentCheck[0] === undefined || contentCheck[contentCheck.length - 1] === undefined))
		return null

	const viewstate = {
		user,
		isEditingCollectionName,
		collection,
		collectionName,
		content: collection.content.map(item => content[item.id]),
		isContentTap,
	}

	const handlers = {
		unarchive,
		toggleEdit,
		handleNameChange,
		togglePublish,
		createContent,
		handleShowTip,
		toggleTip,
		archive,
		setTab,
	}

	/*
		account-type
		0 = admin
		1 = lab assistant
		2 = faculty / instructor
		3 = student
  */

	/*
		account-role
		0 "instructor"
		1 "ta"
		2 "student"
		3 "auditing"
	*/

	return <ManageCollection viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	content: store.contentStore.cache,
	user: store.authStore.user,
})

const mapDispatchToProps = {
	setContent: contentService.setContent,
	getCollections: collectionService.getCollections,
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
	updateCollectionName: collectionService.updateCollectionName,
	updateCollectionStatus: collectionService.updateCollectionStatus,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCollectionContainer)