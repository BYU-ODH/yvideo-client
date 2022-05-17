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
import skipBack from 'assets/skip-back-white.svg'
import skipForward from 'assets/skip-forward-white.svg'

const PlayerControls = props => {

	const {
		// duration,
		fullscreen,
		hovering,
		progress,
		playTime,
		// volume,
		// muted,
		playing,
		isCaption,
		isAdmin,
		isProf,
		showTranscript,
		subtitles,
		playbackRate,
		playbackOptions,
		indexToDisplay,
		displaySubtitles,
		subtitleTextIndex,
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
		// handleMuted,
		// handleUnmuted,
		// handleVolumeChange,
		setIsCaption,
		handleChangeSubtitle,
		handleShowSubtitle,
		setShowTranscript,
		handleShowTip,
		handleShowHelp,
		toggleTip,
		handleAspectRatio,
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
		handleAspectRatio()
	}

	const handleSeekToSubtitle= (e) => {
		let seekToIndex = 0

		if(displaySubtitles && subtitleTextIndex !== undefined){
			if(e.target.id === `prev-sub`){
				if(subtitleTextIndex > 1)
					seekToIndex = subtitleTextIndex - 1

			} else {
				if(subtitleTextIndex < displaySubtitles.content.length - 1)
					seekToIndex = subtitleTextIndex + 1
				else
					seekToIndex = displaySubtitles.content.length - 1

			}
		}

		const start = displaySubtitles.content[seekToIndex].start
		handleSeekChange(null, start + start * .001)
	}

	return (
		<Style playing={playing} >

			<Scrubber clipTime={clipTime} clipPercent={clipPercent} progress={progress} active={hovering} handleClick={handleSeekChange} />

			<div className='left'>
				<PlayPause playing={playing} onClick={playing ? handlePause : handlePlay}
					onMouseEnter={e => handleShowTip(`play`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
					onMouseLeave={e => toggleTip()}
				/>
				<p className='play-time'>{playTime}</p>
				<img id='start-over' alt='' src={startOverIcon} onClick={e => handleSeekChange(null, 0)} width='20' height='20'
					onMouseEnter={e => handleShowTip(`restart`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
					onMouseLeave={e => toggleTip()}
				/>
				{ subtitleTextIndex !== null &&
				<img id='prev-sub' src={skipBack} onClick={e => handleSeekToSubtitle(e)} width='20' height='20' alt='Previous Subtitle'
					onMouseEnter={e => handleShowTip(`prev-sub`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
					onMouseLeave={e => toggleTip()}
				/>
				}
				{ subtitleTextIndex !== null &&
				<img id='next-sub' src={skipForward} onClick={e => handleSeekToSubtitle(e)} width='20' height='20' alt='Next Subtitle'
					onMouseEnter={e => handleShowTip(`next-sub`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
					onMouseLeave={e => toggleTip()}
				/>
				}

			</div>
			<div className='right'>
				<Fullscreen fullscreen={fullscreen} onClick={handleToggleFullscreen}
					onMouseEnter={e => handleShowTip(`fullscr`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
					onMouseLeave={e => toggleTip()}
				/>
				<Speed src={clockIcon} onClick={handleChangeSpeed}
					onMouseEnter={e => handleShowTip(`playback-rate`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
					onMouseLeave={e => toggleTip()}
				/>
				{ subtitleTextIndex !== null &&
				<ClosedCaptions
					isCaptions={isCaption}
					onClick={ isAdmin || isProf ? handleChangeCaption : handleToggleSubtitles}
					onMouseEnter={e => handleShowTip(`closed-captions`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
					onMouseLeave={e => toggleTip()}
				/>
				}
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
						{ playbackOptions.map((playbackAtIndex) => (
							playbackAtIndex !== 1 ?
							<><input type='button' value={playbackAtIndex} key={playbackAtIndex} onClick={e => handlePlaybackRateChange(playbackAtIndex)} className={playbackRate === playbackAtIndex ? `active-value` : ``}/><br/></>
							:
							<><input type='button' value='Normal' key={1} onClick={e => handlePlaybackRateChange(playbackAtIndex)} className={playbackRate === playbackAtIndex ? `active-value` : ``}/><br/></>
							))
						}
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
							<input key={element.id} type='button' value={element.title} onClick={e => handleChangeSubtitle(index)} className={ indexToDisplay === index ? `active-value` : ``}/>,
						)
						}
					</div>
				</div>
			}
			{ isCaption && !isAdmin && !isProf &&
				<div className='menu-modal' onMouseLeave={e => setIsCaption(false)}>
					<h3>Select Caption</h3>
					<div className='caption-list'>
						<input type='button' value={displaySubtitles.title} className={`active-value`}/>
					</div>
				</div>
			}
		</Style>
	)
}

export default PlayerControls
