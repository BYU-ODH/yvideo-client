import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import services from 'services'
import styled from 'styled-components'

import getCaptionAider from 'lib/js/captionAider'

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

	const Style = styled.div`
	padding-top: 8.4rem;
	padding-bottom: 15rem;
	overflow-y: scroll;
	height: calc(100vh - 23.4rem);

	& > div {
		& .ayamelPlayer,
		& .videoBox,
		& .mediaPlayer {
			width: 100% !important;
			height: 70vh;
		}
		& .sliderContainer {
			padding-bottom: 0 !important;
		}
	}
`

	if (content === undefined || resource === undefined) return null

	return (
		<Style>
			<div id='bottomContainer' ref={target}>
				<div id='timeline'></div>
			</div>
		</Style>

	)
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
