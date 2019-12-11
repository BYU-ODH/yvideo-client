import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { collectionService, interfaceService } from 'services'

import { roles } from 'models/User'

import { Player } from 'components'
import CaptionAiderContainer from './CaptionAiderContainer'

// import { objectIsEmpty } from 'lib/util'

const PlayerContainer = props => {

	const {
		match,
		isProf,
		isAdmin,
		displayBlocks,
		collections,
		getCollections,
		toggleCollectionsDisplay,
	} = props

	useEffect(() => {
		getCollections()
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

	return (
		<div>
			<Player videoId={match.params.videoId} viewstate={viewstate} handlers={handlers} />
			{
				(isProf || isAdmin) &&
				<CaptionAiderContainer />
			}
		</div>
	)
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
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer)
