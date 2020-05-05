import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import ConfirmDeleteContainer from 'components/modals/containers/ConfirmDeleteContainer'

import { Admin } from 'components'

import { adminService, interfaceService } from 'services'

const AdminContainer = props => {

	const {
		data,
		search,
		clean,
		setHeaderBorder,
		toggleModal,
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

	const [searchQuery, setSearchQuery] = useState(``)
	const [searchCategory, setSearchCategory] = useState(category.Users.name)
	const [placeholder, setPlaceholder] = useState(category.Users.placeholder)

	const [menuActive, setMenuActive] = useState(false)
	const [menuId, setMenuId] = useState(null)
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

	useEffect(() => {
		setHeaderBorder(true)
		return () => {
			setHeaderBorder(false)
		}
	}, [setHeaderBorder])

	const viewstate = {
		searchQuery,
		searchCategory,
		category,
		data,
		placeholder,
		menuActive,
		menuId,
		mousePos,
	}

	const handlers = {
		updateCategory: e => {
			e.preventDefault()
			clean()
			setSearchQuery(``)
			setSearchCategory(e.target.value)
			setPlaceholder(category[e.target.value].placeholder)
		},
		updateSearchBar: e => {
			const { value } = e.target
			setSearchQuery(value)
			if (value.length > 1) search(category[searchCategory].url, value, true)
		},
		handleSubmit: e => {
			e.preventDefault()
		},
		toggleMenu: id => e => {
			if (!id || id === null) {
				setMousePos({ x: 0, y: 0 })
				setMenuId(null)
				setMenuActive(false)
			} else {
				setMousePos({
					x: e.pageX,
					y: e.pageY,
				})
				setMenuId(id)
				setMenuActive(true)
			}
		},
		handleConfirmDelete: e => {
			e.preventDefault()
			toggleModal({
				component: ConfirmDeleteContainer,
			})
		},
	}

	return <Admin viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	data: store.adminStore.data,
})

const mapDispatchToProps = {
	search: adminService.search,
	clean: adminService.clean,
	setHeaderBorder: interfaceService.setHeaderBorder,
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)
