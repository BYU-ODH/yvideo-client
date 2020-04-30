import React, { useRef, useState } from 'react'

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

		toggleMute: state => setMuted(state),
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
		},
		handlePlaybackRate: rate => {
			setPlaybackRate(rate)
		},
		handlePause: () => {
			setPlaying(false)
		},
		handlePlay: () => {
			setPlaying(true)
		},

	}

	const config = {
		youtube: {
			playerVars: { modestbranding: 1, rel: 0, enablejsapi:1 },
			preload: true,
		},
	}

	const Layout = props.trackeditor ? props.trackeditor : props.videocontrols

	return (
		<Style editing={!!props.trackEditor}>
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
		</Style>
	)
}

export default Controller

// https://github.com/CookPete/react-player