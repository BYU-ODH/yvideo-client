import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { collectionService, interfaceService, contentService } from 'services'

import { Collections } from 'components'

// import { objectIsEmpty } from 'lib/util'

const CollectionsContainer = props => {

	const {
		isProf,
		isAdmin,
		displayBlocks,
		content,
		getContent,
		collections,
		getCollections,
		toggleCollectionsDisplay,
		setHeaderBorder,
	} = props

	// console.log(collections)

	useEffect(() => {
		getCollections()
		setHeaderBorder(false)

		// Iterate through published collections to get content, then get the ids of all of the content
		// const ids = [].concat.apply([], Object.entries(collections).filter(([k,v]) => v.published && !v.archived)
		// 	.map(([k,v]) => v.content.map(item => (item.id))))
		// //console.log(ids)
		// getContent(ids)

		return () => {
			setHeaderBorder(true)
		}
	}, [collections, getCollections, getContent, setHeaderBorder])

	const viewstate = {
		isProf,
		isAdmin,
		displayBlocks,
		// TODO: When archiving a collection, make sure to unpublish it
		// TODO: need to check to see if which way is right way to use
		collections, // : Object.fromEntries(Object.entries(collections).filter(([k,v]) => v.published && !v.archived)),
		collectionsLength: Object.keys(collections).length,
		// TODO: When recreating the backend, add a collection.content.published value, so that we don't need to call getContent
		// contentIds: Object.entries(content).filter(([k, v]) => v.published).map(([k,v]) => (k)),
	}

	const handlers = {
		toggleCollectionsDisplay,
	}

	return <Collections viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = ({ authStore, interfaceStore, collectionStore, contentStore }) => ({
	isProf: authStore.user.roles === 2,
	isAdmin: authStore.user.roles === 0,
	displayBlocks: interfaceStore.displayBlocks,
	collections: collectionStore.cache,
	content: contentStore.cache,
})

const mapDispatchToProps = {
	getCollections: collectionService.getCollections,
	getContent: contentService.getContent,
	toggleCollectionsDisplay: interfaceService.toggleCollectionsDisplay,
	setHeaderBorder: interfaceService.setHeaderBorder,
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsContainer)
