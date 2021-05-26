import React from 'react'
import { connect } from 'react-redux'

import MorePublicCollections from 'components/modals/components/MorePublicCollections'

import { interfaceService, collectionService, adminService, contentService } from 'services'

const MorePublicCollectionsContainer = props => {

	const {
		publicCollections,
		isAdmin,
		toggleModal,
		ownerName,
	} = props

	const handleSubmit = async e => {
		e.preventDefault()
		toggleModal()
	}

	const viewstate = {
		publicCollections,
		isAdmin,
		ownerName,
	}

	const handlers = {
		handleSubmit,
		toggleModal,
	}

	return <MorePublicCollections viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	userId: store.authStore.user.id,
	professorId: store.adminStore.professor.id,
	isAdmin: store.authStore.user.roles === 0,
	isLabAssistantRoute: store.interfaceStore.modal.isLabAssistantRoute,
})

const mapDispatchToProps = {
	adminCreateCollection: adminService.createCollection,
	setContent: contentService.setContent,
	createCollection: collectionService.createCollection,
	toggleModal: interfaceService.toggleModal,
	adminSearchCollections: adminService.searchCollections,
	updateCollectionPermissions: collectionService.updateCollectionPermissions,
	getUserById: adminService.getUserById,
}

export default connect(mapStateToProps, mapDispatchToProps)(MorePublicCollectionsContainer)