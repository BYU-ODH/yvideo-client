import React, { useState, useEffect } from 'react'
// import { Prompt } from 'react-router'
import { Rnd } from 'react-rnd'

import {useCallbackPrompt} from '../../../hooks/useCallbackPrompt'
import { EventCard, TrackEditorSideMenu } from 'components/bits'
import { TrackLayer, VideoContainer } from 'components'
import { convertToSeconds } from '../../common/timeConversion'
import Style, { Timeline, EventEditor, PlusIcon } from './styles'
// import {DialogBox} from '../../../modals/components'

import skipIcon from 'assets/event_skip.svg'
import muteIcon from 'assets/event_mute.svg'
import pauseIcon from 'assets/event_pause.svg'
import censorIcon from 'assets/event_censor.svg'
import blankIcon from 'assets/event_blank.svg'
import commentIcon from 'assets/event_comment.svg'

import zoomIn from 'assets/te-zoom-in.svg'
import zoomOut from 'assets/te-zoom-out.svg'
import helpIcon from 'assets/te-help-circle-white.svg'

// ICONS FOR THE EVENTS CAN BE FOUND AT https://feathericons.com/
const VideoEditor = props => {

	const { setEvents, updateContent } = props

	const {
		eventsArray,
		content,
		url,
		aspectRatio,
	} = props.viewstate

	const { handleShowTip, toggleTip, handleShowHelp, handleNavigation } = props.handlers
	const layers = [{0: `Skip`}, {1: `Mute`}, {2: `Pause`},{3: `Comment`}, {4: `Censor`}, {5: `Blank`}]

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
			message: ``,
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
	const [isReady, setIsReady] = useState(false)
	const [eventSeek, setEventSeek] = useState(false)
	const [eventPosition, setEventPosition] = useState(0)
	const [showPrompt, confirmNavigation, cancelNavigation] =
		useCallbackPrompt(blockLeave)

	// eslint-disable-next-line no-unused-vars
	const [timelineMinimized, setTimelineMinimized] = useState(false)
	// eslint-disable-next-line no-unused-vars
	const [eventListMinimized, setEventListMinimized] = useState(false)
	const [layerWidth, setWidth] = useState(0)
	const [zoomFactor, setZoomFactor] = useState(0)
	// eslint-disable-next-line no-unused-vars
	const [scrollBarWidth, setScrollBar] = useState(0)
	const [editCensor, setEditCensor] = useState({})
	const [activeCensorPosition,setActiveCensorPosition] = useState(-1)
	const [isLoading,setIsLoading] = useState(false)
	const [disableSave, setDisableSave] = useState(false)

	// refs
	useEffect(() => {
		if (showPrompt)
			handleNavigation(confirmNavigation, cancelNavigation)
	}, [showPrompt])

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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventsArray, blockLeave])

	// end of useEffect

	if(shouldUpdate === true)
		setShouldUpdate(false)

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

		// this has to be changed as min/sec frame
		eventObj.start = Number(startPercentage)
		eventObj.end = Number(startPercentage) + eventObj.end
		currentEvents.push(eventObj)
		setCurrentEvent(eventObj)

		const eventIndex = currentEvents.length-1 < 0 ? 0 : currentEvents.length-1
		updateEvents(eventIndex, eventObj, displayLayer)
	}

	const runTimeCheck = (side,event,type) => {
		let canAccessDom = false
		try {
			if(side === `beg`) {
				if(event.start.match(/^\d{2}:\d{2}\.\d{2}/) !== null || event.start.match(/^\d{1}:\d{2}:\d{2}\.\d{2}/) !== null || type === `onBlur`)
					event.start = convertToSeconds(event.start, videoLength)
				else {
					// document.getElementById(`sideTabMessage`).innerHTML=`Wrong format`
					canAccessDom=false
				}

			} else if(side === `end`) {
				if(event.end.match(/^\d{2}:\d{2}\.\d{2}/) !== null || event.end.match(/^\d{1}:\d{2}:\d{2}\.\d{2}/) !== null || type === `onBlur`)
					event.end = convertToSeconds(event.end, videoLength)
				else {
					// document.getElementById(`sideTabMessage`).innerHTML=`Wrong format`
					canAccessDom=false
				}
			}
		} catch (e) {
			console.log(`catch`) // eslint-disable-line no-console
		}

		// check start event times
		if(event.start < 0){
			event.start = 0
			if(canAccessDom)
				document.getElementById(`sideTabExplanation`).innerText=`Changed start time to 0`

		} else if(event.start >= videoLength) {
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
				document.getElementById(`sideTabMessage`).innerHTML=`Please, enter a number bigger than start time`
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
				setDisableSave(false)
			}
		} else
			setDisableSave(true)

	}

	const runPauseTimeCheck = (side, event, type) => {
		let canAccessDom = false
		try {
			if(side === `beg`) {
				if(event.start.match(/^\d{2}:\d{2}\.\d{2}/) !== null || event.start.match(/^\d{1}:\d{2}:\d{2}\.\d{2}/) !== null || type === `onBlur`)
					event.start = convertToSeconds(event.start, videoLength)
				else {
					// document.getElementById(`sideTabMessage`).innerHTML=`Wrong format`
					canAccessDom=false
				}

			}
		} catch (e) {
			console.log(`catch`) // eslint-disable-line no-console
		}
		if(event.start < 0){
			event.start = 0
			if(canAccessDom)
				document.getElementById(`sideTabExplanation`).innerText=`Changed start time to 0`

		} else if(event.start >= videoLength) {
			if(canAccessDom)
				document.getElementById(`sideTabExplanation`).innerHTML=`Start time cannot be larger than ${videoLength} <br/> Changed values to match criteria`

		}
		if(event.start >= 0 && event.start < videoLength){
			if(canAccessDom){
				document.getElementById(`sideTabMessage`).style.color=`green`
				document.getElementById(`sideTabMessage`).innerHTML=`Start and end times have been updated correctly`
				document.getElementById(`sideTabExplanation`).innerHTML=``
				setDisableSave(false)
			}
		} else
			setDisableSave(true)

	}

	const updateEvents = (index, event, layerIndex, side, type) => {

		let canAccessDom = false
		if(showSideEditor && eventListMinimized === false && document.getElementById(`sideTabMessage`)){
			canAccessDom = true // eslint-disable-line no-unused-vars
			document.getElementById(`sideTabMessage`).style.color=`red`
		}

		const currentEvents = [...allEvents]
		if(event.type === `Pause`)
			runPauseTimeCheck(side,event,type)
		else
			runTimeCheck(side,event,type)

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
		const posPrev =
			Object.keys(cEvent[`position`]).filter(val => parseFloat(cEvent.position[val]) < parseFloat(cEvent.position[item])).sort((a,b) =>
				parseFloat(cEvent.position[b]) - parseFloat(cEvent.position[a]))[0]

		const posNext =
			Object.keys(cEvent[`position`]).filter(val => parseFloat(cEvent.position[val]) > parseFloat(cEvent.position[item])).sort((a,b)=>
				parseFloat(cEvent.position[a])-parseFloat(cEvent.position[b]))[0]

		setActiveCensorPosition(posPrev && posNext ?
			posPrev ?
				posPrev
				: posNext
			: -1,
		)
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
			const id = Object.keys(pos).length !== 0 ?
				`${parseInt(Object.keys(pos).sort((a,b)=> parseFloat(b) - parseFloat(a))[0]) + 1}`
				: `0`
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

		// 0 by default is the actual time of the video when the censor is added
		switch (int) {
		case 1: // x in %
			pos[item][1] = value
			break
		case 2: // y in %
			pos[item][2] = value
			break
		case 3: // width in %
			pos[item][3] = value
			break
		case 4: // height in %
			pos[item][4] = value
			break
		default:
			break
		}
		cEvent.position = pos
		updateEvents(index, cEvent, layer)
		setEditCensor(object)
	}

	// THIS IS PART OF CENSOR
	const handleLastClick = (height, width, x, y, time) => {
		const newWidth = 30
		const newHeight = 40
		if(eventToEdit < allEvents.length && allEvents[eventToEdit].type === `Censor`){

			const index = eventToEdit
			const cEvent = allEvents[index]
			const layer = cEvent.layer
			const pos = cEvent.position
			const id = Object.keys(pos).length !== 0 ?
				`${parseInt(Object.keys(pos).sort((a,b)=> parseFloat(b) - parseFloat(a))[0]) + 1}`
				: `0`

			let exists = false
			Object.keys(pos).forEach((val)=>{
				if (pos[val][0].toString() === time.toFixed(1).toString()) exists = true
			})
			if(exists){
				const existId = Object.keys(cEvent.position).find(val => cEvent.position[val][0] === `${time.toFixed(1)}`)
				cEvent.position[`${existId}`] = [`${time.toFixed(1)}`,x / width * 100, (y-86) / height * 100, cEvent.position[`${existId}`][3], cEvent.position[`${existId}`][4]]
			} else{
				let newX = x / width * 100
				let newY = (y - 86) / height * 100
				let w = newWidth
				let h = newHeight
				if(newX - newWidth / 2 < 0){
					newX = (newX + newWidth / 2) / 2
					w = newX * 2
				}
				if(newX + newWidth / 2 > 100){
					newX = 100 - (100 - newX + newWidth / 2) / 2
					w = (100 - newX) * 2
				}
				if (newY - newHeight / 2 < 0){
					newY = (newY + newWidth / 2) / 2
					h = newY * 2
				}
				if(newY+newHeight / 2 > 100){
					newY = 100 - (100 - newY + newHeight / 2) / 2
					h = (100 - newY) * 2
				}
				cEvent.position[`${id}`] = [`${time.toFixed(1)}`, newX, newY, w, h]
			}
			updateEvents(index, cEvent, layer)
		}
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
		allEvents.forEach((event) => {
			if(event.halfLayer)
				delete event.halfLayer

		})
		content.settings.annotationDocument = [...allEvents]
		await updateContent(content)
		setBlock(false)
		setIsLoading(false)
	}

	const handleExportAnnotation = () => {
		const jsonData = []
		for (let e=0; e < allEvents.length; e++) {
			if (allEvents[e].type !== `Censor`){
				const data = {"options": {
					"end": allEvents[e].end,
					"start": allEvents[e].start,
					"type": allEvents[e].type,
					"details": `{}`,
				},
				}
				jsonData.push(data)
			} else if (allEvents[e].type === `Censor`){
				let censorPositionData = {}
				for(const value of Object.values(allEvents[e].position)) {
					const time = value[0]
					const pos = value.slice(1)
					censorPositionData[time] = pos
				}
				const data = {"options": {
					"start": allEvents[e].start,
					"end": allEvents[e].end,
					"type": allEvents[e].type,
					"details": {
						"type": `blur`,
						"interpolate": true,
						"position": censorPositionData,
					},
				},
				}
				jsonData.push(data)
				censorPositionData = {}
			}
		}
		const json = JSON.stringify(jsonData)
		const blob = new Blob([json], {type: `application/json`})
		// get the current website url
		// create a link pointing to the blob or binary object
		const link = URL.createObjectURL(blob)
		// create an anchor element to open the link we created
		const a = document.createElement(`a`)
		// trigger download and append file name
		a.download = `${content.name}_annotations.json`
		a.href = link
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
	}

	const handleZoomChange = (e, d) => {
		toggleTip()
		if(d.x < zoomFactor){
			if(d.x === 0){
				setZoomFactor(0)
				setWidth(0)
				handleScrollFactor(0)
			} else {
				setZoomFactor(d.x)
				setWidth(-(Math.abs(zoomFactor - d.x) * videoLength / 10))
			}
		} else if(d.x > zoomFactor) {
			setZoomFactor(d.x)
			setWidth(Math.abs(zoomFactor - d.x) * videoLength / 10)
		}
		handleScrollFactor(videoCurrentTime * .95 / videoLength, true)
		const tempOnload = window.onload
		window.onload = () => {
			if(document.getElementsByClassName(`layer-container`)[0]&&document.getElementsByClassName(`events`)[0])
				setScrollBar(document.getElementsByClassName(`layer-container`)[0].clientWidth * 100 / document.getElementsByClassName(`events`)[0].clientWidth)
			window.onload = tempOnload
		}

	}
	const handleScrollFactor = (direction, zoom) => {
		if(document.getElementsByClassName(`layer-container`) !== undefined){
			const scrubber = document.getElementById(`time-bar`)
			const scrubberShadow = document.getElementById(`time-bar-shadow`) // eslint-disable-line no-unused-vars
			const timeIndicator = document.getElementById(`time-indicator-container`)
			const allLayers = Array.from(document.getElementsByClassName(`layer-container`))
			const currentLayerWidth = document.getElementsByClassName(`events`)[0].clientWidth
			// if(document.getElementsByClassName(`events`).length > 1)
			// 	currentLayerWidth = document.getElementsByClassName(`events`)[0].clientWidth
			// else
			// 	currentLayerWidth = document.getElementsByClassName(`events`).clientWidth

			// if(!zoom){
			// 	scrubber.scrollLeft = scrubber.scrollLeft + currentLayerWidth * direction
			// 	timeIndicator.scrollLeft = timeIndicator.scrollLeft + currentLayerWidth * direction

			// 	allLayers.forEach((element, i) => {
			// 		allLayers[i].scrollLeft = allLayers[i].scrollLeft + currentLayerWidth * direction
			// 	})
			// } else {
			// 	scrubber.scrollLeft = currentLayerWidth * direction
			// 	timeIndicator.scrollLeft = currentLayerWidth * direction

			// 	allLayers.forEach((element, i) => {
			// 		allLayers[i].scrollLeft = currentLayerWidth * direction
			// 	})
			// }
			const scrollBarContainer = document.getElementById(`zoom-scroll-container`).offsetWidth

			const dis = direction/scrollBarContainer
			scrubber.scrollLeft = currentLayerWidth * dis
			timeIndicator.scrollLeft = currentLayerWidth * dis

			allLayers.forEach((element, i) => {
				allLayers[i].scrollLeft = currentLayerWidth * dis
			})
		}
	}

	const checkSideBarTitle = () => {
		try {
			const title = allEvents[eventToEdit].type === `Censor` ? `Blur` : allEvents[eventToEdit].type
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

	const handleEventPosition = (position) => {
		setEventPosition(position)
	}

	return (
		<Style id='video-editor'>
			<span style={{ zIndex: 0 }}>
				<VideoContainer
					className='video'
					isReady ={isReady}
					setIsReady={setIsReady}
					url={url}
					getDuration={getVideoDuration}
					getVideoTime={setCurrentTimePercentage} // set current time
					handleLastClick = {handleLastClick}
					handleScroll = {handleScrollFactor}
					events = {allEvents}
					updateEvents={updateEvents}
					eventToEdit={eventToEdit}
					activeCensorPosition = {activeCensorPosition}
					setActiveCensorPosition = {setActiveCensorPosition}
					editorType={`video`}
					aspectRatio={aspectRatio}
					eventSeek={eventSeek}
					setEventSeek={setEventSeek}
					eventPosition={eventPosition}
				></VideoContainer>

				<Timeline minimized={timelineMinimized} zoom={scrollBarWidth}>

					<section>
						<div className='event-layers' id='layers-component'>

							{layers.map((layer, index) => (
								<div id={`layer-${index}`} className={`layer`} key={index}>
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
										updateEvents={updateEvents}
										displayLayer={displayLayer}
										handleEventPosition={handleEventPosition}
										setEventSeek={setEventSeek}
									/>
								</div>
							))}
						</div>
					</section>

					<div className='zoom-controls'>
						{/* ADD ZOOM ICON */}
						<div className='zoom-factor' id = 'zoom-factor'>
							<img src={zoomOut} alt='' style={{ width: `20px` }}/>
							<Rnd
								className={`zoom-indicator`}
								bounds={`parent`}
								enableResizing={{top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}
								dragAxis='x'
								onDragStop={(e, d) => handleZoomChange(e, d)}
								onMouseEnter={e => handleShowTip(`te-zoom`,
									{
										x: e.target.getBoundingClientRect().x,
										y: e.target.getBoundingClientRect().y,
										width: e.currentTarget.offsetWidth,
									})
								}
								onMouseLeave={() => toggleTip()}
							></Rnd>
							<img src={zoomIn} alt='' style={{ float: `right`, width: `20px`}}/>
						</div>

						<div className='zoom-scroll'>
							<div style={{ width: `100%`, height: `100%`, display: `flex` }}>
								<div id={`zoom-scroll-container`} className={`zoom-scroll-container`}>
									<Rnd
										className= 'zoom-scroll-indicator'
										size={{width:scrollBarWidth !== 0 ? `${scrollBarWidth}%` : `100%`, height: `100%`}}
										enableResizing={{top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}
										bounds = {`parent`}
										onDrag = {(e,d)=>{
											handleScrollFactor(d.x)
										}}
									>
									</Rnd>
								</div>
							</div>

							<div id={`time-indicator-container`}>
								<div id={`layer-time-indicator`}>
									<span id={`layer-time-indicator-line`}></span>
									<span id={`layer-time-indicator-line-shadow`}></span>
								</div>
							</div>
						</div>
					</div>
				</Timeline>
			</span>

			<EventEditor id='EventEditor' minimized={eventListMinimized} show ={showSideEditor}>
				<header>
					<img
						src={helpIcon}
						alt={`helpIcon`}
						onClick={handleShowHelp}
						onMouseEnter={e => handleShowTip(`help`,
							{
								x: e.target.getBoundingClientRect().x,
								y: e.target.getBoundingClientRect().y + 10,
								width: e.currentTarget.offsetWidth,
							})
						}
						onMouseLeave={() => toggleTip()}
						style={{marginLeft:10,marginTop:15}}
					/>
					<div className={`save`}>
						{disableSave ?
							<button className={`disable`}>
								<span>Save</span>
							</button>
							:
							<button className={`handleSaveAnnotation`} onClick={handleSaveAnnotation}>
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
						}
					</div>
					<div className={`save`}>
						{!disableSave && !blockLeave && !isLoading ?
							<button className={`handleExportAnnotation`} onClick={handleExportAnnotation}>
								<span>Export</span>
							</button>
							:
							null
						}
					</div>
				</header>

				<>
					<div className='breadcrumbs'>
						{ showSideEditor &&
								<>
									<>
										<span className='current'>{allEvents !== [] ? `${checkSideBarTitle()}` : ``}</span>
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
							activeCensorPosition = {activeCensorPosition}
							setActiveCensorPosition = {setActiveCensorPosition}
							toggleTip={toggleTip}
							handleShowTip={handleShowTip}
							setEventSeek = {setEventSeek}
							handleEventPosition = {handleEventPosition}
						></TrackEditorSideMenu>
						:
						<></>
					}
				</>
			</EventEditor>

			<>
				{/* <Prompt
					when={blockLeave}
					message='If you leave you will lose all your changes. Are you sure to leave without saving?'
				/> */}
			</>
		</Style>
	)
}

export default VideoEditor
