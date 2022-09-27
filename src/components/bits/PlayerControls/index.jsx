import React, { useEffect } from 'react'

import { Scrubber } from 'components/bits'

import Style, {
	PlayPause,
	ClosedCaptions,
	FullScreen,
	Book,
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
		fullscreen,
		hovering,
		progress,
		playTime,
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
		events,
		showSpeed,
		progressEntered,
	} = props.viewstate

	const {
		handleToggleTranscript,
		handlePause,
		handlePlay,
		handlePlaybackRateChange,
		handleSeekChange,
		handleToggleFullscreen,
		setIsCaption,
		handleChangeSubtitle,
		handleShowTip,
		handleShowHelp,
		toggleTip,
		handleToggleSubtitles,
		handleOffSubtitles,
		setShowSpeed,
		handleChangeSpeed,
		handleChangeCaption,
		handleSeekToSubtitle,
		handleMouseOver,
	} = props.handlers

	const {
		skipArray,
	} = props

	useEffect(() => {
		/* Some browsers do not trigger an event when you exit full screen mode. So, you have to look for it manually adding an event listener
		after the event listener, there is a callback function which only has to set the fullscreen prop to false again.
		the close event is already handled when you close the full screen. So instead of looking at the escape event, we look for the fullscreenchange event
		when the screen changes we know that we should update our state. */
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

	const clipPercent = clipTime.map(e =>{
		return e/duration
	})

	return (
		<Style hovering={hovering} onMouseOver={handleMouseOver} playing={playing} progressentered={progressEntered}>

			<Scrubber duration={duration} events={events} clipTime={clipTime} clipPercent={clipPercent} progress={progress} active={hovering} handleClick={handleSeekChange} skipArray={skipArray}/>
			<div className='left'>
				<PlayPause data-testid='playPause' playing={playing} onClick={playing ? handlePause : handlePlay}
					onMouseEnter={e => handleShowTip(`play`,
						{
							x: e.target.getBoundingClientRect().x,
							y: e.target.getBoundingClientRect().y - 100,
							width: e.currentTarget.offsetWidth,
						})
					}
					onMouseLeave={() => toggleTip()}
				/>
				<p className='play-time'>{playTime}</p>
				<img id='start-over' alt='start-over' src={startOverIcon} onClick={e => handleSeekChange(null, 0)} width='20' height='20'
					onMouseEnter={e => handleShowTip(`restart`,
						{
							x: e.target.getBoundingClientRect().x,
							y: e.target.getBoundingClientRect().y - 100,
							width: e.currentTarget.offsetWidth,
						})
					}
					onMouseLeave={() => toggleTip()}
				/>
				{ subtitleTextIndex !== null && showTranscript &&
				<img id='prev-sub' src={skipBack} onClick={e => handleSeekToSubtitle(e)} width='20' height='20' alt='Previous Subtitle'
					onMouseEnter={e => handleShowTip(`prev-sub`,
						{
							x: e.target.getBoundingClientRect().x,
							y: e.target.getBoundingClientRect().y - 100,
							width: e.currentTarget.offsetWidth,
						})
					}
					onMouseLeave={() => toggleTip()}
				/>
				}
				{ subtitleTextIndex !== null && showTranscript &&
				<img id='next-sub' src={skipForward} onClick={e => handleSeekToSubtitle(e)} width='20' height='20' alt='Next Subtitle'
					onMouseEnter={e => handleShowTip(`next-sub`,
						{
							x: e.target.getBoundingClientRect().x,
							y: e.target.getBoundingClientRect().y - 100,
							width: e.currentTarget.offsetWidth,
						})
					}
					onMouseLeave={() => toggleTip()}
				/>
				}

			</div>
			<div className='right'>
				<FullScreen data-testid='fullscreen' fullscreen={fullscreen} onClick={handleToggleFullscreen}
					onMouseEnter={e => handleShowTip(`fullscr`,
						{
							x: e.target.getBoundingClientRect().x,
							y: e.target.getBoundingClientRect().y - 100,
							width: e.currentTarget.offsetWidth,
						})
					}
					onMouseLeave={() => toggleTip()}
				/>
				<Speed data-testid='speed' src={clockIcon} onClick={handleChangeSpeed}
					onMouseEnter={e => handleShowTip(`playback-rate`,
						{
							x: e.target.getBoundingClientRect().x,
							y: e.target.getBoundingClientRect().y - 110,
							width: e.currentTarget.offsetWidth,
						})
					}
					onMouseLeave={() => toggleTip()}
				/>
				{ subtitleTextIndex !== null &&
				<ClosedCaptions
					data-testid='closed-captions'
					isCaptions={isCaption}
					onClick={ isAdmin || isProf ? handleChangeCaption : handleToggleSubtitles }
					onMouseEnter={e => handleShowTip(`closed-captions`,
						{
							x: e.target.getBoundingClientRect().x,
							y: e.target.getBoundingClientRect().y - 100,
							width: e.currentTarget.offsetWidth,
						})
					}
					onMouseLeave={() => toggleTip()}
				/>
				}
				{ isMobile &&
				<Book data-testid='transcript-toggle' onClick={handleToggleTranscript}/>}
				{ (isMobile || !showTranscript) &&
					<Help data-testid='help' src={helpIcon} onClick={handleShowHelp}
						onMouseEnter={e => handleShowTip(`help`,
							{
								x: e.target.getBoundingClientRect().x - 80,
								y: e.target.getBoundingClientRect().y - 25,
								width: e.currentTarget.offsetWidth,
							})
						}
						onMouseLeave={() => toggleTip()}
					/>}
			</div>
			{ showSpeed &&
				<div className='menu-modal' onMouseLeave={e => setShowSpeed(false)}>
					<h3>Playback Rate</h3>
					<div>
						{playbackOptions.map((playbackAtIndex) =>
							playbackAtIndex !== 1 ?
								<input
									type='button'
									value={playbackAtIndex}
									key={playbackAtIndex}
									onClick={() => handlePlaybackRateChange(playbackAtIndex)}
									className={playbackRate === playbackAtIndex ? `active-value` : ``} />
								:
								<input
									type='button'
									value='Normal'
									key={1}
									onClick={() => handlePlaybackRateChange(playbackAtIndex)}
									className={playbackRate === playbackAtIndex ? `active-value` : ``} />)
						}
					</div>
				</div>
			}
			{ isCaption && (isAdmin || isProf) &&
				<div className='menu-modal' onMouseLeave={e => setIsCaption(false)}>
					<h3>Select Caption</h3>
					<div className='caption-list'>
						{subtitles.map((element, index) =>
							<input
								key={element.id}
								type='button'
								value={element.title}
								onClick={() => handleChangeSubtitle(index)}
								className={ indexToDisplay === index && showTranscript === true ? `active-value` : ``}
							/>
						)
						}
						<button type='button' data-testid='off-button' className={`${showTranscript === false ? `active-value` : ``} subtitlesOffButton`} onClick={handleOffSubtitles}>Off</button>
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
