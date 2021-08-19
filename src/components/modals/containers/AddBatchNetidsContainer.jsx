import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Content from 'models/Content'

import {
	contentService,
	collectionService,
	interfaceService,
	adminService,
	resourceService,
} from 'services'

import AddBatchNetids from 'components/modals/components/AddBatchNetids'

const AddBatchNetidsContainer = props => {
	const { updateMany, toggleModal } = props
	const [list, setList] = useState([])
	const [id, setId] = useState(``)
	const [disabledUser, setDisableUser] = useState(true)
	const viewState = { list, id, disabledUser }

	const handleNewId = ( e ) => {
		e.preventDefault()
		const temp = id.split(`\n`)
		const body = {
			usernames: temp,
			"account-role": 1,
		}
		props.setIsLoading(true)
		updateMany(props.collectionId, body)
		toggleModal()
	}

	const handleIdChange = ( value ) => {
		setId(value)

		if(value.length > 1)
			setDisableUser(false)
		else
			setDisableUser(true)

	}

	const handler = {
		handleNewId,
		handleIdChange,
		toggleModal,
	}

	return <AddBatchNetids viewState={ viewState } handler={ handler }/>
}

const mapStateToProps = store => ({
})

const mapDispatchToProps = {
	updateMany: collectionService.updateMany,
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBatchNetidsContainer)