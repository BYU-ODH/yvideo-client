import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
	interfaceService,
	resourceService,
	fileService,
} from 'services'

import ManageFiles from 'components/modals/components/ManageFiles'

const ManageFilesContainer = props => {

	const {
		modal,
		user,
		files,
		toggleModal,
	} = props

	const viewstate = {
		files,
	}

	const handlers = {
		toggleModal,
	}

	return <ManageFiles viewstate={viewstate} handlers={handlers}/>
}

const mapStateToProps = store => ({
	modal: store.interfaceStore.modal,
	user: store.authStore.user,
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
	addResource: resourceService.addResource,
	uploadFile: fileService.upload,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageFilesContainer)