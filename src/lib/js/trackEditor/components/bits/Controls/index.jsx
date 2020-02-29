import React, { PureComponent } from 'react'

import { Style, PlayPause, Time } from './styles'

class Controls extends PureComponent {
	render() {
		const {
			playing,
			time,
		} = this.props.viewstate

		const {
			togglePlay,
		} = this.props.handlers

		let stringifiedTime = time.toFixed(2)
		// Changes decimal of float to colon
		stringifiedTime = stringifiedTime.replace(`.`, ` : `)

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
					<Time>
						{ stringifiedTime }
					</Time>
					{/* <Volume onClick={handleToggleMuted}/> */}
					{/* <VolumeScrubber volume={volume} muted={muted} handleClick={handleVolumeChange}/> */}
				</div>
				<div className='right'>
					{/* <Fullscreen fullscreen={fullscreen} onClick={handleToggleFullscreen} /> */}
					{/* <SideBarToggle /> */}
					{/* <Speed /> */}
					{/* <ClosedCaptions /> */}
					{/* <Notes /> */}
				</div>
			</Style>
		)
	}
}

export default Controls