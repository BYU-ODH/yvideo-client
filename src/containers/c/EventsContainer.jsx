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
		handleUnMute,
	} = props

	const newArray = []
	const [eventClassArray, setEventClassArray] = useState(newArray)

	useEffect(() => {
		//We need to keep track of all the events. we need this code here so every time there is a change to the events we get those changes.
		console.log('use effect')
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

					default:
						break;
				}
			});
		}
		setEventClassArray(tempArray)
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
							element.print()
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
							element.print()
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

// const mapDispatchToProps = {
// 	events: interfaceService.events
// }

export default connect(mapStateToProps)(EventsContainer)
