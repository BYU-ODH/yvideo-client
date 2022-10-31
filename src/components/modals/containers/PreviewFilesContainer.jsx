import React, { useState, useEffect, useLayoutEffect } from 'react'

import PreviewFiles from '../components/PreviewFiles'

import { contentService, interfaceService, resourceService } from 'services'
import { connect} from 'react-redux'

const PreviewFilesContainer = props => {
	const {
		toggleModal,
		toggleTip,
		getStreamKey,
		contentCache,
		streamKey,
		getContent,
		setBreadcrumbs,
		file,
		resourceId,
	}= props

	const volume = 0.8

	const [sKey, setKey] = useState(``)
	const [url, setUrl] = useState(``)
	const [isStreamKeyLoaded, setIsStreamKeyLoaded] = useState(false)
	const [isUrlLoaded, setIsUrlLoaded] = useState(false)
	const [playing, setPlaying] = useState(false)
	const [player, setPlayer] = useState(null)
	const [mouseOn, setMouseOn] = useState(false)
	const [playTime, setPlayTime] = useState(`00:00:00`)
	const [progress, setProgress] = useState(0)
	const [duration, setDuration] = useState(0)
	const [hovering, setHovering] = useState(true)
	const [progressEntered, setProgressEntered] = useState(false)

	const ref = player => {
		setPlayer(player)
	}

	useEffect(() => {
		setBreadcrumbs({ path: [`Home`, `Manage Resources`], collectionId: ``, contentId: `` })

		if (file && !isStreamKeyLoaded) {
			getStreamKey(resourceId, file[`file-version`])
			setIsStreamKeyLoaded(true)
		}

		if (streamKey)
			setKey(streamKey)

		if (sKey !== `` && !isUrlLoaded) {
			setUrl(`${process.env.REACT_APP_YVIDEO_SERVER}/api/partial-media/stream-media/${sKey}`)
			setIsUrlLoaded(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contentCache, getContent, streamKey, sKey])

	useLayoutEffect(() => {
	},[duration])

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

	const toggleMouseOn = () => {
		setMouseOn(!mouseOn)
	}

	const handleDuration = duration => {
		setDuration(duration)
	}

	const handleProgress = progression => {
		const dateElapsed = new Date(null)
		dateElapsed.setSeconds(progression)
		setProgressEntered(true)
		setPlayTime(dateElapsed.toISOString().substr(11, 8))
		setProgress(progression)
	}

	const handleSeekChange = (e, time) => {
		toggleTip()
		let newPlayed = 0
		if (e) {
			const scrubber = e.currentTarget.getBoundingClientRect()
			if (scrubber.width !== 0)
				newPlayed = (e.pageX - scrubber.left) / scrubber.width
		} else
			newPlayed = time / duration
		if (duration > 0)
			player.seekTo(newPlayed.toFixed(10), `fraction`)
	}

	const handleMouseOver = e => {
		setHovering(true)
	}

	const handleMouseOut = e => {
		setHovering(false)
	}

	const viewstate = {
		url,
		playing,
		ref,
		volume,
		mouseOn,
		progress,
		playTime,
		duration,
		hovering,
		progressEntered,
	}

	const handlers = {
		toggleModal,
		toggleTip,
		handlePlayPause,
		handlePlay,
		handlePause,
		toggleMouseOn,
		handleProgress,
		handleDuration,
		handleSeekChange,
		handleMouseOver,
		handleMouseOut,
	}

	return <PreviewFiles viewstate={viewstate} handlers={handlers} toggleModal={toggleModal}/>

}

const mapStateToProps = ({ contentStore, resourceStore }) => ({
	contentCache: contentStore.cache,
	streamKey: resourceStore.streamKey,
	resource: resourceStore.cache,
})

const mapDispatchToProps = {
	getContent: contentService.getContent,
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
	setBreadcrumbs: interfaceService.setBreadcrumbs,
	getStreamKey: resourceService.getStreamKey,
	getFiles: resourceService.getFiles,
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewFilesContainer)