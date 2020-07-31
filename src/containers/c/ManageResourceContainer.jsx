import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { useParams } from 'react-router-dom'

import { ManageResource } from 'components'

import { interfaceService, resourceService } from 'services'

import CreateResourceContainer from 'components/modals/containers/CreateResourceContainer'

const ManageResourceContainer = props => {

	const {
		searchResource,
		resources,
		user,
	} = props

	const defaultSearch = user.email.split(`@`)
	const [searchQuery, setSearchQuery] = useState(``)
	const [isDefaultSearched, setIsDefaultSearched] = useState(false)
	const [selectedResource, setSelectedResource] = useState(``)

	useEffect(() => {
		// need getResources backend to get all the resources attached to the user id
	}, [resources])

	const { professorId } = useParams()

	const addResource = () => {
		props.toggleModal({
			component: CreateResourceContainer,
			props: {
				professorId,
			},
		})
	}

	if (!isDefaultSearched && defaultSearch[0].length >1) {
		searchResource(defaultSearch[0])
		setIsDefaultSearched(true)
	}

	const handleSearchTextChange = e => {
		const { value } = e.target
		setSearchQuery(value)
		if (value.length > 1) searchResource(value)
	}

	const handleSelectResourceChange = e => {
		const { target } = e
		setSelectedResource(target.value)
	}

	const viewstate = {
		user,
		searchQuery,
		resources,
		professorId,
	}

	const handlers = {
		handleSelectResourceChange,
		handleSearchTextChange,
		addResource,
	}

	return <ManageResource viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	resources: store.resourceStore.cache,
	user: store.authStore.user,
})

const mapDispatchToProps = {
	addResource: resourceService.addResource,
	toggleModal: interfaceService.toggleModal,
	searchResource: resourceService.search,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageResourceContainer)