import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { FileOverview } from 'components'

import { interfaceService, fileService } from 'services'

const FileOverviewContainer = props => {

	const {
		file,
		removeFile,
	} = props

	const viewstate = {
		file,
	}

	const handleRemoveFile = e => {
		removeFile(file.id)
	}

	const handlers = {
		handleRemoveFile,
	}

	return <FileOverview viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
	removeFile: fileService.delete,
}

export default connect(mapStateToProps, mapDispatchToProps)(FileOverviewContainer)