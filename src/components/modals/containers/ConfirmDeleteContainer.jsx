import React from 'react'

import { connect } from 'react-redux'

import { interfaceService } from 'services'

const ConfirmDeleteContainer = props => {

	const {
		toggleModal,
	} = props

	const handleSubmit = () => {

		// TODO: Sumbit the delete

		toggleModal()
	}

	const handleCancel = () => {
		toggleModal()
	}

	return (
		<div>
			Are you sure you want to delete this item?
			<button onClick={handleSubmit}>yes</button>
			<button onClick={handleCancel}>no</button>
		</div>
	)
}

const mapStoreToProps = store => ({

})

const mapThunksToProps = {
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStoreToProps, mapThunksToProps)(ConfirmDeleteContainer)
