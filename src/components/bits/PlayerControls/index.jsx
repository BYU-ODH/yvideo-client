import React from 'react'

import { Scrubber } from 'components/bits'

import Style, { PlayPause, ClosedCaptions, Fullscreen } from './styles'

const PlayerControls = props => {

	const {
		// duration,
		fullscreen,
		hovering,
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
		handleToggleFullscreen,
		// handleToggleMuted,
		// handleVolumeChange,
	} = props.handlers

	return (
		<Style playing={playing} >

			<Scrubber progress={progress.played} active={hovering} />

			<div className='left'>
				<PlayPause playing={playing} onClick={playing ? handlePause : handlePlay} />
				{/* <Volume /> */}
			</div>
			<div className='right'>
				<Fullscreen fullscreen={fullscreen} onClick={handleToggleFullscreen} />
				{/* <SideBarToggle /> */}
				{/* <Speed /> */}
				<ClosedCaptions />
				{/* <Notes /> */}
			</div>
		</Style>
	)

}

export default PlayerControls
