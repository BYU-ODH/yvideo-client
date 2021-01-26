import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import FileUploadContainer from 'components/modals/containers/FileUploadContainer'
import DeleteConfirmContainer from '../../components/modals/containers/DeleteConfirmContainer'
import ManageFilesContainer from 'components/modals/containers/ManageFilesContainer'

import {
	resourceService,
	interfaceService,
	languageService,
} from 'services'

import {
	ResourceOverview,
} from 'components'

import { objectIsEmpty } from 'lib/util'

const ResourceOverviewContainer = props => {

	const {
		resource,
		editResource,
		resourceCache,
		getResourceFiles,
		updateAllFileVersions,
		fileId,
		getLangs,
	} = props

	const [editing, setEditing] = useState(false)
	const [showing, setShowing] = useState(false)
	const [resourceState, setResourceState] = useState(resource)
	const [files, setFiles] = useState([])
	const [numFileVersions, setNumFileVersions] = useState(0)
	// const [fileVersions, setFileVersions] = useState(resource.allFileVersions)

	// TODO: file versions not updated when it is uploaded
	useEffect(() => {

		if(editing && resourceCache[resource.id].files !== undefined)
			setFiles(resourceCache[resource.id].files)

		if(files.length !== numFileVersions){
			setNumFileVersions(files.length)

			let langs = ``
			files.forEach(file => {
				langs = langs.concat(`${file[`file-version`]};`)
			})

			if(resource.allFileVersions !== langs){
				setResourceState({
					...resourceState,
					allFileVersions: langs,
				})

				updateAllFileVersions(resourceState, files)
			}
		}
	}, [editing, files, numFileVersions, resource.allFileVersions, resource.id, resourceCache, resourceState, updateAllFileVersions])

	if (objectIsEmpty(resource)) return null

	const handleFileUploadToResource = async() => {

		// need to set up languages on store before post new one
		await getLangs()

		props.toggleModal({
			component: FileUploadContainer,
			props: {
				resourceId: resource.id,
			},
		})
	}

	const handleToggleEdit = async () => {
		// need to set up languages on store before editing

		await getLangs()

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
		props.toggleModal({
			component: DeleteConfirmContainer,
			props: {
				type: `resource`,
				id: resource.id,
			},
		})
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
	getLangs: languageService.get,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceOverviewContainer)