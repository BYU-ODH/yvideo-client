import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { FileOverview } from 'components'

import { interfaceService, fileService } from 'services'

const FileOverviewContainer = props => {

	const {
		file,
		removeFile,
		updateFile,
		fileCache,
	} = props

	const [fileState, setFileState] = useState(file)

	useEffect(() => {

		console.log(fileCache)
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
	}

	const handleRemoveFile = e => {
		removeFile(file.id)
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
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
	removeFile: fileService.delete,
	updateFile: fileService.update,
}

export default connect(mapStateToProps, mapDispatchToProps)(FileOverviewContainer)