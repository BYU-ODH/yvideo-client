import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import { contentService, resourceService, interfaceService, subtitlesService } from 'services'

import { isSafari, isIOS } from 'react-device-detect'

import { Player } from 'components'
import { Tooltip } from 'components/bits'
import Swal from 'sweetalert2'

import handleScrollFuncs from '../../components/common/toggleScroll'

import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'

import ErrorModalContainer from '../../components/modals/containers/ErrorModalContainer'

const PlayerContainer = props => {

	const {
		isAdmin,
		isProf,
		contentCache,
		getContentCache,
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
		// resource, TODO: Figure out why this was used for other TODO around line 170
		getFiles,
	} = props

	const params = useParams()
	const [clips, setClips] = useState(``)
	const [clipId, setClipId] = useState(``)
	const [content, setContent] = useState()
	const [sKey, setKey] = useState(``)
	const [isMobile, setIsMobile] = useState(false)
	const [isLandscape, setIsLandscape] = useState(false)

	const [calledGetSubtitles, setCalledGetSubtitles] = useState(false)
	const [duration, setDuration] = useState(0) // Set duration of the media
	const [muted, setMuted] = useState(false) // Mutes the player
	const [fullscreen, setFullscreen] = useState(false)
	const [playbackRate, setPlaybackRate] = useState(1.0) // Set the playback rate of the player
	const [playbackOptions, setPlaybackOptions] = useState([0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.25, 1.5, 1.75, 2].sort())
	const [player, setPlayer] = useState(null)
	const [playing, setPlaying] = useState(false) // Set to true or false to play or pause the media
	const [progress, setProgress] = useState(0)
	const [playTime, setPlayTime] = useState(`00:00:00`)
	const [progressEntered, setProgressEntered] = useState(false)
	const [url, setUrl] = useState(``) // The url of the video or song to play (can be array or MediaStream object)
	const volume = 0.8
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
	const [showSpeed, setShowSpeed] = useState(false)
	const [hovering, setHovering] = useState(true)
	const [controlsHovering, setControlsHovering] = useState(false)
	const [started, setStarted] = useState(false)
	const [mouseInactive, setMouseInactive] = useState(false)

	const [subsObj, setSubsObj] = useState({})
	const [fullyChecked, setFullyChecked] = useState(false)

	const [enableScroll, setEnableScroll] = useState({action: null})
	const [disableScroll, setDisableScroll] = useState({action: null})
	const [scrollDisabled, setScrollDisabled] = useState(false)

	// this is for caption toggle
	const [isCaption, setIsCaption] = useState(false) // this is the state to toggle caption selection
	const [indexToDisplay, setIndexToDisplay] = useState(0) // use index to display a desired subtitle based on selection from player controls.

	// clip variables
	const [clipTime, setClipTime] = useState([])
	const [isClip, setIsClip] = useState(false)
	const [sideBarIsClip, setSideBarIsClip] = useState(false)
	const [isStreamKeyLoaded, setIsStreamKeyLoaded] = useState(false)

	const [showIcon, setShowIcon] = useState(true)
	const [playPause,setPlayPause] = useState(``)

	// aspect ratio
	const [aspectRatio, setAspectRatio] = useState([16, 9])
	const ref = player => {
		setPlayer(player)
	}
	const [timeoutArray, setTimeoutArray] = useState([])
	const arrayTracker = useRef(timeoutArray)
	useEffect(() => {
		setBreadcrumbs({ path: [`Home`, `Player (${contentCache?.[params.id]?.name})`], collectionId: ``, contentId: `` })
		setShowTranscript(false)
		setSubtitleText(``)
		setDisplaySubtitles(null)

		if (!contentCache.hasOwnProperty(params.id)) // eslint-disable-line no-prototype-builtins
			getContentCache(params.id)

		if (contentCache[params.id]) {
			setContent(contentCache[params.id])
			setShowTranscript(contentCache[params.id].settings.showCaptions)
			setEvents(contentCache[params.id].settings.annotationDocument)
			const clips =
				contentCache?.[params.id]?.clips && Array.isArray(JSON.parse(contentCache[params.id].clips)) ?
					JSON.parse(contentCache[params.id].clips)[params.clip]
					: []

			if (params.clip) setClipTime([clips[`start`], clips[`end`]])

			if (contentCache[params.id].url !== ``) {
				if (subtitlesContentId !== params.id && calledGetSubtitles === false) {
					getSubtitles(params.id)
					setCalledGetSubtitles(true)
				}
				setUrl(contentCache[params.id].url)
				if(contentCache[params.id].url.includes(`youtube`)){
					async () => { // eslint-disable-line no-unused-expressions
						const rawData = await fetch(`https://www.youtube.com/oembed?url=${contentCache[params.id].url}&format=JSON`, {method: `GET`})
						const data = await rawData.json()
						if(data.hasOwnProperty(`width`) && data.hasOwnProperty(`height`)) // eslint-disable-line no-prototype-builtins
							setAspectRatio([data.width, data.height])

						return data
					}
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

				if (sKey !== ``) {
					setUrl(`${process.env.REACT_APP_YVIDEO_SERVER}/api/partial-media/stream-media/${sKey}`)
					if (subtitlesContentId !== params.id && calledGetSubtitles === false) {
						getSubtitles(params.id)
						setCalledGetSubtitles(true)
					}
				}
				if (resourceIdStream !== ``){
					Promise.resolve(getFiles(resourceIdStream)).then((value) => {
						if (value){
							const file = value.find(element => element[`file-version`].includes(contentCache[params.id].settings.targetLanguage) !== false)
							if (file[`aspect-ratio`])
								setAspectRatio(file[`aspect-ratio`].split(`,`))
						}
					})

				}
				// TODO: Figure what this was for
				// if(resource[resourceIdStream]){
				// 	if(resource[resourceIdStream][`files`]){
				// 		const file = resource[resourceIdStream][`files`].find(element => element[`file-version`].includes(contentCache[params.id].settings.targetLanguage) !== false)
				// 	}
				// }

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
	}, [addView, contentCache, getContentCache, streamKey, getSubtitles, content, sKey, subtitlesContentId, errorMessage, errorPrev, params])

	useEffect(() => {
		if(clipTime.length > 0)
			handleClipStart()
			// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clipTime[0]])

	useEffect(() => {
		arrayTracker.current = timeoutArray
	}, [timeoutArray])
	useLayoutEffect(() => {
		handleSubsObj()
		handleScrollFuncs(document.getElementById(`subtitles-container`), setDisableScroll, setEnableScroll)

		if (displaySubtitles === null)
			setToggleTranscript(false)
		else
			setToggleTranscript(true)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [displaySubtitles, duration])
	useLayoutEffect(() => {
		if (contentCache?.[params.id]?.clips)
			setClips(JSON.parse(contentCache[params.id].clips))

		if (contentCache[params.id]?.id){
			const tempClipId = contentCache[params.id].id
			setClipId(tempClipId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contentCache])

	const handleShowTip = (tipName, position) => {
		toggleTip({
			component: Tooltip,
			props: {
				name: tipName,
				position,
			},
		})
	}

	const handleToggleSubtitles = (isShowTranscript) => {
		setShowTranscript(!isShowTranscript)
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

	const handleMouseOver = element => {
		setHovering(true)

		if(element && element === `controls`)
			setControlsHovering(true)
	}

	const handleMouseOut = element => {
		setHovering(false)

		if(element && element === `controls`)
			setControlsHovering(false)
	}

	const handlePlayPause = (playing) => {
		if (playing) {
			setPlaying(false)
			if (enableScroll.action !== null) {
				enableScroll.action()
				setScrollDisabled(false)
			}
		} else {
			setPlaying(true)
			if(disableScroll.action !== null) {
				disableScroll.action()
				setScrollDisabled(true)
			}
		}
	}

	const handlePause = () => {
		setPlaying(false)
		if (enableScroll.action !== null) {
			enableScroll.action()
			setScrollDisabled(false)
		}
		setShowIcon(true)
		setPlayPause(`pause`)
		setTimeout(() => {
			setShowIcon(false)
		}, 1000)
	}

	const handlePlay = () => {
		setPlaying(true)
		if(disableScroll.action !== null) {
			disableScroll.action()
			setScrollDisabled(true)
		}
		setShowIcon(true)
		setPlayPause(`play`)
		setTimeout(() => {
			setShowIcon(false)
		}, 1000)
	}

	const handleStart = () => {
		setStarted(true)
	}

	const handleClipStart = () => {
		player.seekTo(clipTime[0])
		setIsClip(true)
	}

	const handleBlank = (bool) => {
		setBlank(bool)
	}

	const handlePlaybackRateChange = (rate) => {
		setPlaybackRate(rate)
	}

	let timeout
	const handleMouseMoved = () => {
		setMouseInactive(false)
		for(const i in arrayTracker.current) {
			clearTimeout(arrayTracker.current[i])
			setTimeoutArray(timeoutArray.splice(i, 1))
		}

		timeout = setTimeout(() => setMouseInactive(true), 5000)
		setTimeoutArray([...timeoutArray, timeout])
	}

	const handleProgress = progression => {
		const dateElapsed = new Date(null)
		dateElapsed.setSeconds(progression)
		setProgressEntered(true)
		setPlayTime(dateElapsed.toISOString().substr(11, 8))
		setProgress(progression)

		handleSubtitles(progression)

		const subContainer = document.getElementById(`subtitles-container`)
		if(subContainer && Object.keys(subsObj).length !== 0) {
			if(subtitleTextIndex === undefined)
				return
			else
				subContainer.scrollTo({top: subsObj?.[subtitleTextIndex]?.distanceDownTranscript})
		}
	}

	const handleSubtitles = (progression) => {
		const entries = Object.entries(subsObj)
		const progressPercent = progression * 100 / duration
		if(fullyChecked) {
			const closeCheck = subtitleTextIndex === undefined || subtitleTextIndex === 0 ?
				{prevEntry: null, nextEntry: entries[1] ? entries[1][1] : null}
				:
				subtitleTextIndex === entries.length - 1 ?
					{prevEntry: entries?.[subtitleTextIndex - 1]?.[1], nextEntry: null}
					:
					{prevEntry: entries?.[subtitleTextIndex - 1]?.[1], nextEntry: entries[subtitleTextIndex + 1]?.[1]}

			if(closeCheck.prevEntry !== null && progressPercent < parseFloat(closeCheck?.prevEntry?.percentPlayed)) {
				setSubtitleTextIndex(subtitleTextIndex - 1)
				setSubtitleText(closeCheck.prevEntry.text)
			}else if(closeCheck.nextEntry !== null && progressPercent > parseFloat(closeCheck?.nextEntry?.percentPlayed)) {
				setSubtitleTextIndex(subtitleTextIndex + 1)
				setSubtitleText(closeCheck.nextEntry.text)
			}else return

		}else {
			for (const i in entries) {
				const numIndex = parseFloat(i)
				if (numIndex < entries.length - 1) { // if not last entry
					if (progressPercent < parseFloat(entries[0][1].percentPlayed)) { // if progress is less than first entry
						setSubtitleTextIndex(undefined)
						setSubtitleText(undefined)
						setFullyChecked(true) // these are fine because this won't take effect until the function is left
						return
					}else if(progressPercent > entries[numIndex][1].percentPlayed
						&& progressPercent < entries[numIndex + 1][1].percentPlayed) { // if progress is between two consecutive entries
						setSubtitleTextIndex(numIndex)
						setSubtitleText(entries[numIndex][1].text)
						setFullyChecked(true)
						return
					}
				} else if (numIndex === entries.length - 1) { // if last entry
					if(entries.length === 1) { // if only one entry
						setSubtitleTextIndex(0)
						setSubtitleText(entries[numIndex][1].text)
						setFullyChecked(true)
						return
					} else { // if last entry and there is more than one entry
						if(progressPercent > entries[numIndex][1].percentPlayed) {
							setSubtitleTextIndex(numIndex)
							setSubtitleText(entries[numIndex][1].text)
							setFullyChecked(true)
							return
						}
					}
				}
			}
		}
	}

	const handleSeekChange = (e, time) => {
		setFullyChecked(false)
		toggleTip()
		// reset events
		//* *TIME SHOULD BE A PERCENTAGE INSTEAD OF SECONDS */
		// const played = (e.clientX + document.body.scrollLeft) / window.innerWidth
		// player.seekTo(played)
		let newPlayed = 0
		if (e) {
			const scrubber = e.currentTarget?.getBoundingClientRect()
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

	const handleToggleFullscreen = (fullscreen) => {
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

	const handleSubsObj = () => {
		if(displaySubtitles && duration) {
			let temp = {}
			const navbarHeight = document.getElementById(`navbar`)?.getBoundingClientRect().height
			for (const i in displaySubtitles.content) {
				const numIndex = parseFloat(i)
				const elementYPos = document.getElementById(`t-row-${i}`)?.getBoundingClientRect().y

				temp = handleTempObj(temp, numIndex, navbarHeight, elementYPos)
			}
			setSubsObj(temp)
		}
	}

	const handleShowSubtitle = (value, index) => {
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

	const handleTempObj = (temp, loopIndex, navbarHeight, yPos) => {
		const containerHeightFourth = document.getElementById(`subtitles-container`)?.getBoundingClientRect().height * .25
		return (
			{...temp,
				[loopIndex]: {
					text: displaySubtitles.content[loopIndex].text,
					percentPlayed: displaySubtitles.content[loopIndex].start * 100 / duration,
					distanceDownTranscript: yPos - navbarHeight - containerHeightFourth,
				},
			}
		)
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
			component: ErrorModalContainer,
		})
		errorSync()
	}
	const handleClipToggle = (clipOrTranscript) => {
		if (clipOrTranscript === `Clip`)
			setSideBarIsClip(true)
		else
			setSideBarIsClip(false)
	}
	const handleToggleTranscript = () => {
		toggleTip()
		setToggleTranscript(!toggleTranscript)
		setSideBarIsClip(false)
	}
	const handleSeekToSubtitle = (e) => {
		let seekToIndex = 0
		if(displaySubtitles && subtitleTextIndex !== undefined){
			if(e.target.id === `prev-sub`){
				if(subtitleTextIndex > 1)
					seekToIndex = subtitleTextIndex - 1

			} else {
				if(subtitleTextIndex < displaySubtitles.content.length - 1)
					seekToIndex = subtitleTextIndex + 1
				else
					seekToIndex = displaySubtitles.content.length - 1

			}
		}

		const start = displaySubtitles.content[seekToIndex].start
		handleSeekChange(null, start + start * .0000001)
	}

	const handleChangeSpeed = () => {
		toggleTip()
		setShowSpeed(!showSpeed)
		if(isCaption)
			setIsCaption(!isCaption)
	}

	const handleChangeCaption = () => {
		toggleTip()
		setIsCaption(!isCaption)
		if(showSpeed)
			setShowSpeed(!showSpeed)
	}

	const handleAspectRatio = ()=>{
		const cont = document.getElementById(`player-container`)
		if(!cont)
			return

		const width = cont.offsetWidth
		const height = cont.offsetHeight
		const blank = document.getElementById(`blank`)
		if(width / height > aspectRatio[0] / aspectRatio[1]) {
			const videoWidth = height * (aspectRatio[0] / aspectRatio[1])
			const padding = (width - videoWidth) / 2
			// NOTE: censorContainer and commentContainer resize as children of blank
			blank.style.left =`${padding}px`
			blank.style.top = `0px`
			blank.style.width = `${videoWidth}px`
			blank.style.height = `${height}px`
		} else if(width / height < aspectRatio[0] / aspectRatio[1]) {
			const videoHeight = width * aspectRatio[1] / aspectRatio[0]
			const padding = (height - videoHeight) / 2
			// NOTE: censorContainer and commentContainer resize as children of blank
			blank.style.left = `0px`
			blank.style.top = `${padding}px`
			blank.style.width = `${width}px`
			blank.style.height = `${videoHeight}px`
		}
	}

	// TODO: This might break, what it was before was
	if (displaySubtitles === null && content) {
	// if(displaySubtitles === null && content){

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

	const checkBrowser = () => {
		if(isSafari || isIOS){
			Swal.fire({
				text: `Video playback does not currently work on iOS devices or the Safari browser.`,
				icon: `warning`,
				confirmButtonText: `Ok`,
			}).then((result) => {
				if (result.isConfirmed)
					Swal.close()
			}).catch((error) => {
				Swal.fire(`An error has occurred`, error.message, `error`)
			})
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
		isClip,
		sideBarIsClip,
		isLandscape,
		hasPausedClip,
		events,
		showSpeed,
		scrollDisabled,
		clips,
		clipId,
		progressEntered,
		started,
		mouseInactive,
		timeoutArray,
		controlsHovering,
		showIcon,
		playPause,
	}

	const handlers = {
		handleDuration,
		handleMouseOut,
		handleMouseOver,
		handlePause,
		handlePlay,
		handleStart,
		handleClipStart,
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
		setShowSpeed,
		handleSeekToSubtitle,
		handleChangeSpeed,
		handleChangeCaption,
		checkBrowser,
		handleClipToggle,
		handleMouseMoved,
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
	getContentCache: contentService.getContent,
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
