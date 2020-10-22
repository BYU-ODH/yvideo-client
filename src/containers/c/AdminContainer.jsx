import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import DeleteConfirmContainer from '../../components/modals/containers/DeleteConfirmContainer'

import DeleteConfirmContainer from '../../components/modals/containers/DeleteConfirmContainer'

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

	const [menuItemInfo, setMenuItemInfo] = useState({})
	const [menuActive, setMenuActive] = useState(false)
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

	useEffect(() => {
		clean()
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
		menuItemInfo,
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
		},
		handleSubmit: e => {
			e.preventDefault()
			search(category[searchCategory].url, searchQuery, true)
		},
		toggleMenu: id => e => {
			data.forEach(item => {
				if (item.id === id)
					setMenuItemInfo(item)

			})
			setMenuActive(!menuActive)
			setMousePos({
				x: e.pageX,
				y: e.pageY,
			})
		},
		handleConfirmDelete: e => {
			e.preventDefault()
			toggleModal({
				component: DeleteConfirmContainer,
				props: {
					type: searchCategory,
					menuItemInfo,
				},
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
