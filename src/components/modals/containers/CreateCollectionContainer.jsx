import React, { useState } from 'react'
import { connect } from 'react-redux'

import { roles } from 'models/User'

import CreateCollection from 'components/modals/components/CreateCollection'

import { interfaceService, collectionService } from 'services'

import { objectIsEmpty } from 'lib/util'

// TODO: Edit this so it doesn't break the container pattern
import axios from 'axios'

const CreateCollectionContainer = props => {

	console.clear()

	const {
		isAdmin,
		getCollections,
		professor,
		toggleModal,
	} = props

	const [name, setName] = useState(``)
	let ownerId = null

	const handleNameChange = e => {
		setName(e.target.value)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		if(professor && professor.id)
			ownerId = professor.id

		const data = JSON.stringify({ name, ownerId: parseInt(ownerId) })
		console.log(data)

		// TODO: Edit this so it doesn't break the container pattern
		// TODO: Put this in the API Proxy behind a redux service

		// something like this:
		// if (!ownerId) await createCollection()
		// else await adminCreateCollection()

		await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/collection/create`, {
			method: `POST`,
			data,
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`,
			},
		}).then(() => {
			toggleModal()
			if(!professor && !objectIsEmpty(professor)) {
				// setOwnerId(professor.id)
				// TODO: Do we need to getProfessorCollections()
			} else {
				getCollections(isAdmin, true)
				getCollections()
			}
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