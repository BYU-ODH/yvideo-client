import React, { useState } from 'react'
import { connect } from 'react-redux'

import {
	interfaceService,
	resourceService,
	fileService,
} from 'services'

import CreateResource from 'components/modals/components/CreateResource'

const CreateResourceContainer = props => {

	const {
		toggleModal,
		addResource,
		addAccess,
		user,
	} = props

	const [tab, setTab] = useState(`resource`)

	const changeTab = e => {
		setTab(e.target.name)
	}

	const [data, setData] = useState({
		id: 0,
		copyrighted: true,
		resourceName: ``,
		physicalCopyExists: true,
		published: true,
		views: 0,
		fullVideo: true,
		metadata: ``,
		requesterEmail: user.email,
		allFileVersions: ``,
		resourceType: `video`,
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

		const result = await addResource(backEndData, data)

		if(result.id)
			addAccess(result.id, user.username)

		toggleModal()
	}

	const viewstate = {
		user,
		data,
		tab,
	}

	const handlers = {
		handleSubmit,
		handleTextChange,
		handleTypeChange,
		changeTab,
		toggleModal,
	}

	return <CreateResource viewstate={viewstate} handlers={handlers}/>
}

const mapStateToProps = store => ({
	modal: store.interfaceStore.modal,
	user: store.authStore.user,
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
	addResource: resourceService.addResource,
	addAccess: resourceService.addAccess,
	uploadFile: fileService.upload,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateResourceContainer)