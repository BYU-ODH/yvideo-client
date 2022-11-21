import React, { useEffect } from 'react'

import Style, { ClosePreview } from './styles'

import ReactPlayer from 'react-player'

import { PlayPauseButton, BarPreview } from 'components/bits'
import closeIcon from 'assets/x.svg'

const PreviewFiles = props => {
	const {
		ref,
		playing,
		url,
		volume,
		fileState,
		isStreamKeyLoaded,
	} = props.viewstate

	const {
		handleAspectRatio,
		handleStart,
		handlePlay,
		handlePause,
		handleProgress,
		handleDuration,
		handleMouseOut,
		handleMouseOver,
		modalToggle,
	} = props.handlers

	useEffect(() => {
		handlePlay()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleOnProgress = ({ played, playedSeconds }) => {
		handleProgress(playedSeconds)
		if(document.getElementById(`time-bar-progress`))
			document.getElementById(`time-bar-progress`).style.width = `${played * 100}%`
		if(document.getElementById(`time-dot`)) {
			document.getElementById(`time-dot`).style.left = played ?
				`calc(${played * 100}% - 2px)`
				:
				`calc(${played * 100}% - 2px)`
		}
	}
	return(
		isStreamKeyLoaded === true &&
		<Style>
			<div id='header-container'>
				<u><h1>{fileState[`metadata`]}</h1></u>
			</div>
			<ClosePreview onClick={modalToggle}><img alt='' src={closeIcon} /></ClosePreview>
			<div style={{ height: `100%`, overflow: `hidden`}}>
				<div className='player-wrapper' id={`player-container`} style={{ flex: 1 }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
					<ReactPlayer
						ref={ref}
						className='react-player'
						width='100%'
						height='100%'
						url={url}
						playing={playing}
						volume={volume}
						onStart = {handleStart}
						onReady = {handleAspectRatio}
						onPlay = {handlePlay}
						onPause = {handlePause}
						onSeek={e => e}
						progressInterval={30}
						onProgress={handleOnProgress}
						onDuration={handleDuration}

						config={{
							youtube: {
								iv_load_policy: 3,
								modestbranding: 1,
								playsinline: 1,
								rel: 0,
								showinfo: 0,
							},
							file: {
								attributes: {},
							},
						}}
					/>
					<PlayPauseButton handlePlay={handlePlay} handlePause={handlePause} playing={playing} style={{position:`absolute`}}/>
					<BarPreview viewstate={props.viewstate} handlers={props.handlers}/>
				</div>
			</div>

		</Style>
	)
}

export default PreviewFiles
