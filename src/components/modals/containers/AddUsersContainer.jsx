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

		// props.setLoaded(true)
		const result = await addUsers(usernamesArray)
		setIsSubmitted(true)

		// console.log(result)

		// console.log(`${result.length} success out of ${usernamesArray.length}`)
		// toggleModal()
	}

	const viewstate = {
		addedUsersResult,
		user,
		isSubmitted,
	}

	const handlers = {
		handleIdChange,
		handleSubmit,
		toggleModal,
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
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUsersContainer)