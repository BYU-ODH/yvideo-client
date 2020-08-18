import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { FileOverview } from 'components'

import { interfaceService, fileService, resourceService } from 'services'

const FileOverviewContainer = props => {

	const {
		file,
		removeFile,
		updateFile,
		fileCache,
		toggleModal,
		editFileResource,
		resources,
		updateFileVersion,
	} = props

	const [fileState, setFileState] = useState(file)

	useEffect(() => {
	}, [fileCache])

	const viewstate = {
		file,
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

		// TODO: need to update file version onto resource
		// updateFileVersion(fileState)
		toggleModal()
	}

	console.log(resources)

	const handleRemoveFile = e => {
		e.preventDefault()
		removeFile(file.id)
		editFileResource(fileState[`resource-id`], file, false)
		toggleModal()
	}

	const handlers = {
		handleFileMetadata,
		handleUpdateFile,
		handleRemoveFile,
	}

	return <FileOverview viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	fileCache: store.fileStore.cache,
	resources: store.resourceStore.cache,
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
	editFileResource: resourceService.editFile,
	updateFileVersion: resourceService.updateFileVersion,
	removeFile: fileService.delete,
	updateFile: fileService.update,
}

export default connect(mapStateToProps, mapDispatchToProps)(FileOverviewContainer)