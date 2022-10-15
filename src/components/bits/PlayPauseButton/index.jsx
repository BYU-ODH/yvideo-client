import React from 'react'

import Wrapper, { PlayPause } from './styles'

const PlayPauseButton = props => {

	const {
		playing,
		handlePause,
		handlePlay,
		mouseOn,
	} = props

	return (
		<Wrapper mouseOn={mouseOn}>
			<PlayPause playing={playing} onClick={playing === true ? handlePause : handlePlay}/>
		</Wrapper>
	)
}

export default PlayPauseButton