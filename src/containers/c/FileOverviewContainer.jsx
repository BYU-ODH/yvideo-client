import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { FileOverview } from 'components'

import { isChrome } from 'react-device-detect'

import DeleteConfirmContainer from '../../components/modals/containers/DeleteConfirmContainer'
import PreviewFilesContainer from '../../components/modals/containers/PreviewFilesContainer'

import { interfaceService, fileService, resourceService } from 'services'

const FileOverviewContainer = props => {

	const {
		file,
		langs,
		updateFile,
		fileCache,
		toggleModal,
		editFileResource,
		handleFilesUpdated,
	} = props

	const [fileState, setFileState] = useState(file)

	useEffect(() => {
	}, [fileCache])

	const handleFileVersion = e => {
		setFileState({
			...fileState,
			"file-version": e.target.value,
		})
	}

	const handleFileMetadata = e => {
		setFileState({
			...fileState,
			metadata: e.target.value,
		})
	}

	const checkDevice = () => {
		if(isChrome)
			alert(`good job`)
	}

	const handleUpdateFile = e => {
		e.preventDefault()
		updateFile(file.id, fileState)
		editFileResource(fileState[`resource-id`], fileState)
		handleFilesUpdated(true)
	}

	const handleRemoveFile = e => {
		toggleModal()
		props.toggleModal({
			component: DeleteConfirmContainer,
			props: {
				type: `file`,
				selectedFile: file,
			},
		})

	}

	const handlePreviewFile = () => {
		toggleModal({
			component: PreviewFilesContainer,
			props: {
				file,
				resourceId: fileState[`resource-id`],
				fileState,
			},
		})
	}

	const viewstate = {
		file,
		langs,
		fileState,
	}

	const handlers = {
		handleFileMetadata,
		handleFileVersion,
		handleUpdateFile,
		handleRemoveFile,
		checkDevice,
		handlePreviewFile,
	}

	return <FileOverview viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	fileCache: store.fileStore.cache,
	resources: store.resourceStore.cache,
	langs: store.languageStore.cache.langs,
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
	editFileResource: resourceService.editFile,
	updateFileVersion: resourceService.updateFileVersion,
	updateFile: fileService.update,
	removeFile: fileService.delete,
}

export default connect(mapStateToProps, mapDispatchToProps)(FileOverviewContainer)
