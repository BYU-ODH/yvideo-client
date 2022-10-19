import React from 'react'
import Style, { BarBall, BarCurrent, BarBackground } from './styles'

const BarPreview = props => {
	const {clipPercent, active} = props.viewstate
	const {handleSeekChange} = props.handlers
	return (
		<Style data-testid='bar' onClick={handleSeekChange}>
			<BarBackground/>
			<BarCurrent data-testid='time-bar-progress' id='time-bar-progress' clipPercent={clipPercent} />
			<BarBall id='time-dot' active={active} />
		</Style>
	)
}

export default BarPreview