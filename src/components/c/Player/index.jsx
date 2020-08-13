import React, { PureComponent } from 'react'

import ReactPlayer from 'react-player'

import { CollectionsContainer, EventsContainer } from 'containers'
import { PlayerControls } from 'components/bits'

import { Controller } from 'components'

import Style, { Blank, Comment } from './styles'

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
		} = this.props.handlers

		//console.log('%c URL', 'font-size: 18px; color: green;', url)

		return (
			<Style>
				<div className='player-wrapper' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
					<ReactPlayer
						ref={ref}
						className='react-player'
						width='100%'
						height='50rem'
						url={url}
						playing={playing}
						controls={false}
						playbackRate={playbackRate}
						volume={volume}
						muted={muted}
						// onReady={() => console.log(`onReady`)}
						// onStart={() => console.log(`onStart`)}
						onPlay={handlePlay}
						onPause={handlePause}
						// onBuffer={() => console.log(`onBuffer`)}
						// onSeek={e => console.log(`onSeek`, e)}
						// onError={e => console.log(`onError`, e)}
						progressInterval={100}
						onProgress={handleProgress}
						onDuration={handleDuration}
					/>
					<PlayerControls viewstate={this.props.viewstate} handlers={this.props.handlers} />
					<Blank blank={blank} id='blank' onContextMenu={e => e.preventDefault()}>
						<Comment commentX={commentPosition.x} commentY={commentPosition.y}>{videoComment}</Comment>
						{/* <Censor x={censorPosition[0]} y={censorPosition[1]} active={censorActive} wProp={censorPosition[2]} hProp={censorPosition[3]}><canvas></canvas></Censor> */}
					</Blank>
				</div>
				<div className={`collection-container`}>
					<CollectionsContainer/>
				</div>
				<EventsContainer currentTime={progress.playedSeconds.toFixed(1)} duration={duration}
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
			</Style>
		)
	}
}