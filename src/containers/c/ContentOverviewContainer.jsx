import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'components/bits'

import {
	collectionService,
	interfaceService,
	contentService,
	adminService,
} from 'services'

import {
	ContentOverview,
} from 'components'

import DialogBox from 'components/modals/components/DialogBox'
import ContentDeleteContainer from '../../components/modals/containers/ContentDeleteContainer'
import HighlightWordsContainer from 'components/modals/containers/HighlightWordsContainer'
import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

import { objectIsEmpty } from 'lib/util'

const ContentOverviewContainer = props => {

	const {
		isExpired,
		content,
		removeCollectionContent,
		updateContent,
		isLabAssistant,
		adminRemoveCollectionContent,
		toggleModal,
		toggleTip,
	} = props

	const navigate = useNavigate()

	const [editing, setEditing] = useState(false)
	const [showing, setShowing] = useState(false)

	const [tag, setTag] = useState(``)

	const [contentState, setContentState] = useState(content)
	const [blockLeave, setBlock] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const SUPPORTED_LANGUAGES = [
		`German`,
		`Spanish`,
		`Russian`,
	]
	useEffect(() => {
		if(window.innerWidth < 1000)
			setIsMobile(true)
		else
			setIsMobile(false)

		if(blockLeave)
			window.onbeforeunload = () => true
		else
			window.onbeforeunload = undefined

		if(content.settings && !SUPPORTED_LANGUAGES.join(``).includes(content.settings.targetLanguage)){
			if (content.settings.allowDefinitions){
				setContentState({
					...contentState,
					settings: {
						...contentState.settings,
						allowDefinitions: false,
					},
				})
			}
		}
		return () => {
			window.onbeforeunload = undefined
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [blockLeave])

	if (objectIsEmpty(content)) return null
	if (isExpired)
		return <ContentOverview isExpired={true} content={content}/>

	const handleToggleEdit = async () => {
		editing ? handleUpdateContent() : setEditing(true)
	}

	const handleToggleClose = async () => {
		handleUpdateContent()
		setTimeout(() => {
			setEditing(false)
		}, 500)
	}

	const handleUpdateContent = () => {
		updateContent(contentState)
		setShowing(false)
		setBlock(false)
	}

	const handleNavigation = (confirmNavigation, cancelNavigation) => {
		toggleModal({
			component: DialogBox,
			props: {
				confirmNavigation,
				cancelNavigation,
				toggleModal,
			},
		})

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
		setBlock(true)
	}

	const handleRemoveContent = e => {
		props.toggleModal({
			component: ContentDeleteContainer,
			props: {
				content,
				toggleModal,
				removeCollectionContent,
				isLabAssistant,
				adminRemoveCollectionContent,
			},
		})
	}

	const handleTogglePublish = e => {
		setContentState({
			...contentState,
			published: !contentState.published,
		})
		setBlock(true)
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
		setBlock(true)
	}

	const handleDescription = e => {
		setContentState({
			...contentState,
			description: e.target.value,
		})
		setBlock(true)
	}

	const addTag = (e) => {
		e.preventDefault()
		const newTags = tag.split(/[ , ]+/)
		setContentState({
			...contentState,
			resource: {
				...contentState.resource,
				keywords: [...contentState.resource.keywords, ...newTags],
			},
		})
		setTag(``)
		setBlock(true)
	}

	const removeTag = e => {
		setContentState({
			...contentState,
			resource: {
				...contentState.resource,
				keywords: contentState.resource.keywords.filter(item => item !== e.target.dataset.value),
			},
		})
		setBlock(true)
	}

	const changeTag = e => {
		setTag(e.target.value)
		setBlock(true)
	}

	const handleShowWordsModal = () => {
		toggleModal({
			component: HighlightWordsContainer,
			props: { contentId: content.id },
		})
	}

	const handleShowHelp = () => {
		toggleModal({
			component: HelpDocumentation,
			props: { name: `Important Words` },
		})
	}

	const handleLinks = e => {
		e.preventDefault()
		const classname = e.target.className
		if(classname){
			if(classname.includes(`video-editor`)){
				navigate({
					pathname: `/videoeditor/${content.id}`,
				})
			} else if(classname.includes(`subtitle-editor`)){
				navigate({
					pathname: `/subtitleeditor/${content.id}`,
				})
			} else if(classname.includes(`clip-manager`)){
				navigate({
					pathname: `/clipeditor/${content.id}`,
				})
			}

		}
	}

	const handleShowTip = (tipName, position) => {
		toggleTip({
			component: Tooltip,
			props: {
				name: tipName,
				position,
			},
		})
	}

	const viewstate = {
		content: contentState,
		showing,
		editing,
		tag,
		blockLeave,
		isMobile,
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
		handleShowWordsModal,
		handleShowHelp,
		handleLinks,
		handleShowTip,
		toggleTip,
		handleNavigation,
		handleToggleClose,
	}

	return <ContentOverview viewstate={viewstate} handlers={handlers} />
}

const mapDispatchToProps = {
	removeCollectionContent: collectionService.removeCollectionContent,
	updateContent: contentService.updateContent,
	adminRemoveCollectionContent: adminService.deleteContent,
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
}

export default connect(null, mapDispatchToProps)(ContentOverviewContainer)
