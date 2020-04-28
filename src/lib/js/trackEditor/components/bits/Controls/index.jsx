import React, { PureComponent } from 'react'

import { Style, PlayPause, Time, Visible, Volume } from './styles'

/* Used for converting time into a duration object and making it easier to display/work with
https://moment.github.io/luxon/index.html
*/
import Duration from 'luxon/src/duration.js'

class Controls extends PureComponent {
	render() {
		const {
			playing,
			muted,
			currentTime,
			totalTime,
		} = this.props.viewstate

		const {
			togglePlay,
			toggleMuted,
		} = this.props.handlers

		// Because of the nature of the toFixed method, it will round the last digit after decimal
		// let stringifiedTime = currentTime.toFixed(2)
		// Changes decimal of float to colon
		// stringifiedTime = stringifiedTime.replace(`.`, `:`)
		// console.log(`Playing: `, playing)
		// TODO: Might want to consider moving this into ./utils if it's going to be used elsewhere
		const timeDurationString = function() {
			// Does not work if time duration is longer than 24 hours
			// console.log(`Current Time: `, currentTime)
			const duration = Duration.fromObject({seconds: currentTime})
			// console.log(`Seconds: `, duration.as(`seconds`))
			// console.log(`Minutes: `, duration.as(`minutes`))
			// console.log(`Hours: `, duration.as(`hours`))
			// console.log(`Converted time: `, duration.toFormat(`hh:mm:ss`))

			if (duration.as(`hours`) < 1) return duration.toFormat(`mm:ss`)
			else return duration.toFormat(`hh:mm:ss`)
		}

		return (
		// <Style>
		// 	{/* <PlayButton /> */}
		// 	{/* <PlayPause playing={playing} onClick={playing ? handlePause : handlePlay} /> */}
		// 	<PlayPause playing={playing} />
		// </Style>

			<Style playing={playing} >

				{/* <Scrubber progress={progress.played} active={hovering} handleClick={handleSeekChange} /> */}

				<div className='left'>
					<PlayPause playing={playing} onClick={() => togglePlay(!playing)}/>

					<Time>
						{ timeDurationString() }
					</Time>
					{/* //TODO: Rename? and add onClick method*/}
					<Visible />
					{/* <Volume onClick={handleToggleMuted}/> */}
					{/* //TODO: Add on hover to pop up volume controls */}
					<Volume muted={muted} onClick={() => toggleMuted(!muted)} />
					{/* <VolumeScrubber volume={volume} muted={muted} handleClick={handleVolumeChange}/> */}
				</div>
			</Style>
		)
	}
}

export default Controls