import React, { PureComponent } from 'react'

import ReactPlayer from 'react-player'

import { CollectionsContainer, EventsContainer } from 'containers'
import { PlayerControls } from 'components/bits'

import { Controller } from 'components'

import { PlayerSubtitlesContainer } from 'containers'

import Style, { Blank, Comment, Transcript, Subtitles } from './styles'

import chevron from 'assets/te-chevron-left.svg'

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
			setToggleTranscript,
			handleShowSubtitle,
		} = this.props.handlers

		// console.log('%c Player component', 'color:red;')

		return (
			<Style>
				<div style={{ display: `${showTranscript !== false ? ('flex') : ('initial')}`, height: '100%'}}>
					<div className='player-wrapper' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ flex: 1}}>
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
					<Transcript style={{ display: `${showTranscript !== false ? ('initial') : ('none')}` }} displayTranscript={toggleTranscript}>
						<div className={'side-bar'}>
							<img src={chevron} className={'toggle-transcript'} onClick={e => setToggleTranscript(!toggleTranscript)}/>
						</div>
						<div className={'main-bar'}>
							<div className={'transcript-title'}>
								<h2>Video Audio - {content !== undefined ? (content.settings.targetLanguages) : (null)}</h2>
								<h2>Caption Language - {displaySubtitles !== null ? (displaySubtitles.language) : (null)}</h2>
							</div>
							<div className={'transcript-content'}>
								{	displaySubtitles != null ? (

									displaySubtitles['content'].map((element, index) =>
											<div className={`transcript-row ${subtitleText === element.text ? ('active-sub') : ('') }`}
												key={index}
												onClick={e => handleSeekChange(null, (element.start * duration / 100) + .5)}
												>
												<p>{element.text}</p>
											</div>
										)
									) : (null)
								}
								<br/>
							</div>
						</div>
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