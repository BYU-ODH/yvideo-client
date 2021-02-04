import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { collectionService, interfaceService, contentService, adminService } from 'services'

import { SearchPublicCollections } from 'components'

import { Tooltip } from 'components/bits'

const SearchPublicCollectionsContainer = props => {

	const {
		isProf,
		isAdmin,
		displayBlocks,
		content,
		setContent,
		collections,
		searchedPublicCollections,
		getCollections,
		toggleCollectionsDisplay,
		setHeaderBorder,
		toggleModal,
		toggleTip,
		searchPublicCollections,
		getIsPublicCollectionSubscribed,
		user,
	} = props

	const [searchQuery, setSearchQuery] = useState(``)
	const [searchedCount, setSearchedCount] = useState(searchedPublicCollections.length)

	// TODO: need to figure out publish issue
	useEffect(() => {
		toggleTip()

		if(user) getCollections(true)
		else console.log(`this is yvieo guest need to set up public collections here`)

		setHeaderBorder(false)

		const allContent = {}
		Object.keys(collections).forEach(element => {
			collections[element].content.forEach(item => {
				allContent[item.id] = item
			})
		})

		setContent(allContent)

		// when public collection searched, find id and assiciated collection from collections
		if(searchedPublicCollections.length !== searchedCount)
			setSearchedCount(searchedPublicCollections.length)

		return () => {
			setHeaderBorder(true)
			toggleTip(null)
		}
	}, [setContent, setHeaderBorder, searchedPublicCollections])

	const handleShowHelp = () => {
		toggleModal({
			component: ``,
			props:{ name: `Home Page`},
		})
		toggleTip()
	}

	const handleShowTip = (tipName, position) => {
		toggleTip({
			component: Tooltip,
			props: {
				name: tipName,
				position,
			},
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		searchPublicCollections(searchQuery)
	}

	const handleSearchTextChange = e => {
		const { value } = e.target
		setSearchQuery(value)

		if(value === ``) setSearchedCount(0)
	}

	const viewstate = {
		isProf,
		isAdmin,
		displayBlocks,
		searchedCount,
		publicCollections: Object.entries(collections).filter(([k, v]) => v.public ).map(([k,v]) => v),
		searchedPublicCollections,
		contentIds: Object.entries(content).filter(([k, v]) => v.published).map(([k,v]) => k),
	}

	const handlers = {
		toggleCollectionsDisplay,
		handleShowHelp,
		handleShowTip,
		toggleTip,
		handleSubmit,
		handleSearchTextChange,
	}

	return <SearchPublicCollections viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = ({ authStore, interfaceStore, collectionStore, contentStore, adminStore }) => ({
	user: authStore.user,
	searchedPublicCollections: adminStore.publicCollections,
	displayBlocks: interfaceStore.displayBlocks,
	collections: collectionStore.cache,
	content: contentStore.cache,
})

const mapDispatchToProps = {
	getCollections: collectionService.getCollections,
	searchPublicCollections: adminService.searchPublicCollection,
	setContent: contentService.setContent,
	toggleCollectionsDisplay: interfaceService.toggleCollectionsDisplay,
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
	setHeaderBorder: interfaceService.setHeaderBorder,
	updateContent: contentService.updateContent,
	getIsPublicCollectionSubscribed: collectionService.getIsPublicCollectionSubscribed,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPublicCollectionsContainer)
