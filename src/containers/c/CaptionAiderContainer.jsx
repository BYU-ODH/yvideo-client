import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import services from 'services'

import getCaptionAider from 'lib/js/captionAider'
import { CaptionAider } from 'components'

const CaptionAiderContainer = props => {

	const {
		contentCache,
		getContent,
		resourceCache,
		getResources,
	} = props

	const target = useRef(null)
	const { id } = useParams()

	const content = contentCache[id]

	const [resource, setResource] = useState()

	useEffect(
		() => {

			if (!content) getContent([id])
			else if (!resourceCache[content.resourceId]) getResources(content.resourceId)
			else setResource(resourceCache[content.resourceId])

			if (target.current) getCaptionAider(content, resource, target.current)

		},
		[content, getContent, getResources, id, resource, resourceCache, target]
	)

	/* const renderModal = (component, props) => {
		props.toggleModal(component)
	}*/

	if (content === undefined || resource === undefined) return null

	const viewstate = {
		target,
	}

	return <CaptionAider viewstate={viewstate} />
}

const mapStoreToProps = store => ({
	contentCache: store.contentStore.cache,
	resourceCache: store.resourceStore.cache,
})

const mapDispatchToProps = {
	toggleModal: services.interfaceService.toggleModal,
	getContent: services.contentService.getContent,
	getResources: services.resourceService.getResources,
}

export default connect(mapStoreToProps, mapDispatchToProps)(CaptionAiderContainer)
