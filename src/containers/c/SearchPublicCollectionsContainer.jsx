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
		searchCollections,
		toggleCollectionsDisplay,
		setHeaderBorder,
		toggleModal,
		toggleTip,
		searchPublicCollections,
		user,
	} = props

	const [searchQuery, setSearchQuery] = useState(``)
	const [searchedCount, setSearchedCount] = useState(0)
	const [isSearched, setIsSearched] = useState(false)

	useEffect(() => {
		toggleTip()

		if(user && !isSearched) searchCollections(true)

		if(searchQuery === ``) {
			setSearchedCount(0)
			setIsSearched(false)
		}

		setHeaderBorder(false)

		// when public collection searched, find id and assiciated collection from collections
		if(searchedPublicCollections.length !== searchedCount && isSearched){

			const allContent = {}
			Object.keys(collections).forEach(element => {
				collections[element].content.forEach(item => {
					allContent[item.id] = item
				})
			})

			setContent(allContent)
			setSearchedCount(searchedPublicCollections.length)

		}

		return () => {
			setHeaderBorder(true)
			toggleTip(null)
		}
	}, [setHeaderBorder, searchedPublicCollections])

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

	const handleSubmit = (e) => {
		e.preventDefault()

		if(searchQuery !== ``){
			searchPublicCollections(searchQuery)
			setIsSearched(true)
		}
	}

	const handleSearchTextChange = e => {
		const { value } = e.target
		setSearchQuery(value)

		if(value === ``) setSearchedCount(0)
	}

	const setNoCollections = () => {
		setTimeout(() => {
			if(document.getElementById(`message`) !== null)
				document.getElementById(`message`).innerHTML = `There are no public collections`

		}, 2000)
	}

	const viewstate = {
		isProf,
		isAdmin,
		displayBlocks,
		searchedCount,
		publicCollections: Object.entries(collections).filter(([k, v]) => v.public ).map(([k,v]) => v),
		searchedPublicCollections,
		contentIds: Object.entries(content).filter(([k, v]) => v.published).map(([k,v]) => k),
		isSearched,
	}

	const handlers = {
		toggleCollectionsDisplay,
		handleShowHelp,
		handleShowTip,
		toggleTip,
		handleSubmit,
		handleSearchTextChange,
		setNoCollections,
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
	searchCollections: collectionService.searchCollections,
	searchPublicCollections: adminService.searchPublicCollection,
	setContent: contentService.setContent,
	toggleCollectionsDisplay: interfaceService.toggleCollectionsDisplay,
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
	setHeaderBorder: interfaceService.setHeaderBorder,
	updateContent: contentService.updateContent,
	getIsPublicCollectionSubscribed: collectionService.getIsPublicCollectionSubscribed,
	// updateCollectionContents: collectionService.updateCollectionContents,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPublicCollectionsContainer)
