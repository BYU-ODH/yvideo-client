import React from 'react'

import { Bar } from 'components/bits'

import Style from './styles'

const Scrubber = props => {
	return (
		<Style data-testid='scrubber'>
			<Bar duration={props.duration} clipTime={props.clipTime} clipPercent={props.clipPercent} position={props.progress} active={props.active} handleClick={props.handleClick} skipArray={props.skipArray} isClip={props.isClip}/>
		</Style>
	)
}

export default Scrubber
