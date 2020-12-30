import React, { PureComponent } from 'react'
import parse from 'html-react-parser'

import ReactPlayer from 'react-player'

import { Style, Help } from './styles'

import chevron from 'assets/player-chevron-left.svg'

import helpIcon from 'assets/help/help-icon-white.svg'

export default class Transcript extends PureComponent {
	render(){

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
										onClick={e => handleSeekChange(null, (element.start * duration / 100) + .5)}
										onMouseEnter={e => handleShowTip('transcript-seek', {x: e.target.getBoundingClientRect().x + 160, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
										onMouseLeave={e => toggleTip()}
										>
										<p>{highlightWords(element.text)}</p>
										{/* <p>{element.text}</p> */}
									</div>
								)
							) : (null)
						}
						<br/>
					</div>
				</div>
			</Style>
		)
	}
}