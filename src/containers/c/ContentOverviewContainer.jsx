import React, { useState } from 'react'

import {
	ContentOverview,
} from 'components'

import { objectIsEmpty } from 'lib/util'

const ContentOverviewContainer = props => {

	const {
		content,
	} = props

	const [editing, setEditing] = useState(false)
	const [contentState, setContentState] = useState(content)

	if (objectIsEmpty(content)) return null

	const handleToggleEdit = _e => {
		setEditing(!editing)
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
		content,
		editing,
	}

	const handlers = {
		handleToggleEdit,
		handleNameChange,
		handleTogglePublish,
	}

	return <ContentOverview viewstate={viewstate} handlers={handlers} />
}

export default ContentOverviewContainer