import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import FileUploadContainer from 'components/modals/containers/FileUploadContainer'
import ManageFilesContainer from 'components/modals/containers/ManageFilesContainer'

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
		resourceCache,
		fileId,
		updateAllFileVersions,
		thisfiles,
	} = props

	const [editing, setEditing] = useState(false)
	const [showing, setShowing] = useState(false)
	const [resourceState, setResourceState] = useState(resource)
	const [files, setFiles] = useState([])
	const [fileVersions, setFileVersions] = useState(0)
	// const [allFileVersions, setAllFileVersions] = useState(``)

	useEffect(() => {

		if(editing && resourceCache[resource.id].files !== undefined)
			setFiles(resourceCache[resource.id].files)

		if(files.length !== fileVersions){
			setFileVersions(files.length)

			let langs = ``
			files.forEach(file => {
				langs = langs.concat(`${file[`file-version`]};`)
			})

			if(resource.allFileVersions !== langs)
				updateAllFileVersions(resource, langs)
		}

	}, [editing, fileVersions, files, resource, resourceCache, updateAllFileVersions])

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
		await getResourceFiles(resource.id)

		if (editing) {
			await editResource(resourceState, resourceState.id)
			setShowing(false)
			setTimeout(() => {
				setEditing(false)
			}, 500)
		} else
			setEditing(true)

	}

	const handleRemoveResource = e => {
		removeResource(resource.id)
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

	const handleFiles = () => {
		props.toggleModal({
			component: ManageFilesContainer,
			props: {
				files,
			},
		})
	}

	const viewstate = {
		resourceCache,
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
	thisfiles: store.fileStore.cache,
	fileId: store.fileStore.cache,
	resourceCache: store.resourceStore.cache,
})

const mapDispatchToProps = {
	removeResource: resourceService.removeResource,
	editResource: resourceService.editResource,
	updateAllFileVersions: resourceService.updateFileVersion,
	toggleModal: interfaceService.toggleModal,
	getResourceFiles: resourceService.getFiles,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceOverviewContainer)