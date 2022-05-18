import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {
	interfaceService,
	adminService,
} from 'services'

import AddUsers from 'components/modals/components/AddUsers'

const AddUsersContainer = props => {

	const [usernames, setUsernames] = useState(``)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const {
		toggleModal,
		user,
		addUsers,
		addedUsersResult,
		emptyAddedUsersResult,
	} = props

	useEffect(() => {

	}, [addedUsersResult])

	const handleIdChange = ( value ) => {
		setUsernames(value)
		setIsSubmitted(false)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const usernamesArray = usernames.split(`\n`)
		// eslint-disable-next-line no-unused-vars
		const result = await addUsers(usernamesArray)
		setIsSubmitted(true)
	}

	const handleClose = () => {
		emptyAddedUsersResult()
		toggleModal()
	}

	const viewstate = {
		addedUsersResult,
		user,
		isSubmitted,
	}

	const handlers = {
		handleIdChange,
		handleSubmit,
		handleClose,
	}

	return <AddUsers viewstate={viewstate} handlers={handlers}/>
}

const mapStateToProps = store => ({
	modal: store.interfaceStore.modal,
	user: store.authStore.user,
	addedUsersResult: store.adminStore.addedUsers,
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
	addUsers: adminService.addUsers,
	emptyAddedUsersResult: adminService.emptyAddedUsersResult,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUsersContainer)