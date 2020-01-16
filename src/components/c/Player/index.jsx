import React, { PureComponent } from 'react'

import ReactPlayer from 'react-player'

import { CollectionsContainer } from 'containers'
import { PlayerControls } from 'components/bits'

import Style from './styles'

export default class Player extends PureComponent {

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
			handleMouseOut,
			handleMouseOver,
			handlePause,
			handlePlay,
			handleProgress,
		} = this.props.handlers

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
						onReady={() => console.log(`onReady`)}
						onStart={() => console.log(`onStart`)}
						onPlay={handlePlay}
						onPause={handlePause}
						onBuffer={() => console.log(`onBuffer`)}
						onSeek={e => console.log(`onSeek`, e)}
						onError={e => console.log(`onError`, e)}
						progressInterval={100}
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