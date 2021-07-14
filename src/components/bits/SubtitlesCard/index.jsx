import React from 'react'

import { useDrag } from 'react-dnd'

import Style, { I } from './styles'
import captions from 'assets/captions.svg'

const SubtitlesCard = (props) => {

	const { title } = props
	return (
		<Style>
			<I src={captions}/>
			{title}
		</Style>
	)
}

export default SubtitlesCard
