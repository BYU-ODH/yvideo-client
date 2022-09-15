import React from 'react'
import Style, { BarBall, BarCurrent, BarBackground, BarClipYellow, BarSkippedGray } from './styles'

const Bar = props => {
	const { duration, skipArray, handleClick, clipPercent, active } = props

	return (
		<Style data-testid='bar' onClick={handleClick}>
			<BarBackground />
			<BarCurrent data-testid='time-bar-progress' id='time-bar-progress' />
			{clipPercent &&
				<BarClipYellow data-testid='yellow-bar' clipPercent={clipPercent} />
			}
			<BarBall id='time-dot' active={active} />
			{skipArray.map((skipEvent, index) => (
				<BarSkippedGray data-testid='gray-bar' id='gray-bar' key={index} start={skipEvent.start} end={skipEvent.end} duration={duration} />
			))}
		</Style>
	)
}

export default Bar
