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

import TranslationContainer from 'components/modals/containers/TranslationContainer'

import { objectIsEmpty } from 'lib/util'

const ContentOverviewContainer = props => {

	const {
		content,
		removeCollectionContent,
		updateContent,
		isLabAssistant,
		adminRemoveCollectionContent,
		checkTranslation,
		toggleModal,
	} = props

	const [editing, setEditing] = useState(false)
	const [showing, setShowing] = useState(false)

	const [tag, setTag] = useState(``)
	const [word, setWord] = useState(``)
	const [checkWord, setCheckWord] = useState('')
	const [language, setLanguage] = useState('')
	const [checkResponse, setCheckResponse] = useState(false)
	const [translationWords, setTranslationWords] = useState('')
	const [translationMeanings, setTranslationMeanings] = useState('')

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

	const addWord = (e) => {
		e.preventDefault()
		const newWords = word.split(/[ ,]+/)
		setContentState({
			...contentState,
			words: [...contentState.words, ...newWords],
		})
		setWord(``)
	}

	const removeWord = e => {
		setContentState({
			...contentState,
			words: contentState.words.filter(item => item !== e.target.dataset.value),
		})
	}

	const changeWord = e => {
		setWord(e.target.value)
	}

	const changeCheckWord = e => {
		setCheckWord(e.target.value)
		console.log(checkResponse)
		if(checkResponse){
			setCheckResponse(false)
		}
	}

	const changeLanguage = e => {
		setLanguage(e.target.value)
	}

	const handleCheckWord = async e => {
		const response = await checkTranslation(checkWord, language)
		setCheckResponse(response.success)
		writeTranslation(response.json)
		// setCheckWord('')
	}

	const writeTranslation = (jsonResponse) => {

			let allWords = ''
			let allMeanings = ''

			if(Object.keys(jsonResponse).length < 1){
				setTranslationWords('No matches found')
				setTranslationMeanings('')
				return;
			}

			jsonResponse[Object.keys(jsonResponse)[0]][0]['meanings'].forEach((item, index) => {
				allWords += `${item.lemma}; `
				allMeanings += `<b>${index}.</b>${item.meaning.substring(1, item.meaning.length - 1)} `
			});

			setTranslationWords(allWords)
			setTranslationMeanings(allMeanings)
	}

	const handleShowTranslation = () => {
		toggleModal({
			component: TranslationContainer,
			props: {
				words: translationWords,
				meanings: translationMeanings,
			}
		})
	}

	const viewstate = {
		content: contentState,
		showing,
		editing,
		tag,
		word,
		checkWord,
		checkResponse,
		language,
		translationMeanings,
		translationWords,
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
		addWord,
		removeWord,
		changeWord,
		changeCheckWord,
		checkTranslation,
		handleCheckWord,
		changeLanguage,
		handleShowTranslation,
	}

	return <ContentOverview viewstate={viewstate} handlers={handlers} />
}

const mapDispatchToProps = {
	removeCollectionContent: collectionService.removeCollectionContent,
	updateContent: contentService.updateContent,
	adminRemoveCollectionContent: adminService.deleteContent,
	checkTranslation: interfaceService.checkTranslation,
	toggleModal: interfaceService.toggleModal,
}

export default connect(null, mapDispatchToProps)(ContentOverviewContainer)