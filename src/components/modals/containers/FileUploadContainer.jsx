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

	const [selectedFile, setSelectedFile] = useState()

	const [fileVersion, setFileVersion] = useState(langs[0])

	const [customLang, setCustomLang] = useState(``)

	const [progress, setProgress] = useState(0)

	const [isUploadComplete, setIsUploadComplete] = useState(false)

	const [isOther, setIsOther] = useState(false)

	useEffect(() => {

		if(isUploadComplete){
			getUploadedFiles()
			toggleModal()
		}

	}, [selectedFile, isUploadComplete])

	async function getUploadedFiles() {
		setIsUploadComplete(false)
		await getFiles(resourceId)
	}

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

	const handleCancelUpload = e => {
		e.preventDefault()
		toggleModal()
	}

	// TODO: need to change this to upload when hit the upload. progress when they hit upload button.
	const handleFileUpload = async (e) =>{
		e.preventDefault()

		const formData = new FormData()
		formData.append(`file`, selectedFile)
		formData.append(`resource-id`, resourceId)
		formData.append(`file-version`, fileVersion)
		formData.append(`mime`, ``)
		formData.append(`metadata`, ``)

		// uploadFile(formData)
		uploadFile(formData, (event) => {
			const percent = Math.round(100 * event.loaded / event.total)
			setProgress(percent)
			if(percent === 100)
				setIsUploadComplete(true)
		})
	}

	const viewstate = {
		customLang,
		isOther,
		selectedFile,
		langs,
		progress,
	}

	const handlers = {
		handleFileChange,
		handleFileVersion,
		handleFileUpload,
		handleOtherLanguage,
		handleCancelUpload,
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
	editFileResource: resourceService.editFile,
	getResource: resourceService.getResource,
	getFiles: resourceService.getFiles,
	getLanguages: languageService.get,
	removeFile: fileService.delete,
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadContainer)