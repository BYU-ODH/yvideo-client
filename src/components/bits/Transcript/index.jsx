import React, { PureComponent } from 'react'

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
		} = this.props.handlers

		return (
			<Style style={{ display: `${showTranscript !== false ? ('initial') : ('none')}` }} displayTranscript={toggleTranscript}>
				<div className={'side-bar'}>
					<img src={chevron} className={'toggle-transcript'} onClick={handleToggleTranscript}/>
					<Help src={helpIcon} onClick={handleShowHelp}/>
				</div>
				<div className={'main-bar'}>
					<div className={'transcript-title'}>
						<h2>Video Audio - {content !== undefined ? (content.settings.targetLanguages) : (null)}</h2>
						<h2>Caption Language - {displaySubtitles !== null ? (displaySubtitles.language) : (`No captions available`)}</h2>
					</div>
					<div className={'transcript-content'}>
						{	displaySubtitles != null ? (

							displaySubtitles['content'].map((element, index) =>
									<div className={`transcript-row ${subtitleText === element.text ? ('active-sub') : ('') }`}
										key={index}
										onClick={e => handleSeekChange(null, (element.start * duration / 100) + .5)}
										>
										<p>{element.text}</p>
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