import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { adminService, collectionService, interfaceService } from 'services'

// import { handleScrollFuncs } from '../../components/vanilla_scripts/toggleScroll'
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
	// const [disableScroll, setDisableScroll] = useState({action: null})

	const isOwner = user ? user.id === collection.owner : false

	useEffect(() => {
		setHeaderBorder(false)
		// handleScrollFuncs(document.getElementsByClassName(`slide-wrapper`), setDisableScroll, null)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [collections, isSubscribed])

	// useEffect(() => {
	// 	if(disableScroll.action !== null)
	// 		disableScroll.action()
	// }, [disableScroll])

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