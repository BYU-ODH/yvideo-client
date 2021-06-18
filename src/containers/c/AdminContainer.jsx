import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import DeleteConfirmContainer from '../../components/modals/containers/DeleteConfirmContainer'
import AddUsersContainer from 'components/modals/containers/AddUsersContainer'

import { Admin } from 'components'

import { adminService, interfaceService } from 'services'

import { Tooltip } from 'components/bits'

const AdminContainer = props => {

	const {
		data,
		search,
		clean,
		setHeaderBorder,
		toggleModal,
		toggleTip,
		adminUpdateUserRole,
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
	const [isMobile, setIsMobile] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [role, setRole] = useState(null)

	useEffect(() => {
		if(window.innerWidth < 1000)
			setIsMobile(true)
		else
			setIsMobile(false)

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
		isMobile,
		isEdit,
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
			toggleTip()
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
		handleEdit: e => {
			setIsEdit(true)
		},
		roleChange: e => {
			setRole(parseInt(e.target.value))
		},

		userRoleSave: e => {
			adminUpdateUserRole(role, menuItemInfo.id)
			setIsEdit(false)
		},

		addUsers: e => {
			toggleModal({
				component: AddUsersContainer,
			})
		},
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

	const tipHandlers = {
		handleShowTip,
		toggleTip,
	}

	return <Admin viewstate={viewstate} handlers={handlers} tipHandlers={tipHandlers} />
}

const mapStateToProps = store => ({
	data: store.adminStore.data,
})

const mapDispatchToProps = {
	search: adminService.search,
	clean: adminService.clean,
	setHeaderBorder: interfaceService.setHeaderBorder,
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
	adminUpdateUserRole: adminService.updateUserRole,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)
