import React, { useState, useEffect } from 'react'

import { Scrubber } from 'components/bits'

import Style, {
	PlayPause,
	ClosedCaptions,
	Fullscreen,
	// Volume,
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
		isAdmin,
		isProf,
		showTranscript,
		subtitles,
		playbackRate,
		indexToDisplay,
		displaySubtitles
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
		handleShowSubtitle,
		setShowTranscript,
	} = props.handlers

	useEffect(() => {
		//Some browsers do not trigger an event when you exit full screen mode. So, you have to look for it manually adding an event listener
		//after the event listener, there is a callback function which only has to set the fullscreen prop to false again.
		//the close event is already handled when you close the full screen. So instead of looking at the escape event, we look for the fullscreenchange event
		//when the screen changes we know that we should update our state.
		document.addEventListener('fullscreenchange', exitHandler);
		document.addEventListener('webkitfullscreenchange', exitHandler);
		document.addEventListener('mozfullscreenchange', exitHandler);
		document.addEventListener('MSFullscreenChange', exitHandler);

		function exitHandler() {
				if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
					///now, we only want to do this whenever the fullscreen is true so we make sure that this happens when we are exiting fullscreen
					if(fullscreen) props.handlers.setFullscreen(!props.viewstate.fullscreen)

				}
		}
	},)


	const [showSpeed, setShowSpeed] = useState(false)

	// const handleSubmitSpeed = (e) => {
	// 	e.preventDefault()
	// }

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

	const handleToggleSubtitles = () => {
		setShowTranscript(!showTranscript)
		handleShowSubtitle("")
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
				<ClosedCaptions
					// style={{ display: `${showTranscript !== false ? ('initial') : ('none')}` }}
					isCaptions={isCaption}
					onClick={ isCaption && isAdmin && isProf ? (handleChangeCaption) : (handleToggleSubtitles)}
				/>
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
			{/* { isCaption &&
				<div className="menu-modal" onMouseLeave={e => setIsCaption(false)}>
					<h3>Select Caption</h3>
					<div className="caption-list">
						{subtitles.map((element, index) =>
							<input key={element.id} type="button" value={element.language} onClick={e => handleChangeSubtitle(index)} className={ indexToDisplay == index ? ('active-value') : ('')}/>
						)
						}
					</div>
				</div>
			} */}
			{ isCaption && (isAdmin || isProf) &&
				<div className="menu-modal" onMouseLeave={e => setIsCaption(false)}>
					<h3>Select Caption</h3>
					<div className="caption-list">
						{subtitles.map((element, index) =>
							<input key={element.id} type="button" value={element.language} onClick={e => handleChangeSubtitle(index)} className={ indexToDisplay == index ? ('active-value') : ('')}/>
						)
						}
					</div>
				</div>
			}
			{ isCaption && !isAdmin && !isProf &&
				<div className="menu-modal" onMouseLeave={e => setIsCaption(false)}>
					<h3>Select Caption</h3>
					<div className="caption-list">
						<input type="button" value={displaySubtitles.language} className={'active-value'}/>
					</div>
				</div>
			}
		</Style>
	)

}

export default PlayerControls
