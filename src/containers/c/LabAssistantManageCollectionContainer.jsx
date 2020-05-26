import React, { useState, useEffect } from 'react'

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
		content,
		getCollectionContent,
		updateCollectionStatus
	} = props

	const [isContent, setIsContent] = useState(true)

	useEffect(() => {
		getCollectionContent(collection.id, true)
	}, [collection, getCollectionContent])

	const togglePublish = e => {
		e.preventDefault()
		updateCollectionStatus(collection.id, collection.published ? 'unpublish' : 'publish')
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

	if(!content) return null

	const viewstate = {
		admin,
		collection,
		content: Object.keys(content).map(key => content[key]),
		isContent
	}

	const handlers = {
		togglePublish,
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
})

const mapDispatchToProps = {
	getCollectionContent: adminService.getCollectionContent,
	toggleModal: interfaceService.toggleModal,
	updateCollectionStatus: adminService.updateCollectionStatus,
	updateCollectionName: collectionService.updateCollectionName,
}

export default connect(mapStateToProps, mapDispatchToProps)(LabAssistantManageCollectionContainer)
