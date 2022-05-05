import React from 'react'
import {useEffect, useState} from 'react'

import Style, { BarBall, BarCurrent, BarBackground, BarClip, BarSkippedGrey } from './styles'

const Bar = props => {
	const {events, duration} = props
	const [skipArray, setSkipArray] = useState([])
	useEffect(() => {
			if(events){
				const eventFilterSkip = events.filter((values)=> {
					return values.type == `Skip`
				})
				setSkipArray(eventFilterSkip)
		}
	}, [skipArray]);

	return (
		<Style position={props.position} active={props.active} onClick={props.handleClick}>
			<BarBackground position={props.position} active={props.active} />
			<BarCurrent id='timeBarProgress' position={props.position} active={props.active} />
			<BarClip clipTime={props.clipPercent} active={props.active} />
			<BarBall id='time-dot' position={props.position} active={props.active} />
			{skipArray.map((value) => (
				<BarSkippedGrey id='greybar' start={value.start} end={value.end} duration={duration} active={props.active} position={props.position} />
			))}
		</Style>
	)
}

export default Bar
