import React, { useState } from 'react'
import { connect } from 'react-redux'

import services from 'services'

import {
	ContentOverview,
} from 'components'

import { objectIsEmpty } from 'lib/util'

const ContentOverviewContainer = props => {

	const {
		content,
		updateContent,
	} = props

	const [editing, setEditing] = useState(false)
	const [showing, setShowing] = useState(false)

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

	const handleTogglePublish = e => {
		setContentState({
			...contentState,
			published: !contentState.published,
		})
	}

	const viewstate = {
		content: contentState,
		showing,
		editing,
	}

	const handlers = {
		handleToggleEdit,
		handleNameChange,
		handleTogglePublish,
		setContentState,
		setShowing,
	}

	return <ContentOverview viewstate={viewstate} handlers={handlers} />
}

const mapDispatchToProps = {
	updateContent: services.contentService.updateContent,
}

export default connect(null, mapDispatchToProps)(ContentOverviewContainer)