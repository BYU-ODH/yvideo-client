import React from 'react'
import { connect } from 'react-redux'

import EditSearchItem from '../components/EditSearchItem'

import { roles } from 'models/User'

import {
	adminService,
} from 'services'

const EditSearchItemContainer = props => {

	const {
		adminDeleteCollection,
		adminDeleteUser,
		lowClick,
		position,
		data,
		category,
		close,
	} = props

	const deleteConfirmed = () => {
		switch (category) {
			case 'Users':
				handleDeleteUser()
				break;

			case 'Collections':
				handleDeleteCollection()
				break;

			case 'Content':
				handleDeleteContent()
				break;

			default:
				break;
		}
	}

	const handleDeleteCollection = () => {
		console.log(data, 'Called delete collection')
		adminDeleteCollection(data.ID)
	}

	const handleDeleteUser = () => {
		console.log(data, 'Called delete user')
		adminDeleteUser(data.ID)
	}

	const handleDeleteContent = () => {
		console.log(data, 'Called delete content')
	}

	const handlers = {
		close,
		deleteConfirmed,
	}

	const viewstate = {
		data, category, position, lowClick
	}

	return <EditSearchItem viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	admin: store.authStore.user.roles.includes(roles.admin),
	adminContent: store.adminStore.data,
})

const mapDispatchToProps = {
	search: adminService.search,
	adminDeleteCollection: adminService.deleteCollection,
	adminDeleteUser: adminService.deleteUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSearchItemContainer)