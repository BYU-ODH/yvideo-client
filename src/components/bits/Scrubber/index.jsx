import React from 'react'

import { Bar } from 'components/bits'

import Style from './styles'

const Scrubber = props => {
	return (
		<Style>
			<Bar duration={props.duration} events={props.events} clipTime={props.clipTime} clipPercent={props.clipPercent} position={props.progress} active={props.active} handleClick={props.handleClick} skipArray={props.skipArray}/>
		</Style>
	)
}

export default Scrubber
