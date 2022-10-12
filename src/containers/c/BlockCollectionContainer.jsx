import React, { useEffect, useLayoutEffect, useState } from 'react'
import { connect } from 'react-redux'

import { adminService, collectionService, interfaceService } from 'services'

import handleScrollFuncs from '../../components/vanilla_scripts/toggleScroll.js'

import { BlockCollection } from 'components'

const BlockCollectionContainer = props => {

	const {
		collection,
		setHeaderBorder,
		updateCollectionPermissions,
		user,
		collections,
		defaultSubscription,
		identifier,
		handleSetSubscribedObj,
	} = props

	const [isSubscribed, setIsSubscribed] = useState(defaultSubscription)
	const [disableScroll, setDisableScroll] = useState({action: null})
	const [pageRendered, setPageRendered] = useState(false)

	const isOwner = user ? user.id === collection.owner : false

	useEffect(() => {
		setHeaderBorder(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [collections, isSubscribed])

	useLayoutEffect(() => {
		if(document.getElementsByClassName(`slide-wrapper`)) {
			handleScrollFuncs(Array.from(document.getElementsByClassName(`slide-wrapper`)), setDisableScroll, null)
			if(!pageRendered)
				setPageRendered(true)
		}
		if(disableScroll.action !== null)
			disableScroll.action()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageRendered])

	const handlePublicCollection = async() => {
		if (isSubscribed) {
			await updateCollectionPermissions(collection.id, `remove-user`, user)
			if(identifier)
				handleSetSubscribedObj(identifier, false)
			setIsSubscribed(false)
		} else {
			await updateCollectionPermissions(collection.id, `add-user`, user)
			if(identifier)
				handleSetSubscribedObj(identifier, true)
			setIsSubscribed(true)
		}
	}

	const viewstate = {
		user,
		collection,
		isSubscribed,
		isOwner,
	}

	const handlers = {
		handlePublicCollection,
	}

	return <BlockCollection viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = ({ authStore, collectionStore }) => ({
	user: authStore.user,
	collections: collectionStore.collections,
})

const mapDispatchToProps = {
	setHeaderBorder: interfaceService.setHeaderBorder,
	updateCollectionPermissions: collectionService.updateCollectionPermissions,
	getUserById: adminService.getUserById,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockCollectionContainer)
