import React from 'react'

import { Bar } from 'components/bits'

import Style from './styles'

const Scrubber = props => {
	return (
		<Style>
			<Bar position={props.progress} active={props.active} />
		</Style>
	)
}

export default Scrubber
