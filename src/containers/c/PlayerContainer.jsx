import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import { contentService, resourceService, interfaceService } from 'services'

import { Player } from 'components'

const PlayerContainer = props => {

	const {
		contentCache,
		getContent,
		getStreamKey,
		addView,
		setEvents,
		streamKey,
	} = props

	const params = useParams()

	const [content, setContent] = useState()
	const [resource, setResource] = useState('')
	const [sKey, setKey] = useState('')

	const [duration, setDuration] = useState(0) // Set duration of the media
	const [muted, setMuted] = useState(false) // Mutes the player
	const [fullscreen, setFullscreen] = useState(false)
	const [hovering, setHovering] = useState(false)
	const [playbackRate, setPlaybackRate] = useState(1.0) // Set the playback rate of the player
	const [player, setPlayer] = useState(null)
	const [playing, setPlaying] = useState(false) // Set to true or false to play or pause the media
	const [progress, setProgress] = useState({played: 0, playedSeconds: 0, loaded: 0, loadedSeconds: 0})
	const [seeking, setSeeking] = useState(false) // Set to true or false, is player seeking
	const [url, setUrl] = useState(``) // The url of the video or song to play (can be array or MediaStream object)
	const [volume, setVolume] = useState(0.8) // Set the volume, between 0 and 1, null uses default volume on all players
	const [blank, setBlank] = useState(false)
	const [videoComment, setVideoComment] = useState('')
	const [commentPosition, setCommentPosition] = useState({x: 0, y: 0})

	const ref = player => {
		setPlayer(player)
	}

	useEffect(() => {
		setPlaybackRate(1)
		// console.log('called use effect in player')
		if (!contentCache[params.id]){
			// console.log('no cached content')
			//get single content?
		}
		else {
			// console.log('yes cached content')
			setContent(contentCache[params.id])
			setKey('')
			setEvents(contentCache[params.id].settings.annotationDocument)
			if(contentCache[params.id].url !== ''){
				// console.log('GOT A VALID URL FROM CONTENT')
				setUrl(contentCache[params.id].url)
			}
			else {
				// console.log('CONTENT URL IS NOT VALID')
				//CHECK RESOURCE ID
				if(contentCache[params.id].resourceId !== '00000000-0000-0000-0000-000000000000' && sKey === ''){
					//VALID RESOURCE ID SO WE KEEP GOING TO FIND STREAMING URL
					// console.log('ACTING TO CHANGE URL')
					setResource(contentCache[params.id].resourceId)
					getStreamKey(contentCache[params.id].resourceId, contentCache[params.id].settings.targetLanguages)
					setKey(streamKey)
				}
				else if (sKey !== ''){
					setUrl(`${process.env.REACT_APP_YVIDEO_SERVER}/api/media/stream-media/${sKey}`)
					// console.log('CHANGED URL')
					//console.log('URL SHOULD BE ,', `${process.env.REACT_APP_YVIDEO_SERVER}/api/media/stream-media/${streamKey}` )
				}
			}
			addView(params.id)
		}
	}, [addView, contentCache, getContent, params.id, resource, streamKey])

	const handleDuration = duration => {
		setDuration(duration)
	}

	const handleMouseOver = e => {
		setHovering(true)
	}

	const handleMouseOut = e => {
		setHovering(false)
	}

	const handlePause = () => {
		setPlaying(false)
	}

	const handlePlay = () => {
		setPlaying(true)
	}

	const handleBlank = (bool) => {
		setBlank(bool)
	}

	const handlePlaybackRateChange = rate => {
		setPlaybackRate(rate)
	}

	// Potentially use to update current time and maybe progress bar, but only if not seeking?
	// progression = { played: 0, playedSeconds: 0, loaded: 0, loadedSeconds: 0 }
	const handleProgress = progression => {
		if (!seeking)
			setProgress(progression)
	}

	const handleSeekChange = (e, time) => {
		// const played = (e.clientX + document.body.scrollLeft) / window.innerWidth
		// player.seekTo(played)
		let newPlayed = 0
		if(e !== null){
			const scrubber = e.currentTarget.getBoundingClientRect()
			newPlayed = (e.pageX - scrubber.left) / scrubber.width
		}
		else {
			newPlayed = time / duration
		}
		if(newPlayed !== Infinity && newPlayed !== -Infinity){
			//console.log(newPlayed)
			player.seekTo(newPlayed.toFixed(10), `fraction`)
		}
	}

	const handleSeekMouseDown = e => {
		setSeeking(true)
	}

	const handleSeekMouseUp = e => {
		// console.log(`handleSeekMouseDown`)
		setSeeking(false)
		player.seekTo(parseFloat(e.target.value))
	}

	const handleToggleFullscreen = () => {
		setFullscreen(!fullscreen)
	}

	const handleMuted = () => {
		// console.log('calling mute', muted)
		setMuted(true)
	}

	const handleUnmuted = () => {
		// console.log('calling unmute', muted)
		setMuted(false)
	}

	const handleVolumeChange = e => {
		console.log(e.target)
	}

	const handleShowComment = (value, position) => {
		//console.log(position)
		// console.log('VALUE', value)
		setVideoComment(value)
		setCommentPosition(position)
	}

	const viewstate = {
		duration,
		fullscreen,
		hovering,
		muted,
		playbackRate,
		playing,
		progress,
		ref,
		url,
		volume,
		blank,
		videoComment,
		commentPosition,
	}

	const handlers = {
		handleDuration,
		handleMouseOut,
		handleMouseOver,
		handlePause,
		handlePlay,
		handlePlaybackRateChange,
		handleProgress,
		handleSeekChange,
		handleSeekMouseDown,
		handleSeekMouseUp,
		handleToggleFullscreen,
		handleMuted,
		handleUnmuted,
		handleVolumeChange,
		handleShowComment,
		handleBlank,
	}

	return <Player viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = ({ authStore, contentStore, resourceStore }) => ({
	isProf: authStore.user.roles === 2,
	isAdmin: authStore.user.roles === 0,
	userId: authStore.user.id,
	contentCache: contentStore.cache,
	streamKey: resourceStore.streamKey,
})

const mapDispatchToProps = {
	getContent: contentService.getContent,
	getStreamKey: resourceService.getStreamKey,
	addView: contentService.addView,
	setEvents: interfaceService.setEvents,
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer)
