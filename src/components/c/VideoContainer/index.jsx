import React, { useRef, useState, useEffect, useCallback } from 'react'

import ReactPlayer from 'react-player'

import Style, {TimeBar, ToggleCarat, Blank, Censor, Comment, Subtitles } from './styles'

import { EventsContainer, SubtitlesContainer } from 'containers'

import { CensorDnD } from 'components/bits'

import Position from './censorPosition'

import {CurrentEvents, CensorChange} from './getCurrentEvents'

import play from 'assets/controls_play.svg'
import pause from 'assets/controls_pause.svg'
import mute from 'assets/controls_unmuted.svg'
import unmute from 'assets/controls_muted.svg'

const VideoContainer = props => {

	const {
		url,
		getDuration,
		minimized,
		handleLastClick,
		togglendTimeline,
		getVideoTime,
		events,
		updateEvents,
		eventToEdit,
		activeCensorPosition,
		setActiveCensorPosition,
	} = props

	const ref = useRef(null)
	const videoRef = useRef(null)
	const censorRef = useRef(null)

	const [playing, setPlaying] = useState(false)
	const [volume, setVolumeState] = useState(1)
	const [muted, setMuted] = useState(false)
	const [played, setPlayed] = useState(0)
	const [duration, setDuration] = useState(0) // total time of video
	const [elapsed, setElapsed] = useState(0)
	const [playbackRate, setPlaybackRate] = useState(1)
	const [blank, setBlank] = useState(false)
	const [videoComment, setVideoComment] = useState(``)
	const [commentPosition, setCommentPosition] = useState({x: 0, y: 0})
	const [subtitleText, setSubtitleText] = useState(``)
	const [censorPosition, setCensorPosition] = useState({})
	const [censorActive, SetCensorActive] = useState(false)
	const [currentZone, setCurrentZone] = useState([0, duration])

	useEffect(() => {
		const indicator = document.getElementById(`time-indicator`)
	})

	// I hate using a global variable here, we'll just have to see if it works
	let censorData = {}
	const video = {

		// state

		playing,
		volume,
		muted,
		played,
		duration,
		elapsed,
		playbackRate,

		// handlers

		toggleMute: () => setMuted(!muted),
		setVolume: volume => setVolumeState(volume),

		handleReady: reactPlayer => {
			const {
				playing,
				volume,
				muted,
				playbackRate,
			} = reactPlayer.props

			setPlaying(playing)
			setVolumeState(volume)
			setMuted(muted)
			setPlaybackRate(playbackRate)
		},
		handleProgress: ({ played, playedSeconds }) => {

			if(document.getElementById(`layer-time-indicator`) !== undefined)
				document.getElementById(`layer-time-indicator-line`).style.width = `calc(${played * 100}%)`
			if(document.getElementById(`timeBarProgress`) !== undefined)
				document.getElementById(`timeBarProgress`).value = `${played * 100}`
			if(document.getElementById(`time-dot`) !== undefined)
				document.getElementById(`time-dot`).style.left = played ? `calc(${played * 100}% - 2px)` : `calc(${played * 100}% - 2px)`
			// setElapsed(playedSeconds)
			const values = CurrentEvents(playedSeconds,events,duration)
			for (let i = 0; i < values.censorValues.length; i++) CensorChange(i,values.censorValues[i],playedSeconds)
		},
		handleDuration: duration => {
			// console.log(`step 1`)
			if(typeof getDuration === `function`){
				// console.log(`step 2`)
				getDuration(duration)
			}

			setDuration(duration)
			setCurrentZone([0, duration])
		},
		handlePlaybackRate: rate => {
			setPlaybackRate(rate)
		},
		handleSeek: (e, time) => {
			let newPlayed = 0
			if(e !== null){
				const scrubber = e.currentTarget.getBoundingClientRect()
				newPlayed = (e.pageX - scrubber.left) / scrubber.width
			} else
				newPlayed = time / duration

			if(newPlayed !== Infinity && newPlayed !== -Infinity){
				// console.log(newPlayed)
				ref.current.seekTo(newPlayed.toFixed(10), `fraction`)
				getVideoTime(newPlayed.toFixed(10) * duration)
				// console.log(newPlayed.toFixed(10) * duration)
			}
		},
		handlePause: () => {
			setPlaying(false)
			getVideoTime(elapsed.toFixed(1))
			// console.log(elapsed.toFixed(1))
		},
		handlePlay: () => {
			setPlaying(true)
			getVideoTime(elapsed.toFixed(1))
			// console.log(elapsed.toFixed(1))
			setActiveCensorPosition(-1)
		},
		handleMute: () => {
			// console.log('mute event')
			setMuted(true)
		},
		handleUnMute: () => {
			// console.log('Unmute event')
			setMuted(false)
		},
		handleBlank: (bool) => {
			setBlank(bool)
		},
		handleShowComment: (value, position) => {
			// console.log(position)
			// console.log(value)
			setVideoComment(value)
			setCommentPosition(position)

		},
		handleShowSubtitle: (value) => {
			// console.log(value)
			setSubtitleText(value)
		},
		// For when returning values of two subtitles
		handleCensorPosition: (position) => {
			if(position !== undefined){
				censorData = position
				setCensorPosition(
					position,
				)
			}
		},
		handleCensorActive: (bool) => {
			SetCensorActive(bool)
		},
		handleUpdateCensorPosition: (pos) => {
			// console.log(events)
			const event = events[eventToEdit]
			// console.log(pos.x/videoRef.current.offsetWidth*100 - event.position[activeCensorPosition][2]/2)
			if (event.type === `Censor`){
				if (event.position[activeCensorPosition] !== undefined){
					event.position[activeCensorPosition][0] = pos.x/videoRef.current.offsetWidth*100 + event.position[activeCensorPosition][2]/2
					event.position[activeCensorPosition][1] = pos.y/videoRef.current.offsetHeight*100 + event.position[activeCensorPosition][3]/2
				}
			}
			// console.log(event)
			updateEvents(eventToEdit,event,event[`layer`])
		},
		handleUpdateCensorResize: (delta, pos)=>{
			// console.log(videoRef.current.offsetWidth,ref.current)
			const event = events[eventToEdit]
			// console.log(pos,delta,event.position[activeCensorPosition][0],videoRef.current.offsetWidth)
			if (event.type === `Censor`){
				if (event.position[activeCensorPosition] !== undefined){
					const width = event.position[activeCensorPosition][2] + delta.width/videoRef.current.offsetWidth*100
					const height = event.position[activeCensorPosition][3] + delta.height/videoRef.current.offsetHeight*100
					event.position[activeCensorPosition][2] = width
					event.position[activeCensorPosition][3] = height
					event.position[activeCensorPosition][0] = pos.x/videoRef.current.offsetWidth*100 + width/2
					event.position[activeCensorPosition][1] = pos.y/videoRef.current.offsetHeight*100 + height/2
				}
			}
			// console.log(event.position)
			updateEvents(eventToEdit,event,event[`layer`])
		},
	}

	const config = {
		youtube: {
			playerVars: {
				autoplay: 0,
				controls: 0,
				iv_load_policy: 3,
				modestbranding: 1,
				rel: 0,
				enablejsapi: 1,
				showinfo: 0,
			},
			preload: true,
		},
	}

	const dateElapsed = new Date(null)
	dateElapsed.setSeconds(elapsed)
	const formattedElapsed = dateElapsed.toISOString().substr(11, 8)

	const showError = () => {
		alert(`There was an error loading the video`)
	}

	return (
		<Style style={{ maxHeight: `${!minimized ? `65vh` : `100vh`}`}} id='controller'>
			{/* <Style> */}
			<Blank blank={blank} onContextMenu={e => e.preventDefault()} onClick={(e) => activeCensorPosition === -1 ? handleLastClick(videoRef.current.offsetHeight, videoRef.current.offsetWidth, e.clientX, e.clientY, video.elapsed):console.log(``)} ref={videoRef}>
				{/* <Blank blank={blank} id='blank' onContextMenu={e => e.preventDefault()}> */}
				{activeCensorPosition !== -1 ? (
					<CensorDnD
						censorValues = {censorPosition}
						censorEdit = {activeCensorPosition}
						handleUpdateCensorPosition = {video.handleUpdateCensorPosition}
						handleUpdateCensorResize = {video.handleUpdateCensorResize}
						setCensorEdit = {setActiveCensorPosition}
						screenWidth = {videoRef.current !== null ? videoRef.current.offsetWidth: 0}
						screenHeight = {videoRef.current !== null ? videoRef.current.offsetHeight: 0}
						seekTo = {video.handleSeek}
					/>
				):``}

				<Comment commentX={commentPosition.x} commentY={commentPosition.y}>{videoComment}</Comment>
				{subtitleText !== `` ?(
					<Subtitles>{subtitleText}</Subtitles>
				) :``}

				<Censor style={{visibility: activeCensorPosition === -1? `visible`:`hidden` }} ref={censorRef} active={censorActive}><canvas></canvas></Censor>
			</Blank>
			<ReactPlayer ref={ref} config={config} url={url}
				onContextMenu={e => e.preventDefault()}

				// constants

				className='video'
				progressInterval={30}

				// state

				playing={playing}
				volume={volume}
				muted={muted}
				playbackRate={playbackRate}

				// handlers

				onReady={video.handleReady}
				onError={()=>{
					console.log(`Error is working`)
					showError()
				}}

				onPlay={video.handlePlay}
				onPause={video.handlePause}

				onProgress={video.handleProgress}
				// onProgress={()=>console.log(`1`)}
				onDuration={video.handleDuration}

				// blank style
			/>
			<TimeBar>
				<header>
					<button className='play-btn' onClick={playing ? video.handlePause : video.handlePlay}>
						<img src={playing ? pause : play} alt={playing ? `pause` : `play`}/>
					</button>

					<div className='scrubber'>
						<span className='time'>{formattedElapsed}</span>

						<button className='mute' onClick={video.toggleMute}>
							<img src={muted ? unmute : mute} alt={muted ? `unmute` : `mute`}/>
						</button>

						<div id='time-bar'>
							<div id={`time-bar-container`}>
								<progress id='timeBarProgress' className='total' value={`0`} max='100' onClick={video.handleSeek}></progress>
								<span id='time-dot'></span>
							</div>
						</div>
					</div>
				</header>
			</TimeBar>
			<EventsContainer currentTime={elapsed.toFixed(1)} duration={video.duration}
				handleSeek={video.handleSeek}
				handleMute={video.handleMute}
				handlePlay={video.handlePlay}
				handlePause={video.handlePause}
				handleUnMute={video.handleUnMute}
				toggleMute={video.toggleMute}
				handleBlank={video.handleBlank}
				handleShowComment={video.handleShowComment}
				handleCensorPosition={video.handleCensorPosition}
				handleCensorActive={video.handleCensorActive}
			></EventsContainer>
			<SubtitlesContainer currentTime={elapsed.toFixed(1)} duration={video.duration}
				handleShowSubtitle={video.handleShowSubtitle}
			>
			</SubtitlesContainer>
		</Style>
	)
}

export default VideoContainer

// https://github.com/CookPete/react-player