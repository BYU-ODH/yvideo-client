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
	const [ list, setList ] = useState([])
	const [ id, setId ] = useState("")
	const viewState = { list, id }

	const handleNewId = ( e ) => {
		e.preventDefault()
		let temp = id.split('\n')
		let body = {
			usernames: temp,
			["account-role"]: 1
		}
		updateMany(props.collectionId, body)
		toggleModal()
	}

	const handleIdChange = ( value ) => {
		setId(value)
	}

	const handler = {
		handleNewId,
		handleIdChange,
		toggleModal,
	}
	console.log(list)
	console.log(id)

	return <AddBatchNetids viewState={ viewState } handler={ handler }/>
}

const mapStateToProps = store => ({
})

const mapDispatchToProps = {
	updateMany: collectionService.updateMany,
	toggleModal: interfaceService.toggleModal
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBatchNetidsContainer)