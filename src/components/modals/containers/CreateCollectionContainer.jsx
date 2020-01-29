import React, { useState } from 'react'
import { connect } from 'react-redux'

import CreateCollection from 'components/modals/components/CreateCollection'

import { interfaceService, collectionService, adminService } from 'services'

const CreateCollectionContainer = props => {

	const {
		adminCreateCollection,
		createCollection,
		route,
		toggleModal,
	} = props

	const [name, setName] = useState(``)

	const handleNameChange = e => {
		setName(e.target.value)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		if(route === `lab-assistant-manager`) adminCreateCollection(name)
		else createCollection(name)
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
	route: store.interfaceStore.modal.route,
})

const mapDispatchToProps = {
	adminCreateCollection: adminService.createCollection,
	createCollection: collectionService.createCollection,
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCollectionContainer)