import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { LabAssistant } from 'components'

import { adminService, interfaceService } from 'services'

const LabAssistantContainer = props => {

	const {
		professors,
		searchProfessors,
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
	const [showResource, setShowResource] = useState(false)

	useEffect(() => {
		setHeaderBorder(true)
		return () => {
			setHeaderBorder(false)
		}
	}, [setHeaderBorder])

	const updateSearchBar = e => {
		const { value } = e.target
		setSearchQuery(value)
		if (value.length > 1) searchProfessors(value, true)
	}

	const handleSubmit = e => {
		e.preventDefault()
	}

	const handleShowResource = () => {
		setShowResource(!showResource)
	}

	const viewstate = {
		searchQuery,
		// TODO: Admins who are also Profs, should have `prof` included in their roles because we will only search for that, not admin
		data: professors ? professors.filter(item => item.roles === 2 || item.roles === 0) : [],
		placeholder: category.Users.placeholder,
		showResource,
	}

	const handlers = {
		updateSearchBar,
		handleSubmit,
		handleShowResource,
	}

	return <LabAssistant viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	professors: store.adminStore.professors,
})

const mapDispatchToProps = {
	searchProfessors: adminService.searchProfessors,
	setHeaderBorder: interfaceService.setHeaderBorder,
}

export default connect(mapStateToProps, mapDispatchToProps)(LabAssistantContainer)
