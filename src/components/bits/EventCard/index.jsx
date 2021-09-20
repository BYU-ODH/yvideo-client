import React from 'react'

import Style, { I } from './styles'

const EventCard = ({ event }) => {
	return (
		<Style >
			<I src={event.icon}/>
			{event.type}
		</Style>
	)
}

export default EventCard
