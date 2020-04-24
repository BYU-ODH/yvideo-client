import React, { PureComponent } from 'react'

import ReactPlayer from 'react-player'

import { Caption } from './../..'

import Style from './styles'

export default class Player extends PureComponent {

	render() {

		const {
			ref,
			url, // TODO: Add
			playing,
			playbackRate,
			volume,
			muted,
		} = this.props.viewstate

		const {
			// handleDuration,
			// handleMouseOut,
			// handleMouseOver,
			// handlePause,
			// handlePlay,
			// handleProgress,

			togglePlay,
			handleSetPlayerRef,
			handleTotalTimeChange,
			handleCurrentTimeChange,
		} = this.props.handlers

		return (
			<Style>
				{/* // onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} */}
				<div className='player-wrapper'>
					<ReactPlayer
						ref={(ref) => handleSetPlayerRef(ref)}
						className='react-player'
						// config={{
						// 	youtube: {
						// 		playerVars: { showInfo: 0, controls: 0, modestbranding: 1},
						// 	},
						// }}
						config={{
							youtube: {
								playerVars: { modestbranding: 1, controls: 0, rel: 0, enablejsapi:1 },
								preload: true,
							},
						}}
						width='100%'
						height='100%'
						// TODO: Change to be dynamic
						url={`https://www.youtube.com/watch?v=klWwZxQe-ps`}
						playing={playing}
						controls={false}
						playbackRate={playbackRate}
						volume={volume}
						muted={muted}
						onReady={() => console.log(`onReady`)}
						onStart={() => console.log(`onStart`)}
						// Might want to
						onPlay={() => togglePlay(true)}
						onPause={() => togglePlay(false)}
						onBuffer={() => console.log(`onBuffer`)}
						onSeek={e => console.log(`onSeek`, e)}
						onError={e => console.log(`onError`, e)}
						progressInterval={100}
						onProgress={(progress) => handleCurrentTimeChange(progress.playedSeconds)} // handleProgress //handleCurrentTimeChange(progress * 100
						onDuration={(duration) => handleTotalTimeChange(duration)} // TODO: Might want to switch back to seconds (React Player uses seconds) we are converting to milliseconds
					/>
					<Caption />
				</div>
			</Style>
		)
	}
}