import React, { PureComponent } from 'react'

import { Style, PlayPause, Time, Visible, Volume } from './styles'

class Controls extends PureComponent {
	render() {
		const {
			playing,
			currentTime,
			totalTime,
		} = this.props.viewstate

		const {
			togglePlay,
		} = this.props.handlers

		// Because of the nature of the toFixed method, it will round the last digit after decimal
		let stringifiedTime = currentTime.toFixed(2)
		// Changes decimal of float to colon
		stringifiedTime = stringifiedTime.replace(`.`, `:`)

		return (
			// <Style>
			// 	{/* <PlayButton /> */}
			// 	{/* <PlayPause playing={playing} onClick={playing ? handlePause : handlePlay} /> */}
			// 	<PlayPause playing={playing} />
			// </Style>
			<Style playing={playing} >

				{/* <Scrubber progress={progress.played} active={hovering} handleClick={handleSeekChange} /> */}

				<div className='left'>
					<PlayPause playing={playing} onClick={togglePlay}/>
					{/* //TODO: Remove left and right divs */}
					<Time>
						{ stringifiedTime }
					</Time>
					{/* //TODO: Rename? and add onClick method*/}
					<Visible />
					{/* <Volume onClick={handleToggleMuted}/> */}
					{/* //TODO: Add on hover to pop up volume controls */}
					<Volume />
					{/* <VolumeScrubber volume={volume} muted={muted} handleClick={handleVolumeChange}/> */}
				</div>
			</Style>
		)
	}
}

export default Controls