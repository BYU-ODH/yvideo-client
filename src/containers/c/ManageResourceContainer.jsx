import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { ManageResource } from 'components'

import { interfaceService, resourceService } from 'services'

import CreateResourceContainer from 'components/modals/containers/CreateResourceContainer'
import { set } from 'js-cookie'

const ManageResourceContainer = props => {

	const {
		searchResource,
		resources,
		user,
		readAccess,
	} = props

	const defaultSearch = user.email.split(`@`)
	const [searchQuery, setSearchQuery] = useState(``)
	const [isDefaultSearched, setIsDefaultSearched] = useState(false)
	const [isDefaultSetup, setIsDefaultSetup] = useState(true)
	const [resourceCount, setResourceCount] = useState(0)
	const [selectedResource, setSelectedResource] = useState(``)

	useEffect(() => {

		// find default setup for the access
		if(Object.keys(resources).length !== resourceCount){
			setResourceCount(Object.keys(resources).length)

			// if this is
			if(!isDefaultSetup){
				// readAccess(selectedResource.id)
				console.log(resources)
			}

			setIsDefaultSearched(false)
		}
	}, [])

	const addResource = () => {
		props.toggleModal({
			component: CreateResourceContainer,
		})
	}

	if (!isDefaultSearched && defaultSearch[0].length >1) {
		searchResource(defaultSearch[0])
		setIsDefaultSearched(true)
	}

	const handleSubmit = e => {
		e.preventDefault()
		searchResource(searchQuery)
	}

	const handleSearchTextChange = e => {
		const { value } = e.target
		setSearchQuery(value)
	}

	const handleSelectResourceChange = e => {
		const { target } = e
		setSelectedResource(target.value)
	}

	const viewstate = {
		user,
		searchQuery,
		resources,
	}

	const handlers = {
		handleSelectResourceChange,
		handleSearchTextChange,
		addResource,
		handleSubmit,
	}

	return <ManageResource viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	resources: store.resourceStore.cache,
	user: store.authStore.user,
	resourceAccess: store.resourceStore.access,
})

const mapDispatchToProps = {
	addResource: resourceService.addResource,
	toggleModal: interfaceService.toggleModal,
	searchResource: resourceService.search,
	readAccess: resourceService.readAccess,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageResourceContainer)