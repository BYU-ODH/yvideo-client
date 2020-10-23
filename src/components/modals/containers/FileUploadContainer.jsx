import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {
	interfaceService,
	fileService,
	resourceService,
	languageService,
} from 'services'

import FileUpload from 'components/modals/components/FileUpload'

const FileUploadContainer = props => {

	const {
		// resource id from the Resource Overview Container
		resourceId,
		toggleModal,
		uploadFile,
		getFiles,
		langs,
	} = props

	const category = {
		English: {
			name: `English`,
		},
		French: {
			name: `French`,
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
		Other: {
			name: `Other`,
		},
	}

	const [selectedFile, setSelectedFile] = useState()

	const [fileVersion, setFileVersion] = useState(langs[0])

	const [customLang, setCustomLang] = useState(``)

	const [isOther, setIsOther] = useState(false)

	const handleFileChange = e =>{
		setSelectedFile(e.target.files[0])
	}

	const handleFileVersion = e => {
		e.preventDefault()
		setFileVersion(e.target.value)

		if(e.target.value !== `Other`)
			setIsOther(false)
		else{
			setIsOther(true)
			setFileVersion(customLang)
		}
	}

	const handleOtherLanguage = e => {
		e.preventDefault()
		setCustomLang(e.target.value)
	}

	// customized langs need to be fixed, got 500
	const handleFileUpload = async(e) =>{
		e.preventDefault()

		const formData = new FormData()
		formData.append(`file`, selectedFile)
		formData.append(`resource-id`, resourceId)
		formData.append(`file-version`, fileVersion)
		formData.append(`mime`, ``)
		formData.append(`metadata`, ``)

		await uploadFile(formData)
		await getFiles(resourceId)

		toggleModal()
	}

	const viewstate = {
		category,
		customLang,
		isOther,
		selectedFile,
		langs,
	}

	const handlers = {
		handleFileChange,
		handleFileVersion,
		handleFileUpload,
		handleOtherLanguage,
		toggleModal,
	}

	return <FileUpload viewstate={viewstate} handlers={handlers}/>
}

const mapStateToProps = store => ({
	user: store.authStore.user,
	modal: store.interfaceStore.modal,
	resources: store.resourceStore.cache,
	langs: store.languageStore.cache.langs,
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
	uploadFile: fileService.upload,
	updateFileVersion: resourceService.updateFileVersion,
	getResource: resourceService.getResource,
	getFiles: resourceService.getFiles,
	getLanguages: languageService.get,
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadContainer)