import React, { PureComponent } from 'react'
import parse from 'html-react-parser'

import { connect } from 'react-redux'

import { Style, Help } from './styles'

import chevron from 'assets/player-chevron-left.svg'

import helpIcon from 'assets/help/help-icon-white.svg'

import {
	interfaceService
} from 'services'

export default class Transcript extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			words: '',
			meanings: '',
		}
	}

	render(){
		const languageCodes = {
			//add language codes as needed
			spanish: 'es',
			german: 'de',
			russian: 'ru',
		}

		const {
			content,
			displaySubtitles,
			subtitleText,
			duration,
			toggleTranscript,
			showTranscript,
		} = this.props.viewstate

		const {
			setToggleTranscript,
			handleShowHelp,
			handleSeekChange,
			handleToggleTranscript,
			handleShowTip,
			toggleTip,
		} = this.props.handlers

		const highlightWords = (text) => {
			//initialize the string where we can make changes
			if(content === undefined){
				return;
			}

			let words = content.words

			let newString = text

			words.forEach(word => {
				//create a regex for each different word
				//with this regex we want to accept start of a line ^ or any white space of character punctuation before the start of the word.
				//after matching the word. we want the word to finish with a punctuation character or with a space, new line, or end of string.
				//do not execute if the string is empty

				let regex = new RegExp(`(^|[\\s|.|,|;])${word}([\\s|.|,|;|\\n]|$)`, "gmi");
				// console.log(regex)
				let matches = newString.match(regex)
				if(matches !== null){
					//highlight and push changes
					matches.forEach(m => {
						// console.log('Matched', m)
						let rep = new RegExp(`${m}`, "gmi")

						if(m !== ". " && m !== ", " && m !== "" && m !== "."){
							newString = newString.replace(rep, `<span class="highlight">${m}</span>`)
						}

					});
					// console.log(newString)
				}
			})

			return parse(newString)
		}

		const getTranslation = async (e) => {
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
			//http://yvideobeta.byu.edu:5001/translate/es/hola
			// const mockResponse = {
			// 	"papa": [
			// 		{
			// 			"lemma": "papa",
			// 			"meanings": [
			// 				{
			// 					"lemma": "pontiff",
			// 					"pos": "{n}",
			// 					"meaning": "(pope)"
			// 				},
			// 				{
			// 					"lemma": "potato",
			// 					"pos": "{n}",
			// 					"meaning": "(plant tuber eaten as starchy vegetable)"
			// 				}
			// 			]
			// 		}
			// 	]
			// }
			// console.log(mockResponse['papa'][0]['meanings'])
			// return mockResponse['papa'][0]['meanings']
			const response = await fetch(`http://yvideobeta.byu.edu:5001/translate/${languageCodes[displaySubtitles.language]}/${foundWord}`)
			console.log(response)
			let jsonResponse = await response.json()
			console.log(jsonResponse)

			let allWords = ''
			let allMeanings = ''

			if(!jsonResponse[foundWord]){
				this.setState({
					words: 'No Matches Found',
					meanings: '-'
				})
				return;
			}

			// mockResponse[word][0]['meanings'].forEach((item, index) => {
			// 	allWords += `<b>${index}.</b>${item.lemma}; `
			// 	allMeanings += `<b>${index}.</b>${item.meaning.substring(1, item.meaning.length - 1)}; `
			// });

			jsonResponse[foundWord][0]['meanings'].forEach((item, index) => {
				allWords += `<b>${index}.</b>${item.lemma}; `
				allMeanings += `<b>${index}.</b>${item.meaning.substring(1, item.meaning.length - 1)}; `
			});

			this.setState({
				words: allWords,
				meanings: allMeanings
			})
		}

		return (
			<Style style={{ display: `${showTranscript !== false ? ('initial') : ('none')}` }} displayTranscript={toggleTranscript}>
				<div className={'side-bar'}>
					<img src={chevron} className={'toggle-transcript'} onClick={handleToggleTranscript}
						onMouseEnter={e => handleShowTip('transcript-hide', {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
						onMouseLeave={e => toggleTip()}
					/>
					<Help src={helpIcon} onClick={handleShowHelp}
						onMouseEnter={e => handleShowTip('help', {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
						onMouseLeave={e => toggleTip()}
					/>
				</div>
				<div className={'main-bar'}>
					<div className={'transcript-title'}>
						<h1>Transcript</h1>
						<h2>Video Audio - {content !== undefined ? (content.settings.targetLanguages) : (null)}</h2>
						<h2>Caption Language - {displaySubtitles !== null ? (displaySubtitles.language) : (`No captions available`)}</h2>
					</div>
					<br/><br/><br/>
					<div className={'transcript-content'}>
						{	displaySubtitles != null ? (

							displaySubtitles['content'].map((element, index) =>
									<div className={`transcript-row ${subtitleText === element.text ? ('active-sub') : ('') }`}
										key={index}
										>
										<p onClick={getTranslation}>{highlightWords(element.text)}</p>
										<div onClick={e => handleSeekChange(null, (element.start * duration / 100) + .5)}
											className="arrow"
											onMouseEnter={e => handleShowTip('transcript-seek', {x: e.target.getBoundingClientRect().x - 50, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
											onMouseLeave={e => toggleTip()}
											><span
											>{(element.start * duration / 100).toFixed(2)}s</span></div>
										{/* <p>{element.text}</p> */}
									</div>
								)
							) : (null)
						}
						<br/>
					</div>
				</div>
				<hr style={{ width: '120%'}}/>
				<br/>
				<div className="transcript-translation">
					<h2>Quick Translation</h2><br/>
					<div id="translation-box">
						<h3 id="translation-word"></h3>
						<ul id="translation-list">
							<li>
								<label>Translation: {parse(this.state.words)}</label>
							</li>
							<li>
								<label>Meaning: {parse(this.state.meanings)}</label>
							</li>
						</ul>
					</div>
				</div>
			</Style>
		)
	}
}
