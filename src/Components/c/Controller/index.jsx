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

		togglePlay: playing => setPlaying(playing),
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

	}

	const config = {
		youtube: {
			playerVars: { modestbranding: 1, rel: 0, enablejsapi:1 },
			preload: true,
		},
	}

	return <Style>
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

			onPlay={video.togglePlay}
			onPause={video.togglePlay}

			onProgress={video.handleProgress}
			onDuration={video.handleDuration}

		/>

		{props.trackEditor ?
			<props.trackEditor video={video} />
			:
			<props.videocontrols video={video} />
		}
	</Style>
}

export default Controller

// https://github.com/CookPete/react-player