import React, { useEffect, useLayoutEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { collectionService, interfaceService, contentService } from 'services'

import { Collections } from 'components'

import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

import { Tooltip } from 'components/bits'

const CollectionsContainer = props => {

	const {
		user,
		hasCollectionPermissions,
		displayBlocks,
		publicDisplayBlocks,
		content,
		setContent,
		collections,
		getCollections,
		toggleCollectionsDisplay,
		togglePublicCollectionsDisplay,
		setHeaderBorder,
		toggleModal,
		toggleTip,
		setBreadcrumbs,
	} = props

	const [isContentTab, setIsContentTab] = useState(true)
	const [searchQuery, setSearchQuery] = useState(``)
	const [publicCollections, setPublicCollections] = useState({})
	const [subscribedObj, setSubscribedObj] = useState({})
	const navigate = useNavigate()

	useEffect(() => {
		setBreadcrumbs({path: [`Home`], collectionId: ``, contentId: ``})
		toggleTip()
		getCollections()
		setHeaderBorder(false)

		return () => {
			setHeaderBorder(true)
			toggleTip(null)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setContent, setHeaderBorder, collections])

	useLayoutEffect(() => {
		handleSetPublicCollections(collections)
		handleSubscribedObj(collections)
	}, [collections])

	const handleShowHelp = () => {
		toggleModal({
			component: HelpDocumentation,
			props: { name: `Home Page` },
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

	const setTab = isContentTab => _e => {
		setIsContentTab(isContentTab)
	}

	const handleSearchQuerySubmit = (e) => {
		e.preventDefault()

		if(searchQuery !== ``){
			navigate(`/search-public-collections`, {
				state: {searchQuery, subscribedObj},
			})
		}
	}

	const handleSearchTextChange = e => {
		const { value } = e.target
		setSearchQuery(value)
	}

	const linkToManageCollection = e => {
		e.preventDefault()

		navigate({
			pathname: `/manager`,
		})
	}

	const linkToManagePublicCollection = e => {
		e.preventDefault()

		navigate({
			pathname: `/public-manager`,
		})
	}

	const handleSubscribedObj = collections => {
		const publicArray = Object.keys(collections).filter(key => collections[key].public)
		let tempObj = {}
		for (const key of publicArray)
			tempObj = {...tempObj, [key]: {isSubscribed: true}}
		setSubscribedObj(tempObj)
	}

	const handleSetPublicCollections = collections => {
		const tempPubColl = Object.entries(collections).filter(([key, value]) => value.public)
		let tempObj = {}
		for (const entry of tempPubColl)
			tempObj = {...tempObj, [entry[0]]: entry[1]}

		setPublicCollections(tempObj)
	}

	const handleSetSubscribedObj = (key, boolean) => {
		setSubscribedObj({...subscribedObj, [key]: {isSubscribed: boolean}})
	}

	const viewstate = {
		user,
		displayBlocks,
		publicDisplayBlocks,
		collections: Object.entries(collections).filter(([k, v]) => !v.public).map(([k, v]) => v),
		contentIds: Object.entries(content).filter(([k, v]) => v.published).map(([k, v]) => k),
		hasCollectionPermissions,
		isContentTab,
		subscribedObj,
		publicCollections,
	}

	const handlers = {
		toggleCollectionsDisplay,
		togglePublicCollectionsDisplay,
		handleShowHelp,
		handleShowTip,
		toggleTip,
		setTab,
		handleSearchTextChange,
		handleSearchQuerySubmit,
		linkToManageCollection,
		linkToManagePublicCollection,
		handleSetSubscribedObj,
	}

	return <Collections viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = ({ authStore, interfaceStore, collectionStore, contentStore }) => ({
	user: authStore.user,
	hasCollectionPermissions: authStore.permissions,
	displayBlocks: interfaceStore.displayBlocks,
	publicDisplayBlocks: interfaceStore.publicDisplayBlocks,
	collections: collectionStore.cache,
	content: contentStore.cache,
})

const mapDispatchToProps = {
	getCollections: collectionService.getCollections,
	setContent: contentService.setContent,
	toggleCollectionsDisplay: interfaceService.toggleCollectionsDisplay,
	togglePublicCollectionsDisplay: interfaceService.togglePublicCollectionsDisplay,
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
	setHeaderBorder: interfaceService.setHeaderBorder,
	updateContent: contentService.updateContent,
	setBreadcrumbs: interfaceService.setBreadcrumbs,
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsContainer)
