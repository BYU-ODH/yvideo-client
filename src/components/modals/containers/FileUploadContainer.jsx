import React, { useState } from 'react'
import { connect } from 'react-redux'

import {
	interfaceService,
} from 'services'

import FileUpload from 'components/modals/components/FileUpload'

const FileUploadContainer = props => {

	const {
		toggleModal,
		addResource,
	} = props

	const [data, setData] = useState({
		copyrighted: true,
		resourceName: ``,
		physicalCopyExists: true,
		published: true,
		views: 0,
		fullVideo: true,
		metadata: ``,
		requesterEmail: ``,
		allFileVersions: ``,
		resourceType: ``,
		dateValidated: ``,
	})

	const handleTextChange = e => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		})
	}

	const handleTypeChange = e => {
		const resourceType = e.target.dataset.type
		setData({
			...data,
			resourceType,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const backEndData = {
			"copyrighted": data.copyrighted,
			"resource-name": data.resourceName,
			"physical-copy-exists": data.physicalCopyExists,
			"published": data.published,
			"views": data.views,
			"full-video": data.fullVideo,
			"metadata": data.metadata,
			"requester-email": data.requesterEmail,
			"all-file-versions": data.allFileVersions,
			"resource-type": data.resourceType,
			"date-validated": data.dateValidated,
		}

		await addResource(backEndData)
		toggleModal()
	}

	const handleAddResourceSubmit = e => {
		e.preventDefault()
		toggleModal()
	}

	const viewstate = {
		data,
	}

	const handlers = {
		handleAddResourceSubmit,
		handleSubmit,
		handleTextChange,
		handleTypeChange,
		toggleModal,
	}

	return <FileUpload viewstate={viewstate} handlers={handlers}/>
}

const mapStateToProps = store => ({
	modal: store.interfaceStore.modal,
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadContainer)