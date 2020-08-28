import React from 'react'

import { useDrag } from 'react-dnd'

import Style, { I } from './styles'
import captions from 'assets/captions.svg'

const SubtitlesCard = () => {

	const [{ isDragging }, ref] = useDrag({

		// REQUIRED
		item: {
			id: `subtitle`,
			type: `subtitle-event`,
		},

		// Use this if you need to do something here when the item is dropped
		// end: (item, monitor) => {
		// 	const dropResult = monitor.getDropResult()
		// 	if (item && dropResult) console.log(`You just dropped:`, item)
		// },

		// Updates the props you get in the array at the top
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})

	const opacity = isDragging ? 0.5 : 1

	return (
		<Style ref={ref} opacity={opacity} >
			<I src={captions}/>
			Add Subtitles
		</Style>
	)
}

export default SubtitlesCard
