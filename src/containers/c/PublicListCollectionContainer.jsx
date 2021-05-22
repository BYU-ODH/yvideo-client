import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import services from 'services'

import { adminService, collectionService, interfaceService } from 'services'

import { PublicListCollection } from 'components'

import MorePublicCollectionsContainer from 'components/modals/containers/MorePublicCollectionsContainer'

const PublicListCollectionContainer = props => {

	const {
		toggleModal,
		collection,
		setHeaderBorder,
		toggleTip,
		updateCollectionPermissions,
		user,
		isAdmin,
		getPublicCollectionContents,
		getSubscribers,
		searchCollectionsByUserId,
		collections,
		getUserById,
		searchedUser,
		emptySearchedUser,
	} = props

	const [isOpen, setIsOpen] = useState(false)
	const [ownerName, setOwnerName] = useState(``)
	const [isSubscribed, setIsSubscribed] = useState(false)

	useEffect(() => {
		toggleTip()
		setHeaderBorder(false)

		if(collection.subscribers) {
			collection.subscribers.forEach(subscriber => {
				if(subscriber.id === user.id) {
					setIsSubscribed(true)
					return
				}
			})
		} else {
			Object.keys(collections).forEach( key => {
				if(key === collection.id) {
					if(collections[key].subscribers) {
						collections[key].subscribers.forEach(subscriber => {
							if(subscriber.id === user.id) {
								setIsSubscribed(true)
								return
							}
						})
					}
				}
			},
			)
		}

		if(Object.keys(searchedUser).length !== 0) setOwnerName(searchedUser.username)

	}, [isOpen, ownerName, collections, isSubscribed, searchedUser])

	const handlePublicCollection = async() => {
		if (isSubscribed) {
			await updateCollectionPermissions(collection.id, `remove-user`, user)
			setIsSubscribed(false)
		} else {
			await updateCollectionPermissions(collection.id, `add-user`, user)
			setIsSubscribed(true)
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
			await getSubscribers(collection.id)
			await getPublicCollectionContents(collection.id)
		}

		// if(collection.id && (!collection.content || collection.content.length === 0))
		// 	await getPublicCollectionContents(collection.id)
		if(collection.owner !== user.id)
			await getUserById(collection.owner)
		else{
			emptySearchedUser()
			setOwnerName(user.username)
		}

	}

	const viewstate = {
		isOpen,
		isAdmin,
		collection,
		ownerName,
		isSubscribed,
		isOwner: user ? user.id === collection.owner : false,
	}

	const handlers = {
		isOpenEventHandler,
		handlePublicCollection,
		handleMorePublicCollection,
	}

	return <PublicListCollection viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = ({ authStore, interfaceStore, collectionStore, contentStore, adminStore }) => ({
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
	getPublicCollectionContents: adminService.getPublicCollectionContents,
	getSubscribers: services.collectionService.getSubscribers,
	searchCollectionsByUserId: adminService.searchCollections,
	toggleModal: interfaceService.toggleModal,
	getUserById: adminService.getUserById,
	emptySearchedUser: adminService.emptySearchedUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicListCollectionContainer)
