import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import services, { interfaceService } from 'services'

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
	const [isLoading, setIsLoading] = useState(false)
	const [isEdited, setIsEdited] = useState(true)
	const [numUsers, setNumUsers] = useState(0)

	useEffect(() => {

		if(isEdited){
			getCollectionInfo(collection.id)
			setIsEdited(false)
		}

		if(isLoading === true) {
			setTimeout(() => {
				setIsLoading(false)
			}, 100)
		} else
			getCollectionInfo(collection.id)

	},[collection.id, getCollectionInfo, updateCollectionPermissions, users, courses, collection.public, isEdited, isLoading])

	const handlers = {
		makePublic: e => {
			e.preventDefault()
			if(collection.public !== undefined) updateCollectionStatus(collection.id, `public`)
			setIsEdited(true)
		},
		handleDepartmentChange: e => {
			setCourse({
				...course,
				department: e.target.value.toUpperCase(),
			})
			setIsEdited(true)
		},
		handleCatalogChange: e => {
			setCourse({
				...course,
				catalog: e.target.value.toUpperCase(),
			})
			setIsEdited(true)
		},
		handleCatalogBlur: e => {
			let catalog = e.target.value
			let courseLength = 3
			if (catalog.includes(`r`) || catalog.includes(`R`))
				courseLength = 4

			if(catalog.length < courseLength && catalog.length !== 0) {
				for(let i = catalog.length; i < courseLength; i++)
					catalog = `0${catalog}`

				setCourse({
					...course,
					catalog,
				})
			}
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
		handleSectionBlur: e => {
			let section = e.target.value
			if(section.length < 3 && section.length !== 0) {
				for(let i = section.length; i < 3; i++)
					section = `0${section}`

				setCourse({
					...course,
					section,
				})
			}
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
			updateCollectionPermissions(collection.id, roleEndpoints.removeUser, {username: value})
			setIsEdited(true)
			setNumUsers(numUsers-1)
		},
		AddBatchNetids: () => {
			toggleModal({
				component: AddBatchNetidsContainer,
				props: { collectionId: collection.id, isLoading },
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
		isLoading,
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
