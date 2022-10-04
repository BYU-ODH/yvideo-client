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
		setBreadcrumbs,
		getUserById,
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

	const [collectionUsers, setCollectionUsers] = useState([])
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
		setBreadcrumbs({path: [`Home`, `Admin Dashboard`], collectionId: ``, contentId: ``})
		if(window.innerWidth < 1000)
			setIsMobile(true)
		else
			setIsMobile(false)

		clean()
		setHeaderBorder(true)
		return () => {
			setHeaderBorder(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setHeaderBorder])

	const getUserFunc = async () => {
		let temp = []
		for( const item of data ) {
			if(item.username !== ``) {
				const user = await getUserById(item.owner)
				temp = [...temp, user]
			}else
				temp = [...temp, `undefined`]
		}
		setCollectionUsers(temp)
	}

	const updateCategory = e => {
		e.preventDefault()
		clean()
		setSearchQuery(``)
		setSearchCategory(e.target.value)
		setPlaceholder(category[e.target.value].placeholder)
	}

	const updateSearchBar = e => {
		const { value } = e.target
		setSearchQuery(value)
	}

	const handleSubmit = e => {
		e.preventDefault()
		search(category[searchCategory].url, searchQuery, true)
	}

	const toggleMenu = id => e => {
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
	}

	const handleConfirmDelete = e => {
		e.preventDefault()
		toggleModal({
			component: DeleteConfirmContainer,
			props: {
				type: searchCategory,
				menuItemInfo,
			},
		})
	}

	const handleEdit = e => {
		setIsEdit(true)
	}

	const roleChange = e => {
		setRole(parseInt(e.target.value))
	}

	const userRoleSave = e => {
		adminUpdateUserRole(role, menuItemInfo.id)
		setIsEdit(false)
	}

	const addUsers = e => {
		toggleModal({
			component: AddUsersContainer,
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
		collectionUsers,
	}

	const handlers = {
		getUserFunc,
		updateCategory,
		updateSearchBar,
		handleSubmit,
		toggleMenu,
		handleConfirmDelete,
		handleEdit,
		roleChange,
		userRoleSave,
		addUsers,
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
	setBreadcrumbs: interfaceService.setBreadcrumbs,
	getUserById: adminService.getUserById,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)
