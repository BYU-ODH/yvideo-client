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
import blankIcon from 'Assets/event_blank.svg'
import trashIcon from 'Assets/trash_icon.svg'

//ICONS FOR THE EVENTS CAN BE FOUND AT https://feathericons.com/

import plus from 'Assets/plus-square.svg'

const TrackEditor = props => {

	//console.log('%c Editor Component', 'color: red; font-weight: bolder; font-size: 12px;')

	const { setEvents } = props

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
			comment: ''
		},
		{
			type: `Censor`,
			icon: censorIcon,
			start: 0,
			end: 10,
			layer: 0,
			position: {
				0: [0, 0],
			},
		},
		{
			type: `Blank`,
			icon: blankIcon,
			start: 0,
			end: 10,
			layer: 0
		},
	]

	const eventsArray = [
		{
			type: `Censor`,
			icon: censorIcon,
			start: 0,
			end: 10,
			layer: 0,
			position: {
				"0": [0, 0],
				"1": [50, 30],
				"2": [45, 21],
				"3": [10, 55],
			},
		},
		{
			type: `Skip`,
			icon: muteIcon,
			start: 60,
			end: 65,
			layer: 0
		},
		{
			type: `Mute`,
			icon: muteIcon,
			start: 50,
			end: 60,
			layer: 1
		},
		{
			type: `Comment`,
			icon: commentIcon,
			start: 0,
			end: 20,
			layer: 2,
			comment: 'New COmment',
		},
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
	const [layerWidth, setWidth] = useState(0)
	const [editComment, setEditComment] = useState('')
	const [editCensor, setEditCensor] = useState({})
	const [deleteTimes, setDeleteTimes] = useState([])
	const [lastClick, setLastClick] = useState({x: 0, y: 0})

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
		if(showSideEditor && eventListMinimized === false){
			document.getElementsByClassName('sideTabInput')[0].value=''
			document.getElementsByClassName('sideTabInput')[1].value=''
			document.getElementById('sideTabMessage').innerText=''
		}
		let currentEvents = [...allEvents]

		currentEvents[index] = event

		setAllEvents(currentEvents)
		setEvents(currentEvents)
		setDisplayLayer(layerIndex)
		setEventToEdit(index)
		setSideEditor(true)
	}

	const handleEditEventBTimeChange = (e) => {

		document.getElementById('sideTabMessage').style.color='red'
		let number = parseFloat(e.target.value)
		let currentEvents = [...allEvents]
		let cEvent = currentEvents[eventToEdit]
		let index = eventToEdit
		let layer = cEvent.layer

		if(isNaN(number)){
			number = 0
		}

		number = (number / videoLength) * 100

		cEvent.start = number
		if(number > cEvent.end){
			cEvent.end = number + 5
			//document.getElementsByClassName('sideTabInput')[1].value=''
		}

		if(cEvent.start < cEvent.end && cEvent.start > 0 ){
			document.getElementById('sideTabMessage').innerHTML=''
		}

		if (number >= 100 || cEvent.end > 100){
			cEvent.end = 100
			cEvent.start = 99
			document.getElementById('sideTabMessage').innerHTML=`Changed beginning time to ${videoLength - (videoLength * 0.01) }s<br/>Changed end time to ${videoLength}s<br/>Either beginning time or end time was bigger than 100`
			document.getElementsByClassName('sideTabInput')[0].value=''
			document.getElementsByClassName('sideTabInput')[1].value=''
		}

		//updateEvents(index, cEvent, layer)
		currentEvents[eventToEdit] = cEvent
		setAllEvents(currentEvents)
		setEvents(currentEvents)
		setShouldUpdate(true)
	}

	const handleEditEventETimeChange = (e) => {
		document.getElementById('sideTabMessage').style.color='red'
		let currentEvents = [...allEvents]
		let number = parseFloat(e.target.value)
		let cEvent = currentEvents[eventToEdit]

		if(!isNaN(number)){
			number = (number / videoLength) * 100
			if(number > cEvent.start && number <= 100){
				//console.log('good')
				cEvent.end = number
				document.getElementById('sideTabMessage').innerText=''
			}
			if(number > 100){
				//MESSAGE THE NUMBER NEEDS TO BE BIGGER THAN B TIME
				//console.log('changed to 100')
				document.getElementById('sideTabMessage').innerHTML=`End time is bigger than video length time. <br/> End time need to be less than ${videoLength}`
				//document.getElementsByClassName('sideTabInput')[1].value=''
				cEvent.end = 100
			}
			if(number <= cEvent.start){
				//console.log('bad')
				document.getElementById('sideTabMessage').innerHTML=`Please enter a number greater than start`
			}
		}

		currentEvents[eventToEdit] = cEvent
		setAllEvents(currentEvents)
		setEvents(currentEvents)
		setShouldUpdate(true)
	}

	const handleSaveComment = () => {
		let index = eventToEdit
		let event = allEvents[index]
		let layer = event.layer
		event.comment = editComment

		//MAKE IT DRAGABLE
		//PASS X AND Y POSITIONS

		setEditComment('')
		updateEvents(index, event, layer)
	}

	const handleCensorRemove = (item) => {
		let index = eventToEdit
		let cEvent = allEvents[index]
		let layer = cEvent.layer

		delete cEvent.position[item]

		updateEvents(index, cEvent, layer)
		
	}

	const handleAddCensor = () => {
		let index = eventToEdit
		let cEvent = allEvents[index]
		let layer = cEvent.layer

		cEvent.position["--"] = [0 ,0]

		setEditCensor(cEvent.position)
		updateEvents(index, cEvent, layer)

		//GET CURRENT TIME OF THE VIDEO TO INSERT
	}

	const handleEditCensor = (e, item, int) => {
		let object = editCensor
		console.log(editCensor)

		let deleteT = deleteTimes

		switch (int) {
			case 1:
				deleteT.push(item)
				let values = object[item]
				console.log(values)
				object[e.target.value] = values
				object[item] = object[e.target.value]
				break;
			case 2:
				object[item][0] = parseInt(e.target.value)
				break;
			case 3:
				object[item][1] = parseInt(e.target.value)
				break;
		
			default:
				break;
		}

		setDeleteTimes(deleteT)
		setEditCensor(object)
	}

	const handleSaveCensor = () => {
		console.log('SAVE CENSOR')
		let positions = editCensor
		let index = eventToEdit
		let cEvent = allEvents[index]
		let layer = cEvent.layer

		deleteTimes.forEach(element => {
			delete cEvent.position[element]
		});

		cEvent.position = positions

		console.log(positions)
		setDeleteTimes([])
		updateEvents(index, cEvent, layer)
	}

	const openSideEditor = (layerIndex, eventIndex) => {
		setEventToEdit(eventIndex)
		setDisplayLayer(layerIndex)
		setSideEditor(true)
	}

	const printSideEditor = () => {
		const cEvent = allEvents[eventToEdit]
		let start = ( cEvent.start / 100 ) * videoLength
		let end = ( cEvent.end / 100 ) * videoLength
		if(cEvent.type === 'Censor' && editCensor !== cEvent.position){
			setEditCensor(cEvent.position)
		}
		return (
			<SideEditor>
				{ cEvent.type === 'Pause' ? (
					<div>
						<p onClick={closeSideEditor} className='closeEditor'>x</p>
						<div className='center'>
							<label>Start</label>
							<label style={{ visibility: 'hidden'}}>End</label>
						</div>
						<div className='center'>
							<input type='text' className='sideTabInput' placeholder={start.toFixed(4)} onChange={e => handleEditEventBTimeChange(e)}/>
							<input type='text' className='sideTabInput' placeholder={end.toFixed(4)} onChange={e => handleEditEventETimeChange(e)} style={{ visibility: 'hidden'}}/>
						</div>
						<br/>
						<p id='sideTabMessage'></p>
					</div>
					) : (
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
						<>
						{ cEvent.type === 'Comment' ? (
							<div className='center' style={{ flexDirection: 'column'}}>
								<label style={{ textAlign: 'left', margin: '15px 5px 5px 5px' }}>Type a comment</label><br/>
								<textarea style={{ margin: '5px' }} rows='4' cols='50' placeholder={cEvent.comment} onChange={e => setEditComment(e.target.value)}></textarea>
								<button onClick={handleSaveComment} className='sideButton'>Save Comment</button>
							</div>
							) : (null)
						}
						{ cEvent.type === 'Censor' ? (
							<div className='censorMenu'>
								<label>Censor Times</label><br/>
								<div className='censorList'>
									<table>
										<thead><tr><th>Time</th><th>posX</th><th>posY</th><th>Delete</th></tr></thead>
										<tbody>
										{
											Object.keys(cEvent.position).map((item, i) => (
												<tr key={item}>
													<td><input type='text' placeholder={`${item}`} onChange={(e) => handleEditCensor(e, item, 1)}/></td>
													<td><input type='text' placeholder={`${cEvent.position[item][0]}`} onChange={(e) => handleEditCensor(e, item, 2)}/></td>
													<td><input type='text' placeholder={`${cEvent.position[item][1]}`} onChange={(e) => handleEditCensor(e, item, 3)}/></td>
													<td><img className={'trashIcon'} src={`${trashIcon}`} onClick={() => handleCensorRemove(item)}/></td>
												</tr>
											)) // "foo: bar", "baz: 42"
											//Object.entries(cEvent.position).forEach(([key, value]) => console.log(`${key}: ${value}`)) // "foo: bar", "baz: 42"
										}
										</tbody>
									</table>
								</div>
								<NewLayer className='addCensor' onClick={handleAddCensor}><Icon src={plus}/></NewLayer><br/><br/><br/><br/>
								<button className='sideButton' onClick={handleSaveCensor}>Save Censor</button>
							</div>
							) : (null)
						}
						</>
						<p id='sideTabMessage'></p>
					</div>
					)
				}
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

	const handleLastClick = (height, width, x, y, time) => {
		console.log(height, width)

		if(eventToEdit < allEvents.length && allEvents[eventToEdit].type === 'Censor'){
			console.log('%c Added position', 'color: red; font-weight: bold; font-size: 1.2rem;')
			let index = eventToEdit
			let cEvent = allEvents[index]
			let layer = cEvent.layer

			// cEvent.position[time] = [((x / width) * 100) - (((x / width) * 100)*.5), (((y-86) / height) * 100) - ((((y-86) / height) * 100)*.5)]
			cEvent.position[`${time.toFixed(0)}`] = [((x / width) * 100), (((y-86) / height) * 100)]

			//console.log(cEvent.position)
			updateEvents(index, cEvent, layer)
		}
	}

	//console.log('track-editor ', videoLength)

	return (
		<Style>
			<DndProvider backend={Backend}>

			<span>

				<Controller className='video' url={props.viewstate.url} handlers={togglendTimeline} minimized={timelineMinimized} getDuration={getVideoDuration} handleLastClick={handleLastClick}>
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
									<span className='current'>{eventToEdit !== undefined ? `${allEvents[eventToEdit].type}` : ''}</span>
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
