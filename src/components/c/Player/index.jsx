import React, { PureComponent, useRef, createRef } from 'react'

import ReactPlayer from 'react-player'

import { CollectionsContainer, EventsContainer } from 'containers'
import { PlayerControls } from 'components/bits'

import { Transcript } from 'components/bits'

import { PlayerSubtitlesContainer } from 'containers'

import Style, { Blank, Comment, Subtitles, Censor, PlayButton } from './styles'

import {CurrentEvents, CensorChange, CommentChange, HandleSubtitle} from './getCurrentEvents'

import Position from './censorPosition'

import chevron from 'assets/player-chevron-left.svg'
import playButton from 'assets/hexborder.svg'
import helpIcon from 'assets/help/help-icon-white.svg'

export default class Player extends PureComponent {

	componentDidMount(){
		// setTimeout(() => {
		// 	const {url} = this.props.viewstate
		// 	if (!url) alert(`No media found, please check to see if you have the correct URL`)
		// }, 4000)
		if (this.props.clipTime) if(this.props.clipTime.length > 0) this.props.ref.seekto(this.props.clipTime[0])
	}
	censorRef = createRef(null)

	render() {
		const {
			ref,
			url,
			playing,
			playbackRate,
			progress,
			volume,
			muted,
			blank,
			videoComment,
			commentPosition,
			duration,
			showTranscript,
			toggleTranscript,
			content,
			subtitleText,
			displaySubtitles,
			isCaption,
			indexToDisplay,
			isMobile,
			censorPosition,
			censorActive,
			clipTime,
			isLandscape,
			hasPausedClip,
			events,
		} = this.props.viewstate

		const {
			handleDuration,
			handleMouseOut,
			handleMouseOver,
			handlePause,
			handlePlay,
			handleStart,
			handleProgress,
			handleSeekChange,
			handlePlaybackRateChange,
			handleBlank,
			handleMuted,
			handleUnmuted,
			handleShowComment,
			handleToggleTranscript,
			handleShowSubtitle,
			handleShowHelp,
			handleShowTip,
			toggleTip,
			setCensorActive,
			setCensorPosition,
			handlePlayPause,
			setHasPausedClip,
		} = this.props.handlers

		const handleOnProgress = ({ played, playedSeconds }) => {
			const t0 = performance.now()
			handleProgress(playedSeconds)
			const subtitles = displaySubtitles
			if(document.getElementById(`timeBarProgress`))
				document.getElementById(`timeBarProgress`).style.width = `${played * 100}%`
			if(document.getElementById(`time-dot`))
				document.getElementById(`time-dot`).style.left = played ? `calc(${played * 100}% - 2px)` : `calc(${played * 100}% - 2px)`
			if(subtitles)
				HandleSubtitle(playedSeconds,subtitles,0,duration)

			if (clipTime.length > 0 && playedSeconds > clipTime[1]){
				if (!hasPausedClip){
					handlePause()
					setHasPausedClip(true)
				}
			}
			if(!events) return
			const values = CurrentEvents(playedSeconds,events,duration)

			for (let i = 0; i < values.censors.length; i++) CensorChange(i,values.censors[i],playedSeconds)
			for (let x = 0; x < values.comments.length; x++) CommentChange(x, values.comments[x].position)
			for (let y = 0; y < values.allEvents.length; y++){
				switch(values.allEvents[y].type){
				case `Mute`:
					handleMuted()
					break
				case `Pause`:
					if(!values.allEvents[y].active){
						values.allEvents[y].active = true
						handlePause()
					}
					break
				case `Skip`:
					handleSeekChange(null,values.allEvents[y].end)
					break
				default:
					break
				}
			}
			const t1 = performance.now()
		}
		return (
			<Style>
				<div style={{ display: `${showTranscript !== false ? `flex` : `initial`}`, height: `100%`}}>
					<div className='player-wrapper' id={`player-container`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ flex: 1}}>
						<ReactPlayer
							ref={ref}
							className='react-player'
							width='100%'
							height='100%'
							url={url}
							playing={playing}
							playbackRate={parseFloat(playbackRate)}
							volume={volume}
							muted={muted}
							// onReady={() => console.log(`onReady`)}
							// onStart={() => console.log(`onStart`)}
							onPlay={handlePlay}
							onPause={handlePause}
							onStart = {handleStart}
							// onBuffer={() => console.log(`onBuffer`)}
							onSeek={e => e}
							// onError={e => console.log(`onError`, e)}
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
						<PlayerControls viewstate={this.props.viewstate} handlers={this.props.handlers}/>
						<Blank blank={blank} id='blank' onContextMenu={e => e.preventDefault()}>
							<PlayButton playing={playing} onClick={handlePlayPause} src={playButton} isMobile={isMobile} isLandscape={isLandscape}/>
							<Subtitles style={{ display: `${subtitleText !== `` ? `flex` : `none`}` }} ><h3 subtitleText={subtitleText} id='subtitle'></h3></Subtitles>
							<div id='censorContainer' style={{width:`100%`,height:`100%`,position:`absolute`,top:`0px`}}>
							</div>
							<div id ='commentContainer' style={{width:`100%`,height:`100%`,position:`absolute`,top:`0px`}}>
							</div>

						</Blank>
					</div>
					<Transcript viewstate={this.props.viewstate} handlers={this.props.handlers}>
					</Transcript>
				</div>
				{
					url !== `` && showTranscript ? (
						// showsubtitles
						<PlayerSubtitlesContainer
							currentTime={progress}
							duration={duration}
							handleShowSubtitle={handleShowSubtitle}
							indexToDisplay={indexToDisplay}
						/>
					) : null
				}

			</Style>
		)
	}
}