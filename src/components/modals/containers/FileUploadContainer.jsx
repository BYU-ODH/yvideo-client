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
		resources,
		resourceId,
		toggleModal,
		uploadFile,
		getFiles,
		langs,
		filesCache,
	} = props

	const [selectedFile, setSelectedFile] = useState()

	const [fileVersion, setFileVersion] = useState(langs[0])

	const [customLang, setCustomLang] = useState(``)

	const [progress, setProgress] = useState(0)

	const [isUploadComplete, setIsUploadComplete] = useState(false)

	const [isOther, setIsOther] = useState(false)

	const [doesGetFiles, setDoesGetFiles] = useState(false)

	const [fileCount, setFileCount] = useState(0)

	useEffect(() => {
		if(isUploadComplete){
			setFileCount(resources[resourceId].files.length)
			getUploadedFiles()
		}

	}, [selectedFile, isUploadComplete, doesGetFiles, fileCount, Object.keys(filesCache).length])

	async function getUploadedFiles() {
		setIsUploadComplete(false)
		setDoesGetFiles(true)

		// this causes the problem, it calls before updates db
		// await getFiles(resourceId)
		setTimeout(() => {
			getFiles(resourceId)
			toggleModal()
		}, 3000)
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

	const handleFileUpload = async (e) =>{
		e.preventDefault()

		const formData = new FormData()
		formData.append(`file`, selectedFile)
		formData.append(`resource-id`, resourceId)
		formData.append(`file-version`, fileVersion)
		formData.append(`mime`, ``)
		formData.append(`metadata`, ``)

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
	filesCache: store.fileStore.cache,
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