import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Admin } from 'components'

import { adminService } from 'services'

const AdminContainer = props => {

	const {
		data,
		search,
		clean,
	} = props

	const category = {
		Users: {
			name: `Users`,
			placeholder: `Search for a user`,
			url: `user`,
		},
		Collections: {
			name: `Collections`,
			placeholder: `Search for a collection`,
			url: `collection`,
		},
		Content: {
			name: `Content`,
			placeholder: `Search for content`,
			url: `content`,
		},
	}

	const [searchDisabled, setSearchDisabled] = useState(true)
	const [searchQuery, setSearchQuery] = useState(``)
	const [searchCategory, setSearchCategory] = useState(category.Users.name)
	const [placeholder, setPlaceholder] = useState(category.Users.placeholder)

	useEffect(() => {
		console.log(`useEffect`)
		if(!searchDisabled) {
			console.log(`searching`)
			search(category[searchCategory].url, searchQuery, true)
			setSearchDisabled(true)
		}
		console.log(data)
	}, [data, searchQuery, search, category, searchCategory, searchDisabled])

	const updateCategory = e => {
		console.log(`updateCategory`, e.target.value)
		clean()
		setSearchQuery(``)
		setSearchCategory(e.target.value)
		setPlaceholder(category[e.target.value].placeholder)
	}

	const updateSearchBar = e => {
		console.log(`updateSearchBar`, e.target.value)
		setSearchQuery(e.target.value)
		setSearchDisabled(e.target.value.length < 2)
	}

	const viewstate = {
		category,
		data,
		headers: Object.keys(data).length > 0 ? Object.keys(data[0]) : [],
		placeholder,
	}

	const handlers = {
		updateCategory,
		updateSearchBar,
	}

	return <Admin viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	data: store.adminStore.cache,
})

const mapDispatchToProps = {
	search: adminService.search,
	clean: adminService.clean,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)
