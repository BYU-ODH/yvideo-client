import React from 'react'
import Style, { BarBall, BarCurrent, BarBackground, BarClipYellow, BarSkippedGray } from './styles'

const Bar = props => {
	const { duration, skipArray } = props

	return (
		<Style data-testid='bar' onClick={props.handleClick}>
			<BarBackground />
			<BarCurrent data-testid='timeBarProgress' id='timeBarProgress' />
			{props.clipPercent &&
				<BarClipYellow data-testid='yellow-bar' clipPercent={props.clipPercent} />
			}
			<BarBall id='time-dot' active={props.active} />
			{skipArray.map((skipEvent, index) => (
				<BarSkippedGray data-testid='gray-bar' id='gray-bar' key={index} start={skipEvent.start} end={skipEvent.end} duration={duration} />
			))}
		</Style>
	)
}

export default Bar
