import React from 'react'

import Style, { BarBall, BarCurrent, BarBackground, BarClip } from './styles'

const Bar = props => {
	return (
		<Style position={props.position} active={props.active} onClick={props.handleClick}>
			<BarBackground position={props.position} active={props.active} />
			<BarCurrent id='timeBarProgress' position={props.position} active={props.active} />
			<BarClip clipTime={props.clipPercent} active={props.active} />
			<BarBall id='time-dot' position={props.position} active={props.active} />
		</Style>
	)
}

export default Bar
