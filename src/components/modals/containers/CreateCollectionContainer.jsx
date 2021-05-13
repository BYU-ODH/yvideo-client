import React, { useState } from 'react'
import { connect } from 'react-redux'

import CreateCollection from 'components/modals/components/CreateCollection'

import { interfaceService, collectionService, adminService } from 'services'

const CreateCollectionContainer = props => {

	const {
		userId,
		professorId,
		adminSearchCollections,
		createCollection,
		isPublicCollection,
		isLabAssistantRoute,
		toggleModal,
	} = props

	const [name, setName] = useState(``)

	const handleNameChange = e => {
		setName(e.target.value)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const defaultV = {
			'public': isPublicCollection,
			'published': false,
			'archived': false,
			'owner': `${isLabAssistantRoute ? professorId : userId}`,
			'collection-name': name,
		}

		if(isLabAssistantRoute){
			await createCollection(defaultV)
			adminSearchCollections(professorId, true)
		} else
			await createCollection(defaultV)

		toggleModal()
	}

	const viewstate = {
		name,
		isPublicCollection,
	}

	const handlers = {
		handleNameChange,
		handleSubmit,
		toggleModal,
	}

	return <CreateCollection viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	userId: store.authStore.user.id,
	professorId: store.adminStore.professor.id,
	isLabAssistantRoute: store.interfaceStore.modal.isLabAssistantRoute,
})

const mapDispatchToProps = {
	adminCreateCollection: adminService.createCollection,
	createCollection: collectionService.createCollection,
	toggleModal: interfaceService.toggleModal,
	adminSearchCollections: adminService.searchCollections,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCollectionContainer)