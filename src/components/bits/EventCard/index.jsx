import React from 'react'

import { useDrag } from 'react-dnd'

import Style, { I } from './styles'

const EventCard = ({ event }) => {

	const [{ isDragging }, ref] = useDrag({


		// REQUIRED
		item: {
			id: event.type,
			type: `timeline-event`,
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
	console.log("isDragging")
	console.log(isDragging)

	const opacity = isDragging ? 0.5 : 1

	return (
		<Style ref={ref} opacity={opacity} >
			<I src={event.icon}/>
			{event.type}
		</Style>
	)
}

export default EventCard
