import React, { useRef, useState, useEffect } from 'react'

import ReactPlayer from 'react-player'
// import { Rnd } from "react-rnd";

import Style, {TimeBar, ToggleCarat, Blank, Censor, Comment, Subtitles } from './styles'

import { EventsContainer, SubtitlesContainer } from 'containers'

import play from 'assets/controls_play.svg'
import pause from 'assets/controls_pause.svg'
import mute from 'assets/controls_unmuted.svg'
import unmute from 'assets/controls_muted.svg'
import carat from 'assets/carat_white.svg'

const Controller = props => {

	// console.log('%c Controller Component', 'color: green; font-weight: bolder; font-size: 12px;')

	const {
		url,
		getDuration,
		minimized,
		// handleLastClick,
		togglendTimeline,
		getVideoTime,
	} = props

	const ref = useRef(null)
	const videoRef = useRef(null)

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
	const [subtitleText, setSubtitleText] = useState([])
	// const [censorPosition, setCensorPosition] = useState([0,0])
	// const [censorActive, SetCensorActive] = useState(false)

	// const [timelineZoomFactor, setTimelineZoomFactor] = useState(1)
	const [currentZone, setCurrentZone] = useState([0, duration])

	useEffect(() => {
		const indicator = document.getElementById(`time-indicator`)
	})

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
				// document.getElementById('time-dot').scrollIntoView()

			setPlayed(played)
			setElapsed(playedSeconds)

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
				const scrubber = e.currentTarget.getBoundingClientRect()
				newPlayed = (e.pageX - scrubber.left) / scrubber.width
			} else
				newPlayed = time / duration

			if(newPlayed !== Infinity && newPlayed !== -Infinity){
				// console.log(newPlayed)
				ref.current.seekTo(newPlayed.toFixed(10), `fraction`)
				getVideoTime(newPlayed.toFixed(10) * duration)
				console.log(newPlayed.toFixed(10) * duration)
			}
		},
		handlePause: () => {
			setPlaying(false)
			getVideoTime(elapsed.toFixed(1))
			console.log(elapsed.toFixed(1))
		},
		handlePlay: () => {
			setPlaying(true)
			getVideoTime(elapsed.toFixed(1))
			console.log(elapsed.toFixed(1))
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
		handleShowSubtitle: async (value) => {
			console.log(value)
			const temp = subtitleText
			temp.push(value)
			await setSubtitleText(temp)
		},
		// handleCensorPosition: (position) => {
		// 	//console.log(position)
		// 	if(position !== undefined){
		// 		setCensorPosition(
		// 			position
		// 		)
		// 	}
		// },
		// handleCensorActive: (bool) => {
		// 	SetCensorActive(bool)
		// }
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

	document.addEventListener(`keydown`, event => {
		switch (event.keyCode) {
		case 37:
			video.handleSeek(null, elapsed-1)
			break
		case 39:
			video.handleSeek(null, elapsed+1)
			break
		default:
			break
		}
	})
	const showError = () => {
		alert(`There was an error loading the video`)
	}

	return (
		<Style style={{ maxHeight: `${!minimized ? `65vh` : `100vh`}`}}>
			{/* <Style> */}
			{/* <Blank blank={blank} onClick={(e) => handleLastClick(videoRef.current.offsetHeight, videoRef.current.offsetWidth, e.clientX, e.clientY, video.elapsed)} ref={videoRef}> */}
			<Blank blank={blank} id='blank' onContextMenu={e => e.preventDefault()}>
				<Comment commentX={commentPosition.x} commentY={commentPosition.y}>{videoComment}</Comment>
				{subtitleText.map((item,index) => (
					<Subtitles>{item}</Subtitles>
				))}
				{/* <Censor x={censorPosition[0]} y={censorPosition[1]} active={censorActive} wProp={censorPosition[2]} hProp={censorPosition[3]}><canvas></canvas></Censor> */}
			</Blank>
			<ReactPlayer ref={ref} config={config} url={url}
				onContextMenu={e => e.preventDefault()}

				// constants

				className='video'
				progressInterval={100}

				// state

				playing={playing}
				volume={volume}
				muted={muted}
				playbackRate={playbackRate}

				// handlers

				onReady={video.handleReady}
				// onStart={() => console.log(`onStart`)}
				// onBuffer={() => console.log(`onBuffer`)}
				onError={()=>{
					console.log(`Error is working`)
					showError()
				}}

				onPlay={video.handlePlay}
				onPause={video.handlePause}

				onProgress={video.handleProgress}
				onDuration={video.handleDuration}

				// blank style
			/>
			<TimeBar played={video.played}>
				<header>
					<button className='play-btn' onClick={playing ? video.handlePause : video.handlePlay}>
						<img src={playing ? pause : play} alt={playing ? `pause` : `play`}/>
						<span className='carat'></span>
					</button>

					<div className='scrubber'>
						<span className='time'>{formattedElapsed}</span>

						<button className='mute' onClick={video.toggleMute}>
							<img src={muted ? unmute : mute} alt={muted ? `unmute` : `mute`}/>
						</button>

						<div id='time-bar'>
							<div id={`time-bar-container`}>
								<progress className='total' value={`${video.played * 100}`} max='100' onClick={video.handleSeek}></progress>
								<span id='time-dot'></span>
								{/* <span id='time-indicator'></span> */}
							</div>
						</div>
					</div>

					{/* <ToggleCarat id={'carat-button'} className={`${minimized ? ` minimized` : ``}`} onClick={e => togglendTimeline()}>
							<img src={carat} alt='Toggle Timeline' />
						</ToggleCarat> */}
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
				// handleCensorPosition={video.handleCensorPosition}
				// handleCensorActive={video.handleCensorActive}
			></EventsContainer>
			<SubtitlesContainer currentTime={elapsed.toFixed(1)} duration={video.duration}
				handleShowSubtitle={video.handleShowSubtitle}
			>
			</SubtitlesContainer>
		</Style>
	)
}

export default Controller

// https://github.com/CookPete/react-player