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
		updateCollectionStatus,
		getCollections,
		loggedinUser,
	} = props

	const [course, setCourse] = useState({
		department: ``,
		catalog: ``,
		section: ``,
	})

	const [user, setUser] = useState({
		username: ``,
		roles: 2,
	})

	const [userTA, setUserTA] = useState({
		username: ``,
		roles: 1,
	})

	const [disabled, setDisable] = useState(true)
	const [disabledUser, setDisableUser] = useState(true)
	const [disabledTA, setDisableTA] = useState(true)
	const [loaded, setLoaded] = useState(false)
	const [isEdited, setIsEdited] = useState(true)

	useEffect(() => {
		if(isEdited){
			getCollectionInfo(collection.id)
			setIsEdited(false)
		}
		if(loaded === true) {
			setTimeout(() => {
				setLoaded(false)
			}, 1000)
		}

	},[collection.id, getCollectionInfo, updateCollectionPermissions, users, courses, collection.public])

	const handlers = {
		makePublic: e => {
			e.preventDefault()
			if(collection.public !== undefined) updateCollectionStatus(collection.id, `public`)
			setIsEdited(true)
		},
		handleDepartmentChange: e => {
			setCourse({
				...course,
				department: e.target.value,
			})
			setIsEdited(true)
		},
		handleCatalogChange: e => {
			setCourse({
				...course,
				catalog: e.target.value,
			})
			setIsEdited(true)
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
			setIsEdited(true)
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
			setIsEdited(true)
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
			setIsEdited(true)
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
			setIsEdited(true)
		},
		removeCourse: id => {
			updateCollectionPermissions(collection.id, roleEndpoints.removeCourse, id)
			setIsEdited(true)
		},
		addUser: e => {
			e.preventDefault()
			updateCollectionPermissions(collection.id, roleEndpoints.addUser, user)
			setDisableUser(true)
			setUser({
				...user,
				username: ``,
			})
			setIsEdited(true)
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
			setIsEdited(true)
		},
		removeUser: value => {
			updateCollectionPermissions(collection.id, roleEndpoints.removeUser, value)
			setIsEdited(true)
		},
		AddBatchNetids: () => {
			toggleModal({
				component: AddBatchNetidsContainer,
				props: { collectionId: collection.id, setLoaded },
			})
			setIsEdited(true)
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
		loggedinUser,
	}

	return <CollectionPermissions viewstate={viewstate} handlers={handlers} />
}

const mapStoreToProps = store => ({
	loggedinUser: store.authStore.user,
	users: store.collectionStore.users,
	courses: store.collectionStore.courses,
})

const mapDispatchToProps = {
	getCollectionInfo: services.collectionService.getCollectionInfo,
	getCollections: services.collectionService.getCollections,
	updateCollectionPermissions: services.collectionService.updateCollectionPermissions,
	toggleModal: interfaceService.toggleModal,
	updateCollectionStatus: services.collectionService.updateCollectionStatus,
}

export default connect(mapStoreToProps, mapDispatchToProps)(CollectionPermissionsContainer)
