import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { FileOverview } from 'components'

import DeleteConfirmContainer from '../../components/modals/containers/DeleteConfirmContainer'

import { interfaceService, fileService, resourceService } from 'services'

const FileOverviewContainer = props => {

	const {
		file,
		langs,
		updateFile,
		fileCache,
		toggleModal,
		editFileResource,
		// resources,
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

	const handleUpdateFile = e => {
		e.preventDefault()
		updateFile(file.id, fileState)
		editFileResource(fileState[`resource-id`], fileState)
		toggleModal()
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

	const viewstate = {
		file,
		langs,
	}

	const handlers = {
		handleFileMetadata,
		handleUpdateFile,
		handleRemoveFile,
		handleFileVersion,
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
	removeFile: fileService.delete,
	updateFile: fileService.update,
}

export default connect(mapStateToProps, mapDispatchToProps)(FileOverviewContainer)