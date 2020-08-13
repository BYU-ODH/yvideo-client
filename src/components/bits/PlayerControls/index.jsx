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
				{/* <ClosedCaptions /> */}
				{/* <Notes /> */}
			</div>
			{ showSpeed && <form className="speed" onSubmit={handleSubmitSpeed} onMouseLeave={e => setShowSpeed(false)}>
					<select onChange={e => handlePlaybackRateChange(e.target.value)}>
						<option value=''>&nbsp;</option>
						<option value={3}>3.0</option>
						<option value={2}>2.0</option>
						<option value={1.5}>1.5</option>
						<option value={1}>1.0</option>
						<option value={.5}>0.5</option>
						<option value={.25}>0.25</option>
					</select>
				</form>
			}
		</Style>
	)

}

export default PlayerControls
