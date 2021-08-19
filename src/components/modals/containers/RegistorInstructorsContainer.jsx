import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {
	interfaceService,
	fileService,
	resourceService,
	languageService,
	adminService,
} from 'services'

import RegisterrInstructors from 'components/modals/components/RegisterInstructors'

const RegistorInstructorsContainer = props => {

	const {
		toggleModal,
		data,
		search,
	} = props

	const [searchQuery, setSearchQuery] = useState(``)

	useEffect(() => {

	}, [])

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

	const viewstate = {
		searchQuery,
		data,
	}

	const handlers = {
		handleRegister,
		updateSearchBar,
		handleSearchSubmit,
		toggleModal,
	}

	return <RegisterrInstructors viewstate={viewstate} handlers={handlers}/>
}

const mapStateToProps = store => ({
	user: store.authStore.user,
	data: store.adminStore.data,
	modal: store.interfaceStore.modal,
	resources: store.resourceStore.cache,
	langs: store.languageStore.cache.langs,
	filesCache: store.fileStore.cache,
})

const mapDispatchToProps = {
	search: adminService.search,
	toggleModal: interfaceService.toggleModal,
	uploadFile: fileService.upload,
	updateFileVersion: resourceService.updateFileVersion,
	editFileResource: resourceService.editFile,
	getResource: resourceService.getResource,
	getFiles: resourceService.getFiles,
	getLanguages: languageService.get,
	removeFile: fileService.delete,
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistorInstructorsContainer)