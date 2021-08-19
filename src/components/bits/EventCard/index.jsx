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

		// Updates the props you get in the array at the top
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),

	})

	const opacity = isDragging ? 0.5 : 1

	return (
		<Style ref={ref} opacity={opacity} >
			<I src={event.icon}/>
			{event.type}
		</Style>
	)
}

export default EventCard
