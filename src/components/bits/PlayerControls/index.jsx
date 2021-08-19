import React, { useState, useEffect } from 'react'

import { Scrubber } from 'components/bits'

import Style, {
	PlayPause,
	ClosedCaptions,
	Fullscreen,
	Book,
	// Volume,
	Speed,
	Help,
} from './styles'

import clockIcon from 'assets/te-clock.svg'
import startOverIcon from 'assets/start_over_icon.svg'
import helpIcon from 'assets/help/help-icon-white.svg'

const PlayerControls = props => {

	const {
		// duration,
		fullscreen,
		hovering,
		progress,
		volume,
		muted,
		playing,
		isCaption,
		isAdmin,
		isProf,
		showTranscript,
		subtitles,
		playbackRate,
		indexToDisplay,
		displaySubtitles,
		isMobile,
		clipTime,
		duration,
	} = props.viewstate

	const {
		handleToggleTranscript,
		handlePause,
		handlePlay,
		handlePlaybackRateChange,
		handleSeekChange,
		// handleSeekMouseDown,
		// handleSeekMouseUp,
		handleToggleFullscreen,
		handleMuted,
		handleUnmuted,
		handleVolumeChange,
		setIsCaption,
		handleChangeSubtitle,
		handleShowSubtitle,
		setShowTranscript,
		handleShowTip,
		handleShowHelp,
		toggleTip,
	} = props.handlers

	useEffect(() => {
		// Some browsers do not trigger an event when you exit full screen mode. So, you have to look for it manually adding an event listener
		// after the event listener, there is a callback function which only has to set the fullscreen prop to false again.
		// the close event is already handled when you close the full screen. So instead of looking at the escape event, we look for the fullscreenchange event
		// when the screen changes we know that we should update our state.
		document.addEventListener(`fullscreenchange`, exitHandler)
		document.addEventListener(`webkitfullscreenchange`, exitHandler)
		document.addEventListener(`mozfullscreenchange`, exitHandler)
		document.addEventListener(`MSFullscreenChange`, exitHandler)

		function exitHandler() {
			if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
				// /now, we only want to do this whenever the fullscreen is true so we make sure that this happens when we are exiting fullscreen
				if(fullscreen) props.handlers.setFullscreen(!props.viewstate.fullscreen)

			}
		}
	})

	const [showSpeed, setShowSpeed] = useState(false)
	const clipPercent = clipTime.map(e =>{
		return e/duration
	})
	// console.log((clipPercent[1]-clipPercent[0])*100)
	// const handleSubmitSpeed = (e) => {
	// 	e.preventDefault()
	// }

	const handleChangeSpeed = () => {
		toggleTip()
		setShowSpeed(!showSpeed)
		if(isCaption)
			setIsCaption(!isCaption)

	}

	const handleChangeCaption = () => {
		toggleTip()
		setIsCaption(!isCaption)
		if(showSpeed)
			setShowSpeed(!showSpeed)

	}

	const handleToggleSubtitles = () => {
		setShowTranscript(!showTranscript)
		handleShowSubtitle(``)
	}

	return (
		<Style playing={playing} >

			<Scrubber clipTime={clipTime} clipPercent={clipPercent} progress={progress.played} active={hovering} handleClick={handleSeekChange} />

			<div className='left'>
				<PlayPause playing={playing} onClick={playing ? handlePause : handlePlay} />
				<img id='start-over' src={startOverIcon} onClick={e => handleSeekChange(null, 0)} width='20' height='20'/>
			</div>
			<div className='right'>
				<Fullscreen fullscreen={fullscreen} onClick={handleToggleFullscreen} />
				<Speed src={clockIcon} onClick={handleChangeSpeed}
					onMouseEnter={e => handleShowTip(`playback-rate`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
					onMouseLeave={e => toggleTip()}
				/>
				<ClosedCaptions
					isCaptions={isCaption}
					onClick={ isAdmin || isProf ? handleChangeCaption : handleToggleSubtitles}
					onMouseEnter={e => handleShowTip(`closed-captions`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
					onMouseLeave={e => toggleTip()}
				/>
				{ isMobile &&
				<Book onClick={handleToggleTranscript}/>}
				{ isMobile &&
					<Help src={helpIcon} onClick={handleShowHelp}
						onMouseEnter={e => handleShowTip(`help`, {x: e.target.getBoundingClientRect().x - 80, y: e.target.getBoundingClientRect().y - 25, width: e.currentTarget.offsetWidth})}
						onMouseLeave={e => toggleTip()}
					/>}
			</div>
			{ showSpeed &&
				<div className='menu-modal' onMouseLeave={e => setShowSpeed(false)}>
					<h3>Playback Rate</h3>
					<div>
						<input type='button' value={3.0} onClick={e => handlePlaybackRateChange(e.target.value)} className={playbackRate === 3 ? `active-value` : ``}/><br/>
						<input type='button' value={2.0} onClick={e => handlePlaybackRateChange(e.target.value)} className={playbackRate === 2 ? `active-value` : ``}/><br/>
						<input type='button' value={1.5} onClick={e => handlePlaybackRateChange(e.target.value)} className={playbackRate === 1.5 ? `active-value` : ``}/><br/>
						<input type='button' value='Normal' onClick={e => handlePlaybackRateChange(1)} className={playbackRate === 1 ? `active-value` : ``}/><br/>
						<input type='button' value={0.5} onClick={e => handlePlaybackRateChange(e.target.value)} className={playbackRate === 0.5 ? `active-value` : ``}/><br/>
						<input type='button' value={0.25} onClick={e => handlePlaybackRateChange(e.target.value)} className={playbackRate === 0.25 ? `active-value` : ``}/><br/>
					</div>
				</div>
			}
			{/* { isCaption &&
				<div className="menu-modal" onMouseLeave={e => setIsCaption(false)}>
					<h3>Select Caption</h3>
					<div className="caption-list">
						{subtitles.map((element, index) =>
							<input key={element.id} type="button" value={element.language} onClick={e => handleChangeSubtitle(index)} className={ indexToDisplay == index ? ('active-value') : ('')}/>
						)
						}
					</div>
				</div>
			} */}
			{ isCaption && (isAdmin || isProf) &&
				<div className='menu-modal' onMouseLeave={e => setIsCaption(false)}>
					<h3>Select Caption</h3>
					<div className='caption-list'>
						{subtitles.map((element, index) =>
							<input key={element.id} type='button' value={element.title} onClick={e => handleChangeSubtitle(index)} className={ indexToDisplay == index ? `active-value` : ``}/>,
						)
						}
					</div>
				</div>
			}
			{ isCaption && !isAdmin && !isProf &&
				<div className='menu-modal' onMouseLeave={e => setIsCaption(false)}>
					<h3>Select Caption</h3>
					<div className='caption-list'>
						<input type='button' value={displaySubtitles.language} className={`active-value`}/>
					</div>
				</div>
			}
		</Style>
	)

}

export default PlayerControls
