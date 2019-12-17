import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import services from 'services'

import { ContentSettings } from 'components'

const ContentSettingsContainer = props => {

	const {
		content,
		resources,
		getResources,
	} = props

	const resource = resources[content.resourceId]

	console.log(`content`, content)
	console.log(`resource`, resource)

	useEffect(
		() => {
			if (!resource) getResources(content.resourceId)
		},
		[content.resourceId, getResources, resource]
	)

	const viewstate = {
		content,
		tag: [],
	}

	const handlers = {}

	if (!resource || !content) return null

	return <ContentSettings viewstate={viewstate} handlers={handlers} />
}

const mapStoreToProps = store => ({
	resources: store.resourceStore.cache,
})

const mapDispatchToProps = {
	getResources: services.resourceService.getResources,
}

export default connect(mapStoreToProps, mapDispatchToProps)(ContentSettingsContainer)