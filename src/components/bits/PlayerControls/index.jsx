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
		isCaption,
		showTranscript,
		subtitles,
		playbackRate,
		indexToDisplay,
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
		setIsCaption,
		handleChangeSubtitle,
	} = props.handlers

	const [showSpeed, setShowSpeed] = useState(false)

	const handleSubmitSpeed = (e) => {
		e.preventDefault()
	}

	const handleChangeSpeed = () => {
		setShowSpeed(!showSpeed)
		if(isCaption){
			setIsCaption(!isCaption)
		}
	}

	const handleChangeCaption = () => {
		setIsCaption(!isCaption)
		if(showSpeed){
			setShowSpeed(!showSpeed)
		}
	}

	return (
		<Style playing={playing} >

			<Scrubber progress={progress.played} active={hovering} handleClick={handleSeekChange} />

			<div className='left'>
				<PlayPause playing={playing} onClick={playing ? handlePause : handlePlay} />
			</div>
			<div className='right'>
				<Fullscreen fullscreen={fullscreen} onClick={handleToggleFullscreen} />
				{/* <SideBarToggle /> */}
				<Speed src={clockIcon} onClick={handleChangeSpeed}/>
				<ClosedCaptions style={{ display: `${showTranscript !== false ? ('initial') : ('none')}` }} isCaptions={isCaption} onClick={handleChangeCaption}/>
				{/* <Notes /> */}
			</div>
			{ showSpeed &&
				<div className="menu-modal" onMouseLeave={e => setShowSpeed(false)}>
					<h3>Playback Rate</h3>
					<div>
						<input type="button" value={3.0} onClick={e => handlePlaybackRateChange(e.target.value)} className={playbackRate === 3 ? ('active-value') : ('')}/><br/>
						<input type="button" value={2.0} onClick={e => handlePlaybackRateChange(e.target.value)} className={playbackRate === 2 ? ('active-value') : ('')}/><br/>
						<input type="button" value={1.5} onClick={e => handlePlaybackRateChange(e.target.value)} className={playbackRate === 1.5 ? ('active-value') : ('')}/><br/>
						<input type="button" value='Normal' onClick={e => handlePlaybackRateChange(1)} className={playbackRate === 1 ? ('active-value') : ('')}/><br/>
						<input type="button" value={0.5} onClick={e => handlePlaybackRateChange(e.target.value)} className={playbackRate === 0.5 ? ('active-value') : ('')}/><br/>
						<input type="button" value={0.25} onClick={e => handlePlaybackRateChange(e.target.value)} className={playbackRate === 0.25 ? ('active-value') : ('')}/><br/>
					</div>
				</div>
			}
			{ isCaption &&
				<div className="menu-modal" onMouseLeave={e => setIsCaption(false)}>
					<h3>Select Caption</h3>
					<div className="caption-list">
						{/* Display all possible options with check mark for current selection. Add none field. */}
						{subtitles.map((element, index) =>
							<input key={element.id} type="button" value={element.language} onClick={e => handleChangeSubtitle(index)} className={ indexToDisplay == index ? ('active-value') : ('')}/>
						)
						}
					</div>
				</div>
			}
		</Style>
	)

}

export default PlayerControls
