import React from 'react'

import { VolumeBar } from 'components/bits'

import Style from './styles'

const Scrubber = props => {
	return (
		<Style>
			<VolumeBar volume={props.volume} muted={props.muted} handleClick={props.handleClick} />
		</Style>
	)
}

export default Scrubber
