import React from 'react'

import Style, { BarBall, BarCurrent, BarBackground } from './styles'

const Bar = props => {
	return (
		<Style position={props.position} active={props.active} onClick={props.handleClick}>
			<BarBackground position={props.position} active={props.active} />
			<BarCurrent position={props.position} active={props.active} />
			<BarBall position={props.position} active={props.active} />
		</Style>
	)
}

export default Bar
