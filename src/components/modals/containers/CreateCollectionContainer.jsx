import React, { useState } from 'react'
import { connect } from 'react-redux'

import { roles } from 'models/User'

import CreateCollection from 'components/modals/components/CreateCollection'

import { interfaceService, collectionService, adminService } from 'services'

const CreateCollectionContainer = props => {

	const {
		adminCreateCollection,
		createCollection,
		professor,
		toggleModal,
	} = props

	const [name, setName] = useState(``)

	const handleNameChange = e => {
		setName(e.target.value)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		if(professor && professor.id) adminCreateCollection(name, professor.id)
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
	isAdmin: store.authStore.user.roles.includes(roles.admin),
	professor: store.adminStore.professor,
})

const mapDispatchToProps = {
	adminCreateCollection: adminService.createCollection,
	createCollection: collectionService.createCollection,
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCollectionContainer)