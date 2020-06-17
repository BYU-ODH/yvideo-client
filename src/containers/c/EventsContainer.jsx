import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Events } from 'components'

import { interfaceService } from 'services'

import { SkipEvent, MuteEvent, PauseEvent, CommentEvent, CensorEvent, BlankEvent } from 'models/events/'

const EventsContainer = props => {

	//console.log('%c Event Container', 'color: orange; font-weight: bolder; font-size: 12px;')

	const {
		events,
		currentTime,
		duration,
		video,
		handleSeek,
		handleMute,
		handlePlay,
		handlePause,
		handleUnMute,
		handleBlank,
		handleShowComment,
		handleCensorPosition,
		handleCensorActive,
	} = props

	const [eventArray, setEventArray] = useState([])

	useEffect(() => {
		//SORT array from start to end
		let sortedArray = events //events.sort((a, b) => (a.start > b.start) ? 1 : -1)
		//after every re render we set blank to false and mute to false. We do this because blank does not update in the parent when we render this component.
		//If the blank or mute event is active the event will be executed.
		handleBlank(false)
		handleUnMute()
		handleCensorActive(false)
		handleShowComment('')

		//We need to keep track of all the events. we need this code here so every time there is a change to the events we get those changes.
		let tempArray =[]
		if(duration !== 0){
			sortedArray.forEach(event => {
				// Events time is in percentages so we can use that and figure out the exact seconds by doing time / 100 * videoLength.
				let start = (event.start / 100) * duration
				let end = (event.end / 100) * duration
				switch (event.type) {
					case 'Skip':
							tempArray.push(new SkipEvent(event.type, start, end))
						break;
					case 'Mute':
							tempArray.push(new MuteEvent(event.type, start, end))
						break;
					case 'Pause':
							tempArray.push(new PauseEvent(event.type, start, end))
						break;
					case 'Comment':
							tempArray.push(new CommentEvent(event.type, start, end, event.comment))
						break;
					case 'Censor':
							tempArray.push(new CensorEvent(event.type, start, end, event.position))
						break;
					case 'Blank':
							tempArray.push(new BlankEvent(event.type, start, end))
						break;
					default:
						break;
				}
			});
		}
		setEventArray(tempArray)
	}, [duration, events])

	eventArray.forEach(element => {
			if((currentTime >= element.start && currentTime <= element.end) && element.active === false){
				element.active = true
				switch (element.type) {
					case 'Skip':
							handleSeek(null, element.end)
						break;
					case 'Mute':
							handleMute()
						break;
					case 'Pause':
							handlePause()
						break;
					case 'Comment':
							handleShowComment(element.comment)
						break;
					case 'Censor':
							element.active = false
							let roundNumber = Math.round(currentTime)
							//console.log(roundNumber)
							handleCensorActive(true)
							handleCensorPosition(element.position[roundNumber])
						break;
					case 'Blank':
							handleBlank(true)
						break;
					default:
						break;
				}
			}
			else if (currentTime > element.end && element.active === true){
				element.active = false
				switch (element.type) {
					case 'Mute':
							handleUnMute()
						break;
					case 'Comment':
							handleShowComment('')
						break;
					case 'Blank':
							handleBlank(false)
						break;
					default:
						break;
				}
			}
			else if (currentTime > element.end && element.type === 'Censor'){
				handleCensorActive(false)
			}
	});

	const viewstate = {
		currentTime,
		eventArray,
	}

	return <Events viewstate={viewstate}></Events>
}

const mapStateToProps = ({ interfaceStore }) => ({
	events: interfaceStore.events
})

const mapDispatchToProps = {
 	getEvents: interfaceService.getEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer)
