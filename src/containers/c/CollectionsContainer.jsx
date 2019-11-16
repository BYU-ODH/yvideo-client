import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { collectionService } from 'services'

import { roles } from 'models/User'

import { Collections } from 'components'

import { objectIsEmpty } from 'lib/util'

const CollectionsContainer = props => {

	const {
		isProf,
		isAdmin,
		displayBlocks,
		collections,
		getCollections,
	} = props

	const toggleCollectionsDisplay = () => {
		console.log(`handling collections display`)
	}

	useEffect(() => {
		if (objectIsEmpty(collections)) getCollections()
	}, [collections, getCollections])

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
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsContainer)
