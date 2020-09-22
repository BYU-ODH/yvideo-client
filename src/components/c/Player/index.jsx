import React, { PureComponent } from 'react'

import ReactPlayer from 'react-player'

import { CollectionsContainer, EventsContainer } from 'containers'
import { PlayerControls } from 'components/bits'

import { Controller } from 'components'

import { SubtitlesContainer } from 'containers'

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

		const mySub = [
			{
				start: '0',
				end:'16',
				text: "1"
			},
			{
				start: '16',
				end:'32',
				text: "2"
			},
			{
				start: '32',
				end:'48',
				text: "3"
			},
			{
				start: '48',
				end:'54',
				text: "4"
			},
			{
				start: '54',
				end:'70',
				text: "5"
			},
			{
				start: '70',
				end:'86',
				text: "6"
			},
		]

		//console.log('%c URL', 'font-size: 18px; color: green;', url)

		return (
			<Style>
				<div style={{ display: `${showTranscript !== false ? ('flex') : ('initial')}` }}>
					<div className='player-wrapper' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ flex: 1}}>
						<ReactPlayer
							ref={ref}
							className='react-player'
							width='100%'
							height='50vh'
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
							<Subtitles style={{ display: `${showTranscript !== false ? ('initial') : ('none')}` }} >{subtitleText}</Subtitles>
							{/* <Censor x={censorPosition[0]} y={censorPosition[1]} active={censorActive} wProp={censorPosition[2]} hProp={censorPosition[3]}><canvas></canvas></Censor> */}
						</Blank>
					</div>
					<Transcript style={{ display: `${showTranscript !== false ? ('initial') : ('none')}` }} displayTranscript={toggleTranscript}>
						<div className={'side-bar'}>
							<img src={chevron} className={'toggle-transcript'} onClick={e => setToggleTranscript(!toggleTranscript)}/>
						</div>
						<div className={'main-bar'}>
							<div className={'transcript-title'}>
								<h2>Transcript View - {content !== undefined ? (content.settings.targetLanguages) : (null)}</h2>
							</div>
							<div className={'transcript-content'}>
								{
									mySub.map((element, index) =>
										<div key={index} className={"transcript-row"} onClick={e => handleSeekChange(null, element.start.split(':').reduce((acc,time) => (60 * acc) + +time))}>
											<p>{element.text}</p>
										</div>
									)
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
				></EventsContainer>
				{/* subtitle container ? */}
				<SubtitlesContainer 
					currentTime={progress.playedSeconds.toFixed(1)} 
					duration={duration}
					handleShowSubtitle={handleShowSubtitle}
					mySubs={mySub}
				>
				</SubtitlesContainer>
			
			</Style>
		)
	}	
}