import React from 'react'

import Style, { BarBall, BarCurrent, BarBackground, BarClip, BarSkippedGrey } from './styles'

const Bar = props => {
	const { duration, skipArray } = props

	// useEffect(() => {
	// 		// if(events){
	// 		// 	const eventFilterSkip = events.filter((values) => {
	// 		// 		return values.type == `Skip`
	// 		// 	})
	// 		// 	setSkipArray(eventFilterSkip)
	// 		// }
	// 		handleOnReady();
	// }, [skipArray, events]);
	// console.log(skipArray)
	return (
		<Style position={props.position} active={props.active} onClick={props.handleClick}>
			<BarBackground position={props.position} active={props.active} />
			<BarCurrent id='timeBarProgress' position={props.position} active={props.active} />
			<BarClip clipTime={props.clipPercent} active={props.active} />
			<BarBall id='time-dot' position={props.position} active={props.active} />
			{skipArray.map((value, index) => (
				<BarSkippedGrey id='greybar' key={index} start={value.start} end={value.end} duration={duration} active={props.active} position={props.position} />
			))}
		</Style>
	)
}

export default Bar
