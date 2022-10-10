import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
	collectionService,
	interfaceService,
} from 'services'

import AddBatchNetids from 'components/modals/components/AddBatchNetids'

const AddBatchNetidsContainer = props => {

	const {
		updateMany,
		toggleModal,
		setIsLoading,
		collectionId,
	} = props

	const [id, setId] = useState(``)
	const [disabledUser, setDisableUser] = useState(true)

	const handleNewId = ( e ) => {
		e.preventDefault()
		const temp = id.split(`\n`)
		const body = {
			usernames: temp,
			"account-role": 1,
		}
		setIsLoading(true)
		updateMany(collectionId, body)
		toggleModal()
	}

	const handleIdChange = ( value ) => {
		setId(value)

		if(value.length > 1)
			setDisableUser(false)
		else
			setDisableUser(true)

	}

	const viewstate = {
		id,
		disabledUser,
	}

	const handlers = {
		handleNewId,
		handleIdChange,
		toggleModal,
	}

	return <AddBatchNetids viewstate={viewstate} handlers={handlers}/>
}

const mapDispatchToProps = {
	updateMany: collectionService.updateMany,
	toggleModal: interfaceService.toggleModal,
}

export default connect(null, mapDispatchToProps)(AddBatchNetidsContainer)