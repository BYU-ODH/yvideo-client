import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { collectionService, interfaceService, contentService } from 'services'

import { Collections } from 'components'

import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

import { Tooltip } from 'components/bits'

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
		toggleTip,
		getIsPublicCollectionSubscribed,
		user,
	} = props

	const allPublic = Object.entries(collections).filter(([k, v]) => v.public ).map(([k,v]) => v)
	const [count, setCount] = useState(0)

	useEffect(() => {
		toggleTip()
		getCollections()
		setHeaderBorder(false)

		// const allContent = {}
		// Object.keys(collections).forEach(element => {
		// 	collections[element].content.forEach(item => {
		// 		allContent[item.id] = item
		// 	})
		// })

		// setContent(allContent)

		if(Object.keys(allPublic).length > 0 && count !== Object.keys(allPublic).length){
			allPublic.forEach(collection => {
				getIsPublicCollectionSubscribed(collection.id, user.id)
			})
			setCount(Object.keys(allPublic).length)
		}

		return () => {
			setHeaderBorder(true)
			toggleTip(null)
		}
	}, [setContent, setHeaderBorder, Object.keys(allPublic).length])

	const handleShowHelp = () => {
		toggleModal({
			component: HelpDocumentation,
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

	// console.log(Object.entries(collections).filter(([k, v]) => v.public).map(([k,v]) => v))
	// console.log(count)

	const viewstate = {
		isProf,
		isAdmin,
		displayBlocks,
		// TODO: When archiving a collection, make sure to unpublish it
		// TODO: need to check to see if which way is right way to use
		collections: Object.entries(collections).filter(([k, v]) => !v.public).map(([k,v]) => v),
		// publicCollections: Object.entries(collections).filter(([k, v]) => v.public).map(([k,v]) => v),
		allPublic,
		// TODO: When recreating the backend, add a collection.content.published value, so that we don't need to call getContent
		contentIds: Object.entries(content).filter(([k, v]) => v.published).map(([k,v]) => k),
	}

	const handlers = {
		toggleCollectionsDisplay,
		handleShowHelp,
		handleShowTip,
		toggleTip,
	}

	return <Collections viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = ({ authStore, interfaceStore, collectionStore, contentStore }) => ({
	isProf: authStore.user.roles === 2,
	isAdmin: authStore.user.roles === 0,
	isStu: authStore.user.roles === 3,
	user: authStore.user,
	displayBlocks: interfaceStore.displayBlocks,
	collections: collectionStore.cache,
	content: contentStore.cache,
})

const mapDispatchToProps = {
	getCollections: collectionService.getCollections,
	setContent: contentService.setContent,
	toggleCollectionsDisplay: interfaceService.toggleCollectionsDisplay,
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
	setHeaderBorder: interfaceService.setHeaderBorder,
	updateContent: contentService.updateContent,
	getIsPublicCollectionSubscribed: collectionService.getIsPublicCollectionSubscribed,
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsContainer)
