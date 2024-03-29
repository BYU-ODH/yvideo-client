import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import services from 'services'

import { CaptionAider } from 'components'

const CaptionAiderContainer = props => {

	const {
		contentCache,
		getContent,
		toggleModal,
	} = props

	const target = useRef(null)
	const { id } = useParams()

	const content = contentCache[id]

	useEffect(
		() => {
			if (!content) getContent([id])
			// if (target.current) setTrackEditor(new TrackEditor(content, target.current, toggleModal))
		},
		[content, getContent, id, toggleModal],
	)

	if (content === undefined) return null

	const viewstate = {
		target,
	}

	return <CaptionAider viewstate={viewstate} />
}

const mapStoreToProps = store => ({
	contentCache: store.contentStore.cache,
})

const mapDispatchToProps = {
	toggleModal: services.interfaceService.toggleModal,
	getContent: services.contentService.getContent,
}

export default connect(mapStoreToProps, mapDispatchToProps)(CaptionAiderContainer)
