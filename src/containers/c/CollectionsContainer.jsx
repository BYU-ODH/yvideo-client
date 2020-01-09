import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { collectionService, interfaceService } from 'services'

import { roles } from 'models/User'

import { Collections } from 'components'

// import { objectIsEmpty } from 'lib/util'

const CollectionsContainer = props => {

	const {
		isProf,
		isAdmin,
		displayBlocks,
		collections,
		getCollections,
		toggleCollectionsDisplay,
		setHeaderBorder,
	} = props

	useEffect(() => {
		getCollections()
		setHeaderBorder(false)

		return () => {
			setHeaderBorder(true)
		}
	}, [collections, getCollections, setHeaderBorder])

	const viewstate = {
		isProf,
		isAdmin,
		displayBlocks,
		collections,
	}

	const handlers = {
		toggleCollectionsDisplay,
	}

	return <Collections viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = ({ authStore, interfaceStore, collectionStore }) => ({
	isProf: authStore.user.roles.includes(roles.teacher),
	isAdmin: authStore.user.roles.includes(roles.admin),
	displayBlocks: interfaceStore.displayBlocks,
	collections: collectionStore.cache,
})

const mapDispatchToProps = {
	getCollections: collectionService.getCollections,
	toggleCollectionsDisplay: interfaceService.toggleCollectionsDisplay,
	setHeaderBorder: interfaceService.setHeaderBorder,
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsContainer)
