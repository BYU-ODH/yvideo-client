import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { connect } from 'react-redux'

import {
	adminService,
	interfaceService,
	collectionService
} from 'services'

import { ManageCollection } from 'components'

import CreateContentContainer from 'components/modals/containers/CreateContentContainer'

const LabAssistantManageCollectionContainer = props => {

	const {
		admin,
		collection,
		professorId,
		content,
		searchCollections,
		getCollectionContent,
		updateCollectionName,
		updateCollectionStatus,
	} = props

	//console.log(collection)
	const [isContent, setIsContent] = useState(true)
	const [isEditingCollectionName, setIsEditingCollectionName] = useState(false)
	const [collectionName, setCollectionName] = useState(collection.name)

	useEffect(() => {
		//console.log('useeffect')
		//console.log(collection.id)
		getCollectionContent(collection.id, true)
		setCollectionName(collection.name)
	}, [collection])

	const togglePublish = e => {
		e.preventDefault()
		updateCollectionStatus(collection.id, collection.published ? 'unpublish' : 'publish')
	}

	const toggleEdit = async e => {
		setIsEditingCollectionName(!isEditingCollectionName)
		if (isEditingCollectionName){
			await updateCollectionName(collection.id, collectionName, true)
			searchCollections(professorId, true)
		}
	}

	const createContent = () => {
		props.toggleModal({
			component: CreateContentContainer,
			collectionId: collection.id,
			isLabAssistantRoute: true
		})
	}

	const archive = e => {
		e.preventDefault()
		updateCollectionStatus(collection.id, 'archive')
	}

	const unarchive = e => {
		e.preventDefault()
		updateCollectionStatus(collection.id, `unarchive`)
	}

	const setTab = isContent => _e => {
		setIsContent(isContent)
	}

	const handleNameChange = e => {
		const { value } = e.target
		setCollectionName(value)
	}

	if(!content) return null

	const viewstate = {
		admin,
		collection,
		content: Object.keys(content).map(key => content[key]),
		isContent,
		isEditingCollectionName,
		collectionName,
	}

	const handlers = {
		togglePublish,
		toggleEdit,
		handleNameChange,
		createContent,
		archive,
		setTab,
		unarchive
	}

	return <ManageCollection viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	content: store.adminStore.profCollectionContent,
	admin: store.authStore.user.roles,
	professorId: store.adminStore.professor.id
})

const mapDispatchToProps = {
	getCollectionContent: adminService.getCollectionContent,
	toggleModal: interfaceService.toggleModal,
	updateCollectionStatus: adminService.updateCollectionStatus,
	updateCollectionName: collectionService.updateCollectionName,
	searchCollections: adminService.searchCollections,
}

export default connect(mapStateToProps, mapDispatchToProps)(LabAssistantManageCollectionContainer)
