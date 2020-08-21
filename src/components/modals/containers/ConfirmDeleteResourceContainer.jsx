import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {
	interfaceService,
	fileService,
	resourceService,
} from 'services'

import ConfirmDeleteResource from '../components/ConfirmDeleteResource'

const ConfirmDeleteResourceContainer = props => {

	const {
		// resource id from the Resource Overview Container
		resourceId,
		toggleModal,
		removeResource,
	} = props

	const handleRemoveResource = e =>{
		removeResource(resourceId)
		toggleModal()
	}

	const viewstate = {
		resourceId,
	}

	const handlers = {
		handleRemoveResource,
		toggleModal,
	}

	return <ConfirmDeleteResource viewstate={viewstate} handlers={handlers}/>
}

const mapStateToProps = store => ({
	user: store.authStore.user,
	modal: store.interfaceStore.modal,
	resources: store.resourceStore.cache,
})

const mapDispatchToProps = {
	removeResource: resourceService.removeResource,
	toggleModal: interfaceService.toggleModal,
	uploadFile: fileService.upload,
	updateFileVersion: resourceService.updateFileVersion,
	getResource: resourceService.getResource,
	getFiles: resourceService.getFiles,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteResourceContainer)