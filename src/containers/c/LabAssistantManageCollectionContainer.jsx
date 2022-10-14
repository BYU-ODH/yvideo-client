import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

import {
	adminService,
	interfaceService,
	collectionService,
} from 'services'

import { ManageCollection } from 'components'

import { Tooltip } from 'components/bits'

import CreateContentContainer from 'components/modals/containers/CreateContentContainer'

const LabAssistantManageCollectionContainer = props => {

	const {
		admin,
		user,
		collection,
		professorId,
		content,
		searchCollections,
		getCollectionContent,
		updateCollectionName,
		updateCollectionStatus,
		toggleTip,
		setBreadcrumbs,
	} = props

	const [isContent, setIsContent] = useState(true)
	const [isEditingCollectionName, setIsEditingCollectionName] = useState(false)
	const [collectionName, setCollectionName] = useState(``)

	useEffect(() => {
		setBreadcrumbs({path: [`Home`, `Lab Assistant Manager`], collectionId: collection.id, contentId: ``})
		setCollectionName(collection.name)
		getCollectionContent(collection.id, true)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [collection])

	const togglePublish = e => {
		e.preventDefault()
		updateCollectionStatus(collection.id, collection.published ? `unpublish` : `publish`)
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
			props:{
				collection,
			},
			isLabAssistantRoute: true,
			collection,
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

	const handleNameChange = e => {
		const { value } = e.target
		setCollectionName(value)
	}

	const handleShowTip = (tipName, position) => {
		toggleTip({
			component: Tooltip,
			props: {
				name: tipName,
				position,
			},
		})
	}

	if(!content) return null

	const viewstate = {
		admin,
		user,
		collection,
		content: Object.keys(content).map(key => content[key]),
		isContentTab: isContent,
		isEditingCollectionName,
		collectionName,
		isLabAssistant: true,
	}

	const handlers = {
		togglePublish,
		toggleEdit,
		handleNameChange,
		createContent,
		archive,
		setTab,
		unarchive,
		toggleTip,
		handleShowTip,
	}

	return <ManageCollection viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	content: store.adminStore.profCollectionContent,
	admin: store.authStore.user.roles,
	user: store.authStore.user,
	professorId: store.adminStore.professor.id,
})

const mapDispatchToProps = {
	getCollectionContent: adminService.getCollectionContent,
	toggleModal: interfaceService.toggleModal,
	updateCollectionStatus: adminService.updateCollectionStatus,
	updateCollectionName: collectionService.updateCollectionName,
	searchCollections: adminService.searchCollections,
	toggleTip: interfaceService.toggleTip,
	setBreadcrumbs: interfaceService.setBreadcrumbs,
}

export default connect(mapStateToProps, mapDispatchToProps)(LabAssistantManageCollectionContainer)
