import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { collectionService, interfaceService } from 'services'

import { PublicManager } from 'components'

import { Tooltip } from 'components/bits'

import CreateCollectionContainer from 'components/modals/containers/CreateCollectionContainer'
import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

import { objectIsEmpty } from 'lib/util'

const PublicManagerContainer = props => {

	const {
		admin,
		user,
		collections,
		getCollections,
		setHeaderBorder,
		toggleModal,
		toggleTip,
		newCollectionInfo,
		removeCreatedCollectionIdFromStore,
	} = props

	const params = useParams()
	const location = useLocation()
	const history = useHistory()
	const [count, setCount] = useState(0)

	useEffect(() => {
		setHeaderBorder(true)

		if(count === 0){
			getCollections(true)
			setCount(count + 1)
		}

		if(Object.keys(newCollectionInfo).length !== 0){
			history.push({
				pathname: `/public-manager/${newCollectionInfo}`,
			})
			removeCreatedCollectionIdFromStore()
		}

		if(location.createCollection) {
			toggleModal({
				component: CreateCollectionContainer,
				route: `public-manager`,
			})
		}
	}, [collections, getCollections, setHeaderBorder, location.createCollection, toggleModal, newCollectionInfo])

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

		// list only collections the user owns
		if(collections[id].owner !== user.id) return

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
	user: store.authStore.user,
	newCollectionInfo: store.collectionStore.newCollectionId,
})

const mapDispatchToProps = {
	getCollections: collectionService.getCollections,
	setHeaderBorder: interfaceService.setHeaderBorder,
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
	removeCreatedCollectionIdFromStore: collectionService.removeCreatedCollectionIdFromStore,
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicManagerContainer)
