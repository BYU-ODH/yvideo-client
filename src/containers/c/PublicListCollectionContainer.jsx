import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { adminService, collectionService, interfaceService } from 'services'

import { PublicListCollection } from 'components'

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
		searchCollectionsByUserId,
	} = props

	const [isOpen, setIsOpen] = useState(false)
	// const [contentsCount, setContentsCount] = useState(content.length) // null is already checked in SearchPublicCollections
	const [ownerName, setOwnerName] = useState(user.username)

	useEffect(() => {
		toggleTip()
		setHeaderBorder(false)

		// if(collection.content && contentsCount !== collection.content.length)
		// 	setContentsCount(collection.content.length)

	}, [isOpen, ownerName])

	const handlePublicCollection = async() => {
		await updateCollectionPermissions(collection.id, `remove-user`, user.username)
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
	searchCollectionsByUserId: adminService.searchCollections,
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicListCollectionContainer)
