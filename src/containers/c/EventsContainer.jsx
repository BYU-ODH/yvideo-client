import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Events } from 'components'

import { interfaceService } from 'services'

import { SkipEvent, MuteEvent, PauseEvent, CommentEvent, BlankEvent } from 'models/events/'

const EventsContainer = props => {

	// console.log('%c Event Container', 'color: orange; font-weight: bolder; font-size: 12px;')

	const {
		events,
		currentTime,
		duration,
		handleSeek,
		handleMute,
		handlePause,
		handleUnMute,
		handleBlank,
		handleShowComment,
		// handleCensorPosition,
		// handleCensorActive,
	} = props

	const [eventArray, setEventArray] = useState([])
	const [force, setForce] = useState(false)

	useEffect(() => {
		// console.log('reset')
		// after every re render we set blank to false and mute to false. We do this because blank does not update in the parent when we render this component.
		// If the blank or mute event is active the event will be executed.
		handleBlank(false)
		handleUnMute()
		// handleCensorActive(false)
		handleShowComment(``, {x: 0, y: 0})

		// We need to keep track of all the events. we need this code here so every time there is a change to the events we get those changes.
		const tempArray = []
		if(duration !== 0 && events !== undefined){
			events.forEach(event => {
				// Events time is in percentages so we can use that and figure out the exact seconds by doing time / 100 * videoLength.
				const start = event.start / 100 * duration
				const end = event.end / 100 * duration
				switch (event.type) {
				case `Skip`:
					tempArray.push(new SkipEvent(event.type, start, end))
					break
				case `Mute`:
					tempArray.push(new MuteEvent(event.type, start, end))
					break
				case `Pause`:
					tempArray.push(new PauseEvent(event.type, start, end))
					break
				case `Comment`:
					tempArray.push(new CommentEvent(event.type, start, end, event.comment, event.position))
					break
					// case 'Censor':
					// 		tempArray.push(new CensorEvent(event.type, start, end, event.position))
					// 	break;
				case `Blank`:
					tempArray.push(new BlankEvent(event.type, start, end))
					break
				default:
					break
				}
			})
		}
		setEventArray([...tempArray])
	}, [duration, events])

	eventArray.forEach(element => {
		// console.log(element)
		if(currentTime >= element.start && currentTime <= element.end && element.active !== true){
			element.active = true
			switch (element.type) {
			case `Skip`:
				handleSeek(null, element.end)
				break
			case `Mute`:
				handleMute()
				break
			case `Pause`:
				handlePause()
				break
			case `Comment`:
				// console.log(element)
				handleShowComment(element.comment, element.position)
				break
				// case 'Censor':
				// 		element.active = false
				// 		let value = Object.keys(element.position).find(time => time >= currentTime)
				// 		//let includes = Object.keys(element.position).includes(currentTime)

				// 		console.log('current Time', currentTime)
				// 		console.log('value', value)

				// 		handleCensorActive(true)
				// 		handleCensorPosition(element.position[value])

				// 	break;
			case `Blank`:
				console.log('should blank')
				handleBlank(true)
				break
			default:
				break
			}
		} else if ((currentTime > element.end || currentTime < element.start) && element.active !== false){
			element.active = false
			switch (element.type) {
			case `Mute`:
				handleUnMute()
				break
			case `Comment`:
				handleShowComment(``, {x: 0, y: 0})
				break
			case `Blank`:
				handleBlank(false)
				break
			default:
				break
			}
		}
		// else if (currentTime > element.end && element.type === 'Censor'){
		// 	handleCensorActive(false)
		// }
	})

	const viewstate = {
		currentTime,
		eventArray,
	}

	return <Events viewstate={viewstate}></Events>
}

const mapStateToProps = ({ interfaceStore }) => ({
	events: interfaceStore.events,
})

const mapDispatchToProps = {
	getEvents: interfaceService.getEvents,
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer)
