import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import { contentService } from 'services'

import { roles } from 'models/User'
import { objectIsEmpty } from 'lib/util'

import { Player } from 'components'

const PlayerContainer = props => {

	const {
		content,
		getContent,
		addView,
	} = props

	const params = useParams()

	const [duration, setDuration] = useState(0) // Set duration of the media
	const [muted, setMuted] = useState(false) // Mutes the player
	const [playbackRate, setPlaybackRate] = useState(1.0) // Set the playback rate of the player
	const [player, setPlayer] = useState(null)
	const [playing, setPlaying] = useState(false) // Set to true or false to play or pause the media
	const [progress, setProgress] = useState({played: 0.12, playedSeconds: 11.3, loaded: 0.34, loadedSeconds: 16.7})
	const [seeking, setSeeking] = useState(false) // Set to true or false, is player seeking
	const [url, setUrl] = useState(``) // The url of the video or song to play (can be array or MediaStream object)
	const [volume, setVolume] = useState(0.8) // Set the volume, between 0 and 1, null uses default volume on all players

	const ref = player => {
		setPlayer(player)
	}

	useEffect(() => {
		getContent([params.id])
		setUrl(`https://api.ayamel.org/api/v1/resources/${content.id}?${Date.now().toString(36)}`)
	}, [content.id, getContent, params.id])

	if(!objectIsEmpty(content)) addView(params.id)

	const handleDuration = duration => {
		setDuration(duration)
	}

	const handlePause = () => {
		setPlaying(false)
	}

	const handlePlay = () => {
		setPlaying(true)
	}

	const handlePlaybackRateChange = rate => {
		setPlaybackRate(rate)
	}

	// Potentially use to update current time and maybe progress bar, but only if not seeking?
	// progression = { played: 0.12, playedSeconds: 11.3, loaded: 0.34, loadedSeconds: 16.7 }
	const handleProgress = progression => {
		if (!seeking)
			setProgress(progression)
	}

	const handleSeekChange = e => {
		setProgress({
			...progress,
			played: parseFloat(e.target.value),
		})
	}

	const handleSeekMouseDown = e => {
		setSeeking(true)
	}

	const handleSeekMouseUp = e => {
		setSeeking(false)
		player.seekTo(parseFloat(e.target.value))
	}

	const handleToggleFullscreen = () => {
		// screenfull.request(findDOMNode(this.player))
	}

	const handleToggleMuted = () => {
		setMuted(!muted)
	}

	const handleVolumeChange = volume => {
		setVolume(volume)
	}

	const viewstate = {
		duration,
		ref,
		url,
		playing,
		playbackRate,
		progress,
		volume,
		muted,
	}

	const handlers = {
		handleDuration,
		handlePause,
		handlePlay,
		handlePlaybackRateChange,
		handleProgress,
		handleSeekChange,
		handleSeekMouseDown,
		handleSeekMouseUp,
		handleToggleFullscreen,
		handleToggleMuted,
		handleVolumeChange,
	}

	return <Player viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = ({ authStore, contentStore }) => ({
	isProf: authStore.user.roles.includes(roles.teacher),
	isAdmin: authStore.user.roles.includes(roles.admin),
	content: contentStore.cache,
})

const mapDispatchToProps = {
	getContent: contentService.getContent,
	addView: contentService.addView,
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer)
