import React from 'react'

import { Bar } from 'components/bits'

import Style from './styles'

const Scrubber = props => {

	const {
		duration,
		clipTime,
		clipPercent,
		progress,
		active,
		handleClick,
		skipArray,
		isClip,
	} = props

	return (
		<Style data-testid='scrubber'>
			<Bar duration={duration} clipTime={clipTime} clipPercent={clipPercent} position={progress} active={active} handleClick={handleClick} skipArray={skipArray} isClip={isClip}/>
		</Style>
	)
}

export default Scrubber
