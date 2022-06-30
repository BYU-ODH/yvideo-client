import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { collectionService, interfaceService, contentService, authService } from 'services'

import { Collections } from 'components'

import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

import { Tooltip } from 'components/bits'

const CollectionsContainer = props => {

	const {
		user,
		hasCollectionPermissions,
		checkHasCollectionPermissions,
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

	const [isMobile, setIsMobile] = useState(false)
	const [isContentTab, setIsContentTab] = useState(true)
	const [searchQuery, setSearchQuery] = useState(``)
	const navigate = useNavigate()

	useEffect(() => {
		setBreadcrumbs({path: [`Home`], collectionId: ``, contentId: ``})

		toggleTip()
		getCollections()
		setHeaderBorder(false)
		checkHasCollectionPermissions(user.username)

		// determine mobiie size for different layout
		if(window.innerWidth < 1000) setIsMobile(true)
		else setIsMobile(false)

		return () => {
			setHeaderBorder(true)
			toggleTip(null)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setContent, setHeaderBorder])

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
			navigate({
				pathname: `/search-public-collections`,
				state: {
					searchQuery,
				},
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

	const viewstate = {
		user,
		displayBlocks,
		publicDisplayBlocks,
		collections: Object.entries(collections).filter(([k, v]) => !v.public).map(([k, v]) => v),
		publicCollections: Object.entries(collections).filter(([k, v]) => v.public).map(([k, v]) => v),
		contentIds: Object.entries(content).filter(([k, v]) => v.published).map(([k, v]) => k),
		isMobile,
		hasCollectionPermissions,
		isContentTab,
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
	}

	return <Collections viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = ({ authStore, interfaceStore, collectionStore, contentStore }) => ({
	user: authStore.user,
	hasCollectionPermissions: authStore.hasCollectionPermissions,
	displayBlocks: interfaceStore.displayBlocks,
	publicDisplayBlocks: interfaceStore.publicDisplayBlocks,
	collections: collectionStore.cache,
	content: contentStore.cache,
})

const mapDispatchToProps = {
	checkHasCollectionPermissions: authService.checkHasCollectionPermissions,
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
