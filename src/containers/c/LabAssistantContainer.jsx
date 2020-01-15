import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { LabAssistant } from 'components'
import { ViewCollections } from 'components/modals'

import { adminService, interfaceService } from 'services'

const LabAssistantContainer = props => {

	const {
		data,
		search,
		// clean,
		setHeaderBorder,
		toggleViewCollectionsModal,
	} = props

	const category = {
		Users: {
			name: `Professors`,
			placeholder: `Search for a professor`,
			url: `user`,
		},
		Collections: {
			name: `Collections`,
			placeholder: `Search for a collection`,
			url: `collection`,
		},
	}

	const [searchQuery, setSearchQuery] = useState(``)

	useEffect(() => {
		setHeaderBorder(true)
		return () => {
			setHeaderBorder(false)
		}
	}, [setHeaderBorder])

	const updateSearchBar = e => {
		const { value } = e.target
		setSearchQuery(value)
		if (value.length > 1) search(category.Users.url, value, true)
	}

	const handleSubmit = e => {
		e.preventDefault()
	}

	const viewCollections = user => {

		search(category.Collections.url, user.id, true)

		toggleViewCollectionsModal({
			component: ViewCollections,
			user,
		})
	}

	const viewstate = {
		searchCategory: category.Users.name,
		searchQuery,
		data,
		placeholder: category.Users.placeholder,
	}

	const handlers = {
		updateSearchBar,
		handleSubmit,
		viewCollections,
	}

	return <LabAssistant viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	data: store.adminStore.data,
})

const mapDispatchToProps = {
	search: adminService.search,
	// clean: adminService.clean,
	setHeaderBorder: interfaceService.setHeaderBorder,
	toggleViewCollectionsModal: interfaceService.toggleViewCollectionsModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(LabAssistantContainer)
