import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { collectionService, interfaceService, contentService } from 'services'

import { Collections } from 'components'

import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

const CollectionsContainer = props => {

	const {
		isProf,
		isAdmin,
		displayBlocks,
		content,
		setContent,
		collections,
		getCollections,
		toggleCollectionsDisplay,
		setHeaderBorder,
		toggleModal,
	} = props

	useEffect(() => {
		getCollections(true)
		setHeaderBorder(false)

		const allContent = {}
		Object.keys(collections).forEach(element => {
			collections[element].content.forEach(item => {
				allContent[item.id] = item
			})
		})

		setContent(allContent)

		return () => {
			setHeaderBorder(true)
		}
	}, [setContent, setHeaderBorder])

	const handleShowHelp = () => {
		toggleModal({
			component: HelpDocumentation,
			props: { name: 'Home Page'},
		})
	}

	const viewstate = {
		isProf,
		isAdmin,
		displayBlocks,
		// TODO: When archiving a collection, make sure to unpublish it
		// TODO: need to check to see if which way is right way to use
		collections, // : Object.fromEntries(Object.entries(collections).filter(([k,v]) => v.published && !v.archived)),
		collectionsLength: Object.keys(collections).length,
		// TODO: When recreating the backend, add a collection.content.published value, so that we don't need to call getContent
		contentIds: Object.entries(content).filter(([k, v]) => v.published).map(([k,v]) => k),
	}

	const handlers = {
		toggleCollectionsDisplay,
		handleShowHelp,
	}

	return <Collections viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = ({ authStore, interfaceStore, collectionStore, contentStore }) => ({
	isProf: authStore.user.roles === 2,
	isAdmin: authStore.user.roles === 0,
	isStu: authStore.user.roles === 3,
	displayBlocks: interfaceStore.displayBlocks,
	collections: collectionStore.cache,
	content: contentStore.cache,
})

const mapDispatchToProps = {
	getCollections: collectionService.getCollections,
	setContent: contentService.setContent,
	toggleCollectionsDisplay: interfaceService.toggleCollectionsDisplay,
	toggleModal: interfaceService.toggleModal,
	setHeaderBorder: interfaceService.setHeaderBorder,
	updateContent: contentService.updateContent,
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsContainer)
