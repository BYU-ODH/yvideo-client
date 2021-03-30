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

	useEffect(() => {
		console.log('rendered')
		toggleTip()
		// getIsPublicCollectionSubscribed(collection.id, user.id)
		setHeaderBorder(false)

	}, [isOpen])

	const handlePublicCollection = async() => {
		await updateCollectionPermissions(collection.id, `remove-user`, user.username)
	}

	const isOpenEventHandler = async() => {
		setIsOpen(!isOpen)
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
