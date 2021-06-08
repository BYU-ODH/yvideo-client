import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import { interfaceService, adminService } from 'services'

import { Manager } from 'components'

import { Tooltip } from 'components/bits'

import CreateCollectionContainer from 'components/modals/containers/CreateCollectionContainer'
import { objectIsEmpty } from 'lib/util'

const LabAssistantManagerContainer = props => {

	const {
		admin,
		collections,
		professor,
		searchCollections,
		setHeaderBorder,
		setProfessor,
		toggleModal,
		toggleTip,
	} = props

	const { professorId, collectionId } = useParams()

	useEffect(() => {
		setHeaderBorder(true)

		if(professorId !== undefined){
			if(objectIsEmpty(professor))
				setProfessor(professorId)
			else {
				if(!collections)
					searchCollections(professorId, true)
			}
		}

		return () => {
			setHeaderBorder(false)
		}
	}, [collections, professor, professorId, searchCollections, setHeaderBorder, setProfessor])

	const createNew = () => {
		toggleModal({
			component: CreateCollectionContainer,
			isLabAssistantRoute: true,
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

	const sideLists = {
		published: [],
		unpublished: [],
		archived: [],
	}

	let singleCollection = {}

	if(collections !== undefined && collections !== null){
		// This populates the sideList object to display all the collections based on
		// their current status published, unpublished, and archived

		Object.keys(collections).forEach(item => {
			const { archived, published, name, id} = collections[item]

			if (archived) sideLists.archived.push({ id, name })
			else if (published) sideLists.published.push({ id, name })
			else sideLists.unpublished.push({ id, name })
		})

		// This is to pass the right collection based on the ID of the collection
		// instead of the old way that changed the array index and then pointed to the new index
		// Doing it this way we get the collection from the props and not from a
		// static new array that will not update after a handler action

		Object.keys(collections).forEach(item => {
			const {id} = collections[item]
			const cId = collectionId
			if (id === cId){
				singleCollection = collections[item]
				return
			}
		})
	}

	const viewstate = {
		admin,
		collection: singleCollection,
		path: `lab-assistant-manager/${professor.id}`,
		sideLists,
		user: professor,
		activeId: collectionId,
	}

	const handlers = {
		createNew,
		toggleTip,
		handleShowTip,
	}

	if(!collections) return <Manager viewstate={viewstate} handlers={handlers} archived={[]} published={[]} unpublished={[]} empty={true}/>

	return <Manager viewstate={viewstate} handlers={handlers} archived={sideLists.archived} published={sideLists.published} unpublished={sideLists.unpublished}/>
}

const mapStateToProps = store => ({
	professor: store.adminStore.professor,
	collections: store.adminStore.professorCollections,
	admin: store.authStore.user.roles === 0,
})

const mapDispatchToProps = {
	searchCollections: adminService.searchCollections,
	setHeaderBorder: interfaceService.setHeaderBorder,
	setProfessor: adminService.setProfessor,
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
}

export default connect(mapStateToProps, mapDispatchToProps)(LabAssistantManagerContainer)
