import React, {useState, useEffect} from 'react'

import StartEndTimeConfirm from '../components/StartEndTImeConfirm'

const StartEndTimeContainer = props => {

	const {
		e,
	  type,
	} = props

	const handleEventBeginTimeChangeByButton = (e, type) => {
		// document.getElementById(`sideTabMessage`).style.color=`red`
		const currentEvent = event
		const layer = currentEvent.layer
		const formattedTime = secondsToTime(videoCurrentTime)
		setCurrentTime(formattedTime)

			currentEvent.start = videoCurrentTime
			setEvent(currentEvent)
			// updateEvents(index, currentEvent, layer, `end`)
			editEvent(`beg`, currentEvent.start, null, layer, index, type)
	}

	const handleEventEndTimeChangeByButton = (e, type) => {
		// document.getElementById(`sideTabMessage`).style.color=`red`
		const currentEvent = event
		const layer = currentEvent.layer
		const formattedTime = secondsToTime(videoCurrentTime)
		setCurrentTime(formattedTime)
			currentEvent.end = videoCurrentTime
			setEvent(currentEvent)
			// editEvent(index, currentEvent, layer, `beg`)
			editEvent(`end`, currentEvent.end, null, layer, index, type)
	}
}
