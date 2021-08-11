import React, { useState, useEffect } from 'react'

import { Prompt } from 'react-router'

import Style, { Timeline, EventEditor, AnnotationMessage, PlusIcon } from './styles'

import { Rnd } from 'react-rnd'

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import { EventCard, TrackEditorSideMenu } from 'components/bits'

import { Controller, TrackLayer, VideoContainer } from 'components'

import skipIcon from 'assets/event_skip.svg'
import muteIcon from 'assets/event_mute.svg'
import pauseIcon from 'assets/event_pause.svg'
import commentIcon from 'assets/event_comment.svg'
import censorIcon from 'assets/event_censor.svg'
import blankIcon from 'assets/event_blank.svg'
import trashIcon from 'assets/trash_icon.svg'
import closeIcon from 'assets/close_icon.svg'
import plusIcon from 'assets/plus.svg'

import zoomIn from 'assets/te-zoom-in.svg'
import zoomOut from 'assets/te-zoom-out.svg'
import llIcon from 'assets/te-chevrons-left.svg'
import rrIcon from 'assets/te-chevrons-right.svg'
import lIcon from 'assets/te-chevron-left.svg'
import rIcon from 'assets/te-chevron-right.svg'

import helpIcon from 'assets/te-help-circle-white.svg'

// ICONS FOR THE EVENTS CAN BE FOUND AT https://feathericons.com/
const VideoEditor = props => {

	const { setEvents, updateContent } = props

	const {
		eventsArray,
		content,
		contentError,
	} = props.viewstate

	const { handleShowTip, toggleTip, handleShowHelp } = props.handlers
	const layers = [{0: `Skip`}, {1: `Mute`}, {2: `Pause`}, {3: `Comment`}, {4: `Censor`}, {5: `Blank`}]

	const events = [
		{
			type: `Skip`,
			icon: skipIcon,
			start: 0,
			end: 10,
			layer: 0,
		},
		{
			type: `Mute`,
			icon: muteIcon,
			start: 0,
			end: 10,
			layer: 0,
		},
		{
			type: `Pause`,
			icon: pauseIcon,
			start: 0,
			end: 10,
			layer: 0,
		},
		{
			type: `Comment`,
			icon: commentIcon,
			start: 0,
			end: 10,
			layer: 0,
			comment: ``,
			position: {
				x: 0,
				y: 0,
			},
		},
		{
			type: `Censor`,
			icon: censorIcon,
			start: 0,
			end: 10,
			layer: 0,
			position: {

			},
		},
		{
			type: `Blank`,
			icon: blankIcon,
			start: 0,
			end: 10,
			layer: 0,
		},
	]

	const [allEvents, setAllEvents] = useState(eventsArray)
	const [currentEvent, setCurrentEvent] = useState()
	const [shouldUpdate, setShouldUpdate] = useState(false)
	const [blockLeave, setBlock] = useState(false)
	const [showSideEditor, setSideEditor] = useState(false)
	const [eventToEdit, setEventToEdit] = useState(10000)
	const [displayLayer, setDisplayLayer] = useState(0)
	const [videoLength, setVideoLength] = useState(0)
	const [videoCurrentTime, setCurrentTime] = useState(0)

	// const [tab, setTab] = useState(`events`)
	const [timelineMinimized, setTimelineMinimized] = useState(false)
	const [eventListMinimized, setEventListMinimized] = useState(false)
	const [layerWidth, setWidth] = useState(0)
	const [zoomFactor, setZoomFactor] = useState(0)
	const [annotationsSaved, setSaved] = useState(false)
	const [scrollBarWidth, setScrollBar] = useState(0)
	const [editCensor, setEditCensor] = useState({})
	const [activeCensorPosition,setActiveCensorPosition] = useState(-1)
	const [isLoading,setIsLoading] = useState(false)
	// refs
	// console.log(videoCurrentTime)

	useEffect(() => {
		function handleResize() {
			setZoomFactor(0)
			setWidth(0)
			setZoomFactor(1)
			setWidth(1)
		}
		window.addEventListener(`resize`, handleResize)
		setAllEvents(eventsArray)
		setEvents(allEvents)

		if(blockLeave)
			window.onbeforeunload = () => true
		else
			window.onbeforeunload = undefined

		return () => {
			window.onbeforeunload = undefined
		}
	}, [eventsArray, blockLeave])

	// end of useEffect

	if(shouldUpdate === true)
		setShouldUpdate(false)

	const togglendTimeline = () => {
		setTimelineMinimized(!timelineMinimized)
	}

	const getVideoDuration = (duration) => {
		setVideoLength(duration)
	}

	const addEventHandler = (item, index) => {
		addEventToLayer(item, index, videoCurrentTime)
		setBlock(true)
	}

	const addEventToLayer = (item, index, startPercentage) => {

		let currentEvents = []
		if(allEvents !== undefined)
			currentEvents = [...allEvents]
		const matchingEvent = filterValue(events, `type`, item)

		const eventObj = {
			...matchingEvent,
			layer: index,
		}

		eventObj.start = Number(startPercentage)
		eventObj.end = Number(startPercentage) + 10

		setCurrentTime(Number(startPercentage)+10)
		currentEvents.push(eventObj)
		// setAllEvents(currentEvents)
		// setDisplayLayer(index)
		setCurrentEvent(eventObj)

		const eventIndex = currentEvents.length-1 < 0 ? 0 : currentEvents.length-1
		updateEvents(eventIndex, eventObj, displayLayer)
	}

	const updateEvents = (index, event, layerIndex, side) => {

		let canAccessDom = false
		if(showSideEditor && eventListMinimized === false && document.getElementById(`sideTabMessage`)){
			canAccessDom = true
			document.getElementById(`sideTabMessage`).style.color=`red`
		}

		const currentEvents = [...allEvents]
		try {
			if(side === `beg`) {
				if(event.start.match(/\d{2}:\d{2}\.\d{2}/))
					event.start = covertToSeconds(event.start)
				else
					canAccessDom = false

			} else if(side === `end`) {
				if(event.end.match(/\d{2}:\d{2}\.\d{2}/))
					event.end = covertToSeconds(event.end)
				else
					canAccessDom = false

			}
		} catch (e) {
			console.log(`catch`)
		}

		// check start event times
		if(event.start < 0){
			event.start = 0
			if(canAccessDom)
				document.getElementById(`sideTabExplanation`).innerText=`Changed start time to 0`

		} else if(event.start >= videoLength) {
			// event.start = 95
			// event.end = 100
			if(canAccessDom)
				document.getElementById(`sideTabExplanation`).innerHTML=`Start time cannot be larger than ${videoLength} <br/> Changed values to match criteria`

		} else if(event.start > event.end){
			if(canAccessDom)
				document.getElementById(`sideTabExplanation`).innerHTML=`Start time cannot be larger than end time <br/> Change values to match criteria`
		}

		// check end event times
		if(event.end <= event.start){
			if(canAccessDom){
				document.getElementsByClassName(`sideTabInput`)[1].value=event.end
				document.getElementById(`sideTabMessage`).innerHTML=`Please, enter a number bigger than star time`
			}
		} else if(event.end > videoLength){
			// event.end = 100
			if(canAccessDom){
				document.getElementById(`sideTabMessage`).innerHTML=`Please, enter a number less than ${videoLength}`
				document.getElementById(`sideTabExplanation`).innerHTML=`End time cannot be larger than ${videoLength} <br/> Change value to ${videoLength} or less`
			}
		}

		if(event.start >= 0 && event.start < event.end && event.end <= videoLength){
			if(canAccessDom){
				document.getElementById(`sideTabMessage`).style.color=`green`
				document.getElementById(`sideTabMessage`).innerHTML=`Start and end times have been updated correctly`
				document.getElementById(`sideTabExplanation`).innerHTML=``
			}
		}

		currentEvents[index] = event

		// wait til events are set up
		setTimeout(() => {
			setAllEvents(currentEvents)
		}, 100)

		setEvents(currentEvents)
		setDisplayLayer(layerIndex)
		setEventToEdit(index)
		setSideEditor(true)
		setBlock(true)
	}
	const covertToSeconds = (time) => {
		const t = time.split(`:`)
		const s = t[1].split(`.`)
		return Number(+t[0]) * 60 + Number(s[0]) + Number(+s[1]) * 0.01
	}

	const deleteEvent = () => {
		const currentEvents = [...allEvents]
		currentEvents.splice(eventToEdit, 1)

		setAllEvents(currentEvents)
		setEvents(currentEvents)
		setEventToEdit(1000)
		setSideEditor(false)
		setBlock(true)
	}

	const handleCensorRemove = (item) => {
		const index = eventToEdit
		const cEvent = allEvents[index]
		const layer = cEvent.layer
		const posprev = Object.keys(cEvent[`position`]).filter(val => parseFloat(cEvent.position[val]) < parseFloat(cEvent.position[item])).sort((a,b)=>parseFloat(cEvent.position[b])-parseFloat(cEvent.position[a]))[0]
		const posnex = Object.keys(cEvent[`position`]).filter(val => parseFloat(cEvent.position[val]) > parseFloat(cEvent.position[item])).sort((a,b)=>parseFloat(cEvent.position[a])-parseFloat(cEvent.position[b]))[0]
		setActiveCensorPosition(posprev && posnex ? posprev? posprev:posnex:-1)
		delete cEvent.position[item]
		updateEvents(index, cEvent, layer)
	}

	const handleAddCensor = () => {
		const time = videoCurrentTime
		if(eventToEdit < allEvents.length && allEvents[eventToEdit].type === `Censor`){
			const index = eventToEdit
			const cEvent = allEvents[index]
			const layer = cEvent.layer
			const pos = cEvent.position
			const id = Object.keys(pos).length === 0 ? `0` : `${parseInt(Object.keys(pos).sort((a,b)=> parseFloat(b) - parseFloat(a))[0]) + 1}`
			let exists = false
			Object.keys(pos).forEach((val)=>{
				if (pos[val][0].toString() === parseFloat(time).toFixed(1).toString()) exists = true
			})
			if(exists) return

			cEvent.position[id] = [`${parseFloat(time).toFixed(1)}`,50, 50, 30, 40]
			updateEvents(index, cEvent, layer)
		}
	}

	const handleEditCensor = (e, item, int) => {
		const object = editCensor
		const index = eventToEdit
		const cEvent = allEvents[index]
		const layer = cEvent.layer
		const pos = cEvent.position
		const value = parseFloat(e.target.value).toFixed(1)

		switch (int) {
		case 1:
			pos[item][0] = value
			break
		case 2:
			pos[item][1] = value
			break
		case 3:
			pos[item][2] = value
			break
		case 4:
			pos[item][3] = value
			break
		case 5:
			pos[item][3] = value
			break
		default:
			break
		}
		cEvent.position = pos
		updateEvents(index, cEvent, layer)
		setEditCensor(object)
	}

	const handleSaveCensor = () => {
		const index = eventToEdit
		const cEvent = allEvents[index]
		const layer = cEvent.layer

		cEvent.position = editCensor
		updateEvents(index, cEvent, layer)
	}
	// THIS IS PART OF CENSOR
	const handleLastClick = (height, width, x, y, time) => {

		if(eventToEdit < allEvents.length && allEvents[eventToEdit].type === `Censor`){

			const index = eventToEdit
			const cEvent = allEvents[index]
			const layer = cEvent.layer
			const pos = cEvent.position
			const id = Object.keys(pos).length === 0 ? `0` : `${parseInt(Object.keys(pos).sort((a,b)=> parseFloat(b) - parseFloat(a))[0]) + 1}`

			let exists = false
			Object.keys(pos).forEach((val)=>{
				if (pos[val][0].toString() === time.toFixed(1).toString()) exists = true
			})
			if(exists){
				const existId = Object.keys(cEvent.position).find(val => cEvent.position[val][0] === `${time.toFixed(1)}`)
				cEvent.position[`${existId}`] = [`${time.toFixed(1)}`,x / width * 100, (y-86) / height * 100, cEvent.position[`${existId}`][3], cEvent.position[`${existId}`][4]]
			} else
				cEvent.position[`${id}`] = [`${time.toFixed(1)}`,x / width * 100, (y-86) / height * 100, 30, 40]

			updateEvents(index, cEvent, layer)
		}
	}

	const openSideEditor = (layerIndex, eventIndex) => {
		if(eventIndex !== eventToEdit)
			setActiveCensorPosition(-1)

		setEventToEdit(eventIndex)
		setDisplayLayer(layerIndex)
		setSideEditor(true)
	}

	const closeSideEditor = () => {
		setSideEditor(false)
		setActiveCensorPosition(-1)
	}

	const filterValue = (obj, key, value) => {
		return obj.find((v) => {
			return v[key] === value
		})
	}

	const handleSaveAnnotation = async () => {
		setIsLoading(true)
		content.settings.annotationDocument = [...allEvents]
		await updateContent(content)
		setBlock(false)
		setIsLoading(false)
	}

	const handleZoomChange = (e, d) => {
		toggleTip()
		if(d.x < zoomFactor){
			if(d.x === 0){
				setZoomFactor(0)
				setWidth(0)
				handleScrollFactor(`start`)
			} else {
				setZoomFactor(d.x)
				setWidth(-(Math.abs(zoomFactor - d.x) * videoLength / 10))
			}
		} else if(d.x > zoomFactor) {
			setZoomFactor(d.x)
			setWidth(Math.abs(zoomFactor - d.x) * videoLength / 10)
		}
		setScrollBar(document.getElementsByClassName(`layer-container`)[0].clientWidth * 100 / document.getElementsByClassName(`events`)[0].clientWidth)
	}

	const handleScrollFactor = (direction) => {
		if(document.getElementsByClassName(`layer-container`) !== undefined){
			const scrubber = document.getElementById(`time-bar`)
			const timeIndicator = document.getElementById(`time-indicator-container`)
			const alllayers = Array.from(document.getElementsByClassName(`layer-container`))
			const currentLayerWidth = document.getElementsByClassName(`events`)[0].clientWidth
			const scrollBarContainer = document.getElementsByClassName(`zoom-scroll-container`)[0].offsetWidth

			const dis = direction/scrollBarContainer
			scrubber.scrollLeft = currentLayerWidth * dis
			timeIndicator.scrollLeft = currentLayerWidth * dis

			alllayers.forEach((element, i) => {
				alllayers[i].scrollLeft = currentLayerWidth * dis
			})
		}
	}
	const checkSideBarTitle = () => {
		try {
			const title = allEvents[eventToEdit].type
			return title
		} catch (error) {
			return ``
		}
	}
	const setCurrentTimePercentage = (time) => {
		const seconds = time * videoLength
		setCurrentTime(seconds)
	}

	const checkEvent = () => {
		return allEvents[eventToEdit] !== undefined ? allEvents[eventToEdit] : currentEvent
	}

	return (
		<Style>
			<DndProvider backend={Backend}>

				<span style={{ zIndex: 0 }}>
					<VideoContainer
						className='video'
						url={props.viewstate.url}
						handlers={togglendTimeline}
						getDuration={getVideoDuration}
						getVideoTime={setCurrentTimePercentage} // set current time
						minimized={timelineMinimized}
						togglendTimeline={togglendTimeline}
						handleLastClick = {handleLastClick}
						events = {allEvents}
						updateEvents={updateEvents}
						eventToEdit={eventToEdit}
						activeCensorPosition = {activeCensorPosition}
						setActiveCensorPosition = {setActiveCensorPosition}
						editorType={`video`}
					>
					</VideoContainer>
					<Timeline minimized={timelineMinimized} zoom={scrollBarWidth}>

						<section>
							<div className='event-layers'>

								{layers.map((layer, index) => (
									<div className={`layer`} key={index}>
										<div className={`handle`} onClick={() => setDisplayLayer(index)}>
											<EventCard event={events[index]} key={index}/>
											<PlusIcon className={`plusIcon`} onClick={ e => addEventHandler(layer[index], index)}/>
										</div>

										<TrackLayer
											videoLength={videoLength}
											minimized={eventListMinimized}
											width={layerWidth}
											events={allEvents}
											activeEvent={eventToEdit}
											index={index}
											// onDrop={(item) => eventDropHandler(item,index)}
											sideEditor={openSideEditor}
											updateEvents={updateEvents}
											closeEditor={closeSideEditor}
											displayLayer={displayLayer}
										/>
									</div>
								))}
							</div>
						</section>

						<div className='zoom-controls'>
							{/* ADD ZOOM ICON */}
							<div className='zoom-factor' id = 'zoom-factor'
								onClick={(e)=>{
								}}
								style={{ visibility: `${timelineMinimized ? ` hidden` : `initial`}`}}>
								<img src={zoomOut} style={{ width: `20px` }}/>
								<Rnd
									className={`zoom-indicator`}
									bounds={`parent`}
									enableResizing={{top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}
									dragAxis='x'
									onDragStop={(e, d) => handleZoomChange(e, d)}
									onMouseEnter={e => handleShowTip(`te-zoom`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
									onMouseLeave={e => toggleTip()}
								></Rnd>
								<img src={zoomIn} style={{ float: `right`, width: `20px`}}/>
							</div>

							<div className='zoom-scroll' style={{ visibility: `${timelineMinimized ? ` hidden` : `initial`}`}}>

								<div style={{ width: `90%`, height: `100%`, display: `flex`, marginLeft: `5%` }}>
									<span onClick={ e => handleScrollFactor(`start`) } style={{ margin: `auto` }}
										onMouseEnter={e => handleShowTip(`te-scroll-start`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y + 10, width: e.currentTarget.offsetWidth})}
										onMouseLeave={e => toggleTip()}
									><img src={llIcon}/></span>
									<span onClick={ e => handleScrollFactor(`left`) } style={{ margin: `auto` }}
										onMouseEnter={e => handleShowTip(`te-scroll-left`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y + 10, width: e.currentTarget.offsetWidth})}
										onMouseLeave={e => toggleTip()}><img src={lIcon}/></span>

									<div className={`zoom-scroll-container`}>
										<Rnd
											className= 'zoom-scroll-indicator'
											size={{width:scrollBarWidth !== 0 ? `${scrollBarWidth}%` : `100%`, height: `100%`}}
											enableResizing={{top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}
											bounds = {`parent`}
											onDragStop = {(e,d)=>{
												handleScrollFactor(d.x)
											}}
										>
										</Rnd>
									</div>

									<span onClick={ e => handleScrollFactor(`right`) } style={{ margin: `auto` }}
										onMouseEnter={e => handleShowTip(`te-scroll-right`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y+ 10, width: e.currentTarget.offsetWidth})}
										onMouseLeave={e => toggleTip()}><img src={rIcon}/></span>
									<span onClick={ e => handleScrollFactor(`end`) } style={{ margin: `auto` }}
										onMouseEnter={e => handleShowTip(`te-scroll-end`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y + 10, width: e.currentTarget.offsetWidth})}
										onMouseLeave={e => toggleTip()}><img src={rrIcon}/></span>
								</div>

								<div id={`time-indicator-container`}>
									<div id={`layer-time-indicator`}>
										<span id={`layer-time-indicator-line`}></span>
									</div>
								</div>
							</div>
						</div>
					</Timeline>

				</span>

				<EventEditor minimized={eventListMinimized}>
					<header>
						<img src={helpIcon} onClick={handleShowHelp} style={{marginLeft:10,marginTop:15}}/>
						<div className={`save`}>
							<button onClick={handleSaveAnnotation}>

								{blockLeave ?
									null
									:
									isLoading ?
										<i className='fa fa-refresh fa-spin'/>
										:
										<i className='fa fa-check'></i>
								}
								<span>Save</span>
							</button>
						</div>
					</header>

					<>
						<div className='breadcrumbs'>
							{ showSideEditor &&
								<>
									<>
										<span className='current'>{allEvents !== []? `${checkSideBarTitle()}` : ``}</span>
										<button className='deleteEventButton' onClick={deleteEvent}>Delete Event</button>
									</>
								</>
							}
						</div>

						{ showSideEditor !== false && eventListMinimized !== true ?
							<TrackEditorSideMenu
								singleEvent={checkEvent()}
								videoLength={videoLength}
								closeSideEditor={closeSideEditor}
								updateEvents={updateEvents}
								editCensor = {editCensor}
								index={eventToEdit}
								handleEditCensor = {handleEditCensor}
								handleCensorRemove = {handleCensorRemove}
								handleAddCensor = {handleAddCensor}
								handleSaveCensor = {handleSaveCensor}
								activeCensorPosition = {activeCensorPosition}
								setActiveCensorPosition = {setActiveCensorPosition}
							></TrackEditorSideMenu>
							:
							<></>
						}
					</>
				</EventEditor>
			</DndProvider>

			<>
				<AnnotationMessage style={{ visibility: `${annotationsSaved ? `visible` : `hidden`}`, opacity: `${annotationsSaved ? `1` : `0`}` }}>
					<img src={closeIcon} width='20' height='20' onClick={ e => setSaved(false)}/>
					{
						contentError !== `` ? (
							<h2 id='error'>
								<span>Content failed with: {contentError}</span><br/><br/>
							</h2>
						) : (
							<h2 id='success'>Annotations saved successfully</h2>
						)
					}
				</AnnotationMessage>
				<Prompt
					when={blockLeave}
					message='Have you saved your changes already?'
				/>
			</>
		</Style>
	)
}

export default VideoEditor
