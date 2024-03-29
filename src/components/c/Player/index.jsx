import React, { useEffect, useState, useRef } from 'react'
import ReactPlayer from 'react-player'

import { PlayerControls, Transcript } from 'components/bits'
import { PlayerSubtitlesContainer } from 'containers'
import { CurrentEvents, CensorChange, CommentChange, handleSubtitle } from 'components/common/getCurrentEvents'

import playButton from 'assets/hexborder.svg'
import Style, { Blank, Subtitles, PlayButton, PauseMessage, AlertMessage } from './styles'

const Player = props => {

	const {
		ref,
		url,
		playing,
		playbackRate,
		progress,
		volume,
		muted,
		blank,
		duration,
		fullscreen,
		showTranscript,
		displaySubtitles,
		indexToDisplay,
		isMobile,
		clipTime,
		isLandscape,
		hasPausedClip,
		events,
		playbackOptions,
		started,
		hovering,
		mouseInactive,
		controlsHovering,
		showIcon,
		playPause,
	} = props.viewstate

	const {
		handleDuration,
		handleMouseOut,
		handleMouseOver,
		handlePause,
		handlePlay,
		handleStart,
		handleClipStart,
		handleProgress,
		handleSeekChange,
		handleMuted,
		handleUnmuted,
		handleShowSubtitle,
		handlePlayPause,
		setHasPausedClip,
		handleAspectRatio,
		handlePlaybackRateChange,
		handleToggleFullscreen,
		handleToggleSubtitles,
		checkBrowser,
		handleMouseMoved,
	} = props.handlers

	const [skipArray, setSkipArray] = useState([])
	const isPlaying = useRef(playing)
	const isFullscreen = useRef(fullscreen)
	const isShowTranscript = useRef(showTranscript)
	const isShowIcon = useRef(showIcon)

	useEffect(() => {
		isPlaying.current = playing
		isFullscreen.current = fullscreen
		isShowTranscript.current = showTranscript
		isShowIcon.current = showIcon
	}, [playing, fullscreen, showTranscript,showIcon,playPause])

	useEffect(() => {
		document.body.onkeyup = e => handleHotKeys(e)
		checkBrowser()
		if(clipTime.length > 0)
			handleClipStart()
		return () => document.body.onkeyup = null
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [duration])

	const handleHotKeys = (e) => {
		const playedTime = parseFloat(document.getElementById(`seconds-time-holder`).innerHTML)
		switch (e.code) {
		case `ArrowRight`:
			handleSeekChange(null, playedTime + 10)
			break
		case `ArrowLeft`:
			handleSeekChange(null, playedTime - 10)
			break
		case `Period`:
			// If they press the periodKey and the shiftKey isn't pressed down, do the seeking, but if the shift key IS pressed down, do the else block
			if(!e.shiftKey) {
				handleSeekChange(null, playedTime + 1)
				break
			} else {
				// Checking to make sure that the value of the playback rate is within the possible options
				if (playbackRate >= playbackOptions[0] && playbackRate < playbackOptions[playbackOptions.length - 1])
					handlePlaybackRateChange(playbackOptions[playbackOptions.findIndex(element => element === playbackRate) + 1])
				break
			}
		case `Comma`:
			// If they press the commaKey and the shiftKey isn't pressed down, do the seeking, but if the shift key IS pressed down, do the else block
			if(!e.shiftKey) {
				handleSeekChange(null, playedTime - 1)
				break
			} else {
				// Checking to make sure that the value of the playback rate is within the possible options
				if (playbackRate > playbackOptions[0] && playbackRate <= playbackOptions[playbackOptions.length - 1])
					handlePlaybackRateChange(playbackOptions[playbackOptions.findIndex(element => element === playbackRate) - 1])
				break
			}
		case `Space`:
			handlePlayPause(isPlaying.current)
			break
		case `KeyF`:
			handleToggleFullscreen(isFullscreen.current)
			break
		case `KeyC`:
			handleToggleSubtitles(isShowTranscript.current)
			break
		default:
			break
		}
	}

	const handleOnProgress = ({ played, playedSeconds }) => {
		handleProgress(playedSeconds)
		document.getElementById(`seconds-time-holder`).innerText = playedSeconds
		const subtitles = displaySubtitles
		if(document.getElementById(`time-bar-progress`))
			document.getElementById(`time-bar-progress`).style.width = `${played * 100}%`
		if(document.getElementById(`time-dot`)) {
			document.getElementById(`time-dot`).style.left = played ?
				`calc(${played * 100}% - 2px)`
				:
				`calc(${played * 100}% - 2px)`
		}
		if(subtitles?.content.length > 0)
			handleSubtitle(playedSeconds, subtitles, 0, duration)

		if (clipTime.length > 0 && playedSeconds > clipTime[1]){
			if (!hasPausedClip){
				handlePause()
				setHasPausedClip(true)
			}
		}

		if(!events) return

		const values = CurrentEvents(playedSeconds, events, duration)

		for (let i = 0; i < values.censors.length; i++) CensorChange(i, values.censors[i], playedSeconds)
		for (let x = 0; x < values.comments.length; x++) CommentChange(x, values.comments[x].position)

		if(values.allEvents){
			if(values.allEvents.filter(e => e.type === `Mute`).length === 0){
				if (muted)
					handleUnmuted()
			}
		}
		for (let y = 0; y < values.allEvents.length; y++){
			let index = 0
			if (values.allEvents[y].type === `Pause`)
				index = events.findIndex(event => event.type === values.allEvents[y].type && event.start === values.allEvents[y].start)
			else
				index = events.findIndex(event => event.type === values.allEvents[y].type && event.start === values.allEvents[y].start && event.end === values.allEvents[y].end)
			if(!events[index].active)
				return
			const pauseMessage = document.getElementById(`pauseMessage`)
			const pauseMessageButton = `<button type='button' onclick={pauseMessage.style.visibility='hidden'}>Close</button>`
			switch(values.allEvents[y].type){
			case `Mute`:
				if(!muted)
					handleMuted()

				break
			case `Pause`:
				events[index].active = false
				handlePause()

				if(events[index].message){
					pauseMessage.style.visibility = `visible`
					pauseMessage.innerHTML = events[index].message + pauseMessageButton
				}
				break
			case `Skip`:
				events[index].active = false
				handleSeekChange(null, values.allEvents[y].end)
				break
			default:
				break
			}
		}

		for(let j = 0; j < values.doneEvents.length; j++){
			// needed for unmuting after muting event is done
			const index = events.findIndex(event => event.type === values.doneEvents[j].type && event.start === values.doneEvents[j].start && event.end === values.doneEvents[j].end)

			if(!events[index]?.active)
				return

			switch(values.doneEvents[j].type){
			case `Mute`:
				if(muted){
					handleUnmuted()
					events[index].active = false
				}
				break
			default:
				break
			}
		}
	}

	const handleOnReady = () => {
		handleAspectRatio()
		if(events){
			const eventFilterSkip = events.filter((values) => {
				return values.type === `Skip`
			})
			setSkipArray(eventFilterSkip)
		}
	}

	return (
		<Style onMouseMove={handleMouseMoved} hovering={hovering} started={started} playing={playing} mouseInactive={mouseInactive} controlsHovering={controlsHovering}>
			<div style={
				{
					display: `${showTranscript !== false ? `flex` : `initial`}`,
					height: `100%`,
					overflow: `hidden`,
					alignContent:`center`,
				}
			}>

				<div className='player-wrapper' id={`player-container`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={playing ? handlePause : handlePlay} style={{ flex: 1 }}>
					<div className={showIcon === true ? `${playPause}-icon zoom-in-zoom-out`:`${playPause}-icon`}></div>
					<ReactPlayer
						ref={ref}
						className='react-player'
						width='100%'
						height='100%'
						url={url}
						playing={playing}
						playsinline={true}
						playbackRate={parseFloat(playbackRate)}
						volume={volume}
						muted={muted}
						onPlay={handlePlay}
						onPause={handlePause}
						onStart={handleStart}
						onReady = {handleOnReady}
						onSeek={e => e}
						progressInterval={30}
						onProgress={handleOnProgress}
						// onProgressBar={handleOnReady}
						onDuration={handleDuration}

						config={{
							file: {
								forceVideo: true,
								hlsVersion: `0.12.4`,
								attributes: {
									disablePictureInPicture: true,
								},
							},
							youtube: {
								iv_load_policy: 3,
								modestbranding: 1,
								playsinline: 1,
								rel: 0,
								showinfo: 0,
							},
						}}
					/>

					<PlayerControls viewstate={props.viewstate} handlers={props.handlers} skipArray={skipArray}/>
					<Blank blank={blank} id='blank' onContextMenu={e => e.preventDefault()}>
						{ !started &&
							<PlayButton playing={playing} onClick={() => handlePlayPause(playing)} started={started} src={playButton} isMobile={isMobile} isLandscape={isLandscape}/>
						}
						{displaySubtitles !== null && displaySubtitles !== undefined && showTranscript &&
							<Subtitles id='subtitleBox'><h3 id='subtitle'></h3></Subtitles> /* eslint-disable-line jsx-a11y/heading-has-content */
						}
						<div id='censorContainer' style={{width: `100%`, height: `100%`, position: `absolute`, top: `0px`}}>
						</div>
						<div id ='commentContainer' style={{width: `100%`, height: `100%`, position: `absolute`, top: `0px`}}>
						</div>
						<PauseMessage id='pauseMessage'>
						</PauseMessage>
						<AlertMessage id='alertMessage'></AlertMessage>
					</Blank>
				</div>

				<Transcript viewstate={props.viewstate} handlers={props.handlers}>
				</Transcript>
			</div>
			{
				url !== `` && showTranscript ? (
					<PlayerSubtitlesContainer
						currentTime={progress}
						duration={duration}
						handleShowSubtitle={handleShowSubtitle}
						indexToDisplay={indexToDisplay}
					/>
				) : null
			}
			<p id='seconds-time-holder' style={{ visibility: `hidden`, position: `absolute`, top: `0px`, right: `0px` }}></p>
		</Style>
	)
}

export default Player
