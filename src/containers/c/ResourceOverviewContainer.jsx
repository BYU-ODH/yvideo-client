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
	} = props

	const [editing, setEditing] = useState(false)
	const [showing, setShowing] = useState(false)

	const [resourceState, setResourceState] = useState(resource)

	if (objectIsEmpty(resource)) return null

	const handleFileUploadToResource = () => {
		props.toggleModal({
			component: FileUploadContainer,
		})
	}

	const handleToggleEdit = async () => {
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
		console.log(resourceState)
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

	const viewstate = {
		resource: resourceState,
		showing,
		editing,
	}

	const handlers = {
		handleFileUploadToResource,
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

const mapDispatchToProps = {
	removeResource: resourceService.removeResource,
	editResource: resourceService.editResource,
	toggleModal: interfaceService.toggleModal,
}

export default connect(null, mapDispatchToProps)(ResourceOverviewContainer)