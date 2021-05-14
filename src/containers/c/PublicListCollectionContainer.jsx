import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { adminService, collectionService, interfaceService } from 'services'

import { PublicListCollection } from 'components'

const PublicListCollectionContainer = props => {

	const {
		collection,
		content,
		setHeaderBorder,
		toggleTip,
		updateCollectionPermissions,
		user,
		isAdmin,
		getPublicCollectionContents,
	} = props

	const [isOpen, setIsOpen] = useState(false)
	const [contentsCount, setContentsCount] = useState(content.length) // null is already checked in SearchPublicCollections
	const [ownerName, setOwnerName] = useState(user.username)

	useEffect(() => {
		toggleTip()
		setHeaderBorder(false)

		if(collection.content && contentsCount !== collection.content.length)
			setContentsCount(collection.content.length)

	}, [isOpen, contentsCount, ownerName])

	const handlePublicCollection = async() => {
		await updateCollectionPermissions(collection.id, `remove-user`, user.username)
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
