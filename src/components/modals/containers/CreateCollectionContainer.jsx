import React, { useState } from 'react'
import { connect } from 'react-redux'

import CreateCollection from 'components/modals/components/CreateCollection'

import { interfaceService, collectionService, adminService } from 'services'

const CreateCollectionContainer = props => {

	const {
		userId,
		adminCreateCollection,
		createCollection,
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
			'published': false,
			'archived': false, 
			'owner': userId, 
			'collection-name': name,
		}

		if(isLabAssistantRoute) adminCreateCollection(defaultV)
		else createCollection(defaultV)
		toggleModal()
	}

	const viewstate = {
		name,
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
	isLabAssistantRoute: store.interfaceStore.modal.isLabAssistantRoute,
})

const mapDispatchToProps = {
	adminCreateCollection: adminService.createCollection,
	createCollection: collectionService.createCollection,
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCollectionContainer)