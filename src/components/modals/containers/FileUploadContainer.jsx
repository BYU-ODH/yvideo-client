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
		didUpdate,
		updateStatus,
		filesCache,
	} = props

	const [selectedFile, setSelectedFile] = useState()

	const [fileVersion, setFileVersion] = useState(langs[0])

	const [customLang, setCustomLang] = useState(``)

	const [metadata, setMetadata] = useState(``)

	const [progress, setProgress] = useState(0)

	const [isUploadComplete, setIsUploadComplete] = useState(false)

	const [isOther, setIsOther] = useState(false)

	const [doesGetFiles, setDoesGetFiles] = useState(false)

	// const [didUpload, setDidUpload] = useState(0)

	const [fileCount, setFileCount] = useState(0)

	useEffect(() => {
		if(isUploadComplete){
			setIsUploadComplete(false)
			// setFileCount(resources[resourceId].files.length)
			getUploadedFiles()
		}

		if(doesGetFiles)
			exitout()

	}, [resources, resourceId, doesGetFiles, didUpdate])

	// this needs to save resource at the end of it
	async function getUploadedFiles() {
		setDoesGetFiles(true)

		// this causes the problem, it calls before updates db
		// setTimeout(async() => {
		// 	await getFiles(resourceId)
		// }, 3000)
		if(didUpdate)
			await getFiles(resourceId)

	}

	function exitout(){
		setDoesGetFiles(false)
		setTimeout(() => {
			toggleModal()
		}, 2000)
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

	const handleFileName = e =>{
		e.preventDefault()
		setMetadata(e.target.value)
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
		formData.append(`metadata`, metadata)
		formData.append(`aspect-ratio`, '')

		const result = await uploadFile(formData, (event) => {
			const percent = Math.round(100 * event.loaded / event.total)
			setProgress(percent)
			if(percent === 100)
				setIsUploadComplete(true)
		})
		updateStatus(true)
	}

	const viewstate = {
		customLang,
		isOther,
		selectedFile,
		langs,
		progress,
		metadata,
	}

	const handlers = {
		handleFileChange,
		handleFileVersion,
		handleFileUpload,
		handleOtherLanguage,
		handleCancelUpload,
		handleFileName,
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
	didUpdate: store.resourceStore.update,
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
	uploadFile: fileService.upload,
	updateFileVersion: resourceService.updateFileVersion,
	editFileResource: resourceService.editFile,
	updateStatus: resourceService.updateStatus,
	getResource: resourceService.getResource,
	getFiles: resourceService.getFiles,
	getLanguages: languageService.get,
	removeFile: fileService.delete,
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadContainer)