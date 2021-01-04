import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'

import { collectionService, interfaceService } from 'services'

import { PublicManager } from 'components'

import { Tooltip } from 'components/bits'

import CreateCollectionContainer from 'components/modals/containers/CreateCollectionContainer'
import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

import { objectIsEmpty } from 'lib/util'

// TODO:

// 1. just need endpoint to get public collections.
// 2. need endpoint to update create new public collections

const PublicManagerContainer = props => {

	const {
		admin,
		collections,
		getCollections,
		setHeaderBorder,
		toggleModal,
		toggleTip,
	} = props

	const params = useParams()
	const location = useLocation()
	const [count, setCount] = useState(0)

	useEffect(() => {
		setHeaderBorder(true)

		if(count === 0){
			getCollections(true)
			setCount(count + 1)
		}

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
			isLabAssistantRoute: false,
			props: {
				isPublicCollection: true,
			},
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

	const handleShowHelp = () => {
		toggleModal({
			component: HelpDocumentation,
			props: { name: `Manage Collections`},
		})
	}

	const handlers = {
		createNew,
		handleShowHelp,
		toggleTip,
		handleShowTip,
	}

	const sideLists = {
		publicCollections: [],
		publicArchived: [],
	}

	if (objectIsEmpty(collections)) return <PublicManager viewstate={{}} handlers={handlers} empty={true}/>

	Object.keys(collections).forEach(id => {
		const { name } = collections[id]

		if (collections[id].public && collections[id].archived) sideLists.publicArchived.push({ id, name })
		if (collections[id].public && !collections[id].archived) sideLists.publicCollections.push({ id, name })
	})

	const viewstate = {
		admin,
		collection: collections[params.id],
		path: `public-manager`,
		sideLists,
		activeId: params.id,
	}

	return <PublicManager viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	collections: store.collectionStore.cache,
	admin: store.authStore.user.roles === 0,
})

const mapDispatchToProps = {
	getCollections: collectionService.getCollections,
	setHeaderBorder: interfaceService.setHeaderBorder,
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicManagerContainer)
