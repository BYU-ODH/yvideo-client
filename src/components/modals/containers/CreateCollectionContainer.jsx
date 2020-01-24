import React, { useState } from 'react'
import { connect } from 'react-redux'

import { roles } from 'models/User'

import CreateCollection from 'components/modals/components/CreateCollection'

import { interfaceService, collectionService } from 'services'

import { objectIsEmpty } from 'lib/util'

// TODO: Edit this so it doesn't break the container pattern
import axios from 'axios'

const CreateCollectionContainer = props => {

	const {
		isAdmin,
		getCollections,
		professor,
		toggleModal,
	} = props

	const [name, setName] = useState(``)
	const [ownerId, setOwnerId] = useState(``)

	const handleNameChange = e => {
		setName(e.target.value)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		if(!professor && !objectIsEmpty(professor))
			setOwnerId(professor.id)

		// TODO: Edit this so it doesn't break the container pattern
		await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/collection/create`, {
			method: `POST`,
			data: JSON.stringify({ name, ownerId }),
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`,
			},
		}).then(() => {
			toggleModal()
			getCollections(isAdmin, true)
			getCollections()
		}).catch(err => console.error(err))

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
	toggleModal: interfaceService.toggleModal,
	getCollections: collectionService.getCollections,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCollectionContainer)