import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { collectionService, interfaceService, contentService, adminService } from 'services'

import { PublicListCollection } from 'components'

const PublicListCollectionContainer = props => {

	const {
		collection,
		setHeaderBorder,
		toggleTip,
		updateCollectionPermissions,
		getCollectionSubscribers,
		user,
	} = props

	const [isOpen, setIsOpen] = useState(false)
	const [subscribeStatus, setSubscribeStatus] = useState(false)

	// TODO: need to figure out publish issue
	useEffect(() => {
		toggleTip()
		setHeaderBorder(false)

		// console.log(collection)
		if(collection.isSubscribed === undefined)
			getCollectionSubscribers(collection.id, user.id, true)
			// setSubscribeStatus(collection.isSubscribed)

	}, [isOpen, subscribeStatus])

	const addPublicCollection = e => {
		// /api/collection/{id}/add-user
		// collectionId, endpoint, body
		updateCollectionPermissions(collection.id, `add-user`, {username: user.username, role: user.roles})
	}

	const isOpenEventHandler = e => {
		setIsOpen(!isOpen)
	}

	const viewstate = {
		isOpen,
		collection,
		subscribeStatus,
	}

	const handlers = {
		isOpenEventHandler,
		addPublicCollection,
	}

	return <PublicListCollection viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = ({ authStore, interfaceStore, collectionStore, contentStore, adminStore }) => ({
	isProf: authStore.user.roles === 2,
	isAdmin: authStore.user.roles === 0,
	isStu: authStore.user.roles === 3,
	user: authStore.user,
	searchedPublicCollections: adminStore.publicCollections,
	displayBlocks: interfaceStore.displayBlocks,
	subscribers: collectionStore.users,
	content: contentStore.cache,
})

const mapDispatchToProps = {
	setHeaderBorder: interfaceService.setHeaderBorder,
	toggleTip: interfaceService.toggleTip,
	updateCollectionPermissions: collectionService.updateCollectionPermissions,
	getCollectionSubscribers: collectionService.getCollectionSubscribers,
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicListCollectionContainer)
