import React, { useState } from 'react'

import { Scrubber } from 'components/bits'

import Style, { PlayPause } from './styles'

const PlayerControls = props => {

	const {
		// duration,
		progress,
		// volume,
		// muted,
		playing,
	} = props.viewstate

	const {
		handlePause,
		handlePlay,
	// handlePlaybackRateChange,
	// handleSeekChange,
	// handleSeekMouseDown,
	// handleSeekMouseUp,
	// handleToggleFullscreen,
	// handleToggleMuted,
	// handleVolumeChange,
	} = props.handlers

	const [hovering, setHovering] = useState(false)

	const handleMouseOver = e => {
		setHovering(true)
	}

	const handleMouseOut = e => {
		setHovering(false)
	}

	return (
		<Style playing={playing} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>

			<Scrubber progress={progress.played} active={hovering} />

			<div className='left'>
				<PlayPause playing={playing} onClick={playing ? handlePause : handlePlay} />
				{/* <Volume /> */}
			</div>
			<div className='right'>
				{/* <Notes /> */}
				{/* <Captions /> */}
				{/* <Speed /> */}
				{/* <SideBarToggle /> */}
				{/* <Fullscreen onClick={handleToggleFullscreen} /> */}
			</div>
		</Style>
	)

}

export default PlayerControls
