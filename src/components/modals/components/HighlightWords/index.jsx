import React, { PureComponent } from 'react'

import parse from 'html-react-parser'

import Style, {
	Select,
	Translation,
	TranslationCheck,
	ImportantWords,
	Button,
} from './styles'

import {
	Tag
} from 'components/bits'

import checkMark from 'assets/player-check.svg'
import xMark from 'assets/x_red.svg'
import closeIcon from 'assets/x.svg'

export default class HighlightWords extends PureComponent {

	render() {
		const {
			// files,checkWord,
			checkWord,
			word,
			checkResponse,
			language,
			translationMeanings,
			translationWords,
			activeSubtitle,
			subtitlesObjects,
			supportedLanguages,
		} = this.props.viewstate

		const {
			toggleModal,
			addWord,
			removeWord,
			changeWord,
			changeCheckWord,
			checkTranslation,
			handleCheckWord,
			changeLanguage,
			setActiveSubtitle,
			handleChangeActive,
		} = this.props.handlers

		let wordList = []

		// console.table(subtitlesObjects[activeSubtitle])
		// console.log(activeSubtitle)
		if(subtitlesObjects[activeSubtitle] !== undefined){
			wordList = subtitlesObjects[activeSubtitle].words.split(',')
			// console.log(wordList)
		}


		return (
			<Style>
				<h2>Important Words &nbsp;&nbsp;<img src={closeIcon} width="25" height="25" id={`close-modal`} onClick={toggleModal}/></h2><br/>
				<div id={`subtitles-selection`}>
					<p>Working on subtitle: &nbsp;</p>
					<Select onChange={handleChangeActive}>
						{
							subtitlesObjects.length != 0 ? (
								subtitlesObjects.map((sub, index) =>
								<option value={index} key={index + 1}>
									{sub.language}
								</option>
							)
							) : (
								null
							)
						}
					</Select>
				</div>
				<div id={`words-container`}>
					<div id={`translation-container`}>
						<TranslationCheck>
							<h4>See available translation</h4>
							<p><i>Enter a word; then, enter the language. If translation is available it will be displayed</i></p><br/>
							<div>
								<input type='text' placeholder='Check word' onChange={changeCheckWord} value={checkWord} className='tag-input' /><br/>
								<input type='text' placeholder='Language. Ex: spanish' onChange={changeLanguage} value={language} className='tag-input'/><br/>
								<img src={ checkResponse === false ? (xMark) : (checkMark)} width="25" height="25" style={{ border: 'none', position: 'relative', left: '3px' }}/>
								<Button className={`check-tag`} onClick={handleCheckWord}>Check</Button>
							</div>
							<br/>
						</TranslationCheck><br/>
						<Translation>
							<h4>Translations:</h4>
							<p>{parse(translationWords)}</p>
							<br/>
							<h4>Meanings:</h4>
							<p>{parse(translationMeanings)}</p>
							<br/>
						</Translation>
					</div>
					<ImportantWords>
						<div>
							<h4>Add important words</h4>
							<p><i>Add a single word. Or, add words separated by ", ". Ex: do, be</i></p><br/>
							<div style={{ display: 'flex' }}>
								<input type='text' placeholder='Add word/s' onChange={changeWord} value={word} className='tag-input' />
								<Button className={`add-tag`} onClick={addWord}>Add</Button>
							</div>
						</div>
						<br/>
						<div className='tags'>
							{
								wordList.sort((a, b) => (a > b) ? 1 : -1).map((item, index) => item === `` ? null : <Tag key={index} onClick={removeWord}>{item}</Tag>)
							}
						</div>
					</ImportantWords>
				</div>
				<br/>
				<p><i>**Currently supported languages for translation are: {
					Object.keys(supportedLanguages).map((lang, index) =>
						index != Object.keys(supportedLanguages).length - 1 ? (`${lang}, `) : (lang))
				}</i></p>
			</Style>
		)
	}
}
