import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Events } from 'components'

import { interfaceService } from 'services'

import { SkipEvent, MuteEvent, PauseEvent, CommentEvent, CensorEvent } from 'models/events/'

const EventsContainer = props => {
	const {
		events,
		currentTime,
		duration,
		video,
		handleSeek,
		handleMute,
		handlePlay,
		handlePause,
		toggleMute,
	} = props

	const newArray = []
	const [eventClassArray, setEventClassArray] = useState(newArray)

	useEffect(() => {
		//console.log('updated events')
		let tempArray =[]
		if(duration !== 0){
			events.forEach(event => {
				// debugger;
				let start = (event.beginningTime / 100) * duration
				let end = (event.endTime / 100) * duration
				switch (event.name) {
					case 'Skip':
							tempArray.push(new SkipEvent(event.name, start, end))
						break;
					case 'Mute':
							tempArray.push(new MuteEvent(event.name, start, end))
						break;
					case 'Pause':
							tempArray.push(new PauseEvent(event.name, start, end))
						break;
					case 'Comment':
							tempArray.push(new CommentEvent(event.name, start, end))
						break;
					case 'Censor':
							tempArray.push(new CensorEvent(event.name, start, end))
						break;

					default:
						break;
				}
			});
		}
		setEventClassArray(tempArray)
	}, [duration, events])

	eventClassArray.forEach(element => {
			if((currentTime >= element.start && currentTime <= element.end) && element.active === false){
				element.active = true
				if(element.name === 'Skip'){
					handleSeek(null, element.end)
					return;
				}
				else if(element.name === 'Mute'){
					handleMute()
					return;
				}
				else if(element.name === 'Pause'){
					handlePause()
					//console.log(element.end * 1000, element.end)
					setTimeout(() => {
						handlePlay()
					}, (element.end - element.start) * 1000);
				}
				else {
					element.print()
				}
				//COMPLETE FOR ALL OTHER EVENTS
			}
			else if (currentTime > element.end && element.active === true){
				//stop event
				element.active = false
				if(element.name === 'Mute'){
					toggleMute()
				}
				else if(element.name === 'Pause'){
					handlePlay()
				}
				//COMPLETE FOR ALL OTHER EVENTS
			}
	});

	const viewstate = {
		currentTime,
		eventClassArray,
	}

	return <Events viewstate={viewstate}></Events>
}

const mapStateToProps = ({ interfaceStore }) => ({
	events: interfaceStore.events
})

// const mapDispatchToProps = {
// 	events: interfaceService.events
// }

export default connect(mapStateToProps)(EventsContainer)
