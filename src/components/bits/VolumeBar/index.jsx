import React from 'react'

import Style, { BarBall, BarCurrent, BarBackground } from './styles'

const Bar = props => {
	return (
		<Style volume={props.volume} muted={props.muted} onClick={props.handleClick}>
			<BarBackground volume={props.volume} muted={props.muted} />
			<BarCurrent volume={props.volume} muted={props.muted} />
			<BarBall volume={props.volume} muted={props.muted} />
		</Style>
	)
}

export default Bar
