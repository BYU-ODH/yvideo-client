import React from 'react'

import { Scrubber, VolumeScrubber } from 'components/bits'

import Style, {
	PlayPause,
	ClosedCaptions,
	Fullscreen,
	Volume,
	Speed,
} from './styles'

import clockIcon from 'assets/te-clock.svg'

const PlayerControls = props => {

	const {
		// duration,
		fullscreen,
		hovering,
		progress,
		volume,
		muted,
		playing,
	} = props.viewstate

	const {
		handlePause,
		handlePlay,
		//handlePlaybackRateChange,
		handleSeekChange,
		// handleSeekMouseDown,
		// handleSeekMouseUp,
		handleToggleFullscreen,
		handleMuted,
		handleUnmuted,
		handleVolumeChange,
	} = props.handlers

	return (
		<Style playing={playing} >

			<Scrubber progress={progress.played} active={hovering} handleClick={handleSeekChange} />

			<div className='left'>
				<PlayPause playing={playing} onClick={playing ? handlePause : handlePlay} />
				{ muted ? (
					<Volume onClick={e => { alert('You cannot control this part of the player')}} muted={muted}/>
				) : (
					<Volume onClick={e => { alert('You cannot control this part of the player')}} muted={muted}/>
				) }
			</div>
			<div className='right'>
				{/* <Fullscreen fullscreen={fullscreen} onClick={handleToggleFullscreen} /> */}
				{/* <SideBarToggle /> */}
				<Speed src={clockIcon}/>
				{/* <ClosedCaptions /> */}
				{/* <Notes /> */}
			</div>
		</Style>
	)

}

export default PlayerControls
