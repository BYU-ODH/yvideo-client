import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Events } from 'components'

import { interfaceService } from 'services'

import { SkipEvent, MuteEvent, PauseEvent, CommentEvent, CensorEvent, BlankEvent } from 'models/events/'

const EventsContainer = props => {

	console.log('%c Event Container', 'color: orange; font-weight: bolder; font-size: 12px;')

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
	} = props

	const newArray = []
	//const [allEvents, setAllEvents] = useState(events)
	const [eventClassArray, setEventClassArray] = useState(newArray)

	useEffect(() => {
		//We need to keep track of all the events. we need this code here so every time there is a change to the events we get those changes.
		// let newEvents = getEvents()
		// console.log('new events', newEvents)
	 	console.log('use effect')

		handleBlank(false)
		handleUnMute()
		let tempArray =[]
		if(duration !== 0){
			events.forEach(event => {
				// debugger;
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
							tempArray.push(new CommentEvent(event.type, start, end))
						break;
					case 'Censor':
							tempArray.push(new CensorEvent(event.type, start, end))
						break;
					case 'Blank':
							tempArray.push(new BlankEvent(event.type, start, end))
						break;
					default:
						break;
				}
			});
		}
		setEventClassArray(tempArray)
		//setAllEvents(newEvents)
	}, [duration, events])

	eventClassArray.forEach(element => {
			if((currentTime >= element.start && currentTime <= element.end) && element.active === false){

				console.log(element)
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
							element.print()
						break;
					case 'Censor':
							element.print()
						break;
					case 'Blank':
							handleBlank(true)
						break;
					default:
						break;
				}
				/*
					if(element.type === 'Skip'){
						handleSeek(null, element.end)
						return;
					}
					else if(element.type === 'Mute'){
						handleMute()
						return;
					}
					else if(element.type === 'Pause'){
						handlePause()
						console.log(element.end, element.start)
						setTimeout(() => {
							handlePlay()
						}, (element.end - element.start) * 1000);
					}
					else {
						element.print()
					}
				*/
				//COMPLETE FOR ALL OTHER EVENTS
			}
			else if (currentTime > element.end && element.active === true){
				//stop event

				element.active = false
				switch (element.type) {
					case 'Mute':
							handleUnMute()
						break;
					case 'Comment':
							element.print()
						break;
					case 'Censor':
							element.print()
						break;
					case 'Blank':
							handleBlank(false)
						break;
					default:
						break;
				}
				/*
					if(element.type === 'Mute'){
						handleUnMute()
					}
					else if(element.type === 'Pause'){
						element.print()
					}
				*/
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

const mapDispatchToProps = {
 	getEvents: interfaceService.getEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer)
