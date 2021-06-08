import React, { useState, useEffect } from 'react'
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
	const [blockLeave, setBlock] = useState(false)

	useEffect(() => {
		if(blockLeave) {
			window.onbeforeunload = () => true
		}
		else {
			window.onbeforeunload = undefined
		}
		return () => {
			window.onbeforeunload = undefined
		}
	})

	const handleNameChange = e => {
		setName(e.target.value)
		setBlock(true)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const defaultV = {
			'public': isPublicCollection !== undefined ? isPublicCollection : false,
			'copyrighted': false,
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
		setBlock(false)
	}

	const viewstate = {
		name,
		isPublicCollection,
		blockLeave,
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