import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import services from 'services'

import { interfaceService } from 'services'

import { CollectionPermissions } from 'components'

import AddBatchNetidsContainer from 'components/modals/containers/AddBatchNetidsContainer'

const CollectionPermissionsContainer = props => {

	const { roleEndpoints } = services.collectionService

	const {
		collection,
		users,
		courses,
		updateCollectionPermissions,
		getCollectionInfo,
		toggleModal,
	} = props

	const [course, setCourse] = useState({
		department: ``,
		catalog: ``,
		section: ``,
	})

	const [user, setUser] = useState({
		username: ``,
		role: 2,
	})

	const [userTA, setUserTA] = useState({
		username: ``,
		role: 1,
	})

	const [disabled, setDisable] = useState(true)
	const [disabledUser, setDisableUser] = useState(true)
	const [disabledTA, setDisableTA] = useState(true)
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		getCollectionInfo(collection.id)
		if(loaded === true) {
			setTimeout(() => {
				setLoaded(false)
			}, 1000)
		}

	},[collection.id, getCollectionInfo, updateCollectionPermissions, users, courses])

	const handlers = {
		handleDepartmentChange: e => {
			setCourse({
				...course,
				department: e.target.value,
			})
		},
		handleCatalogChange: e => {
			setCourse({
				...course,
				catalog: e.target.value,
			})
		},
		handleSectionChange: e => {
			if(e.target.value.length > 0)
				setDisable(false)
			else
				setDisable(true)

			setCourse({
				...course,
				section: e.target.value,
			})
		},
		handleUserTAChange: e => {
			if(e.target.value.length > 1)
				setDisableTA(false)
			else
				setDisableTA(true)

			setUserTA({
				...userTA,
				username: e.target.value,
			})
		},
		handleUserChange: e => {
			if(e.target.value.length > 1)
				setDisableUser(false)
			else
				setDisableUser(true)

			setUser({
				...user,
				username: e.target.value,
			})
		},
		addCourse: e => {
			e.preventDefault()

			const {
				department,
				catalog,
				section,
			} = course

			updateCollectionPermissions(collection.id, roleEndpoints.addCourse, course)
			setDisable(true)
			setCourse({
				...course,
				department: ``,
				catalog: ``,
				section: ``,
			})
		},
		removeCourse: id => {
			updateCollectionPermissions(collection.id, roleEndpoints.removeCourse, id)

		},
		addUser: e => {
			e.preventDefault()
			updateCollectionPermissions(collection.id, roleEndpoints.addUser, user)
			setDisableUser(true)
			setUser({
				...user,
				username: ``,
			})
		},
		addTA: e => {

			/*
				account-type
				0 = admin
				1 = lab assistant
				2 = faculty / instructor
				3 = student
		  */

			/*
				account-role
				0 "instructor"
				1 "ta"
				2 "student"
				3 "auditing"
			*/

			e.preventDefault()
			updateCollectionPermissions(collection.id, roleEndpoints.addUser, userTA)
			setDisableTA(true)
			setUserTA({
				...userTA,
				username: ``,
			})
		},
		removeUser: value => {
			updateCollectionPermissions(collection.id, roleEndpoints.removeUser, value)

		},
		AddBatchNetids: () => {
			toggleModal({
				component: AddBatchNetidsContainer,
				props: { collectionId: collection.id, setLoaded },
			})
		},
	}

	const viewstate = {
		collection,
		user,
		course,
		userTA: users.filter(user => user[`account-role`] === 1),
		users: users.filter(user => user[`account-role`] === 2),
		courses,
		disabled,
		disabledUser,
		disabledTA,
		loaded,
	}

	return <CollectionPermissions viewstate={viewstate} handlers={handlers} />
}

const mapStoreToProps = store => ({
	users: store.collectionStore.users,
	courses: store.collectionStore.courses,
})

const mapDispatchToProps = {
	getCollectionInfo: services.collectionService.getCollectionInfo,
	updateCollectionPermissions: services.collectionService.updateCollectionPermissions,
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStoreToProps, mapDispatchToProps)(CollectionPermissionsContainer)
