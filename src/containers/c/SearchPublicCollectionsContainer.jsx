import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'

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
	const location = useLocation()

	useEffect(() => {
		toggleTip()

		if(location) defaultSearch()

		if(searchQuery === ``) {
			setSearchedCount(0)
			setIsSearched(false)
		}

		setHeaderBorder(false)

		return () => {
			setHeaderBorder(true)
			toggleTip(null)
		}
	}, [setHeaderBorder, searchedPublicCollections.length])

	const defaultSearch = async() => {
		if(location.state !== undefined){
			await searchPublicCollections(location.state.searchQuery)
			setSearchQuery(location.state.searchQuery)
			setIsSearched(true)
		}
	}

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

		if(value === ``) {
			setIsSearched(false)
			setSearchedCount(0)
		}

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
		user,
		displayBlocks,
		searchedCount,
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

	/*
				account-type
				0 = admin
				1 = lab assistant
				2 = faculty / instructor
				3 = student
		  */

	/*
				account-role
				0 "instructor"
				1 "ta"
				2 "student"
				3 "auditing"
			*/

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
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPublicCollectionsContainer)
