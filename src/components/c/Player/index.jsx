import React, { Component } from 'react'

import ReactPlayer from 'react-player'

import { CollectionsContainer } from 'containers'
import { PlayerControls } from 'components/bits'

import Style from './styles'
// import 'yvideojs/css/player.css'

export default class Player extends Component {

	render() {
		const {
			ref,
			url,
			playing,
			playbackRate,
			volume,
			muted,
		} = this.props.viewstate

		const {
			handleDuration,
			handlePause,
			handlePlay,
			handleProgress,
		} = this.props.handlers

		return (
			<Style>
				<div className='player-wrapper'>
					<ReactPlayer
						ref={ref}
						className='react-player'
						width='100%'
						height='100%'
						url={url}
						playing={playing}
						controls={false}
						playbackRate={playbackRate}
						volume={volume}
						muted={muted}
						onReady={() => console.log(`onReady`)}
						onStart={() => console.log(`onStart`)}
						onPlay={handlePlay}
						onPause={handlePause}
						onBuffer={() => console.log(`onBuffer`)}
						onSeek={e => console.log(`onSeek`, e)}
						onError={e => console.log(`onError`, e)}
						onProgress={handleProgress}
						onDuration={handleDuration}
					/>
					<PlayerControls viewstate={this.props.viewstate} handlers={this.props.handlers} />
				</div>
				<CollectionsContainer />
			</Style>
		)
	}
}