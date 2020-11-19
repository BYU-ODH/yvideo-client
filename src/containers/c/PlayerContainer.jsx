import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import { contentService, resourceService, interfaceService, subtitlesService } from 'services'

import { Player } from 'components'

import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

const PlayerContainer = props => {

	const {
		isAdmin,
		isProf,
		contentCache,
		getContent,
		getStreamKey,
		addView,
		setEvents,
		streamKey,
		resourceIdStream,
		getSubtitles,
		subtitles,
		toggleModal,
	} = props

	const params = useParams()

	const [content, setContent] = useState()
	const [sKey, setKey] = useState(``)

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
	const [videoComment, setVideoComment] = useState(``)
	const [commentPosition, setCommentPosition] = useState({x: 0, y: 0})
	const [showTranscript, setShowTranscript] = useState(false)
	const [toggleTranscript, setToggleTranscript] = useState(true)
	const [subtitleText, setSubtitleText] = useState(``)
	const [displaySubtitles, setDisplaySubtitles] = useState(null) // this is the subtitle that will show in the transcript view

	// this is for caption toggle
	const [isCaption, setIsCaption] = useState( false ) // this is the state to toggle caption selection
	const [indexToDisplay, setIndexToDisplay] = useState(0) // use index to display a desired subtitle based on selection from player controls.

	const ref = player => {
		setPlayer(player)
	}

	useEffect(() => {
		setPlaybackRate(1)
		setShowTranscript(false)
		setSubtitleText(``)
		setDisplaySubtitles(null)
		if (!contentCache[params.id]){
			// console.log('no cached content')
			//get single content
			getContent(params.id)
		}
		else {
			// console.log('yes cached content')
			setContent(contentCache[params.id])
			setShowTranscript(contentCache[params.id].settings.showCaptions)
			setEvents(contentCache[params.id].settings.annotationDocument)
			if(contentCache[params.id].url !== ``){
				setUrl(contentCache[params.id].url)
				getSubtitles(params.id)
			}
			else {
				//here we know that the type of content is from the server.
				//so we reset the states to use for the new video.
				setKey('')
				setUrl('')
				if(content !== undefined){
					//CHECK RESOURCE ID
					if(sKey === '' && contentCache[params.id].resourceId !== resourceIdStream){
						// console.log(sKey)
						// console.log(`%c getting streaming key for resource ${contentCache[params.id].resourceId}`,  'background-color: black; color: yellow; font-weight: bold;');
						// console.log(`%c and content ${params.id}`, 'background-color: black; color: yellow; font-weight: bold;')
						//VALID RESOURCE ID SO WE KEEP GOING TO FIND STREAMING URL
						getStreamKey(contentCache[params.id].resourceId, contentCache[params.id].settings.targetLanguages)
					}
					else if(streamKey){
						setKey(streamKey)
					}

					if (sKey !== ''){
						//setUrl(`${process.env.REACT_APP_YVIDEO_SERVER}/api/media/stream-media/${sKey}`)
						// console.log(`%c Stream KEY ${streamKey}`, 'background-color: black; color: pink; font-weight: bold;')
						// console.log(`%c getting stram media for ${content.id}`, 'color: green');
						getSubtitles(params.id)
						setUrl(`${process.env.REACT_APP_YVIDEO_SERVER}/api/partial-media/stream-media/${sKey}`)
					}
				}
			}
		}
	}, [addView, contentCache, getContent, streamKey, getSubtitles, content, sKey])

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

		setPlaybackRate(parseFloat(rate))
	}

	const handleProgress = progression => {
		// console.log('progress', player.getCurrentTime())
		setProgress(progression)
	}

	const handleSeekChange = (e, time) => {
		//* *TIME SHOULD BE A PERCENTAGE INSTEAD OF SECONDS */
		// const played = (e.clientX + document.body.scrollLeft) / window.innerWidth
		// player.seekTo(played)
		console.log(`seeking`, time, ` seconds`)
		let newPlayed = 0
		if(e !== null){
			const scrubber = e.currentTarget.getBoundingClientRect()
			newPlayed = (e.pageX - scrubber.left) / scrubber.width
		} else
			newPlayed = time / duration

		if(newPlayed !== Infinity && newPlayed !== -Infinity){
			console.log(`in fraction: `, newPlayed)
			player.seekTo(newPlayed.toFixed(10), `fraction`)
		}
	}

	const handleToggleFullscreen = () => {

		// find the element which contains subtitles and events placeholders
		const elem = document.getElementById(`player-container`)

		// if fullscreen is false we want to turn to full screen. Else, request cancelFullScreen.
		// For more info read full screen api https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
		// This is a functionality that behaves like F11. This is not video full screen mode.
		// Video full screen mode would break the subtitles and events.
		if(!fullscreen){

			if (elem.requestFullscreen)
				elem.requestFullscreen()
			else if (elem.mozRequestFullScreen) { /* Firefox */
				elem.mozRequestFullScreen()
			} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
				elem.webkitRequestFullscreen()
			} else if (elem.msRequestFullscreen) { /* IE/Edge */
				elem.msRequestFullscreen()
			}

		} else {

			if (document.cancelFullScreen)
				document.cancelFullScreen()
			else if (document.mozCancelFullScreen) { /* Firefox */
				document.mozCancelFullScreen()
			} else if (document.webkitCancelFullScreen) { /* Chrome, Safari & Opera */
				document.webkitCancelFullScreen()
			} else if (document.msExitFullscreen) { /* IE/Edge */
				document.msExitFullscreen()
			}
		}

		// set the state to whatever the state wasn't before.
		// false to true && true to false.
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
		// console.log(position)
		// console.log('VALUE', value)
		setVideoComment(value)
		setCommentPosition(position)
	}

	const handleShowSubtitle = (value) => {
		// console.log('CALED SUBTITLE')
		setSubtitleText(value)
	}

	const handleChangeSubtitle = (index) => {
		const temp = subtitles[index]
		const currentContent = temp.content

		try {

			if(typeof currentContent === `string`){
				console.log(`String type`)
				temp.content = JSON.parse(subtitles[index].content)
			}

		} catch (e){
			console.log(e)
		}

		setIndexToDisplay(index)
		setDisplaySubtitles(temp)
	}

	const handleShowHelp = () => {
		toggleModal({
			component: HelpDocumentation,
			props: { name: `Player`},
		})
	}

	const handleToggleTranscript = () => {
		setToggleTranscript(!toggleTranscript)
	}

	if(displaySubtitles == null && content != undefined){
		// This statement prevents displaySubtitles from being null.
		// If displaySubtitles is null then the transcript list will be empty and no subtitles will be passed to the PlayerSubtitlesContainer

		if(subtitles.length == 1){
			// some logic to pick the subtitle
			handleChangeSubtitle(0)
		} else if(subtitles.length > 1) {
			// pick the subtitle to display to be the one with the same language as the audio
			const audioLanguage = content.settings.targetLanguages

			let result = 0
			for(let i = 0; i < subtitles.length; i++){
				console.log(`in loop`)
				const temp = subtitles[i]
				console.log(`TEMP CONTENT`, temp)
				// now that we have an actual object lets check language
				// go through all subtitles and find there index where subtitle language = audio language
				if(temp.language.toLowerCase() === audioLanguage.toLowerCase()){
					result = i
					break
				}
			}
			handleChangeSubtitle(result)
		}
	}

	const viewstate = {
		showTranscript,
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
		toggleTranscript,
		content,
		isCaption,
		subtitleText,
		displaySubtitles,
		subtitles,
		indexToDisplay,
		isAdmin,
		isProf,
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
		handleToggleFullscreen,
		handleMuted,
		handleUnmuted,
		handleVolumeChange,
		handleShowComment,
		handleBlank,
		handleShowSubtitle,
		handleToggleTranscript,
		setIsCaption,
		handleChangeSubtitle,
		setFullscreen,
		setShowTranscript,
		handleShowHelp,
	}

	return <Player viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = ({ authStore, contentStore, resourceStore, subtitlesStore }) => ({
	isProf: authStore.user.roles === 2,
	isAdmin: authStore.user.roles === 0,
	userId: authStore.user.id,
	contentCache: contentStore.cache,
	streamKey: resourceStore.streamKey,
	resourceIdStream: resourceStore.resourceIdStreamKey,
	subtitles: subtitlesStore.cache,
})

const mapDispatchToProps = {
	getContent: contentService.getContent,
	getStreamKey: resourceService.getStreamKey,
	addView: contentService.addView,
	setEvents: interfaceService.setEvents,
	getSubtitles: subtitlesService.getSubtitles,
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer)