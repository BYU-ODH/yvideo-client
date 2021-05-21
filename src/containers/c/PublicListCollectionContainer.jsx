import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import services from 'services'

import { adminService, collectionService, interfaceService } from 'services'

import { PublicListCollection } from 'components'
import CollectionPermissionsContainer from './CollectionPermissionsContainer'

const PublicListCollectionContainer = props => {

	const {
		collection,
		collections,
		content,
		setHeaderBorder,
		toggleTip,
		updateCollectionPermissions,
		user,
		isAdmin,
		getUserById,
		searchedUser,
		getPublicCollectionContents,
		getSubscribers,
	} = props
	// console.log(collection)
	// console.log(collections)
	// console.log(users)

	const [isOpen, setIsOpen] = useState(false)
	const [contentsCount, setContentsCount] = useState(content.length) // null is already checked in SearchPublicCollections
	const [ownerName, setOwnerName] = useState(user.username)
	const [isSubscribed, setIsSubscribed] = useState(false)
	const [isUpdated, setIsUpdated] = useState(false)

	useEffect(() => {
		toggleTip()
		setHeaderBorder(false)

		if(user.id !== collection.owner && isOpen)
		// getUserById(collection.owner)

		{
			if(searchedUser && searchedUser.username)
				setOwnerName(searchedUser.username)
		}

		if(collection.content && contentsCount !== collection.content.length)
			setContentsCount(collection.content.length)

		if(collection.subscribers) {
			console.log(`object`)
			collection.subscribers.forEach(subscriber => {
				if(subscriber.id === user.id) {
					setIsSubscribed(true)
					return
				}
			})
		}

	}, [isOpen, contentsCount, collection])

	const handlePublicCollection = async() => {
		if (isSubscribed) {
			await updateCollectionPermissions(collection.id, `remove-user`, user)
		} else {
			await updateCollectionPermissions(collection.id, `add-user`, user)
		}
	}

	const isOpenEventHandler = async() => {
		setIsOpen(!isOpen)

		// get contents that attached to collection
		if(collection){
			await getPublicCollectionContents(collection.id)
			await getSubscribers(collection.id)
		}
	}

	const viewstate = {
		isOpen,
		isAdmin,
		collection,
		content,
		contentsCount,
		ownerName,
		// isOwner: collection.owner === user.id,
		isSubscribed,
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
	displayBlocks: interfaceStore.displayBlocks,
	content: contentStore.cache,
	collections: collectionStore.cache,
	searchedUser: adminStore.searchedUser,
})

const mapDispatchToProps = {
	setHeaderBorder: interfaceService.setHeaderBorder,
	toggleTip: interfaceService.toggleTip,
	updateCollectionPermissions: collectionService.updateCollectionPermissions,
	getIsPublicCollectionSubscribed: collectionService.getIsPublicCollectionSubscribed,
	getUserById: adminService.getUserById,
	getPublicCollectionContents: adminService.getPublicCollectionContents,
	getSubscribers: services.collectionService.getSubscribers,
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicListCollectionContainer)
