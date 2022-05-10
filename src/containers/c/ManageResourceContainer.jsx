import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { ManageResource } from 'components'
import { interfaceService, resourceService } from 'services'

import { Tooltip } from 'components/bits'
import CreateResourceContainer from 'components/modals/containers/CreateResourceContainer'
import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

const ManageResourceContainer = props => {

	const {
		searchResource,
		resources,
		user,
		setBreadcrumbs,
		toggleModal,
		toggleTip,
	} = props

	const defaultSearch = user.email.split(`@`)
	const [searchQuery, setSearchQuery] = useState(``)
	const [isDefaultSearched, setIsDefaultSearched] = useState(false)
	const [resourceCount, setResourceCount] = useState(0)
	// eslint-disable-next-line no-unused-vars
	const [selectedResource, setSelectedResource] = useState(``)
	const [isMobile, setIsMobile] = useState(false)
	const [isSearched, setIsSearched] = useState(false)

	useEffect(() => {
		setBreadcrumbs({path:[`Home`, `Manage Resource`], collectionId: ``, contentId: ``})

		// find default setup for the access
		if(Object.keys(resources).length !== resourceCount){
			setResourceCount(Object.keys(resources).length)
			setIsDefaultSearched(false)
		}

		if (!isDefaultSearched && defaultSearch[0].length >1) {
			searchResource(defaultSearch[0])
			setIsDefaultSearched(true)
		}

		if(window.innerWidth < 1000)
			setIsMobile(true)
		else
			setIsMobile(false)

	}, [])

	const addResource = () => {
		props.toggleModal({
			component: CreateResourceContainer,
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		if(searchQuery !== ``) {
			searchResource(searchQuery)
			setIsSearched(true)
		}
	}

	const handleSearchTextChange = e => {
		const { value } = e.target
		setSearchQuery(value)
	}

	const handleSelectResourceChange = e => {
		const { target } = e
		setSelectedResource(target.value)
	}

	const handleShowHelp = () => {
		toggleModal({
			component: HelpDocumentation,
			props: { name: 'Manage Resource'},
		})
	}

	const handleShowTip = (tipName, position) => {
		toggleTip({
			component: Tooltip,
			props: {
				name: tipName,
				position,
			},
		})
	}

	const viewstate = {
		user,
		searchQuery,
		resources,
		isMobile,
		isSearched,
	}

	const handlers = {
		handleSelectResourceChange,
		handleSearchTextChange,
		addResource,
		handleSubmit,
		handleShowHelp,
		handleShowTip,
		toggleTip,
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
	setBreadcrumbs: interfaceService.setBreadcrumbs,
	toggleTip: interfaceService.toggleTip,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageResourceContainer)