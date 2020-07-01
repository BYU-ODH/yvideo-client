import React, { useState, useEffect } from 'react'

import Style, { Timeline, EventList, EventListCarat, NewLayer, Icon } from './styles'

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import { EventCard, TrackEditorSideMenu } from 'components/bits'

import { Controller, TrackLayer } from 'components'

import skipIcon from 'Assets/event_skip.svg'
import muteIcon from 'Assets/event_mute.svg'
import pauseIcon from 'Assets/event_pause.svg'
import commentIcon from 'Assets/event_comment.svg'
//import censorIcon from 'Assets/event_censor.svg'
import blankIcon from 'Assets/event_blank.svg'
import trashIcon from 'Assets/trash_icon.svg'
import closeIcon from 'Assets/close_icon.svg'

//ICONS FOR THE EVENTS CAN BE FOUND AT https://feathericons.com/
//TRASH ICON COLOR IS: #eb6e79. OTHER ICON STROKES ARE LIGHT BLUE VAR IN CSS: #0582ca

//MAKE KEYBOARD ERROR LIKE YOUTUBE FUNCTIONALITY - ADD SECOND BACK OR FORWARD BUTTON

import plus from 'Assets/plus-square.svg'

const TrackEditor = props => {

	//console.log('%c Editor Component', 'color: red; font-weight: bolder; font-size: 12px;')

	const { setEvents, updateContent } = props

	const { eventsArray, currentContent } = props.viewstate

	const events = [
		{
			type: `Skip`,
			icon: skipIcon,
			start: 0,
			end: 10,
			layer: 0
		},
		{
			type: `Mute`,
			icon: muteIcon,
			start: 0,
			end: 10,
			layer: 0
		},
		{
			type: `Pause`,
			icon: pauseIcon,
			start: 0,
			end: 10,
			layer: 0
		},
		{
			type: `Comment`,
			icon: commentIcon,
			start: 0,
			end: 10,
			layer: 0,
			comment: '',
			position: {
				x: 0,
				y: 0,
			},
		},
		// {
		// 	type: `Censor`,
		// 	icon: censorIcon,
		// 	start: 0,
		// 	end: 10,
		// 	layer: 0,
		// 	position: {
		// 		0: [0, 0, 30, 40],
		// 	},
		// },
		{
			type: `Blank`,
			icon: blankIcon,
			start: 0,
			end: 10,
			layer: 0
		},
	]

	//console.log(currentContent)

	// const eventsArray = [
	// 	// {
	// 	// 	type: `Censor`,
	// 	// 	icon: censorIcon,
	// 	// 	start: 0,
	// 	// 	end: 10,
	// 	// 	layer: 0,
	// 	// 	position: {
	// 	// 		"0.5": [75.94291539245668, 33.70998116760829, 30, 40],
	// 	// 		"1.2": [40.16309887869521, 38.60640301318267, 30, 40],
	// 	// 		"2.1": [38.430173292558614, 70.4331450094162, 30, 40],
	// 	// 		"2.9": [71.1518858307849, 66.85499058380414, 30, 40],
	// 	// 		"3.8": [70.74413863404689, 33.89830508474576, 30, 40],
	// 	// 		"4.7": [42.40570846075433, 35.59322033898305, 30, 40],
	// 	// 		"5.9": [44.342507645259936, 72.88135593220339, 30, 40],
	// 	// 		"6.6": [69.01121304791029, 73.44632768361582, 30, 40],
	// 	// 		"7.7": [67.88990825688074, 24.293785310734464, 30, 40],
	// 	// 		"8.6": [41.284403669724774, 31.45009416195857, 30, 40],
	// 	// 		"9.8": [37.20693170234455, 67.60828625235405, 30, 40],
	// 	// 		"10.8": [65.54536187563711, 68.36158192090396, 30, 40],
	// 	// 	},
	// 	// },
	// 	// {
	// 	// 	type: `Skip`,
	// 	// 	icon: muteIcon,
	// 	// 	start: 60,
	// 	// 	end: 65,
	// 	// 	layer: 0
	// 	// },
	// 	{
	// 		type: `Mute`,
	// 		icon: muteIcon,
	// 		start: 0,
	// 		end: 100,
	// 		layer: 1
	// 	},
	// 	{
	// 		type: `Comment`,
	// 		icon: commentIcon,
	// 		start: 0,
	// 		end: 20,
	// 		layer: 2,
	// 		comment: 'New COmment',
	// 		position: {
	// 			x: 0,
	// 			y: 0,
	// 		},
	// 	},
	// ] // THIS IS GOING TO HAVE EVENTS
	let largestLayer = 0
	//SORTING THE ARRAYS TO HAVE A BETTER WAY TO HANDLE THE EVENTS
	if(eventsArray !== undefined && eventsArray.length > 0){
		eventsArray.sort((a, b) => (a.layer > b.layer) ? 1 : -1)
		largestLayer = eventsArray[eventsArray.length-1].layer
	}

	//Find the largets layer number
	const initialLayers = new Array(largestLayer+1).fill(0)

	const [allEvents, setAllEvents] = useState(eventsArray)
	const [layers, setLayers] = useState(initialLayers)
	const [shouldUpdate, setShouldUpdate] = useState(false)
	const [showSideEditor, setSideEditor] = useState(false)
	const [eventToEdit, setEventToEdit] = useState(10000)
	const [displayLayer, setDisplayLayer] = useState(0)
	const [videoLength, setVideoLength] = useState(0)
	//const [videoCurrentTime, setCurrentTime] = useState(0)

	const [tab, setTab] = useState(`events`)
	const [timelineMinimized, setTimelineMinimized] = useState(false)
	const [eventListMinimized, setEventListMinimized] = useState(false)
	const [layerWidth, setWidth] = useState(0)
	//const [editCensor, setEditCensor] = useState({})
	//const [lastClick, setLastClick] = useState({x: 0, y: 0})

	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth
	})

	useEffect(() => {
		function handleResize() {
			setTimeout(() => {
				setDimensions({
					height: window.innerHeight,
					width: window.innerWidth
				})
			}, 500);
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

	// const toggleEventList = () => {
	// 	if(eventListMinimized){
	// 		setWidth(31)
	// 	}
	// 	else {
	// 		setWidth(35)
	// 	}
	// 	setEventListMinimized(!eventListMinimized)
	// }

	const getVideoDuration = (duration) => {
		setVideoLength(duration)
	}

	// const getCurrentTime = (time) => {
	// 	setCurrentTime(parseFloat(time))
	// }

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
		let currentEvents = []
		if(allEvents !== undefined){
			currentEvents = [...allEvents]
		}
		//console.log('ADDING NEW EVENT')
		const matchingEvent = filterValue(events, `type`, item.id)

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
		let canAccessDom = false
		if(showSideEditor && eventListMinimized === false){
			canAccessDom = true
			document.getElementById('sideTabMessage').style.color='red'
		}

		let currentEvents = [...allEvents]

		//check start event times
		if(event.start < 0){
			event.start = 0
			if(canAccessDom){
				document.getElementById('sideTabExplanation').innerText='Changed start time to 0'
			}
		}
		else if(event.start >= 100) {
			event.start = 95
			event.end = 100
			if(canAccessDom){
				document.getElementById('sideTabExplanation').innerHTML=`Start time cannot be larger than ${videoLength} <br/> Changed values to match criteria`
			}
		}
		else if(event.start > event.end){
			if(canAccessDom){
				document.getElementById('sideTabExplanation').innerHTML=`Start time cannot be larger than end time <br/> Change values to match criteria`
			}
		}

		//check end event times
		if(event.end <= event.start){
			if(canAccessDom){
				document.getElementsByClassName('sideTabInput')[1].value=event.end
				document.getElementById('sideTabMessage').innerHTML='Please, enter a number bigger than star time'
			}
		}
		else if(event.end > 100){
			//event.end = 100
			if(canAccessDom){
				document.getElementById('sideTabMessage').innerHTML=`Please, enter a number less than ${videoLength}`
				document.getElementById('sideTabExplanation').innerHTML=`End time cannot be larger than ${videoLength} <br/> Change value to ${videoLength} or less`
			}
		}

		if(0 <= event.start && event.start < event.end && event.end <= 100){
			if(canAccessDom){
				document.getElementById('sideTabMessage').style.color='green'
				document.getElementById('sideTabMessage').innerHTML='Start and end times have been updated correctly'
				document.getElementById('sideTabExplanation').innerHTML=``
			}
		}

		currentEvents[index] = event

		setAllEvents(currentEvents)
		setEvents(currentEvents)
		setDisplayLayer(layerIndex)
		setEventToEdit(index)
		setSideEditor(true)
	}

	const deleteEvent = () => {
		let currentEvents = [...allEvents]
		currentEvents.splice(eventToEdit, 1)

		setAllEvents(currentEvents)
		setEvents(currentEvents)
		setEventToEdit(1000)
		setSideEditor(false)
	}

	// const handleCensorRemove = (item) => {
	// 	let index = eventToEdit
	// 	let cEvent = allEvents[index]
	// 	let layer = cEvent.layer

	// 	delete cEvent.position[item]

	// 	updateEvents(index, cEvent, layer)

	// }

	// const handleAddCensor = () => {

	// 	let temp = editCensor
	// 	const last = Object.keys(temp)

	// 	if(videoCurrentTime === 0 && last.length === 0){
	// 		temp[`0.0`] = [0 ,0, 30, 40]
	// 	}
	// 	else if(videoCurrentTime == 0 && last.length > 0){
	// 		temp[`${(parseInt(last[last.length - 1]) + 1).toFixed(1)}`] = [0 ,0, 30, 40]
	// 	}
	// 	else{
	// 		temp[`${videoCurrentTime.toFixed(1)}`] = [0 ,0, 30, 40]
	// 	}

	// 	console.log('temp', temp)
	// 	document.getElementById('tableBottom').scrollIntoView(false)
	// 	setEditCensor(temp)
	// 	handleSaveCensor()
	// }

	// const handleEditCensor = (e, item, int) => {
	// 	let object = editCensor
	// 	//console.log(editCensor)
	// 	let value = (parseFloat(e.target.value)).toFixed(1)

	// 	switch (int) {
	// 		case 1:
	// 			object[item][0] = value
	// 			break;
	// 		case 2:
	// 			object[item][1] = value
	// 			break;
	// 		case 3:
	// 			object[item][2] = value
	// 			break;
	// 		case 4:
	// 			object[item][3] = value
	// 			break;

	// 		default:
	// 			break;
	// 	}

	// 	setEditCensor(object)
	// }

	// const handleSaveCensor = () => {
	// 	console.log('SAVE CENSOR')
	// 	let index = eventToEdit
	// 	let cEvent = allEvents[index]
	// 	let layer = cEvent.layer

	// 	cEvent.position = editCensor

	// 	setEditCensor({})
	// 	updateEvents(index, cEvent, layer)
	// }

	const openSideEditor = (layerIndex, eventIndex) => {
		setEventToEdit(eventIndex)
		setDisplayLayer(layerIndex)
		setSideEditor(true)
	}

	const closeSideEditor = () => {
		setSideEditor(false)
	}

	const filterValue = (obj, key, value) => {
		return obj.find((v) => {
			return v[key] === value
		})
	}

	const handleSaveAnnotation = () => {
		let content = currentContent
		currentContent.settings.annotationDocument = [...allEvents]
		updateContent(content)
	}

	// const handleLastClick = (height, width, x, y, time) => {
	// 	//console.log(height, width)

	// 	if(eventToEdit < allEvents.length && allEvents[eventToEdit].type === 'Censor'){
	// 		//console.log('%c Added position', 'color: red; font-weight: bold; font-size: 1.2rem;')
	// 		let index = eventToEdit
	// 		let cEvent = allEvents[index]
	// 		let layer = cEvent.layer

	// 		let value = Object.keys(cEvent.position).find(item => item >= time)

	// 		// cEvent.position[time] = [((x / width) * 100) - (((x / width) * 100)*.5), (((y-86) / height) * 100) - ((((y-86) / height) * 100)*.5)]
	// 		if(cEvent.position[`${(time).toFixed(1)}`] !== undefined){
	// 			cEvent.position[`${(time).toFixed(1)}`] = [((x / width) * 100), (((y-86) / height) * 100), cEvent.position[`${time.toFixed(1)}`][2], cEvent.position[`${time.toFixed(1)}`][3]]
	// 		}
	// 		else {
	// 			cEvent.position[`${(time).toFixed(1)}`] = [((x / width) * 100), (((y-86) / height) * 100), 30, 40]
	// 		}

	// 		//console.log(cEvent.position)
	// 		updateEvents(index, cEvent, layer)
	// 	}
	// }

	//console.log('track-editor ', videoLength)
	//change add timer to current time based on skip or pause play

	return (
		<Style>
			<DndProvider backend={Backend}>

			<span>

				<Controller className='video'
					url={props.viewstate.url}
					handlers={togglendTimeline}
					minimized={timelineMinimized}
					getDuration={getVideoDuration}
					//handleLastClick={handleLastClick}
					//getCurrentTime={getCurrentTime}
					>
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
					<div className={`tab`} onClick={handleSaveAnnotation}>Save</div>

				</header>

				{tab === `events` ?

					<>
						<div className='breadcrumbs'>
							<span>Events</span>
							{ showSideEditor &&
								<>
									<span className='carat'></span>
									<span className='current'>{eventToEdit !== undefined ? `${allEvents[eventToEdit].type}` : ''}</span>

									<button className='deleteEventButton' onClick={deleteEvent}>Delete Event</button>
								</>
							}
						</div>
						{ showSideEditor !== false && eventListMinimized !== true ? (
								<TrackEditorSideMenu
									singleEvent={allEvents[eventToEdit]}
									index={eventToEdit}
									videoLength={videoLength}
									closeSideEditor={closeSideEditor}
									updateEvents={updateEvents}
								></TrackEditorSideMenu>
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
					(null)
				}
			</EventList>
		</DndProvider>
		</Style>
	)
}

export default TrackEditor
