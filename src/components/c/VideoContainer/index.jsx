import React, { useRef, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import Style, {TimeBar, Blank, Subtitles, Spinner } from './styles'
import { SubtitlesContainer } from 'containers'
import { CensorDnD } from 'components/bits'

import Position from 'components/vanilla_scripts/censorPosition'

import {CurrentEvents, CensorChange, CommentChange, HandleSubtitle} from 'components/vanilla_scripts/getCurrentEvents'

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
		aspectRatio,
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
	// const [aspectRatio, setAspectRatio] = useState([16,9])
	const [playerPadding,setPlayerPadding] = useState([0,0])
	// I hate using a global variable here, we'll just have to see if it works
	let censorData = {}

	const executeCensors = async (values, playedSeconds) => {
		for (let i = 0; i < values.censors.length; i++) CensorChange(i,values.censors[i],playedSeconds)
	}

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
			video.handleAspectRatio()
		},
		handleProgress: ({ played, playedSeconds }) => {
			if(document.getElementById(`timeBarProgress`) !== undefined)
				document.getElementById(`timeBarProgress`).value = `${played * 100}`

			if(document.getElementById(`layer-time-indicator`) !== undefined){
				document.getElementById(`layer-time-indicator-line`).style.width = `calc(${played * 100}%)`
				const elementRightSide = document.getElementById(`layer-time-indicator-line`).getBoundingClientRect().right

				if(elementRightSide >= window.innerWidth * .6)
					handleScroll(1 / duration, false)

			}

			setElapsed(playedSeconds)
			document.getElementById(`seconds-time-holder`).innerText = playedSeconds

			if(!events) return
			const values = CurrentEvents(playedSeconds,events,duration)

			executeCensors(values, playedSeconds)
			// for (let x = 0; x < values.comments.length; x++) CommentChange(x, values.comments[x].position)

			if(subtitles)
				if(subtitles.length > 0) HandleSubtitle(playedSeconds,subtitles,0)
			// const testMute = values.allEvents.map(val => val.type)

			// if (!testMute.includes(`Mute`)) video.handleUnmute()

			for (let y = 0; y < values.allEvents.length; y++){
				const index = events.findIndex(event => event.type === values.allEvents[y].type && event.start === values.allEvents[y].start && event.end === values.allEvents[y].end)

				if(!events[index].active && values.allEvents[y].type !== `Mute`)
					return

				switch(values.allEvents[y].type){
				case `Mute`:
					if(values.allEvents[y].active && values.allEvents[y].end >= playedSeconds){
						events[index].active = false
						video.handleMute()
					} else if(!values.allEvents[y].active && values.allEvents[y].end - .1 <= playedSeconds)
						video.handleUnmute()

					break
				case `Pause`:
					events[index].active = false
					video.handlePause()
					break
				case `Skip`:
					events[index].active = false
					video.handleSkip(values.allEvents[y].end)
					break
				default:
					break
				}
			}

			if(playedSeconds === duration){
				// for all of the events. If the new seek time goes before events that were already executed activate the events again
				events.forEach(event => {
					event.active = true
				})
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

			if(ref.current === null) return

			if(e !== null){
				// onclick to time bar
				const scrubber = e.currentTarget.getBoundingClientRect()
				newPlayed = (e.pageX - scrubber.left) / scrubber.width
			} else
				newPlayed = time / duration

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
		handleUnmute: () => {
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
			if(editorType !== `video`) return
			// console.log(x,y)
			const newX = x-playerPadding[0]
			const newY = y-playerPadding[1]
			let currentTime = ref.current.getCurrentTime()
			if (!currentTime) currentTime = 0
			if(handleLastClick)
				handleLastClick(height,width,newX, newY, currentTime)

		},
		handleAspectRatio: ()=>{
			const cont = document.getElementById(`blankContainer`)
			if (!cont || !aspectRatio)
				return

			const width = cont.offsetWidth
			const height = cont.offsetHeight -50
			const blank = document.getElementById(`blank`)
			const comment = document.getElementById(`commentContainer`)
			const censor = document.getElementById(`censorContainer`)
			if(width/height > aspectRatio[0]/aspectRatio[1]){
				const videoWidth = height*(aspectRatio[0]/aspectRatio[1])
				const pad = (width-videoWidth)/2
				blank.style.marginLeft = `${pad}px`
				blank.style.marginTop = `0px`
				blank.style.width = `${videoWidth}px`
				comment.style.width = `${videoWidth}px`
				censor.style.width = `${videoWidth}px`
				blank.style.height = `${height}px`
				comment.style.height = `${height}px`
				censor.style.height = `${height}px`
				setPlayerPadding([pad,0])
			} else if(width/height < aspectRatio[0]/aspectRatio[1]){
				const videoHeight = width * aspectRatio[1]/aspectRatio[0]
				const pad = (height - videoHeight)/2
				blank.style.marginTop = `${pad}px`
				blank.style.marginLeft = `0px`
				blank.style.height = `${videoHeight}px`
				comment.style.height = `${videoHeight}px`
				censor.style.height = `${videoHeight}px`
				blank.style.width = `${width}px`
				comment.style.width = `${width}px`
				censor.style.width = `${width}px`
			}
			const EventEditor = document.getElementById(`EventEditor`)
			if(EventEditor)
				EventEditor.style.height = `${blank.offsetHeight - 1}px`

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

	let count = 0 // this is to make sure that event listeners are applied only once

	const handleHotKeys = (e) => {
		const playedTime = parseFloat(document.getElementById(`seconds-time-holder`).innerHTML)
		switch (e.code) {
		case `ArrowRight`:
			// console.log(`new time`, playedTime + 1)
			video.handleSeek(null, playedTime + 1)
			break
		case `ArrowLeft`:
			// console.log(`new time`, playedTime - 1)
			video.handleSeek(null, playedTime - 1)
			break
		case `Comma`:
			// console.log(`new time`, playedTime - .1)
			video.handleSeek(null, playedTime - .1)
			break
		case `Period`:
			// console.log(`new time`, playedTime + .1)
			video.handleSeek(null, playedTime + .1)
			break

		default:
			break
		}
	}

	useEffect(() => {
		if(count === 0){
			count++
			// checking for time bar and setting event listener
			if(document.getElementById(`time-bar`) !== null && duration !== 0){
				document.getElementById(`time-bar`).addEventListener(`mousemove`, (e) => {
					// calculate current time based on mouse position
					const currentLayerWidth = document.getElementById(`time-bar-container`).clientWidth
					const currentScrollLeft = document.getElementById(`time-bar-container`).scrollLeft

					const secondsCurrentTimePercent = (e.offsetX + currentScrollLeft) / currentLayerWidth

					const dateElapsed = new Date(null)
					dateElapsed.setSeconds(secondsCurrentTimePercent * duration)
					const formattedElapsed = dateElapsed.toISOString().substr(11, 8)

					// set new x position to the red bar
					document.getElementById(`time-bar-shadow`).style.visibility = `visible`
					document.getElementById(`time-bar-shadow`).style.transform = `translateX(${e.offsetX - 2}px)`
					document.getElementById(`time-bar-shadow-text`).innerText = `${formattedElapsed}`
					if(e.offsetX > window.innerWidth / 2)
						document.getElementById(`time-bar-shadow-text`).style.right = `6rem`
					 else
						document.getElementById(`time-bar-shadow-text`).style.right = `0`

					document.getElementById(`layer-time-indicator-line-shadow`).style.visibility = `visible`
					document.getElementById(`layer-time-indicator-line-shadow`).style.transform = `translateX(${e.offsetX}px)`
				})
			}
			// checking video container and setting event listener for hot keys
			window.addEventListener(`keyup`, (e) => {
				handleHotKeys(e)
			})
		}

		if(events) {
			events.forEach(event => {
				event.active = true
			})
		}
		const wrap = document.getElementById(`blankContainer`)
		const wraplisten = new ResizeObserver((entry)=>{
			video.handleAspectRatio()
		})
		if(wrap)
			wraplisten.observe(wrap)
		return function cleanup(){
			window.removeEventListener(`keyup`, (e) => {}, false)
		}
	}, [duration])

	return (
		<Style style={{ maxHeight: `65vh` }} type={editorType} id='controller'>
			<div id='blankContainer' style={{width:`70%`,height: `100%`, position:`absolute`}}>
				<Blank className='blank' id='blank' blank={blank} onContextMenu={e => e.preventDefault()} onClick={(e) => activeCensorPosition === -1 ? video.handleBlankClick(videoRef.current.offsetHeight, videoRef.current.offsetWidth, e.clientX, e.clientY):``} ref={videoRef}>
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
					{subtitleText !== `` ?(
						<Subtitles type={editorType}>{subtitleText}</Subtitles>
					) :``}
					<div id='censorContainer' style={{width:`100%`,height:`100%`,position:`absolute`}}>
					</div>
					<div id ='commentContainer' style={{width:`100%`,height:`100%`,position:`absolute`}}>
					</div>
				</Blank>
			</div>
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
			<TimeBar id='timeline'>
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
							if(document.getElementById(`time-bar-shadow`) !== null && document.getElementById(`layer-time-indicator-line-shadow`) !== null) {
								document.getElementById(`time-bar-shadow`).style.visibility = `hidden`
								document.getElementById(`layer-time-indicator-line-shadow`).style.visibility = `hidden`
							}
						}}>
							<div id={`time-bar-container`}>
								<progress id='timeBarProgress' className='total' value={`0`} max='100' onClick={video.handleSeek}></progress>
								<span id='time-text'></span>
								<span id='time-bar-shadow'><p id='time-bar-shadow-text'></p></span>
							</div>
						</div>
					</div>
				</header>
			</TimeBar>
			<SubtitlesContainer currentTime={elapsed.toFixed(1)} duration={video.duration}
				handleShowSubtitle={video.handleShowSubtitle}
			>
			</SubtitlesContainer>
			<p id='seconds-time-holder' style={{ visibility: `hidden`, position: `absolute`, top: `0px`, right: `0px` }}></p>
		</Style>
	)
}

export default VideoContainer

// https://github.com/CookPete/react-player
