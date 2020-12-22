import React, { PureComponent } from 'react'

import ReactPlayer from 'react-player'

import { Style, Help } from './styles'

import chevron from 'assets/player-chevron-left.svg'
import closeIcon from 'assets/close_icon.svg'

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
			isMobile,
		} = this.props.viewstate

		const {
			setToggleTranscript,
			handleShowHelp,
			handleSeekChange,
			handleToggleTranscript,
			handleShowTip,
			toggleTip,
		} = this.props.handlers

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