import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {
	interfaceService,
	adminService,
	resourceService,
} from 'services'

import ManageInstructors from 'components/modals/components/ManageInstructors'

const ManageInstructorsContainer = props => {

	const {
		toggleModal,
		data,
		search,
		resource,
		addAccess,
		resourceAccess,
		readAccess,
		removeAccess,
	} = props

	const [searchQuery, setSearchQuery] = useState(``)
	const [countAccess, setCountAccess] = useState(0)

	// add default user after creating new resource
	useEffect(() => {

		if(countAccess !== resourceAccess.length){
			readAccess(resource.id)
			setCountAccess(resourceAccess.length)
		}

	}, [resourceAccess])

	const handleRegister = async (e) =>{
		e.preventDefault()
	}

	const updateSearchBar = e => {
		const { value } = e.target
		setSearchQuery(value)
	}
	const handleSearchSubmit = e => {
		e.preventDefault()
		search(`user`, searchQuery, true)
	}

	const addInstructor = async(username) => {
		// keep this for search function
		// if(username){
		// 	await addAccess(resource.id, username)
		// 	await readAccess(resource.id)
		// } else
		// 	console.log(`alrady registered`)

		if(searchQuery.length > 0){
			await addAccess(resource.id, searchQuery)
			await readAccess(resource.id)
		}
	}

	const removeInstructor = async(username) => {
		if(username)
			await removeAccess(resource.id, username)
	}

	const viewstate = {
		searchQuery,
		data,
		resourceAccess: resourceAccess[resource.id],
	}

	const handlers = {
		handleRegister,
		updateSearchBar,
		handleSearchSubmit,
		toggleModal,
		addInstructor,
		removeInstructor,
	}

	return <ManageInstructors viewstate={viewstate} handlers={handlers}/>
}

const mapStateToProps = store => ({
	user: store.authStore.user,
	data: store.adminStore.data,
	modal: store.interfaceStore.modal,
	resources: store.resourceStore.cache,
	resourceAccess: store.resourceStore.access,
	langs: store.languageStore.cache.langs,
	filesCache: store.fileStore.cache,
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
	search: adminService.search,
	addAccess: resourceService.addAccess,
	readAccess: resourceService.readAccess,
	removeAccess: resourceService.removeAccess,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageInstructorsContainer)