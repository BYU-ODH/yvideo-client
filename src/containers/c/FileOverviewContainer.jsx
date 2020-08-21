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
		toggleModal()
	}

	const handleRemoveFile = e => {
		e.preventDefault()
		removeFile(file.id)
		editFileResource(fileState[`resource-id`], file, false)

		// TODO: need to update file version onto resource
		const fileResourceId = fileState[`resource-id`]
		const resource = resources[fileResourceId]
		const allFileVersions = resource.allFileVersions.split(`;`)
		const arr = []
		allFileVersions.forEach(item => {
			if(item !== file[`file-version`]) arr.push(item)
		})
		const newAllFileVersions = arr.join(`;`)
		updateFileVersion(resource, newAllFileVersions)
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