
import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { Help, Spinner, Style } from './styles'

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
		scrollDisabled,
		sideBarIsClip,
		clips,
		clipId,
	} = props.viewstate

	const {
		handleShowHelp,
		handleSeekChange,
		handleToggleTranscript,
		handleShowTip,
		toggleTip,
		handleClipToggle,
	} = props.handlers

	const [words, setWords] = useState(``)
	const [showTranslationSpinner, setShowTranslationSpinner] = useState(false)

	useEffect(() => {
		setWords(``)

		if(jsonResponse.translatedText === undefined){
			setWords(`Click a subtitle or select text above to see a translation.`)
			return
		}

		setWords(jsonResponse.translatedText)
		setShowTranslationSpinner(false)
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
					const cleanString = m.replace(/\s/g, ``)
					const rep = new RegExp(`${cleanString}`, `gmi`)

					if(cleanString !== `. ` && cleanString !== `, ` && cleanString !== `` && cleanString !== `.`)
						newString = newString.replace(rep, `<span class="highlight">${cleanString}</span>`)

				})
			}

		})

		return parse(newString)
	}

	const getTranslation = (e) => {
		setShowTranslationSpinner(true)
		let selectedText = window.getSelection().toString()
		if (selectedText === ``)
			selectedText = e.target.innerText
		translate(selectedText, languageCodes[content.settings.targetLanguage.toLowerCase()])
	}

	const addSpansAndHighlights = (str) => {
		const regexp = /(<(.*?)>.*?<\/\2>|\p{L}[\p{L}-]*)/gu
		const replStr = str.replace(regexp, `${highlightWords(`$1`)}`)
		return parse(replStr)
	}

	return (
		<Style id='transcript' sidebarisclip={sideBarIsClip} toggletranscript={toggleTranscript} style={{ display: `${showTranscript !== false ? `initial` : `none`}` }} displayTranscript={toggleTranscript} scrolldisabled={scrollDisabled} isMobile={isMobile} >
			<div className={isMobile ? `hide-element` : `side-bar`}>
				{toggleTranscript ?
					<>
						<img src={chevron} alt={`chevron`} className={`toggle-transcript`} onClick={handleToggleTranscript}
							onMouseEnter={e => handleShowTip(`transcript-hide`,
								{
									x: e.target.getBoundingClientRect().x - 65,
									y: e.target.getBoundingClientRect().y - 25,
									width: e.currentTarget.offsetWidth,
								})
							}
							onMouseLeave={() => toggleTip()} />
						<hr className={`hr-sidebar`}/>

						<i className='fa fa-file-text-o' onClick={() => handleClipToggle()}
							onMouseEnter={e => handleShowTip(`captions-tab`,
								{
									x: e.target.getBoundingClientRect().x - 65,
									y: e.target.getBoundingClientRect().y - 25,
									width: e.currentTarget.offsetWidth,
								})
							}
							onMouseLeave={() => toggleTip()} >
						</i>

						<i className='fa fa-film' onClick={() => handleClipToggle(`Clip`)}
							onMouseEnter={e => handleShowTip(`clips-tab`,
								{
									x: e.target.getBoundingClientRect().x - 65,
									y: e.target.getBoundingClientRect().y - 25,
									width: e.currentTarget.offsetWidth,
								})
							}
							onMouseLeave={() => toggleTip()} >
						</i>
						<Help src={helpIcon} onClick={handleShowHelp}
							onMouseEnter={e => handleShowTip(`help`,
								{
									x: e.target.getBoundingClientRect().x - 65,
									y: e.target.getBoundingClientRect().y - 25,
									width: e.currentTarget.offsetWidth,
								})
							}
							onMouseLeave={() => toggleTip()} />
					</>
					:
					<>
						<img src={chevron} alt={`chevron`} className={`toggle-transcript`} onClick={handleToggleTranscript}
							onMouseEnter={e => handleShowTip(`transcript-hide`,
								{
									x: e.target.getBoundingClientRect().x - 20,
									y: e.target.getBoundingClientRect().y - 25,
									width: e.currentTarget.offsetWidth,
								})
							}
							onMouseLeave={() => toggleTip()} />
						<Help src={helpIcon} onClick={handleShowHelp}
							onMouseEnter={e => handleShowTip(`help`,
								{
									x: e.target.getBoundingClientRect().x - 20,
									y: e.target.getBoundingClientRect().y - 25,
									width: e.currentTarget.offsetWidth,
								})
							}
							onMouseLeave={() => toggleTip()} />
					</>
				}
			</div>
			{ sideBarIsClip ?
				<>

					<div className={isMobile ? `main-bar main-mobile` : `main-bar`}>
						<div className={`close-transcript`} style={{ display: `${isMobile ? `initial` : `none`}` }}>
							<img src={closeIcon} alt={`closeIcon`} className={`toggle-transcript`} onClick={handleToggleTranscript}
								onMouseEnter={e => handleShowTip(`transcript-hide`,
									{
										x: e.target.getBoundingClientRect().x - 80,
										y: e.target.getBoundingClientRect().y - 25,
										width: e.currentTarget.offsetWidth,
									})
								}
								onMouseLeave={() => toggleTip()}
							/>
						</div>
						<div className={`transcript-content`}>
							<div className={`clip-container`} >
								<h1 className={`clip-header`}>Clips</h1>
								<hr className={`hr-style`}/>
							</div>
							<div className={`clip-item-container`}>
								{
									clips?.map((clip, index) => {
										return (
											<div key={index}>
												<Link to={`/player/${clipId}/${index}`}>
													<div className={`clip-item`}>
														<p className={`clip-title`}><b>{clip.title}:&nbsp;</b>{new Date(clip[`start`] * 1000).toISOString().substr(11, 8)} - {new Date(clip[`end`] * 1000).toISOString().substr(11, 8)}</p>
													</div>
												</Link>
											</div>
										)
									})
								}
							</div>
						</div>
					</div>
				</> :
				<>
					<div id='subtitles-container' className={isMobile ? `main-bar main-mobile` : `main-bar`}>
						<div className={`close-transcript`} style={{ display: `${isMobile ? `initial` : `none`}` }}>
							<img src={closeIcon} alt={`closeIcon`} className={`toggle-transcript`} onClick={handleToggleTranscript}
								onMouseEnter={e => handleShowTip(`transcript-hide`,
									{
										x: e.target.getBoundingClientRect().x - 80,
										y: e.target.getBoundingClientRect().y - 25,
										width: e.currentTarget.offsetWidth,
									})
								}
								onMouseLeave={() => toggleTip()}
							/>
						</div>
						<div className={`transcript-content`}>
							{	displaySubtitles !== null && displaySubtitles.content !== `` ?
								displaySubtitles[`content`].map((element, index) =>
									<div id={`t-row-${index}`} className={`transcript-row ${subtitleText === element.text && subtitleTextIndex === index && `active-sub`}`}
										key={index}
									>
										<p className='transcript-trans' onClick={getTranslation}>{addSpansAndHighlights(element.text)}</p>
										<div onClick={e => handleSeekChange(null, element.start + element.start * .0000001)}
											// passing time + 1% of time. This is to make sure that when seeking it goes to the current subtitle and not the previous one
											className='arrow'
											onMouseEnter={e => handleShowTip(`transcript-seek`,
												{
													x: e.target.getBoundingClientRect().x - 20,
													y: e.target.getBoundingClientRect().y - 30,
													width: e.currentTarget.offsetWidth,
												})
											}
											onMouseLeave={() => toggleTip()}
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
						<h4>
							Translation by <a href='https://libretranslate.com/'>LibreTranslate</a>&nbsp;
							{showTranslationSpinner && <Spinner animation='border' role='status' />}
						</h4><br/>
						<div id='translation-box'>
							{words}
						</div>
					</div>
				</>}
		</Style>
	)
}

const mapStateToProps = store => ({
	languageCodes: store.interfaceStore.languageCodes,
	jsonResponse: store.interfaceStore.jsonResponse,
})

const mapDispatchToProps = {
	translate: interfaceService.getTranslation,
}

export default connect(mapStateToProps, mapDispatchToProps)(Transcript)
