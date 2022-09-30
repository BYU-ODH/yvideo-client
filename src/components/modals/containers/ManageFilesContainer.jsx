import React, { useState } from 'react'
import { connect } from 'react-redux'

import {
	interfaceService,
	resourceService,
	fileService,
} from 'services'

import ManageFiles from 'components/modals/components/ManageFiles'

const ManageFilesContainer = props => {

	const [filesUpdated, setFilesUpdated] = useState(false)

	const {
		files,
		toggleModal,
	} = props

	const handleFilesUpdated = (boolean) => {
		setFilesUpdated(boolean)
	}

	const viewstate = {
		files,
		filesUpdated,
	}

	const handlers = {
		toggleModal,
		handleFilesUpdated,
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