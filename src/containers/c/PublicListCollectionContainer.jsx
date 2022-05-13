import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

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
		searchCollectionsByUserId,
		collections,
		defaultSubscription,
		// getSubscribers,
		// getUserById,
		// searchedUser,
		// emptySearchedUser,
	} = props

	const [isOpen, setIsOpen] = useState(false)
	const [isSubscribed, setIsSubscribed] = useState(defaultSubscription)
	const isOwner = user ? user.id === collection.owner : false

	useEffect(() => {
		toggleTip()
		setHeaderBorder(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, collections, isSubscribed])

	const handlePublicCollection = async() => {
		if (isSubscribed) {
			await updateCollectionPermissions(collection.id, `remove-user`, user)
			setIsSubscribed(false)
		} else {
			await updateCollectionPermissions(collection.id, `add-user`, user)
			setIsSubscribed(true)
		}
	}
	// eslint-disable-next-line no-unused-vars
	const readSubscription = () => {

		if(collection.subscribers) {
			collection.subscribers.forEach(subscriber => {
				if(subscriber.id === user.id) {
					setIsSubscribed(true)
					return
				}
			})
		} else {
			Object.keys(collections).map(key => { // eslint-disable-line array-callback-return
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
	}

	// TODO: we can modify this idea later
	// eslint-disable-next-line no-unused-vars
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
						// ownerName,
					},
				})
			}
		}
	}

	const isOpenEventHandler = async() => {
		setIsOpen(!isOpen)
		// console.log(isCopyrighted)
	}

	const viewstate = {
		user,
		isOpen,
		isAdmin,
		collection,
		isSubscribed,
		isOwner,
	}

	const handlers = {
		isOpenEventHandler,
		handlePublicCollection,
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
	getSubscribers: collectionService.getSubscribers,
	searchCollectionsByUserId: adminService.searchCollections,
	toggleModal: interfaceService.toggleModal,
	getUserById: adminService.getUserById,
	emptySearchedUser: adminService.emptySearchedUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicListCollectionContainer)
