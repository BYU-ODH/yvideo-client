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
		getIsPublicCollectionSubscribed,
		user,
	} = props

	const [isOpen, setIsOpen] = useState(false)
	const [isSubscribed, setIsSubscribed] = useState(false)

	useEffect(() => {
		toggleTip()
		getIsPublicCollectionSubscribed(collection.id, user.id)
		setHeaderBorder(false)

	}, [isOpen, isSubscribed])

	const handlePublicCollection = async() => {
		if(!collection.isSubscribed){
			await updateCollectionPermissions(collection.id, `add-user`, {username: user.username, role: user.roles})
			setIsSubscribed(true)
		} else{
			await updateCollectionPermissions(collection.id, `remove-user`, user.username)
			setIsSubscribed(false)
		}
	}

	const isOpenEventHandler = async() => {
		await getIsPublicCollectionSubscribed(collection.id, user.id)
		setIsOpen(!isOpen)
		setIsSubscribed(collection.isSubscribed)
	}

	const viewstate = {
		isOpen,
		collection,
	}

	const handlers = {
		isOpenEventHandler,
		handlePublicCollection,
	}

	return <PublicListCollection viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = ({ authStore, interfaceStore, collectionStore, contentStore, adminStore }) => ({
	isProf: authStore.user.roles === 2,
	isAdmin: authStore.user.roles === 0,
	isStu: authStore.user.roles === 3,
	user: authStore.user,
	// searchedPublicCollections: adminStore.publicCollections,
	displayBlocks: interfaceStore.displayBlocks,
	// subscribers: collectionStore.users,
	content: contentStore.cache,
})

const mapDispatchToProps = {
	setHeaderBorder: interfaceService.setHeaderBorder,
	toggleTip: interfaceService.toggleTip,
	updateCollectionPermissions: collectionService.updateCollectionPermissions,
	getIsPublicCollectionSubscribed: collectionService.getIsPublicCollectionSubscribed,
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicListCollectionContainer)
