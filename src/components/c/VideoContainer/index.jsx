import React, { useRef, useEffect, useState, useLayoutEffect, useCallback, useImperativeHandle } from 'react'

import ReactPlayer from 'react-player'

import Style, {TimeBar, ToggleCarat, Blank, Censor, Comment, Subtitles, Spinner } from './styles'

import { EventsContainer, SubtitlesContainer } from 'containers'

import { CensorDnD } from 'components/bits'

import Position from './censorPosition'

import {CurrentEvents, CensorChange, CommentChange, HandleSubtitle} from './getCurrentEvents'

import play from 'assets/controls_play.svg'
import pause from 'assets/controls_pause.svg'
import mute from 'assets/controls_unmuted.svg'
import unmute from 'assets/controls_muted.svg'

const VideoContainer = props => {

	const {
		url,
		getDuration,
		handleLastClick,
		getVideoTime,
		events,
		updateEvents,
		eventToEdit,
		activeCensorPosition,
		setActiveCensorPosition,
		subtitles,
		handleScroll,
		editorType,
	} = props

	const ref = useRef(null)
	const videoRef = useRef(null)

	const [playing, setPlaying] = useState(false)
	const [volume, setVolumeState] = useState(1)
	const [muted, setMuted] = useState(false)
	const [played, setPlayed] = useState(0)
	const [isReady, setIsReady] = useState(false)
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
	const [pausedTimes,setPausedTimes] = useState([])
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
			setIsReady(true)
		},
		handleProgress: ({ played, playedSeconds }) => {
			if(document.getElementById(`timeBarProgress`) !== undefined)
				document.getElementById(`timeBarProgress`).value = `${played * 100}`

			if(document.getElementById(`layer-time-indicator`) !== undefined){
				document.getElementById(`layer-time-indicator-line`).style.width = `calc(${played * 100}%)`
				let elementRightSide = document.getElementById(`layer-time-indicator-line`).getBoundingClientRect().right

				if(elementRightSide >= (window.innerWidth * .6)){
					handleScroll(1 / duration, false)
				}
			}

			setElapsed(playedSeconds)

			if(!events) return
			const values = CurrentEvents(playedSeconds,events,duration)

			for (let i = 0; i < values.censors.length; i++) CensorChange(i,values.censors[i],playedSeconds)
			for (let x = 0; x < values.comments.length; x++) CommentChange(x, values.comments[x].position)

			if(subtitles)
				if(subtitles.length > 0) HandleSubtitle(playedSeconds,subtitles,0)
			const testMute = values.allEvents.map(val => val.type)

			if (!testMute.includes(`Mute`)) video.handleUnMute()

			for (let y = 0; y < values.allEvents.length; y++){
				switch(values.allEvents[y].type){
				case `Mute`:
					video.handleMute()
					break
				case `Pause`:
					//TODO: this pause logic is way too expensive.
					//This can be solved with a boolean active flag
					//this yiels O(a * b) when it can be constant time
					let paused = true
					for (let i = 0; i < pausedTimes.length;i++){
						if (Math.abs(pausedTimes[i]-values.allEvents[y].start) < 0.05)
							paused = false
					}
					if(paused) {
						const times = [...pausedTimes]
						times.push(values.allEvents[y].start)
						setPausedTimes(times)
						video.handlePause()
					}
					break
				case `Skip`:
					video.handleSkip(values.allEvents[y].end)
					break
				default:
					break
				}
			}
		},
		handleDuration: duration => {
			if(typeof getDuration === `function`)
				getDuration(duration)

			setDuration(duration)
			setCurrentZone([0, duration])
		},
		handlePlaybackRate: rate => {
			setPlaybackRate(rate)
		},
		handleSeek: (e, time) => {
			let newPlayed = 0
			if(e !== null){
				// onclick to time bar
				const scrubber = e.currentTarget.getBoundingClientRect()
				newPlayed = (e.pageX - scrubber.left) / scrubber.width
			} else {
				// add event to layer
				newPlayed = duration / time
			}

			if(newPlayed !== Infinity && newPlayed !== -Infinity){
				ref.current.seekTo(newPlayed.toFixed(10), `fraction`)
				getVideoTime(newPlayed)
			}
		},
		handleSkip: (time) => {
			const newPlayed = duration / time
			if(newPlayed !== Infinity && newPlayed !== -Infinity){
				ref.current.seekTo(time)
				getVideoTime(time)
			}
		},
		handlePause: () => {
			setPlaying(false)
			getVideoTime(elapsed.toFixed(2)/duration)
		},
		handlePlay: () => {
			setPlaying(true)
			getVideoTime(elapsed.toFixed(2)/duration)
			setActiveCensorPosition(-1)
		},
		handleMute: () => {
			setMuted(true)
		},
		handleUnMute: () => {
			setMuted(false)
		},
		handleBlank: (bool) => {
			setBlank(bool)
		},
		handleShowComment: (value, position) => {
			setVideoComment(value)
			setCommentPosition(position)

		},
		handleShowSubtitle: (value) => {
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
			const event = events[eventToEdit]

			if (event.type === `Censor`){
				if (event.position[activeCensorPosition] !== undefined){
					event.position[activeCensorPosition][0] = pos.x/videoRef.current.offsetWidth*100 + event.position[activeCensorPosition][2]/2
					event.position[activeCensorPosition][1] = pos.y/videoRef.current.offsetHeight*100 + event.position[activeCensorPosition][3]/2
				}
			}

			updateEvents(eventToEdit,event,event[`layer`])
		},
		handleUpdateCensorResize: (delta, pos)=>{

			const event = events[eventToEdit]
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
			updateEvents(eventToEdit,event,event[`layer`])
		},
		handleBlankClick : (height, width, x, y) => {
			let currentTime = ref.current.getCurrentTime()
			if (!currentTime) currentTime = 0
			handleLastClick(height,width,x, y, currentTime)
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

	useEffect(() => {
		let count = 0
		if(document.getElementById('time-bar') !== null && count === 0 && duration !== 0){
			count++
			document.getElementById('time-bar').addEventListener('mousemove', (e) => {
				//calculate current time based on mouse position
				let currentLayerWidth = document.getElementById('time-bar-container').clientWidth
				let currentScrollLeft = document.getElementById('time-bar-container').scrollLeft

				let secondsCurrentTimePercent = (e.offsetX + currentScrollLeft) / currentLayerWidth

				const dateElapsed = new Date(null)
				dateElapsed.setSeconds(secondsCurrentTimePercent * duration)
				const formattedElapsed = dateElapsed.toISOString().substr(11, 8)

				//set new x position to the red bar
				document.getElementById('time-bar-shadow').style.visibility = `visible`
				document.getElementById('time-bar-shadow').style.transform = `translateX(${e.offsetX - 2}px)`
				document.getElementById('time-bar-shadow-text').innerText = `${formattedElapsed}`
				if(e.offsetX > (window.innerWidth / 2)){
					document.getElementById('time-bar-shadow-text').style.right = `6rem`
				}
				else {
					document.getElementById('time-bar-shadow-text').style.right = `0`
				}

				document.getElementById('layer-time-indicator-line-shadow').style.visibility = `visible`
				document.getElementById('layer-time-indicator-line-shadow').style.transform = `translateX(${e.offsetX}px)`
			})
		}
	}, [duration])

	return (
		<Style style={{ maxHeight: `65vh` }} type={editorType} id='controller'>
			<Blank className='blank' id='blank' blank={blank} onContextMenu={e => e.preventDefault()} onClick={(e) => activeCensorPosition === -1 ? video.handleBlankClick(videoRef.current.offsetHeight, videoRef.current.offsetWidth, e.clientX, e.clientY):console.log(``)} ref={videoRef}>
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
				<div id='censorContainer' style={{width:`100%`,height:`100%`,position:`absolute`}}>
				</div>
				<div id ='commentContainer' style={{width:`100%`,height:`100%`,position:`absolute`}}>
				</div>
			</Blank>
			{/* console.log(editorType) */}

			{!isReady && <div className='loading-spinner'><Spinner/></div>}

			<ReactPlayer ref={ref} config={config} url={url}
				onContextMenu={e => e.preventDefault()}
				key={url}

				// constants
				className={`react-player .${editorType}`}
				progressInterval={30}

				// state
				playing={playing}
				volume={volume}
				muted={muted}
				playbackRate={playbackRate}

				// handlers
				onReady={video.handleReady}
				onError={()=>{
					showError()
				}}

				onPlay={video.handlePlay}
				onPause={video.handlePause}

				onProgress={video.handleProgress}
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

						<div id='time-bar' onMouseLeave={(e) => {
							if(document.getElementById('time-bar-shadow') !== null && document.getElementById('layer-time-indicator-line-shadow') !== null) {
								document.getElementById('time-bar-shadow').style.visibility = `hidden`
								document.getElementById('layer-time-indicator-line-shadow').style.visibility = `hidden`
							}
						}}>
							<div id={`time-bar-container`}>
								<progress id='timeBarProgress' className='total' value={`0`} max='100' onClick={video.handleSeek}></progress>
								<span id='time-text'></span>
								<span id='time-bar-shadow'><p id="time-bar-shadow-text"></p></span>
							</div>
						</div>
					</div>
				</header>
			</TimeBar>
			<SubtitlesContainer currentTime={elapsed.toFixed(1)} duration={video.duration}
				handleShowSubtitle={video.handleShowSubtitle}
			>
			</SubtitlesContainer>
		</Style>
	)
}

export default VideoContainer

// https://github.com/CookPete/react-player