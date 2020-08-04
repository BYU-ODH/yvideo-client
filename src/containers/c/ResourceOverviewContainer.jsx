import React, { useState } from 'react'
import { connect } from 'react-redux'
import FileUploadContainer from 'components/modals/containers/FileUploadContainer'

import {
	resourceService,
	interfaceService,
} from 'services'

import {
	ResourceOverview,
} from 'components'

import { objectIsEmpty } from 'lib/util'

const ResourceOverviewContainer = props => {

	const {
		user,
		resource,
		editResource,
		removeResource,
		getResourceFiles,
		resourceStore,
		fileId,
	} = props

	const [editing, setEditing] = useState(false)
	const [showing, setShowing] = useState(false)
	const [resourceState, setResourceState] = useState(resource)
	const [files, setFiles] = useState()

	if (objectIsEmpty(resource)) return null

	const handleFileUploadToResource = () => {
		props.toggleModal({
			component: FileUploadContainer,
			props: {
				resourceId: resource.id,
			},
		})
	}

	const handleToggleEdit = async () => {
		const newFiles = await getResourceFiles(resource.id)
		const id = resource.id
		console.log(resourceStore[id])
		// console.log(newFiles)
		// setFiles(newFiles)

		if (editing) {
			await editResource(resourceState, resourceState.id)
			setShowing(false)
			setTimeout(() => {
				setEditing(false)
			}, 500)
		} else setEditing(true)
	}

	const handleResourceName = e => {
		setResourceState({
			...resourceState,
			resourceName: e.target.value,
		})
	}

	const handleResourceEmail = e => {
		setResourceState({
			...resourceState,
			requesterEmail: e.target.value,
		})
	}

	const handleResourceMetadata = e => {
		setResourceState({
			...resourceState,
			metadata: e.target.value,
		})
	}

	const handleTypeChange = e => {
		setResourceState({
			...resourceState,
			resourceType: e.target.dataset.type,
		})
	}

	const handleRemoveResource = e => {
		removeResource(resource.id)
		setTimeout(() => {
			setEditing(false)
		}, 500)
	}

	const handleTogglePublish = e => {
		setResourceState({
			...resourceState,
			published: !resourceState.published,
		})
	}

	const handleToggleCopyRighted = e => {
		setResourceState({
			...resourceState,
			copyrighted: !resourceState.copyrighted,
		})
	}

	const handleTogglePhysicalCopyExists = e => {
		setResourceState({
			...resourceState,
			physicalCopyExists: !resourceState.physicalCopyExists,
		})
	}

	const handleToggleFullVideo = e => {
		setResourceState({
			...resourceState,
			fullVideo: !resourceState.fullVideo,
		})
	}

	const handleMetadata = e => {
		setResourceState({
			...resourceState,
			metadata: e.target.value,
		})
	}

	const handleFiles = async(e) => {
		getResourceFiles(resource.id)
		console.log(files)
	}

	const viewstate = {
		resource: resourceState,
		files,
		fileId,
		showing,
		editing,
	}

	const handlers = {
		handleFileUploadToResource,
		handleFiles,
		handleResourceName,
		handleResourceMetadata,
		handleRemoveResource,
		handleToggleEdit,
		handleTogglePublish,
		handleTogglePhysicalCopyExists,
		handleToggleCopyRighted,
		handleToggleFullVideo,
		setResourceState,
		setShowing,
		handleTypeChange,
		handleResourceEmail,
		handleMetadata,
	}

	return <ResourceOverview viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	fileId: store.fileStore.cache,
	resourceStore: store.resourceStore.cache,
})

const mapDispatchToProps = {
	removeResource: resourceService.removeResource,
	editResource: resourceService.editResource,
	toggleModal: interfaceService.toggleModal,
	getResourceFiles: resourceService.getFiles,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceOverviewContainer)