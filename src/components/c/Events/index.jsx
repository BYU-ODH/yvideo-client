import React from 'react'

import Style from './styles'

const Events = props => {

	const {currentTime, eventClassArray} = props.viewstate

	return (
		<>
			<p style={{visibility: `hidden`}}>{currentTime}{JSON.stringify(eventClassArray)}</p>
		</>
	)
}

export default Events
