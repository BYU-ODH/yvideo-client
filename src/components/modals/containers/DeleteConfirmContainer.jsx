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
		selectedFile,
		toggleModal,
		removeResource,
		removeFile,
		resources,
		editFileResource,
		updateFileVersion,
		adminDeleteCollection,
		adminDeleteUser,
		adminDeleteContent,
		editResource,
	} = props

	const [title, setTitle] = useState(``)

	useEffect(() => {
		// eslint-disable-next-line default-case
		switch(type) {
		case `resource`:
			setTitle(resources[id].resourceName)
			break
		case `file`:
			setTitle(selectedFile.filepath)
			break
		case `Users`:
			setTitle(menuItemInfo.name)
			break
		case `Collections`:
			setTitle(menuItemInfo.name)
			break
		case `Content`:
			setTitle(menuItemInfo.name)
			break
		}
	}, [selectedFile, id, resources, type, menuItemInfo])

	const handleRemoveItem = async(e) =>{
		e.preventDefault()

		if(type === `resource`)
			removeResource(id)
		else if(type === `Users`)
			handleDeleteUser()
		else if(type === `Collections`)
			handleDeleteCollection()
		else if(type === `Content`)
			handleDeleteContent()
		else if(type === `file`){
			const fileResourceId = selectedFile[`resource-id`]
			const resource = resources[fileResourceId]
			const allFileVersions = resource.allFileVersions.split(`;`)
			const arr = []

			allFileVersions.forEach(item => {
				if(item !== selectedFile[`file-version`]) arr.push(item)
			})

			const newAllFileVersions = arr.join(`;`)
			resource.allFileVersions = newAllFileVersions

			// console.log(newAllFileVersions)

			await removeFile(selectedFile.id)
			// file edit does not have api call
			await editFileResource(fileResourceId, selectedFile, false)

			// await updateFileVersion(resource, newAllFileVersions)
			// console.log(resource.allFileVersions)
			await editResource(resource, fileResourceId, selectedFile)
		}

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
	editResource: resourceService.editResource,
	getResource: resourceService.getResource,
	getFiles: resourceService.getFiles,
	adminDeleteCollection: adminService.deleteCollection,
	adminDeleteUser: adminService.deleteUser,
	adminDeleteContent: adminService.deleteContent,
}
export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirmContainer)