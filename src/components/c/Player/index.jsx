import React, { PureComponent } from 'react'

import ReactPlayer from 'react-player'

import { CollectionsContainer, EventsContainer } from 'containers'
import { PlayerControls } from 'components/bits'

import { Transcript } from 'components/bits'

import { PlayerSubtitlesContainer } from 'containers'

import Style, { Blank, Comment, Subtitles } from './styles'

import chevron from 'assets/player-chevron-left.svg'

import helpIcon from 'assets/help/help-icon-white.svg'

export default class Player extends PureComponent {

	componentDidMount(){
		// setTimeout(() => {
		// 	const {url} = this.props.viewstate
		// 	if (!url) alert(`No media found, please check to see if you have the correct URL`)
		// }, 4000)
	}

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
		} = this.props.viewstate

		const {
			handleDuration,
			handleMouseOut,
			handleMouseOver,
			handlePause,
			handlePlay,
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
		} = this.props.handlers

		// console.log(`%c Player component ${url}`, 'color:red;')

		return (
			<Style>
				<div style={{ display: `${showTranscript !== false ? ('flex') : ('initial')}`, height: '100%'}}>
					<div className='player-wrapper' id={'player-container'} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ flex: 1}}>
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
							// onBuffer={() => console.log(`onBuffer`)}
							onSeek={e => console.log(`onSeek`, e)}
							// onError={e => console.log(`onError`, e)}
							progressInterval={100}
							onProgress={handleProgress}
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
								}
							}}
						/>
						<PlayerControls viewstate={this.props.viewstate} handlers={this.props.handlers} />
						<Blank blank={blank} id='blank' onContextMenu={e => e.preventDefault()}>
							<Comment commentX={commentPosition.x} commentY={commentPosition.y}>{videoComment}</Comment>
							<Subtitles style={{ display: `${subtitleText !== '' ? ('flex') : ('none')}` }} ><h3>{subtitleText}</h3></Subtitles>
							{/* <Censor x={censorPosition[0]} y={censorPosition[1]} active={censorActive} wProp={censorPosition[2]} hProp={censorPosition[3]}><canvas></canvas></Censor> */}
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
					// handleCensorPosition={video.handleCensorPosition}
					// handleCensorActive={video.handleCensorActive}
				/>
				{
					url !== '' && showTranscript ? (
						//showsubtitles
						<PlayerSubtitlesContainer
							currentTime={progress.playedSeconds.toFixed(1)}
							duration={duration}
							handleShowSubtitle={handleShowSubtitle}
							indexToDisplay={indexToDisplay}
						/>
					) : (null)
				}

			</Style>
		)
	}
}