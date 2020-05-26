import React, { useState, useEffect } from 'react'

import Style, { Timeline, EventList, EventListCarat, HandleIcon, NewLayer, Icon, SideEditor } from './styles'

import { EventCard } from 'components/bits'

import { TrackLayer } from 'components'

import skipIcon from 'Assets/event_skip.svg'
import muteIcon from 'Assets/event_mute.svg'
import pauseIcon from 'Assets/event_pause.svg'
import commentIcon from 'Assets/event_comment.svg'
import censorIcon from 'Assets/event_censor.svg'

import carat from 'assets/carat_white.svg'

import plus from 'assets/plus-white.svg'

import play from 'assets/controls_play.svg'
import pause from 'assets/controls_pause.svg'
import mute from 'assets/controls_unmuted.svg'
import unmute from 'assets/controls_muted.svg'

const TrackEditor = props => {

	const {

		// state

		playing,
		// volume,
		muted,
		played, // percentage elapsed
		// duration,
		elapsed, // seconds elapsed
		// playbackRate,

		// events

		//selectedEvent,
		// setSelectedEvent,

		// handlers

		toggleMute,
		// setVolume,
		// handleReady,
		// handleProgress,
		// handleDuration,
		// handlePlaybackRate,
		handleSeek,
		handlePause,
		handlePlay,

		// handleZoomFactor,

	} = props.video

	const events = [
		{
			name: `Skip`,
			icon: skipIcon,
			beginningTime: 0,
			endTime: 10,
			layer: 0
		},
		{
			name: `Mute`,
			icon: muteIcon,
			beginningTime: 0,
			endTime: 10,
			layer: 0
		},
		{
			name: `Pause`,
			icon: pauseIcon,
			beginningTime: 0,
			endTime: 10,
			layer: 0
		},
		{
			name: `Comment`,
			icon: commentIcon,
			beginningTime: 0,
			endTime: 10,
			layer: 0
		},
		{
			name: `Censor`,
			icon: censorIcon,
			beginningTime: 0,
			endTime: 10,
			layer: 0
		},
	]

	const eventsArray = [{
			name: `Skip`,
			icon: skipIcon,
			beginningTime: 0,
			endTime: 10,
			layer: 0
		},
		// {
		// 	name: `Mute`,
		// 	icon: skipIcon,
		// 	beginningTime: 0,
		// 	endTime: 10,
		// 	layer: 2
		// },
		// {
		// 	name: `Mute`,
		// 	icon: skipIcon,
		// 	beginningTime: 0,
		// 	endTime: 10,
		// 	layer: 2
		// },
		// {
		// 	name: `Pause`,
		// 	icon: skipIcon,
		// 	beginningTime: 0,
		// 	endTime: 10,
		// 	layer: 0
		// },
	] // THIS IS GOING TO HAVE EVENTS

	//SORTING THE ARRAYS TO HAVE A BETTER WAY TO HANDLE THE EVENTS
	eventsArray.sort((a, b) => (a.layer > b.layer) ? 1 : -1)

	//POPULATE INITIAL LAYERS BASED ON EVENTSARRAY INITIAL IS EMPTY
	const initialLayers = []
	for(let i = 0; i < eventsArray.length; i++){
		let index = eventsArray[i].layer
		if(initialLayers[index] === undefined){
			initialLayers.push([eventsArray[i]])
		}
		else {
			initialLayers[index].push(eventsArray[i])
		}
	}

	const [allEvents, setAllEvents] = useState(eventsArray)
	const [layers, setLayers] = useState(initialLayers)
	const [shouldUpdate, setShouldUpdate] = useState(false)
	const [showSideEditor, setSideEditor] = useState(false)
	const [eventToEdit, setEventToEdit] = useState({})

	const [tab, setTab] = useState(`events`)
	const [timelineMinimized, setTimelineMinimized] = useState(false)
	const [eventListMinimized, setEventListMinimized] = useState(false)
	// TODO: Replace with dynamic data from server

	const dateElapsed = new Date(null)
	dateElapsed.setSeconds(elapsed)
	const formattedElapsed = dateElapsed.toISOString().substr(11, 8)

	if(shouldUpdate){
		setShouldUpdate(false)
	}

	const togglendTimeline = () => {
		setTimelineMinimized(!timelineMinimized)
	}

	const toggleEventList = () => {
		setEventListMinimized(!eventListMinimized)
	}

	const handleTabChange = tab => () => {
		setTab(tab)
	}

	const handleAddLayer = () => {
		const currentLayers = [...layers]

		const newLayer = []

		currentLayers.push(newLayer)
		setLayers(currentLayers)
	}

	const eventDropHandler = (item, index) => {
		console.log(`Event Drop Handler: `, item, index)
		addEventToLayer(item, index)
	}

	const addEventToLayer = (item, index) => {
		//TODO: Change this to use real JS event objects and insert based on time
		let currentEvents = [...allEvents]
		let currentLayers = [...layers]
		console.log('ADDING NEW EVENT')
		const matchingEvent = filterValue(events, `name`, item.id)

		const eventObj = {
			name: matchingEvent.name,
			icon: matchingEvent.icon,
			beginningTime: matchingEvent.beginningTime,
			endTime: matchingEvent.endTime,
			layer: index
		}

		currentLayers[index].push(eventObj)
		currentEvents.push(eventObj)
		setAllEvents(currentEvents)
		setLayers(currentLayers)
	}

	const updateEvents = (index, event) => {
		if(showSideEditor){
			document.getElementsByClassName('sideTabInput')[0].value=''
			document.getElementsByClassName('sideTabInput')[1].value=''
			document.getElementById('sideTabMessage').innerText=''
		}
		let currentEvents = Array.from(allEvents)

		currentEvents[index] = event

		setAllEvents(currentEvents)
		setShouldUpdate(true)
	}

	const handleEditEventBTimeChange = (e) => {
		let number = parseFloat(e.target.value)
		if(isNaN(number)){
			console.log('IS NAN')
			number = 0
		}

		let currentEvents = allEvents
		for(let i = 0; i < currentEvents.length; i++){
			if(currentEvents[i] === eventToEdit){
				currentEvents[i].beginningTime = number
				if(number > currentEvents[i].endTime){
					currentEvents[i].endTime = number + 5
					document.getElementsByClassName('sideTabInput')[1].value=''
				}
			}
		}

		setAllEvents(currentEvents)
		setShouldUpdate(true)
	}

	const handleEditEventETimeChange = (e) => {
		let currentEvents = allEvents
		let number = parseFloat(e.target.value)

		for(let i = 0; i < currentEvents.length; i++){
			if(currentEvents[i] === eventToEdit){
				if(!isNaN(number)){
					if(number > currentEvents[i].beginningTime){
						currentEvents[i].endTime = number
						document.getElementById('sideTabMessage').innerText=''
					}
					else {
						//MESSAGE THE NUMBER NEEDS TO BE BIGGER THAN B TIME
						document.getElementById('sideTabMessage').innerText='Please enter a number greater than start time'
						document.getElementById('sideTabMessage').style.color='red'
					}
				}
			}

			if(currentEvents[i].endTime > 100){
				document.getElementById('sideTabMessage').innerText='End time changed to 100'
				document.getElementById('sideTabMessage').style.color='red'
				currentEvents[i].endTime = 100
			}
		}

		setAllEvents(currentEvents)
		setShouldUpdate(true)
	}

	const openSideEditor = (layerIndex, eventIndex) => {
		setEventToEdit(allEvents[eventIndex])
		setSideEditor(true)
	}

	const printSideEditor = () => {
		return (
			<SideEditor>
				<div>
					<p onClick={closeSideEditor} className='closeEditor'>x</p>
					<div className='center'>
						<label>Start</label>
						<label>End</label>
					</div>
					<div className='center'>
						<input type='text' className='sideTabInput' placeholder={eventToEdit.beginningTime.toFixed(4)} onChange={e => handleEditEventBTimeChange(e)}/>
						<input type='text' className='sideTabInput' placeholder={eventToEdit.endTime.toFixed(4)} onChange={e => handleEditEventETimeChange(e)}/>
					</div>
					<br/>
					<p id='sideTabMessage'></p>
				</div>
			</SideEditor>
		)
	}

	const closeSideEditor = () => {
		setSideEditor(false)
	}

	const filterValue = (obj, key, value) => {
		return obj.find((v) => {
			return v[key] === value
		})
	}

	return (
		<Style>

			<span>

				<div className='video'>
					{props.children}
				</div>

				<Timeline minimized={timelineMinimized} played={played}>

					<header>
						<button className='play-btn' onClick={playing ? handlePause : handlePlay}>
							<img src={playing ? pause : play} alt={playing ? `pause` : `play`}/>
							<span className='carat'></span>
						</button>

						<div className='scrubber'>
							<span className='time'>{formattedElapsed}</span>

							<button className='mute' onClick={toggleMute}>
								<img src={muted ? unmute : mute} alt={muted ? `unmute` : `mute`}/>
							</button>

							<div onClick={handleSeek}>
								<span className='total'></span>
								{/* <span className='loaded'></span> */}
								<span className='current'></span>
							</div>

						</div>

						<button className={`toggle-timeline${timelineMinimized ? ` minimized` : ``}`} onClick={togglendTimeline}>
							<img src={carat} alt='Toggle Timeline' />
						</button>

					</header>

					<span className='current-time'></span>
					<span className='current-time-dot'></span>

					<section>
						{/* //TODO: Add delete logic */}
						<div className='event-layers'>
							{layers.map((layer, index) => (
								<TrackLayer
									key={index}
									events={allEvents}
									index={index}
									onDrop={(item) => eventDropHandler(item,index)}
									sideEditor={openSideEditor}
									updateEvents={updateEvents}
									closeEditor={closeSideEditor}
									/>
								// <p>{index}</p>
							))}
							<NewLayer onClick={handleAddLayer}>
								<Icon src={plus}/>
							</NewLayer>
						</div>

						<div className='zoom-controls'>
							<span className='zoom-factor'></span>
							<span className='timeline-zone'></span>
						</div>

					</section>

				</Timeline>

			</span>

			<EventList minimized={eventListMinimized}>

				<header>
					<div className={`tab${tab === `events` ? ` active` : ``}`} onClick={handleTabChange(`events`)}>Events</div>
					<div className={`tab${tab === `save` ? ` active` : ``}`} onClick={handleTabChange(`save`)}>Save</div>
					<div className='carat'>
						<EventListCarat onClick={toggleEventList} className={eventListMinimized ? `minimized` : ``}/>
					</div>
				</header>

				{tab === `events` ?

					<>
						<div className='breadcrumbs'>
							<span>Events</span>
							{ showSideEditor &&
								<>
									<span className='carat'></span>
									<span className='current'>{eventToEdit !== undefined ? `${eventToEdit.name}` : ''}</span>
								</>
							}
							{/* <button className='close'></button> */}
						</div>
						{ showSideEditor ? (
							printSideEditor()
						) : (
							<>
								<div className='events'>
									{events.map((event, i) => (
										<EventCard event={event} key={i} />
									))}
								</div>
							</>
						)}
					</>

					:

					<>
						<button onClick={() => {}}>Save</button>
					</>

				}

			</EventList>

		</Style>
	)
}

export default TrackEditor
