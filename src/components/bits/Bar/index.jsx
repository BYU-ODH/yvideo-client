import React from 'react'
import Style, { BarBall, BarCurrent, BarBackground, BarClipYellow, BarSkippedGray, BarBeforeClip } from './styles'

const Bar = props => {
	const { duration, skipArray, handleClick, clipPercent, active, isClip} = props

	return (
		<Style data-testid='bar' onClick={handleClick}>
			<BarBackground isClip={isClip}/>
			{clipPercent &&
				<BarClipYellow data-testid='yellow-bar' clipPercent={clipPercent} />
			}
			<BarCurrent data-testid='time-bar-progress' id='time-bar-progress' clipPercent={clipPercent}/>
			<BarBall id='time-dot' active={active} />
			{skipArray.map((skipEvent, index) => (
				<BarSkippedGray data-testid='gray-bar' id='gray-bar' key={index} start={skipEvent.start} end={skipEvent.end} duration={duration} />
			))}
			{isClip &&
				<BarBeforeClip id='grey-bar-before-clip' isClip={isClip} clipPercent={clipPercent}/>
			}
		</Style>
	)
}

export default Bar
