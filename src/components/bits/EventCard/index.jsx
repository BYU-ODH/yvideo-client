import React from 'react'

import Style, { Img } from './styles'

const EventCard = ({ event }) => {
	return (
		<Style >
			<Img alt='icon' src={event.icon}/>
			{event.type === `Censor` ? `Blur` : event.type}
		</Style>
	)
}

export default EventCard
