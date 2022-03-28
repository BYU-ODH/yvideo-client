import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {
	interfaceService,
	resourceService,
	subtitlesService,
	fileService,
} from 'services'

import HighlightWords from 'components/modals/components/HighlightWords'

const HighlightWordsContainer = props => {

	const {
		// files,
		checkTranslation,
		toggleModal,
		contentId,
		getSubtitles,
		updateSubtitle,
		subtitles,
		subtitlesContentId,
		supportedLanguages,
	} = props

	//get all subtitles for this content.
	//allow a user to select what subtitle the words will be added to

	const [subtitlesObjects, setSubtitlesObject] = useState([])
	const [activeSubtitle, setActiveSubtitle] = useState(0)
	const [newList, setNewList] = useState(false) //set wordlist from the list of the words for a specific subtitle
	const [word, setWord] = useState(``)
	const [checkWord, setCheckWord] = useState('')
	const [language, setLanguage] = useState('')
	const [checkResponse, setCheckResponse] = useState(false)
	const [translationWords, setTranslationWords] = useState('')
	const [translationMeanings, setTranslationMeanings] = useState('')

	useEffect(() => {
		// console.log('use Effect', subtitles)
		if(subtitlesContentId == ''){
			getSubtitles(contentId)
		}
		else {
			let tempSubtitles = []
			Object.keys(subtitles).forEach((item) => {
				tempSubtitles.push(subtitles[item])
			})
			tempSubtitles.sort((a, b) => (a.language > b.language) ? 1 : -1)
			setSubtitlesObject(tempSubtitles)
		}
	}, [contentId, getSubtitles, subtitlesContentId, subtitlesObjects.length])


	const addWord = (e) => {
		e.preventDefault()
		let currentSubtitle = subtitlesObjects[activeSubtitle]
		let currentWords = currentSubtitle.words.concat(`, ${word}`)
		currentSubtitle.words = currentWords

		let allSub = subtitlesObjects
		allSub[activeSubtitle] = currentSubtitle
		setSubtitlesObject(allSub)
		setWord(``)
		//save changes to the back end
		updateSubtitle(currentSubtitle)
	}

	const removeWord = e => {
		let arrayWord = subtitlesObjects[activeSubtitle].words.split(',')
		let filtedArray = arrayWord.filter(item => item !== e.target.dataset.value)
		let currentSubtitle = subtitlesObjects[activeSubtitle]
		currentSubtitle.words = filtedArray.join(',')

		let allSub = subtitlesObjects
		allSub[activeSubtitle] = currentSubtitle
		setSubtitlesObject(allSub)
		setNewList(!newList)
		//save changes to the back end
		updateSubtitle(currentSubtitle)
	}

	const changeWord = e => {
		setWord(e.target.value)
	}

	const changeCheckWord = e => {
		setCheckWord(e.target.value)
		// console.log(checkResponse)
		if(checkResponse){
			setCheckResponse(false)
		}
	}

	const changeLanguage = e => {
		setLanguage(e.target.value)
	}

	const handleCheckWord = async e => {
		const response = await checkTranslation(checkWord, language)
		// console.log(response)
		setCheckResponse(response.success)
		writeTranslation(response.json)
		// setCheckWord('')
	}

	const writeTranslation = (jsonResponse) => {

			let allWords = ''
			let allMeanings = ''

			if(jsonResponse[Object.keys(jsonResponse)[0]] == undefined){
				setTranslationWords('Unsupported language. Please, check the list of available languages')
				setTranslationMeanings('')
				return;
			}

			if(jsonResponse[Object.keys(jsonResponse)[0]][0]['meanings'].length < 1){
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

	const handleChangeActive = (e) => {
		setActiveSubtitle(parseInt(e.target.value))
	}

	const viewstate = {
		// files,
		word,
		checkWord,
		checkResponse,
		language,
		translationMeanings,
		translationWords,
		subtitlesObjects,
		activeSubtitle,
		supportedLanguages,
	}

	const handlers = {
		toggleModal,
		addWord,
		removeWord,
		changeWord,
		changeCheckWord,
		checkTranslation,
		handleCheckWord,
		changeLanguage,
		handleChangeActive,
	}

	return <HighlightWords handlers={handlers} viewstate={viewstate}/>
}

const mapStateToProps = store => ({
	modal: store.interfaceStore.modal,
	// user: store.authStore.user,
	subtitles: store.subtitlesStore.cache,
	subtitlesContentId: store.subtitlesStore.contentId,
	supportedLanguages: store.interfaceStore.languageCodes,
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
	// addResource: resourceService.addResource,
	// uploadFile: fileService.upload,
	getSubtitles: subtitlesService.getSubtitles,
	updateSubtitle: subtitlesService.updateSubtitle,
	checkTranslation: interfaceService.checkTranslation,
}

export default connect(mapStateToProps, mapDispatchToProps)(HighlightWordsContainer)