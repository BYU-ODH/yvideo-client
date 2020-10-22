import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import services from 'services'

import { interfaceService } from 'services'

import { CollectionPermissions } from 'components'

import AddBatchNetidsContainer from 'components/modals/containers/AddBatchNetidsContainer'


const CollectionPermissionsContainer = props => {

	const { roleEndpoints } = services.collectionService

	const {
		collection, // from ManageCollection
		users,
		courses, // from collectionService
		updateCollectionPermissions, // from collectionService
		getCollectionInfo,
		toggleModal,
	} = props

	const [course, setCourse] = useState({
		department: ``,
		catalog: ``,
		section: ``,
	})

	const [user, setUser] = useState({
		username: '',
		role: 2,
	})

	const [disabled, setDisable] = useState(true)
	const [disabledUser, setDisableUser] = useState(true)

	const AddBatchNetids = () => {
		toggleModal({
			component: AddBatchNetidsContainer,
			props: { collectionId: collection.id },
		})
	}

	useEffect(() => {
		// console.log(collection.id)
		// console.log('called')
		getCollectionInfo(collection.id)

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
			if(e.target.value.length > 0){
				setDisable(false)
			}
			else {
				setDisable(true)
			}
			setCourse({
				...course,
				section: e.target.value,
			})
		},
		handleUserChange: e => {
			if(e.target.value.length > 1){
				setDisableUser(false)
			}
			else {
				setDisableUser(true)
			}
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
			// console.log(id)
			updateCollectionPermissions(collection.id, roleEndpoints.removeCourse, id)

		},
		addUser: e => {
			// console.log(state.taFaculty)
			e.preventDefault()
			updateCollectionPermissions(collection.id, roleEndpoints.addUser, user)
			setDisableUser(true)
			setUser({
				...user,
				username: ``,
			})
		},
		removeUser: value => {
			// console.log(value)
			updateCollectionPermissions(collection.id, roleEndpoints.removeUser, value)

		},
		AddBatchNetids,
	}


	const viewstate = {
		collection,
		user,
		course,
		users,
		courses,
		disabled,
		disabledUser,
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
