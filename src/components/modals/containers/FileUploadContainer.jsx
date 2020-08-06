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

	const category = {
		English: {
			name: `English`,
		},
		Franch: {
			name: `Franch`,
		},
		Mandarin: {
			name: `Mandarin`,
		},
		Japanese: {
			name: `Japanese`,
		},
		Spainsh: {
			name: `Spanish`,
		},
		Korean: {
			name: `Korean`,
		},
	}

	const [selectedFile, setSelectedFile] = useState()

	const [fileVersion, setFileVersion] = useState(category.English.name)

	const handleFileChange = e =>{
		setSelectedFile(e.target.files[0])
	}

	const updateFileVersion = e => {
		e.preventDefault()
		setFileVersion(e.target.value)
	}

	const handleFileUpload = async(e) =>{
		e.preventDefault()

		getResource(resourceId)

		const formData = new FormData()
		formData.append(`file`, selectedFile)
		formData.append(`resource-id`, resourceId)
		formData.append(`file-version`, fileVersion)
		formData.append(`mime`, ``)
		formData.append(`metadata`, ``)

		console.log(formData)
		uploadFile(formData)
		toggleModal()
	}

	const viewstate = {
		category,
		selectedFile,
	}

	const handlers = {
		updateFileVersion,
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