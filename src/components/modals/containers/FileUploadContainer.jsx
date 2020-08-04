import React, { useState } from 'react'
import { connect } from 'react-redux'

import {
	interfaceService,
	fileService,
	resourceService,
} from 'services'

import FileUpload from 'components/modals/components/FileUpload'

const FileUploadContainer = props => {

	const {
		// resource id from the Resource Overview Container
		resourceId,
		toggleModal,
		resource,
		uploadFile,
		getResource,
	} = props

	const [selectedFile, setSelectedFile] = useState()

	const handleFileChange = e =>{
		setSelectedFile(e.target.files[0])
	}

	const handleFileUpload = async(e) =>{
		e.preventDefault()

		getResource(resourceId)

		const formData = new FormData()
		formData.append(`file`, selectedFile)
		formData.append(`resource-id`, resourceId)
		formData.append(`file-version`, resource.allFileVersions)
		formData.append(`mime`, ``)
		formData.append(`metadata`, ``)

		uploadFile(formData)
		toggleModal()
	}

	const viewstate = {
		selectedFile,
	}

	const handlers = {
		handleFileChange,
		handleFileUpload,
		toggleModal,
	}

	return <FileUpload viewstate={viewstate} handlers={handlers}/>
}

const mapStateToProps = store => ({
	modal: store.interfaceStore.modal,
	resource: store.resourceStore.cache,
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
	uploadFile: fileService.upload,
	getResource: resourceService.getResource,
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadContainer)