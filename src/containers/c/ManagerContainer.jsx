import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'

import { collectionService, interfaceService } from 'services'

import { Manager } from 'components'

import CreateCollectionContainer from 'components/modals/containers/CreateCollectionContainer'

import { objectIsEmpty } from 'lib/util'

const ManagerContainer = props => {

	const {
		admin,
		collections,
		getCollections,
		setHeaderBorder,
		toggleModal,
	} = props

	const params = useParams()
	const location = useLocation()

	useEffect(() => {
		setHeaderBorder(true)
		getCollections()

		if(location.createCollection) {
			toggleModal({
				component: CreateCollectionContainer,
				route: `manager`,
			})
		}
	}, [collections, getCollections, setHeaderBorder, location.createCollection, toggleModal])

	const createNew = () => {
		toggleModal({
			component: CreateCollectionContainer,
		})
	}

	const handlers = {
		createNew,
	}

	const sideLists = {
		published: [],
		unpublished: [],
		archived: [],
	}

	if (objectIsEmpty(collections)) return <Manager viewstate={{}} handlers={handlers} empty={true}/>

	Object.keys(collections).forEach(id => {
		const { archived, published, name } = collections[id]

		if (archived) sideLists.archived.push({ id, name })
		else if (published) sideLists.published.push({ id, name })
		else sideLists.unpublished.push({ id, name })
	})

	const viewstate = {
		admin,
		collection: collections[params.id],
		path: `manager`,
		sideLists,
	}



	return <Manager viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	collections: store.collectionStore.cache,
	admin: store.authStore.user.roles === 0,
})

const mapDispatchToProps = {
	getCollections: collectionService.getCollections,
	setHeaderBorder: interfaceService.setHeaderBorder,
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerContainer)
