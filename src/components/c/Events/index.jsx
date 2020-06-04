import React from 'react'

import Style from './styles'


const Events = props => {

	const {currentTime, eventClassArray} = props.viewstate

	//console.log(eventClassArray)

	// const currentEvents = eventClassArray.filter(event => event.active === true)

	return (
		<>
			{/* <p>currentTime: {currentTime}</p>
			<ul>currentEvent: {
				currentEvents.map((event, index) => (
					<li key={index}>{event.name}</li>
				))
			}</ul> */}
		</>
	)
}

export default Events
