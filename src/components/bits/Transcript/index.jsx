
import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'

import { connect } from 'react-redux'

import { Style, Help } from './styles'

import chevron from 'assets/player-chevron-left.svg'
import closeIcon from 'assets/close_icon.svg'
import seek from 'assets/skip-forward.svg'

import helpIcon from 'assets/help/help-icon-white.svg'

import {
	interfaceService,
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
		subtitleTextIndex,
		toggleTranscript,
		showTranscript,
		isMobile,
	} = props.viewstate

	const {
		handleShowHelp,
		handleSeekChange,
		handleToggleTranscript,
		handleShowTip,
		toggleTip,
	} = props.handlers

	const [words, setWords] = useState(``)
	const [meanings, setMeanings] = useState(``)

	useEffect(() => {
		setWords(``)
		setMeanings(``)
		let allWords = ``
		let allMeanings = ``

		if(jsonResponse[Object.keys(jsonResponse)[0]] === undefined){
			setWords(`No matches found`)
			setMeanings(``)
			return
		}

		jsonResponse[Object.keys(jsonResponse)[0]].forEach((item, i) => {
			allWords += `${item.lemma}; `
			item[`meanings`].forEach((meaning, index) => {
				allMeanings += `<b>${index}.</b>${meaning.meaning.substring(1, meaning.meaning.length - 1)} `
			})
		})

		setWords(allWords)
		setMeanings(allMeanings)
	}, [jsonResponse, translate])

	const highlightWords = (text) => {
		// initialize the string where we can make changes
		if(displaySubtitles === undefined || displaySubtitles.words === undefined)
			return

		const words = displaySubtitles.words.split(/[, ]+/)

		let newString = text

		words.forEach(word => {
			// create a regex for each different word
			// with this regex we want to accept start of a line ^ or any white space of character punctuation before the start of the word.
			// after matching the word. we want the word to finish with a punctuation character or with a space, new line, or end of string.
			// do not execute if the string is empty

			const regex = new RegExp(`\\b${word}\\b`, `gmi`)
			const matches = newString.match(regex)
			if(matches !== null){
				// highlight and push changes
				matches.forEach(m => {
					const cleanString = m.replace(/\s/g,``)
					// console.log('Matched', cleanString)
					const rep = new RegExp(`${cleanString}`, `gmi`)

					if(cleanString !== `. ` && cleanString !== `, ` && cleanString !== `` && cleanString !== `.`)
						newString = newString.replace(rep, `<span class="highlight">${cleanString}</span>`)

				})
			}
		})

		return parse(newString)
	}

	const getTranslation = (e) => {
		if(e.target.tagName.toLowerCase() !== `p`){
			const elementText = e.target.innerText
			const wordArray = elementText.split(` `)
			let foundWord = ``
			// we only want to translate if and only if the word is highlighted
			// single possible word
			// there would only be one valid word in this array
			wordArray.forEach(word => {
				foundWord = word
			})
			translate(foundWord, languageCodes[content.settings.targetLanguage.toLowerCase()])
		}
	}

	return (
		<Style style={{ display: `${showTranscript !== false ? `initial` : `none`}` }} displayTranscript={toggleTranscript} isMobile={isMobile} id='transcript'>
			<div className={isMobile ? `hide-element` : `side-bar`}>
				{toggleTranscript ?
					<><img src={chevron} alt={`chevron`} className={`toggle-transcript`} onClick={handleToggleTranscript}
						onMouseEnter={e => handleShowTip(`transcript-hide`, { x: e.target.getBoundingClientRect().x - 65, y: e.target.getBoundingClientRect().y - 25, width: e.currentTarget.offsetWidth})}
						onMouseLeave={e => toggleTip()} />
					<Help src={helpIcon} onClick={handleShowHelp}
						onMouseEnter={e => handleShowTip(`help`, { x: e.target.getBoundingClientRect().x - 65, y: e.target.getBoundingClientRect().y - 25, width: e.currentTarget.offsetWidth })}
						onMouseLeave={e => toggleTip()} /></>
					:
					<><img src={chevron} alt={`chevron`} className={`toggle-transcript`} onClick={handleToggleTranscript}
						onMouseEnter={e => handleShowTip(`transcript-hide`, { x: e.target.getBoundingClientRect().x - 20, y: e.target.getBoundingClientRect().y - 25, width: e.currentTarget.offsetWidth })}
						onMouseLeave={e => toggleTip()} />
					<Help src={helpIcon} onClick={handleShowHelp}
						onMouseEnter={e => handleShowTip(`help`, { x: e.target.getBoundingClientRect().x - 20, y: e.target.getBoundingClientRect().y - 25, width: e.currentTarget.offsetWidth })}
						onMouseLeave={e => toggleTip()} /></>
				}

			</div>
			<div className={isMobile ? `main-bar main-mobile` : `main-bar`} >
				<div className={`close-transcript`} style={{ display: `${isMobile ? `initial` : `none`}` }}>
					<img src={closeIcon} alt={`closeIcon`} className={`toggle-transcript`} onClick={handleToggleTranscript}
						onMouseEnter={e => handleShowTip(`transcript-hide`, {x: e.target.getBoundingClientRect().x - 80, y: e.target.getBoundingClientRect().y - 25, width: e.currentTarget.offsetWidth})}
						onMouseLeave={e => toggleTip()}
					/>
				</div>
				<div className={`transcript-title`}>
					<h1>Transcript</h1>
					<h2>{content !== undefined ? content.settings.targetLanguage !== `` ? `Video - ${content.settings.targetLanguage} |` : null : null}  Caption - {displaySubtitles !== null ? displaySubtitles.title : `Unavailable`}</h2>
				</div>
				<br/><br/><br/>
				<div className={`transcript-content`}>
					{	displaySubtitles !== null && displaySubtitles.content !== `` ?
						displaySubtitles[`content`].map((element, index) =>
							<div className={`transcript-row ${subtitleText === element.text && subtitleTextIndex === index ? `active-sub` : ``}`}
								key={index}
							>
								<p className='transcript-trans' onClick={getTranslation}>{highlightWords(element.text)}</p>
								<div onClick={e => handleSeekChange(null, element.start + element.start * .001)}
									// passing time + 1% of time. This is to make sure that when seeking it goes to the current subtitle and not the previous one
									className='arrow'
									onMouseEnter={e => handleShowTip(`transcript-seek`, {x: e.target.getBoundingClientRect().x - 20, y: e.target.getBoundingClientRect().y - 30, width: e.currentTarget.offsetWidth})}
									onMouseLeave={e => toggleTip()}
								>
									<span><img src={seek} alt={`seek`} width='20' height='20'/></span>
								</div>
							</div>,
						)
						: null
					}
					<br/>
				</div>
			</div>
			<div className={isMobile ? `transcript-translation translation-mobile` : `transcript-translation`}>
				<br/>
				<h2>Quick Translation</h2><br/>
				<div id='translation-box'>
					{/* I commented out this h3 because it has no content. If it's needed then uncomment it */}
					{/* <h3 id='translation-word'></h3> */}
					<ul id='translation-list'>
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
