import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { LabAssistant } from 'components'

import { adminService, interfaceService } from 'services'

const LabAssistantContainer = props => {

	const {
		data,
		search,
		// clean,
		setHeaderBorder,
	} = props

	const category = {
		Users: {
			name: `Professors`,
			placeholder: `Search for a professor`,
			url: `user`,
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

	const viewstate = {
		searchCategory: category.Users.name,
		searchQuery,
		data,
		placeholder: category.Users.placeholder,
	}

	const handlers = {
		updateSearchBar,
		handleSubmit,
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
}

export default connect(mapStateToProps, mapDispatchToProps)(LabAssistantContainer)
