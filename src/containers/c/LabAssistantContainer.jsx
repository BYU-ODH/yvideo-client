import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { LabAssistant } from 'components'

import { adminService, interfaceService } from 'services'

const LabAssistantContainer = props => {

	const {
		professors,
		searchProfessors,
		setHeaderBorder,
		setBreadcrumbs,
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
	const [isSubmitted, setIsSubmitted] = useState(false)

	useEffect(() => {
		setBreadcrumbs({path:[`Home`, `Lab assistant Dashboard`], collectionId: ``, contentId: ``})

		setHeaderBorder(true)
		return () => {
			setHeaderBorder(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setHeaderBorder])

	const updateSearchBar = e => {
		const { value } = e.target
		setSearchQuery(value)
		setIsSubmitted(false)
	}

	const handleSubmit = e => {
		e.preventDefault()
		searchProfessors(searchQuery, true)
		setIsSubmitted(true)
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
		isSubmitted,
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
	setBreadcrumbs: interfaceService.setBreadcrumbs,
}

export default connect(mapStateToProps, mapDispatchToProps)(LabAssistantContainer)
