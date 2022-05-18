import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { adminService, collectionService, interfaceService } from 'services'

import { PublicMoreListCollection } from 'components'

const PublicMoreListCollectionContainer = props => {

	const {
		collection,
		content,
		updateCollectionPermissions,
		user,
		isAdmin,
		morePublicCollections,
		getPublicCollectionContents,
	} = props

	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [contentsCount, setContentsCount] = useState(content.length) // null is already checked in SearchPublicCollections
	// eslint-disable-next-line no-unused-vars
	const [isContentUpdated, setIsContentUpdated] = useState(false)

	useEffect(() => {
		if(isOpen && collection.content && contentsCount !== collection.content.length)
			setContentsCount(collection.content.length)

		if(Object.keys(morePublicCollections).includes(collection.id)){
			collection.content = morePublicCollections[collection.id].content
			setIsLoading(false)
		}

		// console.log(collection)
	}, [isOpen, contentsCount, collection, morePublicCollections, isLoading])

	const getContents = async() => {
		setIsLoading(true)
		await getPublicCollectionContents(collection.id, true)
	}

	const handlePublicCollection = async() => {
		await updateCollectionPermissions(collection.id, `remove-user`, user.username)
	}

	const isOpenEventHandler = async() => {
		setIsOpen(!isOpen)

		if(!isLoading)
			getContents()

	}

	const viewstate = {
		isOpen,
		isLoading,
		isAdmin,
		collection,
		content,
		contentsCount,
		isOwner: collection.owner === user.id,
	}

	const handlers = {
		isOpenEventHandler,
		handlePublicCollection,
		getContents,
	}

	return <PublicMoreListCollection viewstate={viewstate} handlers={handlers} />
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
	morePublicCollections: adminStore.morePublicCollections,
})

const mapDispatchToProps = {
	setHeaderBorder: interfaceService.setHeaderBorder,
	toggleTip: interfaceService.toggleTip,
	updateCollectionPermissions: collectionService.updateCollectionPermissions,
	getIsPublicCollectionSubscribed: collectionService.getIsPublicCollectionSubscribed,
	getPublicCollectionContents: adminService.getPublicCollectionContents,
	searchCollectionsByUserId: adminService.searchCollections,
	toggleModal: interfaceService.toggleModal,
	searchCollections: collectionService.searchCollections,
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicMoreListCollectionContainer)
