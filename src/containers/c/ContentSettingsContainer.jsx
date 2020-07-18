import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import services from 'services'

import { ContentSettings } from 'components'

const ContentSettingsContainer = props => {

	const {
		showing,
		content,
		loading,
	} = props

	const {
		setContentState,
		setShowing,
	} = props.handlers

	const [tag, setTag] = useState(``)
	const [currentContent, setCurrentContent] = useState(content)

	useEffect(
		() => {
			if (!content.resource) {
				setContentState({
					...content,
				})
			} else setShowing(true)
		},
		[content, setContentState, setShowing]
	)

	if (!content || !content.resource) return null

	const handleToggle = e => {
		const { key } = e.target.dataset
		setContentState({
			...content,
			settings: {
				...content.settings,
				[key]: !content.settings[key],
			},
		})
	}

	const handleRatio = e => {
		setContentState({
			...content,
			settings: {
				...content.settings,
				aspectRatio: e.target.value,
			},
		})
	}

	const handleDescription = e => {
		setContentState({
			...content,
			resource: {
				...content.resource,
				description: e.target.value,
			},
		})
	}

	const addTag = () => {
		const newTags = tag.split(/[ ,]+/)
		setContentState({
			...content,
			resource: {
				...content.resource,
				keywords: [...newTags, ...content.resource.keywords],
			},
		})
		setTag(``)
	}

	const removeTag = e => {
		setContentState({
			...content,
			resource: {
				...content.resource,
				keywords: content.resource.keywords.filter(item => item !== e.target.dataset.value),
			},
		})
	}

	const changeTag = e => {
		setTag(e.target.value)
	}

	const viewstate = {
		showing,
		content,
		tag,
		loading,
	}

	const handlers = {
		handleToggle,
		handleRatio,
		handleDescription,
		addTag,
		removeTag,
		changeTag,
	}

	return <ContentSettings viewstate={viewstate} handlers={handlers} />
}

const mapStoreToProps = store => ({
	// resources: store.resourceStore.cache,
	loading: store.contentStore.loading,
})

const mapDispatchToProps = {
}

export default connect(mapStoreToProps, mapDispatchToProps)(ContentSettingsContainer)