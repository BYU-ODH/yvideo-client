import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {
	interfaceService,
	fileService,
	resourceService,
	adminService,
} from 'services'

import DeleteConfirm from '../components/DeleteConfirm'

const DeleteConfirmContainer = props => {

	const {
		type,
		menuItemInfo,
		id,
		file,
		toggleModal,
		removeResource,
		removeFile,
		resources,
		editFileResource,
		updateFileVersion,
		adminDeleteCollection,
		adminDeleteUser,
		adminDeleteContent,
	} = props

	const [title, setTitle] = useState(``)

	useEffect(() => {
		if(type === `resource`)
			setTitle(resources[id].resourceName)
		else if(type === `file`)
			setTitle(file.filepath)
		else if(type === `Users` || type === `Collections` || type === `Content`)
			setTitle(menuItemInfo.name)
	}, [file, id, resources, type, menuItemInfo])

	const handleRemoveItem = e =>{
		e.preventDefault()
		if(type === `resource`)
			removeResource(id)
		else if(type === `file`){
			removeFile(file.id)
			editFileResource(file[`resource-id`], file, false)

			const fileResourceId = file[`resource-id`]
			const resource = resources[fileResourceId]
			const allFileVersions = resource.allFileVersions.split(`;`)
			const arr = []
			allFileVersions.forEach(item => {
				if(item !== file[`file-version`]) arr.push(item)
			})
			const newAllFileVersions = arr.join(`;`)
			updateFileVersion(resource, newAllFileVersions)
		} else if(type === `Users`)
			handleDeleteUser()

		else if(type === `Collections`)
			handleDeleteCollection()

		else if(type === `Content`)
			handleDeleteContent()

		toggleModal()
	}

	const viewstate = {
		resources,
		title,
		type,
		id,
	}

	const handleDeleteCollection = () => {
		adminDeleteCollection(menuItemInfo.id)
	}

	const handleDeleteUser = () => {
		adminDeleteUser(menuItemInfo.id)
	}

	const handleDeleteContent = () => {
		adminDeleteContent(menuItemInfo.id, true)
	}

	const handlers = {
		handleRemoveItem,
		toggleModal,
	}

	return <DeleteConfirm viewstate={viewstate} handlers={handlers}/>
}

const mapStateToProps = store => ({
	user: store.authStore.user,
	modal: store.interfaceStore.modal,
	resources: store.resourceStore.cache,
})

const mapDispatchToProps = {
	removeResource: resourceService.removeResource,
	editFileResource: resourceService.editFile,
	toggleModal: interfaceService.toggleModal,
	removeFile: fileService.delete,
	uploadFile: fileService.upload,
	updateFileVersion: resourceService.updateFileVersion,
	getResource: resourceService.getResource,
	getFiles: resourceService.getFiles,
	adminDeleteCollection: adminService.deleteCollection,
	adminDeleteUser: adminService.deleteUser,
	adminDeleteContent: adminService.deleteContent,
}
// ConfirmDeleteResourceContainer
export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirmContainer)