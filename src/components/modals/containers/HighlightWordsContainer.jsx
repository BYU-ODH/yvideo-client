import React from 'react'
import { connect } from 'react-redux'

import {
	interfaceService,
	resourceService,
	fileService,
} from 'services'

import HighlightWords from 'components/modals/components/HighlightWords'

const HighlightWordsContainer = props => {

	const {
		// files,
		checkTranslation,
		toggleModal,
	} = props

	// const [word, setWord] = useState(``)
	// const [checkWord, setCheckWord] = useState('')
	// const [language, setLanguage] = useState('')
	// const [checkResponse, setCheckResponse] = useState(false)
	// const [translationWords, setTranslationWords] = useState('')
	// const [translationMeanings, setTranslationMeanings] = useState('')

	// const addWord = (e) => {
	// 	e.preventDefault()
	// 	const newWords = word.split(/[ ,]+/)
	// 	setContentState({
	// 		...contentState,
	// 		words: [...contentState.words, ...newWords],
	// 	})
	// 	setWord(``)
	// }

	// const removeWord = e => {
	// 	setContentState({
	// 		...contentState,
	// 		words: contentState.words.filter(item => item !== e.target.dataset.value),
	// 	})
	// }

	// const changeWord = e => {
	// 	setWord(e.target.value)
	// }

	// const changeCheckWord = e => {
	// 	setCheckWord(e.target.value)
	// 	console.log(checkResponse)
	// 	if(checkResponse){
	// 		setCheckResponse(false)
	// 	}
	// }

	// const changeLanguage = e => {
	// 	setLanguage(e.target.value)
	// }

	// const handleCheckWord = async e => {
	// 	const response = await checkTranslation(checkWord, language)
	// 	setCheckResponse(response.success)
	// 	writeTranslation(response.json)
	// 	// setCheckWord('')
	// }

	// const writeTranslation = (jsonResponse) => {

	// 		let allWords = ''
	// 		let allMeanings = ''

	// 		if(Object.keys(jsonResponse).length < 1){
	// 			setTranslationWords('No matches found')
	// 			setTranslationMeanings('')
	// 			return;
	// 		}

	// 		jsonResponse[Object.keys(jsonResponse)[0]][0]['meanings'].forEach((item, index) => {
	// 			allWords += `${item.lemma}; `
	// 			allMeanings += `<b>${index}.</b>${item.meaning.substring(1, item.meaning.length - 1)} `
	// 		});

	// 		setTranslationWords(allWords)
	// 		setTranslationMeanings(allMeanings)
	// }

	// const handleShowTranslation = () => {
	// 	toggleModal({
	// 		component: TranslationContainer,
	// 		props: {
	// 			words: translationWords,
	// 			meanings: translationMeanings,
	// 		}
	// 	})
	// }

	// const viewstate = {
	// 	// files,
	// 	word,
	// 	checkWord,
	// 	checkResponse,
	// 	language,
	// 	translationMeanings,
	// 	translationWords,
	// }

	// const handlers = {
	// 	toggleModal,
	// 	addWord,
	// 	removeWord,
	// 	changeWord,
	// 	changeCheckWord,
	// 	checkTranslation,
	// 	handleCheckWord,
	// 	changeLanguage,
	// 	handleShowTranslation,
	// }

	return <HighlightWords/>
}

const mapStateToProps = store => ({
	modal: store.interfaceStore.modal,
	// user: store.authStore.user,
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
	// addResource: resourceService.addResource,
	// uploadFile: fileService.upload,
	checkTranslation: interfaceService.checkTranslation,
}

export default connect(mapStateToProps, mapDispatchToProps)(HighlightWordsContainer)