import React, { useState } from 'react'

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
		handlePlaybackRateChange,
		handleSeekChange,
		// handleSeekMouseDown,
		// handleSeekMouseUp,
		handleToggleFullscreen,
		handleMuted,
		handleUnmuted,
		handleVolumeChange,
	} = props.handlers

	const [showSpeed, setShowSpeed] = useState(false)

	const handleSubmitSpeed = (e) => {
		e.preventDefault()
	}

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
				<Speed src={clockIcon} onClick={e => setShowSpeed(!showSpeed)}/>
				<ClosedCaptions />
				{/* <Notes /> */}
			</div>
			{ showSpeed &&
				<div className="speed" onMouseLeave={e => setShowSpeed(false)}>
					<h3>Playback Rate</h3>
					<div>
						<input type="button" value={3.0} onClick={e => handlePlaybackRateChange(e.target.value)}/><br/>
						<input type="button" value={2.0} onClick={e => handlePlaybackRateChange(e.target.value)}/><br/>
						<input type="button" value={1.5} onClick={e => handlePlaybackRateChange(e.target.value)}/><br/>
						<input type="button" value='Normal' onClick={e => handlePlaybackRateChange(1)}/><br/>
						<input type="button" value={0.5} onClick={e => handlePlaybackRateChange(e.target.value)}/><br/>
						<input type="button" value={0.25} onClick={e => handlePlaybackRateChange(e.target.value)}/><br/>
					</div>
				</div>
			}
		</Style>
	)

}

export default PlayerControls
