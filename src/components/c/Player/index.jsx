import React, { PureComponent, useRef, createRef } from 'react'

import ReactPlayer from 'react-player'

import { CollectionsContainer, EventsContainer } from 'containers'
import { PlayerControls } from 'components/bits'

import { Transcript } from 'components/bits'

import { PlayerSubtitlesContainer } from 'containers'

import Style, { Blank, Comment, Subtitles, Censor, PlayButton } from './styles'

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
			const test = performance.now()
			// document.getElementById('time-dot').scrollIntoView()
			const censorData = Position(censorPosition,playedSeconds,duration)
			const width = censorData.top1 + censorData.top2 !== 0 ? censorData.width1+(playedSeconds-censorData.previous)/(censorData.next-censorData.previous)*(censorData.width2-censorData.width1) : 0
			this.censorRef.current.style.width = `${width}%`
			const height = censorData.top1 + censorData.top2 !== 0 ? censorData.height1+(playedSeconds-censorData.previous)/(censorData.next-censorData.previous)*(censorData.height2-censorData.height1) : 0
			this.censorRef.current.style.height = `${height}%`
			this.censorRef.current.style.top = censorData.top1 + censorData.top2 !== 0 ? `${censorData.top1-height/2+(playedSeconds-censorData.previous)/(censorData.next-censorData.previous)*(censorData.top2-censorData.top1)}%` : `0%`
			this.censorRef.current.style.left = censorData.left1 + censorData.left2 !== 0 ? `${censorData.left1-width/2+(playedSeconds-censorData.previous)/(censorData.next-censorData.previous)*(censorData.left2-censorData.left1)}%` : `0%`
			// setPlayed(played)
			handleProgress({playedSeconds,played})
			const test1 = performance.now()
			if (clipTime.length > 0 && playedSeconds > clipTime[1]){
				if (!hasPausedClip){
					handlePause()
					setHasPausedClip(true)
				}
			}
			// console.log(`Performance ${(test1-test).toFixed(2)}ms`)
		}

		// console.log(`%c Player component ${url}`, 'color:red;')
		// console.log(clipTime)
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
							onSeek={e => console.log(`onSeek`, e)}
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
							<Comment commentX={commentPosition.x} commentY={commentPosition.y}>{videoComment}</Comment>
							<Subtitles style={{ display: `${subtitleText !== `` ? `flex` : `none`}` }} ><h3 id='subtitle-box'>{subtitleText}</h3></Subtitles>
							<Censor ref={this.censorRef} active={censorActive}><canvas></canvas></Censor>
						</Blank>
					</div>
					<Transcript viewstate={this.props.viewstate} handlers={this.props.handlers}>
					</Transcript>
				</div>
				{/* <div className={`collection-container`}>
					<CollectionsContainer/>
				</div> */}
				<EventsContainer
					currentTime={progress.playedSeconds.toFixed(1)}
					duration={duration}
					handleSeek={handleSeekChange}
					handleMute={handleMuted}
					handlePlay={handlePlay}
					handlePause={handlePause}
					handleUnMute={handleUnmuted}
					// toggleMute={toggleMute}
					handleBlank={handleBlank}
					handleShowComment={handleShowComment}
					handleCensorPosition={setCensorPosition}
					handleCensorActive={setCensorActive}
				/>
				{
					url !== `` && showTranscript ? (
						// showsubtitles
						<PlayerSubtitlesContainer
							currentTime={progress.playedSeconds.toFixed(1)}
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