import React from 'react'

import Style from './styles'

const PlayerControls = props => {

	const {
		duration,
		progress,
		volume,
		muted,
	} = props.viewstate

	const {
		handlePause,
		handlePlay,
		handlePlaybackRateChange,
		handleSeekChange,
		handleSeekMouseDown,
		handleSeekMouseUp,
		handleToggleFullscreen,
		handleToggleMuted,
		handleVolumeChange,
	} = props.handlers

	return (
		<Style>

		</Style>
	)

}

export default PlayerControls
