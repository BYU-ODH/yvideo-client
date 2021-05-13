import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { adminService, collectionService, interfaceService } from 'services'

import { PublicListCollection } from 'components'

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
	} = props

	const [isOpen, setIsOpen] = useState(false)
	const [contentsCount, setContentsCount] = useState(content.length) // null is already checked in SearchPublicCollections
	const [ownerName, setOwnerName] = useState(user.username)

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

	}, [isOpen, contentsCount])

	const handlePublicCollection = async() => {
		await updateCollectionPermissions(collection.id, `remove-user`, user.username)
	}

	const isOpenEventHandler = async() => {
		setIsOpen(!isOpen)

		// get contents that attached to collection
		if(collection)
			await getPublicCollectionContents(collection.id)
	}

	const viewstate = {
		isOpen,
		isAdmin,
		collection,
		content,
		contentsCount,
		ownerName,
		isOwner: collection.owner === user.id,
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
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicListCollectionContainer)
