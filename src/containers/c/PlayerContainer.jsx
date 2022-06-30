import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import { contentService, resourceService, interfaceService, subtitlesService } from 'services'

import { Player } from 'components'
import { Tooltip } from 'components/bits'

import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

import ErrorContainer from 'components/modals/containers/ErrorContainer'

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
		subtitlesContentId,
		toggleModal,
		toggleTip,
		setBreadcrumbs,
		events,
		errorMessage,
		errorPrev,
		errorSync,
		resource,
		getFiles,
	} = props

	const params = useParams()

	const [content, setContent] = useState()
	const [sKey, setKey] = useState(``)
	const [isMobile, setIsMobile] = useState(false)
	const [isLandscape, setIsLandscape] = useState(false)

	const [calledGetSubtitles, setCalledGetSubtitles] = useState(false)
	const [duration, setDuration] = useState(0) // Set duration of the media
	const [muted, setMuted] = useState(false) // Mutes the player
	const [fullscreen, setFullscreen] = useState(false)
	// eslint-disable-next-line no-unused-vars
	const [hovering, setHovering] = useState(true)
	const [playbackRate, setPlaybackRate] = useState(1.0) // Set the playback rate of the player
	const [playbackOptions, setPlaybackOptions] = useState([0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.25, 1.5, 1.75, 2].sort())
	const [player, setPlayer] = useState(null)
	const [playing, setPlaying] = useState(false) // Set to true or false to play or pause the media
	const [progress, setProgress] = useState(0)
	const [playTime, setPlaytime] = useState(0)
	const [url, setUrl] = useState(``) // The url of the video or song to play (can be array or MediaStream object)
	// eslint-disable-next-line no-unused-vars
	const [volume, setVolume] = useState(0.8) // Set the volume, between 0 and 1, null uses default volume on all players
	const [blank, setBlank] = useState(false)
	const [videoComment, setVideoComment] = useState(``)
	const [commentPosition, setCommentPosition] = useState({ x: 0, y: 0 })
	const [showTranscript, setShowTranscript] = useState(false)
	const [toggleTranscript, setToggleTranscript] = useState(true)
	const [subtitleText, setSubtitleText] = useState(``)
	const [subtitleTextIndex, setSubtitleTextIndex] = useState(null)
	const [displaySubtitles, setDisplaySubtitles] = useState(null) // this is the subtitle that will show in the transcript view
	const [censorPosition, setCensorPosition] = useState({})
	const [censorActive, setCensorActive] = useState(false)
	const [hasPausedClip, setHasPausedClip] = useState(false)

	// this is for caption toggle
	const [isCaption, setIsCaption] = useState(false) // this is the state to toggle caption selection
	const [indexToDisplay, setIndexToDisplay] = useState(0) // use index to display a desired subtitle based on selection from player controls.

	// clip variables
	const [clipTime, setClipTime] = useState([])
	const [isStreamKeyLoaded, setIsStreamKeyLoaded] = useState(false)
	// eslint-disable-next-line no-unused-vars
	const [isUrlLoaded, setIsUrlLoaded] = useState(false)

	// aspect ratio
	const [aspectRatio, setAspectRatio] = useState([16, 9])
	const ref = player => {
		setPlayer(player)
	}

	useEffect(() => {
		setBreadcrumbs({ path: [`Home`, `Player`], collectionId: ``, contentId: `` })
		setShowTranscript(false)
		setSubtitleText(``)
		setDisplaySubtitles(null)

		if (!contentCache.hasOwnProperty(params.id)) // eslint-disable-line no-prototype-builtins
			getContent(params.id)

		if (contentCache[params.id]) {
			setContent(contentCache[params.id])
			setShowTranscript(contentCache[params.id].settings.showCaptions)
			setEvents(contentCache[params.id].settings.annotationDocument)
			const clips =
				contentCache[params.id][`clips`] ?
					JSON.parse(contentCache[params.id][`clips`])[params.clip]
					: []

			if (params.clip) setClipTime([clips[`start`], clips[`end`]])

			if (contentCache[params.id].url !== ``) {
				if (subtitlesContentId !== params.id && calledGetSubtitles === false) {
					getSubtitles(params.id)
					setCalledGetSubtitles(true)
				}
				setUrl(contentCache[params.id].url)
				if(contentCache[params.id].url.includes(`youtube`)){
					const fetchData = async() => {
						const rawData = await fetch(`https://www.youtube.com/oembed?url=${contentCache[params.id].url}&format=JSON`, {method: `GET`})
						const data = await rawData.json()
						if(data.hasOwnProperty(`width`) && data.hasOwnProperty(`height`)) // eslint-disable-line no-prototype-builtins
							setAspectRatio([data.width, data.height])

						return data
					}
					const d =fetchData() // eslint-disable-line no-unused-vars
				}
			} else {
				setKey(``)
				setUrl(``)

				if (contentCache[params.id].resourceId && !isStreamKeyLoaded) {
					getStreamKey(contentCache[params.id].resourceId, contentCache[params.id].settings.targetLanguage)
					setIsStreamKeyLoaded(true)
				}

				if (streamKey)
					setKey(streamKey)

				if (sKey !== `` && !isUrlLoaded) {
					setUrl(`${process.env.REACT_APP_YVIDEO_SERVER}/api/partial-media/stream-media/${sKey}`)
					// setIsUrlLoaded(true)
					if (subtitlesContentId !== params.id && calledGetSubtitles === false) {
						getSubtitles(params.id)
						setCalledGetSubtitles(true)
					}
				}
				if (resourceIdStream !== ``){
					// eslint-disable-next-line no-unused-vars
					const files = Promise.resolve(getFiles(resourceIdStream)).then((value) => {
						if (value){
							const file = value.find(element => element[`file-version`].includes(contentCache[params.id].settings.targetLanguage) !== false)
							if (file[`aspect-ratio`])
								setAspectRatio(file[`aspect-ratio`].split(`,`))
						}
					})

				}
				if(resource[resourceIdStream]){
					if(resource[resourceIdStream][`files`]){
						// eslint-disable-next-line no-unused-vars
						const file = resource[resourceIdStream][`files`].find(element => element[`file-version`].includes(contentCache[params.id].settings.targetLanguage) !== false)
					}
				}

			}
			const wrap = document.getElementById(`player-container`)
			const wraplisten = new ResizeObserver(() => {

				handleAspectRatio()
			})
			if(wrap)
				wraplisten.observe(wrap)

		}

		if (window.innerWidth < 1000) {
			setToggleTranscript(false)
			setIsMobile(true)
			if (window.innerHeight < window.innerWidth)
				setIsLandscape(true)
			else
				setIsLandscape(false)
		}

		if(events) {
			events.forEach(event => {
				event.active = true
			})
		}
		if (errorMessage !== errorPrev)
			handleError()
			// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addView, contentCache, getContent, streamKey, getSubtitles, content, sKey, subtitlesContentId, errorMessage, errorPrev])

	const handleShowTip = (tipName, position) => {
		toggleTip({
			component: Tooltip,
			props: {
				name: tipName,
				position,
			},
		})
	}

	const handleToggleSubtitles = () => {
		setShowTranscript(!showTranscript)
		handleShowSubtitle(``)
		handleAspectRatio()
	}

	const handleOffSubtitles = () => {
		setShowTranscript(false)
		handleShowSubtitle(``)
		handleAspectRatio()
	}

	const handleDuration = duration => {
		setDuration(duration)
	}

	const handleMouseOver = e => {
		// setHovering(true)
	}

	const handleMouseOut = e => {
		// setHovering(false)
	}

	const handlePlayPause = () => {

		if (playing)
			setPlaying(false)
		else
			setPlaying(true)

	}

	const handlePause = () => {
		setPlaying(false)
	}

	const handlePlay = () => {
		setPlaying(true)
	}
	const handleStart = () => {
		setPlaying(true)
		if (clipTime.length > 0) player.seekTo(clipTime[0])
		setPlaying(true)
	}
	const handleBlank = (bool) => {
		setBlank(bool)
	}

	const handlePlaybackRateChange = (rate) => {
		setPlaybackRate(rate)
	}

	const handleProgress = progression => {
		const dateElapsed = new Date(null)
		dateElapsed.setSeconds(progression)
		setPlaytime(dateElapsed.toISOString().substr(11, 8))
		setProgress(progression)

	}

	const handleSeekChange = (e, time) => {
		toggleTip()
		// reset events
		//* *TIME SHOULD BE A PERCENTAGE INSTEAD OF SECONDS */
		// const played = (e.clientX + document.body.scrollLeft) / window.innerWidth
		// player.seekTo(played)
		let newPlayed = 0
		if (e) {
			const scrubber = e.currentTarget.getBoundingClientRect()
			if (scrubber.width !== 0)
				newPlayed = (e.pageX - scrubber.left) / scrubber.width

		} else
			newPlayed = time / duration
		if (duration > 0)
			player.seekTo(newPlayed.toFixed(10), `fraction`)

		if (events) {
			// for all of the events. If the new seek time goes before events that were already executed activate the events again
			events.forEach(event => {
				if (event.end >= newPlayed && event.active === false)
					event.active = true

			})
		}
	}

	const handleToggleFullscreen = () => {

		// find the element which contains subtitles and events placeholders
		const elem = document.getElementById(`player-container`)
		// if fullscreen is false we want to turn to full screen. Else, request cancelFullScreen.
		// For more info read full screen api https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
		// This is a functionality that behaves like F11. This is not video full screen mode.
		// Video full screen mode would break the subtitles and events.
		if (!fullscreen) {
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
		setMuted(true)
	}

	const handleUnmuted = () => {
		setMuted(false)
	}

	const handleVolumeChange = e => {
	}

	const handleShowComment = (value, position) => {
		setVideoComment(value)
		setCommentPosition(position)
	}

	const handleShowSubtitle = (value, index) => {
		// if(document.getElementById('subtitle-box') !== undefined){
		// 	document.getElementById('subtitle-box').innerText = value
		// }
		if (subtitleTextIndex !== index) {
			if (document.getElementsByClassName(`transcript-row`)[index]) {
				// grab the elements height and scroll that in pixels for the entire parent element
				const parentElement = document.getElementsByClassName(`main-bar`)[0]
				const currentSubtitleElement = document.getElementsByClassName(`transcript-row`)[index]

				if (subtitleTextIndex < index || subtitleTextIndex === undefined)
					parentElement.scrollTop += currentSubtitleElement.offsetHeight

			}
		}

		setSubtitleTextIndex(index)
		setSubtitleText(value)
	}

	const handleChangeSubtitle = (index) => {
		const temp = subtitles[index]
		const currentContent = temp.content
		if (typeof currentContent === `string`) {
			try {
				temp.content = JSON.parse(subtitles[index].content)
			} catch (e) {
				console.log(e) // eslint-disable-line no-console
			}
		}
		setIndexToDisplay(index)
		setDisplaySubtitles(temp)
		setShowTranscript(true)
	}

	const handleShowHelp = () => {
		toggleModal({
			component: HelpDocumentation,
			props: { name: `${isMobile === true ? `Player Mobile` : `Player`}` },
		})
	}
	const handleError = () => {
		toggleModal({
			component: ErrorContainer,
		})
		errorSync()
	}
	const handleToggleTranscript = () => {
		toggleTip()
		setToggleTranscript(!toggleTranscript)
	}

	const handleAspectRatio = ()=>{
		const cont = document.getElementById(`player-container`)
		if(!cont)
			return

		const width = cont.offsetWidth
		const height = cont.offsetHeight
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
	}
	// TODO: This might break, what it was before was
	// (displaySubtitles == null && content != undefined)
	if(displaySubtitles === null && content){

		// This statement prevents displaySubtitles from being null.
		// If displaySubtitles is null then the transcript list will be empty and no subtitles will be passed to the PlayerSubtitlesContainer
		if (subtitles.length === 1) {

			// some logic to pick the subtitle
			handleChangeSubtitle(0)
		} else if (subtitles.length > 1) {
			// pick the subtitle to display to be the one with the same language as the audio
			const audioLanguage = content.settings.targetLanguage

			let result = 0
			for (let i = 0; i < subtitles.length; i++) {
				const temp = subtitles[i]
				// now that we have an actual object lets check language
				// go through all subtitles and find there index where subtitle language = audio language
				if (temp.language.toLowerCase() === audioLanguage.toLowerCase()) {
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
		playbackOptions,
		playing,
		progress,
		playTime,
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
		subtitleTextIndex,
		displaySubtitles,
		subtitles,
		indexToDisplay,
		isAdmin,
		isProf,
		isMobile,
		censorPosition,
		censorActive,
		clipTime,
		isLandscape,
		hasPausedClip,
		events,
	}

	const handlers = {
		handleDuration,
		handleMouseOut,
		handleMouseOver,
		handlePause,
		handlePlay,
		handleStart,
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
		setPlaybackOptions,
		handleChangeSubtitle,
		setFullscreen,
		setShowTranscript,
		handleShowHelp,
		toggleTip,
		handleShowTip,
		setCensorPosition,
		setCensorActive,
		handlePlayPause,
		setHasPausedClip,
		handleAspectRatio,
		handleToggleSubtitles,
		handleOffSubtitles,
	}

	return <Player viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = ({ authStore, contentStore, resourceStore, subtitlesStore, interfaceStore }) => ({
	isProf: authStore.user.roles === 2,
	isAdmin: authStore.user.roles === 0,
	userId: authStore.user.id,
	contentCache: contentStore.cache,
	streamKey: resourceStore.streamKey,
	resourceIdStream: resourceStore.resourceIdStreamKey,
	subtitles: subtitlesStore.cache,
	subtitlesContentId: subtitlesStore.contentId,
	events: interfaceStore.events,
	errorMessage: contentStore.errorMessage,
	errorPrev: contentStore.errorMessagePrev,
	resource: resourceStore.cache,
})

const mapDispatchToProps = {
	getContent: contentService.getContent,
	getStreamKey: resourceService.getStreamKey,
	addView: contentService.addView,
	setEvents: interfaceService.setEvents,
	getSubtitles: subtitlesService.getSubtitles,
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
	setBreadcrumbs: interfaceService.setBreadcrumbs,
	errorSync: contentService.syncError,
	getFiles: resourceService.getFiles,
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer)