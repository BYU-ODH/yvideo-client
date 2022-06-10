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

	const sayHello = () => {
		console.log('hello')
	}

	useEffect(() => {
	}, [fileCache])

	const handleFileVersion = e => {
		setFileState({
			...fileState,
			"file-version": e.target.value,
		})
		sayHello()
	}

	const handleFileMetadata = e => {
		setFileState({
			...fileState,
			metadata: e.target.value,
		})
		sayHello()
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
		fileState,
	}

	const handlers = {
		handleFileMetadata,
		handleFileVersion,
		handleUpdateFile,
		handleRemoveFile,
		sayHello,
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
