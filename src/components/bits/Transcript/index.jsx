import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'

import { connect } from 'react-redux'

import { Style, Help } from './styles'

import chevron from 'assets/player-chevron-left.svg'
import closeIcon from 'assets/close_icon.svg'
import seek from 'assets/skip-forward.svg'

import helpIcon from 'assets/help/help-icon-white.svg'

import {
	interfaceService
} from 'services'

const Transcript = props => {

		const {
			jsonResponse,
			translate,
			languageCodes,
		} = props

		const {
			content,
			displaySubtitles,
			subtitleText,
			duration,
			toggleTranscript,
			showTranscript,
			isMobile,
		} = props.viewstate

		const {
			setToggleTranscript,
			handleShowHelp,
			handleSeekChange,
			handleToggleTranscript,
			handleShowTip,
			toggleTip,
		} = props.handlers

		const [words, setWords] = useState('')
		const [meanings, setMeanings] = useState('')

		useEffect(() => {
			setWords('')
			setMeanings('')
			let allWords = ''
			let allMeanings = ''

			if(Object.keys(jsonResponse).length < 1){
				setWords('No matches found')
				setMeanings('')
				return;
			}

			jsonResponse[Object.keys(jsonResponse)[0]][0]['meanings'].forEach((item, index) => {
				allWords += `${item.lemma}; `
				allMeanings += `<b>${index}.</b>${item.meaning.substring(1, item.meaning.length - 1)} `
			});

			setWords(allWords)
			setMeanings(allMeanings)
		}, [jsonResponse, translate])

		const highlightWords = (text) => {
			//initialize the string where we can make changes
			// console.log(displaySubtitles)
			if(content === undefined){
				return;
			}

			console.log(displaySubtitles.words)
			let words = displaySubtitles.words.split(/[, ]+/)
			console.log(words)

			let newString = text

			words.forEach(word => {
				//create a regex for each different word
				//with this regex we want to accept start of a line ^ or any white space of character punctuation before the start of the word.
				//after matching the word. we want the word to finish with a punctuation character or with a space, new line, or end of string.
				//do not execute if the string is empty

				let regex = new RegExp(`(^|[\\s|.|,|;])${word}([\\s|.|,|;|\\n]|$)`, "gmi");
				// let regex = new RegExp(`(?:^|\\W)${word}(?:$|\\W)`)
				// console.log(regex)
				let matches = newString.match(regex)
				if(matches !== null){
					//highlight and push changes
					matches.forEach(m => {
						let cleanString = m.replace(/\s/g,'')
						console.log('Matched', cleanString)
						let rep = new RegExp(`${cleanString}`, "gmi")
						console.log(rep)


						if(cleanString !== ". " && cleanString !== ", " && cleanString !== "" && cleanString !== "."){
							newString = newString.replace(rep, `<span class="highlight">${cleanString}</span>`)
						}

					});
					// console.log(newString)
				}
			})

			return parse(newString)
		}

		const getTranslation = (e) => {
			let elementText = e.target.innerText
			let wordArray = elementText.split(' ')
			let foundWord = ''
			if(wordArray.length < 4){
				//single possible word
				//there would only be one valid word in this array
				wordArray.forEach(word => {
					if(word.length >= 2){
						//valid word found get translation
						console.log(word)
						foundWord = word
					}
				})
			}
			translate(foundWord, languageCodes[displaySubtitles.language])
		}

		// console.log(displaySubtitles)

		return (
			<Style style={{ display: `${showTranscript !== false ? ('initial') : ('none')}` }} displayTranscript={toggleTranscript} isMobile={isMobile} id='transcript'>
				<div className={isMobile ? (`hide-element`) : ('side-bar')}>
					<img src={chevron} className={'toggle-transcript'} onClick={handleToggleTranscript}
						onMouseEnter={e => handleShowTip('transcript-hide', {x: e.target.getBoundingClientRect().x - 80, y: e.target.getBoundingClientRect().y - 25, width: e.currentTarget.offsetWidth})}
						onMouseLeave={e => toggleTip()}
					/>
					<Help src={helpIcon} onClick={handleShowHelp}
						onMouseEnter={e => handleShowTip('help', {x: e.target.getBoundingClientRect().x - 80, y: e.target.getBoundingClientRect().y - 25, width: e.currentTarget.offsetWidth})}
						onMouseLeave={e => toggleTip()}
					/>
				</div>
				<div className={isMobile ? ('main-bar main-mobile') : ('main-bar')} >
					<div className={'close-transcript'} style={{ display: `${isMobile ? (`initial`) : (`none`)}` }}>
						<img src={closeIcon} className={'toggle-transcript'} onClick={handleToggleTranscript}
							onMouseEnter={e => handleShowTip('transcript-hide', {x: e.target.getBoundingClientRect().x - 80, y: e.target.getBoundingClientRect().y - 25, width: e.currentTarget.offsetWidth})}
							onMouseLeave={e => toggleTip()}
						/>
					</div>
					<div className={'transcript-title'}>
						<h1>Transcript</h1>
						<h2>Video - {content !== undefined ? (content.settings.targetLanguages) : (null)} | Caption - {displaySubtitles !== null ? (displaySubtitles.language) : (`No captions available`)}</h2>
					</div>
					<br/><br/><br/>
					<div className={'transcript-content'}>
						{	displaySubtitles !== null && displaySubtitles.content !== '' ? (
							displaySubtitles['content'].map((element, index) =>
									<div className={`transcript-row ${subtitleText === element.text ? ('active-sub') : ('') }`}
										key={index}
										>
										<p onClick={getTranslation}>{highlightWords(element.text)}</p>
										<div onClick={e => handleSeekChange(null, (element.start * duration / 100) + .5)}
											className="arrow"
											onMouseEnter={e => handleShowTip('transcript-seek', {x: e.target.getBoundingClientRect().x - 50, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
											onMouseLeave={e => toggleTip()}
											>
											<span><img src={seek} width="20" height="20"/></span>
										</div>
									</div>
								)
							) : (null)
						}
						<br/>
					</div>
				</div>
				<div className={isMobile ? ('transcript-translation translation-mobile') : ('transcript-translation')}>
					<hr style={{ width: '120%'}}/>
					<br/>
					<h2>Quick Translation</h2><br/>
					<div id="translation-box">
						<h3 id="translation-word"></h3>
						<ul id="translation-list">
							<li>
								<label>Translation: {parse(words)}</label>
							</li>
							<li>
								<label>Meaning: {parse(meanings)}</label>
							</li>
						</ul>
					</div>
				</div>
			</Style>
		)
}

const mapStateToProps = store => ({
	// data: store.adminStore.data,
	languageCodes: store.interfaceStore.languageCodes,
	jsonResponse: store.interfaceStore.jsonResponse,
})

const mapDispatchToProps = {
	translate: interfaceService.getTranslation,
}

export default connect(mapStateToProps, mapDispatchToProps)(Transcript)
