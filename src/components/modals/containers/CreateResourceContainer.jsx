import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import {
	interfaceService,
	resourceService,
} from 'services'

import CreateResource from 'components/modals/components/CreateResource'

const CreateResourceContainer = props => {

	const {
		toggleModal,
		addResource,
		user,
	} = props

	const [tab, setTab] = useState(`resource`)
	const [selectedFile, setSelectedFile] = useState()
	const [isReady, setIsReady] = useState(false)

	const changeTab = e => {
		setTab(e.target.name)
	}

	const [data, setData] = useState({
		copyrighted: true,
		resourceName: ``,
		physicalCopyExists: true,
		published: true,
		views: 0,
		fullVideo: true,
		metadata: ``,
		requesterEmail: user.email,
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

	const handleFileChange = e =>{
		console.log(e.target.files[0])
		setSelectedFile(e.target.files[0])
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const formData = new FormData()
		formData.append(`file`, selectedFile)

		axios.post(`http://localhost:3000/upload`, formData, {
			// receive two parameter endpoint url ,form data
		})
			.then(res => { // then print response status
				console.log(res.statusText)
			})

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
		selectedFile,
		user,
		data,
		tab,
	}

	const handlers = {
		handleAddResourceSubmit,
		handleSubmit,
		handleTextChange,
		handleTypeChange,
		changeTab,
		handleFileChange,
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
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateResourceContainer)