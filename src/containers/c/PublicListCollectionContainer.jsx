import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import services from 'services'

import { adminService, collectionService, interfaceService } from 'services'

import { PublicListCollection } from 'components'
import CollectionPermissionsContainer from './CollectionPermissionsContainer'

import MorePublicCollectionsContainer from 'components/modals/containers/MorePublicCollectionsContainer'

const PublicListCollectionContainer = props => {

	const {
		toggleModal,
		collection,
		content,
		setHeaderBorder,
		toggleTip,
		updateCollectionPermissions,
		user,
		isAdmin,
		getPublicCollectionContents,
		getSubscribers,
		searchCollectionsByUserId,
	} = props
	// console.log(collection)
	// console.log(collections)
	// console.log(users)

	const [isOpen, setIsOpen] = useState(false)
	// const [contentsCount, setContentsCount] = useState(content.length) // null is already checked in SearchPublicCollections
	const [ownerName, setOwnerName] = useState(user.username)
	const [isSubscribed, setIsSubscribed] = useState(false)
	const [isUpdated, setIsUpdated] = useState(false)

	useEffect(() => {
		toggleTip()
		setHeaderBorder(false)

		// if(collection.content && contentsCount !== collection.content.length)
		// 	setContentsCount(collection.content.length)

		if(collection.subscribers) {
			console.log(`object`)
			collection.subscribers.forEach(subscriber => {
				if(subscriber.id === user.id) {
					setIsSubscribed(true)
					return
				}
			})
		}

	}, [isOpen, contentsCount, collection, ownerName])

	const handlePublicCollection = async() => {
		if (isSubscribed) {
			await updateCollectionPermissions(collection.id, `remove-user`, user)
		} else {
			await updateCollectionPermissions(collection.id, `add-user`, user)
		}
	}

	// TODO: we can modify this idea later
	const handleMorePublicCollection = async() =>{
		const result = await searchCollectionsByUserId(collection.owner,true, true)
		let morePublicCollections

		// prevent null error
		if(result) {
			morePublicCollections = Object.entries(result).filter(([k, v]) => v.public ).map(([k,v]) => v)

			// open toggle modal for presenting owner's more public collections
			if(morePublicCollections.length > 0){
				toggleModal({
					component: MorePublicCollectionsContainer,
					props: {
						publicCollections: morePublicCollections,
						ownerName,
					},
				})
			}
		}
	}

	const isOpenEventHandler = async() => {
		setIsOpen(!isOpen)

		// get contents that attached to collection
		if(collection){
			await getPublicCollectionContents(collection.id)
			await getSubscribers(collection.id)
		}
		
		if(collection.id && (!collection.content || collection.content.length === 0))
			await getPublicCollectionContents(collection.id)
		if(collection.username) setOwnerName(collection.username)
	}

	const viewstate = {
		isOpen,
		isAdmin,
		collection,
		content,
		ownerName,
		// isOwner: collection.owner === user.id,
		isSubscribed,
	}

	const handlers = {
		isOpenEventHandler,
		handlePublicCollection,
		handleMorePublicCollection,
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
	searchCollectionsByUserId: adminService.searchCollections,
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicListCollectionContainer)
