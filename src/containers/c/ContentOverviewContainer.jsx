import React, { useState } from 'react'
import { connect } from 'react-redux'

import {
	collectionService,
	contentService,
} from 'services'

import {
	ContentOverview,
} from 'components'

import { objectIsEmpty } from 'lib/util'

const ContentOverviewContainer = props => {

	const {
		content,
		removeCollectionContent,
		updateContent,
	} = props

	const [editing, setEditing] = useState(false)
	const [showing, setShowing] = useState(false)

	const [tag, setTag] = useState(``)

	const [contentState, setContentState] = useState(content)

	if (objectIsEmpty(content)) return null

	const handleToggleEdit = async () => {
		if (editing) {
			await updateContent(contentState)
			setShowing(false)
			setTimeout(() => {
				setEditing(false)
			}, 500)
		} else setEditing(true)
	}

	const handleNameChange = e => {
		setContentState({
			...contentState,
			name: e.target.value,
			resource: {
				...contentState.resource,
				title: e.target.value,
			},
		})
	}

	const handleRemoveContent = e => {
		removeCollectionContent(content.collectionId, content.id)
	}

	const handleTogglePublish = e => {
		setContentState({
			...contentState,
			published: !contentState.published,
		})
	}

	const handleToggleSettings = e => {
		const { key } = e.target.dataset
		setContentState({
			...contentState,
			settings: {
				...contentState.settings,
				[key]: !contentState.settings[key],
			},
		})
	}

	const handleDescription = e => {
		setContentState({
			...contentState,
			description: e.target.value,
		})
	}

	const addTag = (e) => {
		e.preventDefault()
		const newTags = tag.split(/[ ,]+/)
		setContentState({
			...contentState,
			resource: {
				...contentState.resource,
				keywords: [...contentState.resource.keywords, ...newTags],
			},
		})
		setTag(``)
	}

	const removeTag = e => {
		setContentState({
			...contentState,
			resource: {
				...contentState.resource,
				keywords: contentState.resource.keywords.filter(item => item !== e.target.dataset.value),
			},
		})
	}

	const changeTag = e => {
		setTag(e.target.value)
	}


	const viewstate = {
		content: contentState,
		showing,
		editing,
		tag,
	}

	const handlers = {
		handleNameChange,
		handleRemoveContent,
		handleToggleEdit,
		handleTogglePublish,
		setContentState,
		setShowing,
		updateContent,
		handleToggleSettings,
		handleDescription,
		addTag,
		removeTag,
		changeTag,
	}

	return <ContentOverview viewstate={viewstate} handlers={handlers} />
}

const mapDispatchToProps = {
	removeCollectionContent: collectionService.removeCollectionContent,
	updateContent: contentService.updateContent,
}

export default connect(null, mapDispatchToProps)(ContentOverviewContainer)