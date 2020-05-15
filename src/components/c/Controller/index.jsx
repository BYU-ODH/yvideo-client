import React, { useRef, useState } from 'react'

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import ReactPlayer from 'react-player'

import Style from './styles'

const Controller = props => {

	const {
		url,
	} = props.viewstate

	const ref = useRef(null)

	const [playing, setPlaying] = useState(false)
	const [volume, setVolumeState] = useState(1)
	const [muted, setMuted] = useState(false)
	const [played, setPlayed] = useState(0)
	const [duration, setDuration] = useState(0) // total time of video
	const [elapsed, setElapsed] = useState(0)
	const [playbackRate, setPlaybackRate] = useState(1)

	// for track-editor

	const [selectedEvent, setSelectedEvent] = useState(``)
	const [timelineZoomFactor, setTimelineZoomFactor] = useState(1)
	const [currentZone, setCurrentZone] = useState([0, duration])

	const video = {

		// state

		playing,
		volume,
		muted,
		played,
		duration,
		elapsed,
		playbackRate,

		// for track-editor

		selectedEvent,
		setSelectedEvent,

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
			setPlayed(played)
			setElapsed(playedSeconds)
		},
		handleDuration: duration => {
			setDuration(duration)
			setCurrentZone([0, duration])
		},
		handlePlaybackRate: rate => {
			setPlaybackRate(rate)
		},
		handleSeek: e => {
			const scrubber = e.currentTarget.getBoundingClientRect()
			const newPlayed = (e.pageX - scrubber.left) / scrubber.width
			console.log(newPlayed)
			ref.current.seekTo(newPlayed, `fraction`)
		},
		handlePause: () => {
			setPlaying(false)
		},
		handlePlay: () => {
			setPlaying(true)
		},

		handleZoomFactor: a => {
			console.log(a)
		},

		handleZoneChange: a => {
			console.log(a)
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
			},
			preload: true,
		},
	}

	const Layout = props.trackeditor ? props.trackeditor : props.videocontrols

	return (
		<Style editing={!!props.trackEditor}>
			<DndProvider backend={Backend}>
				<Layout video={video}>
					<ReactPlayer ref={ref} config={config} url={url}

						// constants

						className='react-player'
						width='100%'
						height='100%'
						controls={true}
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
						onError={console.error}

						onPlay={video.handlePlay}
						onPause={video.handlePause}

						onProgress={video.handleProgress}
						onDuration={video.handleDuration}
					/>
				</Layout>
			</DndProvider>
		</Style>
	)
}

export default Controller

// https://github.com/CookPete/react-player