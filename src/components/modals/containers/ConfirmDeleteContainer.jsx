import React from 'react'
import { connect } from 'react-redux'

import ConfirmDelete from '../components/ConfirmDelete'

import { roles } from 'models/User'

import {
	adminService,
	interfaceService
} from 'services'


//This component takes two parameters. menuItemInfo which is the object to be deleted and category so the component knows
//what type of delete it should perform. Ths component is called from AdminContainer using toggleModal passing component and props
//To close this modal toggleModal is called without passing any parameters

const ConfirmDeleteContainer = props => {

	const {
		adminDeleteCollection,
		adminDeleteUser,
		adminDeleteContent,
		toggleModal,
		menuItemInfo,
		searchCategory
	} = props

	const deleteConfirmed = () => {
		toggleModal()
		switch (searchCategory) {
		case `Users`:
			handleDeleteUser()
			break

		case `Collections`:
			handleDeleteCollection()
			break

		case `Content`:
			handleDeleteContent()
			break

		default:
			break
		}
	}

	const handleDeleteCollection = () => {
		console.log(menuItemInfo, `Called delete collection`)
		adminDeleteCollection(menuItemInfo.id)
	}

	const handleDeleteUser = () => {
		console.log(menuItemInfo, `Called delete user`)
		adminDeleteUser(menuItemInfo.id)
	}

	const handleDeleteContent = () => {
		console.log(menuItemInfo, `Called delete content`)
		adminDeleteContent(menuItemInfo.id)
	}

	const handlers = {
		toggleModal,
		deleteConfirmed,
	}

	return <ConfirmDelete handlers={handlers} searchCategory={searchCategory}/>
}

const mapStateToProps = store => ({
	admin: store.authStore.user.roles.includes(roles.admin),
	adminContent: store.adminStore.data,
})

const mapDispatchToProps = {
	search: adminService.search,
	adminDeleteCollection: adminService.deleteCollection,
	adminDeleteUser: adminService.deleteUser,
	adminDeleteContent: adminService.deleteContent,
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteContainer)