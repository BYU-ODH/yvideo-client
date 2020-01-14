import React from 'react'

import Style, { BarBall, BarCurrent, BarBackground } from './styles'

const Bar = props => {

	const clickHandler = e => {
		// https://stackoverflow.com/questions/16154857/how-can-i-get-the-mouse-coordinates-relative-to-a-parent-div-javascript
		// props.changePosition(x)
	}

	return (
		<Style position={props.position} active={props.active} >
			<BarBackground position={props.position} active={props.active} />
			<BarCurrent position={props.position} active={props.active} />
			<BarBall position={props.position} active={props.active} />
		</Style>
	)
}

export default Bar
