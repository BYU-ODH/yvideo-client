import React, { useState, useEffect } from 'react'

import Style, { Timeline, EventList, EventListCarat, NewLayer, Icon, SideEditor } from './styles'

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import { EventCard } from 'components/bits'

import { Controller, TrackLayer } from 'components'

import skipIcon from 'Assets/event_skip.svg'
import muteIcon from 'Assets/event_mute.svg'
import pauseIcon from 'Assets/event_pause.svg'
import commentIcon from 'Assets/event_comment.svg'
import censorIcon from 'Assets/event_censor.svg'

import plus from 'assets/plus-white.svg'

const TrackEditor = props => {
	const { setEvents } = props

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
			layer: 0,
			comment: ''
		},
		{
			name: `Censor`,
			icon: censorIcon,
			beginningTime: 0,
			endTime: 10,
			layer: 0
		},
	]

	const eventsArray = [
		{
			name: `Mute`,
			icon: skipIcon,
			beginningTime: 90,
			endTime: 100,
			layer: 0
		},
		{
			name: `Skip`,
			icon: muteIcon,
			beginningTime: 1,
			endTime: 10,
			layer: 0
		},
		{
			name: `Mute`,
			icon: muteIcon,
			beginningTime: 0,
			endTime: 10,
			layer: 1
		},
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

	//Find the largets layer number
	const largestLayer = eventsArray[eventsArray.length-1].layer
	const initialLayers = new Array(largestLayer+1).fill(0)

	const [allEvents, setAllEvents] = useState(eventsArray)
	const [layers, setLayers] = useState(initialLayers)
	const [shouldUpdate, setShouldUpdate] = useState(false)
	const [showSideEditor, setSideEditor] = useState(false)
	const [eventToEdit, setEventToEdit] = useState(10000)
	const [displayLayer, setDisplayLayer] = useState(0)
	const [videoLength, setVideoLength] = useState(0)

	const [tab, setTab] = useState(`events`)
	const [timelineMinimized, setTimelineMinimized] = useState(false)
	const [eventListMinimized, setEventListMinimized] = useState(false)
	// TODO: Replace with dynamic data from server
	const [layerWidth, setWidth] = useState(0)

	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth
	})

	useEffect(() => {
		function handleResize() {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth
			})
		}
		window.addEventListener('resize', handleResize)
		setEvents(allEvents)
	})

	if(shouldUpdate === true){

		setShouldUpdate(false)
	}

	const togglendTimeline = () => {

		setTimelineMinimized(!timelineMinimized)
	}

	const toggleEventList = () => {
		if(eventListMinimized){
			setWidth(31)
		}
		else {
			setWidth(35)
		}
		setEventListMinimized(!eventListMinimized)
	}

	const getVideoDuration = (duration) => {
		setVideoLength(duration)
	}

	const handleTabChange = tab => () => {
		setTab(tab)
	}

	const handleAddLayer = () => {
		const currentLayers = [...layers]

		const newLayer = 0

		currentLayers.push(newLayer)
		setLayers(currentLayers)
		setSideEditor(false)
		setDisplayLayer(currentLayers.length-1)
	}

	const eventDropHandler = (item, index) => {
		// console.log(`Event Drop Handler: `, item, index)
		addEventToLayer(item, index)
	}

	const addEventToLayer = (item, index) => {
		//TODO: Change this to use real JS event objects and insert based on time
		let currentEvents = [...allEvents]
		//console.log('ADDING NEW EVENT')
		const matchingEvent = filterValue(events, `name`, item.id)

		const eventObj = {
			...matchingEvent,
			layer: index
		}

		currentEvents.push(eventObj)
		setAllEvents(currentEvents)
		setDisplayLayer(index)
	}

	const updateEvents = (index, event, layerIndex) => {
		//console.log('Update', event)
		if(showSideEditor && eventListMinimized === false){
			document.getElementsByClassName('sideTabInput')[0].value=''
			document.getElementsByClassName('sideTabInput')[1].value=''
			document.getElementById('sideTabMessage').innerText=''
		}
		let currentEvents = [...allEvents]

		currentEvents[index] = event

		setAllEvents(currentEvents)
		setDisplayLayer(layerIndex)
		setEventToEdit(index)
		setSideEditor(true)
	}

	const handleEditEventBTimeChange = (e) => {
		document.getElementById('sideTabMessage').style.color='red'
		let number = parseFloat(e.target.value)
		if(isNaN(number)){
			//console.log('IS NAN')
			number = 0
		}

		number = (number / videoLength) * 100

		let currentEvents = [...allEvents]
		let cEvent = currentEvents[eventToEdit]
		cEvent.beginningTime = number
		if(number > cEvent.endTime){
			cEvent.endTime = number + 5
			document.getElementsByClassName('sideTabInput')[1].value=''
		}

		if(cEvent.beginningTime < cEvent.endTime && cEvent.beginningTime > 0 ){
			document.getElementById('sideTabMessage').innerHTML=''
		}

		if (number >= 100 || cEvent.endTime > 100){
			cEvent.endTime = 100
			cEvent.beginningTime = 99
			document.getElementById('sideTabMessage').innerHTML='Changed beginning time to 99<br/>Changed end time to 100<br/>Either beginning time or end time was bigger than 100'
			document.getElementsByClassName('sideTabInput')[0].value=''
			document.getElementsByClassName('sideTabInput')[1].value=''
		}

		currentEvents[eventToEdit] = cEvent
		setAllEvents(currentEvents)
		setShouldUpdate(true)
	}

	const handleEditEventETimeChange = (e) => {
		document.getElementById('sideTabMessage').style.color='red'
		let currentEvents = allEvents
		let number = parseFloat(e.target.value)
		let cEvent = currentEvents[eventToEdit]

		if(!isNaN(number)){
			number = (number / videoLength) * 100
			if(number > cEvent.beginningTime && number <= 100){
				//console.log('good')
				cEvent.endTime = number
				document.getElementById('sideTabMessage').innerText=''
			}
			if(number > 100){
				//MESSAGE THE NUMBER NEEDS TO BE BIGGER THAN B TIME
				//console.log('changed to 100')
				document.getElementById('sideTabMessage').innerHTML=`End time is bigger than video length time. Changed end time to ${videoLength}`
				document.getElementsByClassName('sideTabInput')[1].value=''
				cEvent.endTime = 100
			}
			if(number <= cEvent.beginningTime){
				//console.log('bad')
				document.getElementById('sideTabMessage').innerHTML=`Please enter a number greater than start`
			}
		}

		currentEvents[eventToEdit] = cEvent
		setAllEvents(currentEvents)
		setShouldUpdate(true)
	}

	const openSideEditor = (layerIndex, eventIndex) => {
		setEventToEdit(eventIndex)
		setDisplayLayer(layerIndex)
		setSideEditor(true)
	}

	const printSideEditor = () => {
		const cEvent = allEvents[eventToEdit]
		let start = ( cEvent.beginningTime / 100 ) * videoLength
		let end = ( cEvent.endTime / 100 ) * videoLength
		return (
			<SideEditor>
				<div>
					<p onClick={closeSideEditor} className='closeEditor'>x</p>
					<div className='center'>
						<label>Start</label>
						<label>End</label>
					</div>
					<div className='center'>
						<input type='text' className='sideTabInput' placeholder={start.toFixed(4)} onChange={e => handleEditEventBTimeChange(e)}/>
						<input type='text' className='sideTabInput' placeholder={end.toFixed(4)} onChange={e => handleEditEventETimeChange(e)}/>
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

	//console.log('track-editor ', videoLength)

	return (
		<Style>
			<DndProvider backend={Backend}>

			<span>

				<Controller className='video' url={props.viewstate.url} handlers={togglendTimeline} minimized={timelineMinimized} getDuration={getVideoDuration}>
				</Controller>

				<Timeline minimized={timelineMinimized}>

					<section>
						{/* //TODO: Add delete logic */}
						<div className='event-layers'>

								{layers.map((layer, index) => (
									<div className={`layer ${displayLayer === index ? 'active-layer' : ''}`} key={index}>
										<div className={`handle`} onClick={() => setDisplayLayer(index)}>
											<p>Layer {index}</p>
										</div>
											{/* <HandleIcon /> */}
											<TrackLayer
												videoLength={videoLength}
												minimized={eventListMinimized}
												width={layerWidth}
												events={allEvents}
												activeEvent={eventToEdit}
												index={index}
												onDrop={(item) => eventDropHandler(item,index)}
												sideEditor={openSideEditor}
												updateEvents={updateEvents}
												closeEditor={closeSideEditor}
											/>
									</div>
								))}


								<NewLayer onClick={handleAddLayer}>
									<Icon src={plus}/>
								</NewLayer>
						</div>

					</section>
					<div className='zoom-controls'>
						<span className='zoom-factor'></span>
						<span className='timeline-zone'></span>
					</div>

				</Timeline>

			</span>

			<EventList minimized={eventListMinimized}>

				<header>
					{/* <div className='carat'>
						<EventListCarat onClick={toggleEventList} className={eventListMinimized ? `minimized` : ``}/>
					</div> */}
					<div className={`tab${tab === `events` ? ` active` : ``}`} onClick={handleTabChange(`events`)}>Events</div>
					<div className={`tab${tab === `save` ? ` active` : ``}`} onClick={handleTabChange(`save`)}>Save</div>

				</header>

				{tab === `events` ?

					<>
						<div className='breadcrumbs'>
							<span>Events</span>
							{ showSideEditor &&
								<>
									<span className='carat'></span>
									<span className='current'>{eventToEdit !== undefined ? `${allEvents[eventToEdit].name}` : ''}</span>
								</>
							}
							{/* <button className='close'></button> */}
						</div>
						{ showSideEditor !== false && eventListMinimized !== true? (
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
		</DndProvider>
		</Style>
	)
}

export default TrackEditor
