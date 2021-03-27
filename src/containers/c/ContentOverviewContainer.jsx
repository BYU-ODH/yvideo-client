import React, { useState } from 'react'
import { connect } from 'react-redux'

import {
	collectionService,
	interfaceService,
	contentService,
	adminService,
} from 'services'

import {
	ContentOverview,
} from 'components'

import HighlightWordsContainer from 'components/modals/containers/HighlightWordsContainer'

import { objectIsEmpty } from 'lib/util'

const ContentOverviewContainer = props => {

	const {
		content,
		isExpired,
		removeCollectionContent,
		updateContent,
		isLabAssistant,
		adminRemoveCollectionContent,
		toggleModal,
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
		if(isLabAssistant)
			adminRemoveCollectionContent(content.id)
		 else
			removeCollectionContent(content.collectionId, content.id)
	}

	const handleTogglePublish = e => {
		if(isExpired < 0){
			setContentState({
				...contentState,
				published: !contentState.published,
			})
		}
		else {
			alert('This content is expired. Please, talk to a lab assistant and provide a physical copy.')
			setContentState({
				...contentState,
				published: false,
			})
		}
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

	const handleShowWordsModal = () => {
		toggleModal({
			component: HighlightWordsContainer,
			props:{ contentId: content.id},
		})
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
		handleShowWordsModal
	}

	return <ContentOverview viewstate={viewstate} handlers={handlers} />
}

const mapDispatchToProps = {
	removeCollectionContent: collectionService.removeCollectionContent,
	updateContent: contentService.updateContent,
	adminRemoveCollectionContent: adminService.deleteContent,
	toggleModal: interfaceService.toggleModal,
}

export default connect(null, mapDispatchToProps)(ContentOverviewContainer)