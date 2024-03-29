import React, { useState, useEffect } from 'react'
import { Rnd } from 'react-rnd'

import { useCallbackPrompt } from '../../../hooks/useCallbackPrompt'
import { EventCard, TrackEditorSideMenu } from 'components/bits'
import { TrackLayer, VideoContainer } from 'components'
import { convertSecondsToHMS, convertToSeconds } from '../../common/timeConversion'
import { handleScrollFactor, debouncedOnDrag, handleZoomEandD, getParameters, updateZoom } from '../../common/editorCommon'
import Style, { Timeline, EventEditor, PlusIcon } from './styles'

import skipIcon from 'assets/event_skip.svg'
import muteIcon from 'assets/event_mute.svg'
import pauseIcon from 'assets/event_pause.svg'
import censorIcon from 'assets/event_censor.svg'
import blankIcon from 'assets/event_blank.svg'
import commentIcon from 'assets/event_comment.svg'
import zoomIn from 'assets/te-zoom-in.svg'
import zoomOut from 'assets/te-zoom-out.svg'
import helpIcon from 'assets/te-help-circle-white.svg'
import Swal from 'sweetalert2'

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
	const [elapsed, setElapsed] = useState(0)
	const [eventCount, setEventCount] = useState(0)
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

	const [layerWidth, setWidth] = useState(0)
	const [scrollBarWidth, setScrollBar] = useState(100)
	const [editCensor, setEditCensor] = useState({})
	const [activeCensorPosition, setActiveCensorPosition] = useState(-1)
	const [isLoading, setIsLoading] = useState(false)
	const [disableSave, setDisableSave] = useState(false)
	const [isReplace, setIsReplace] = useState(false)

	// refs
	useEffect(() => {
		if (showPrompt)
			handleNavigation(confirmNavigation, cancelNavigation)
			// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showPrompt])

	useEffect(() => {
		function handleResize() {
			setWidth(0)
			setWidth(1)
		}
		window.addEventListener(`resize`, handleResize)
		setAllEvents(eventsArray)
		setEvents(allEvents)
		getParameters(videoLength, setWidth, videoCurrentTime, setScrollBar, document.getElementsByClassName(`events-box`))

		setEventCount(events.length)

		if(blockLeave)
			window.onbeforeunload = () => true
		else
			window.onbeforeunload = undefined

		return () => {
			window.onbeforeunload = undefined
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventsArray, blockLeave, videoLength])

	// end of useEffect

	if(shouldUpdate === true)
		setShouldUpdate(false)

	const getVideoDuration = (duration) => {
		setVideoLength(duration)
	}

	const addEventHandler = (item, index) => {
		addEventToLayer(item, index, elapsed)
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

		const portionOfBarToFill = 1/30 // one thirtieth of the bar
		const scrollBarWidthRatio = 100 // scroll bar width at normal zoom is 100 so we need to divide by 100 to get the ratio as we zoom in

		// this has to be changed as min/sec frame
		eventObj.start = Number(startPercentage)
		eventObj.end = Number(startPercentage) + videoLength * portionOfBarToFill * (scrollBarWidth / scrollBarWidthRatio)
		currentEvents.push(eventObj)
		setCurrentEvent(eventObj)
		const eventIndex = currentEvents.length - 1 < 0 ? 0 : currentEvents.length - 1
		updateEvents(eventIndex, eventObj, displayLayer)

	}

	const runTimeCheck = (side, event, type) => {

		let canAccessDom = false
		try {
			if(side === `beg`) {
				if(event.start.match(/^\d{2}:\d{2}\.\d{2}/) !== null || event.start.match(/^\d{1}:\d{2}:\d{2}\.\d{2}/) !== null || type === `onBlur`)
					event.start = convertToSeconds(event.start, videoLength)
				else {
					// document.getElementById(`side-tab-message`).innerHTML=`Wrong format`
					canAccessDom = false
				}

			} else if(side === `end`) {
				if(event.end.match(/^\d{2}:\d{2}\.\d{2}/) !== null || event.end.match(/^\d{1}:\d{2}:\d{2}\.\d{2}/) !== null || type === `onBlur`)
					event.end = convertToSeconds(event.end, videoLength)
				else {
					// document.getElementById(`side-tab-message`).innerHTML=`Wrong format`
					canAccessDom = false
				}
			}
		} catch (e) {
			console.log(`catch`) // eslint-disable-line no-console
		}

		// check start event times
		if(event.start < 0 || event.start.isNaN){
			event.start = 0.0
			if(canAccessDom)
				document.getElementById(`side-tab-explanation`).innerText=`Changed start time to 0`

		} else if(event.start >= videoLength) {
			if(canAccessDom)
				document.getElementById(`side-tab-explanation`).innerHTML=`Start time cannot be larger than ${videoLength} <br/> Changed values to match criteria`

		} else if(event.start > event.end){
			if(canAccessDom)
				document.getElementById(`side-tab-explanation`).innerHTML=`Start time cannot be larger than end time <br/> Change values to match criteria`
		}

		// check end event times
		if(event.end <= event.start){
			if(canAccessDom){
				document.getElementsByClassName(`side-tab-input`)[1].value=event.end
				document.getElementById(`side-tab-message`).innerHTML=`Please enter a number bigger than the start time`
			}
		} else if(event.end > videoLength){
			// event.end = 100
			if(canAccessDom){
				document.getElementById(`side-tab-message`).innerHTML=`Please enter a number less than ${videoLength}`
				document.getElementById(`side-tab-explanation`).innerHTML=`End time cannot be larger than ${videoLength} <br/> Change value to ${videoLength} or less`
			}
		}

		if(event.start >= 0 && event.start < event.end && event.end <= videoLength)
			setDisableSave(false)
		else
			setDisableSave(true)

	}

	const runPauseTimeCheck = (side, event, type) => {
		let canAccessDom = false
		try {
			if(side === `beg`) {
				if(event.start.match(/^\d{2}:\d{2}\.\d{2}/) !== null || event.start.match(/^\d{1}:\d{2}:\d{2}\.\d{2}/) !== null || type === `onBlur`)
					event.start = convertToSeconds(event.start, videoLength)
				else {
					// document.getElementById(`side-tab-message`).innerHTML=`Wrong format`
					canAccessDom=false
				}

			}
		} catch (e) {
			console.log(`catch`) // eslint-disable-line no-console
		}
		if(event.start < 0){
			event.start = 0
			if(canAccessDom)
				document.getElementById(`side-tab-explanation`).innerText=`Changed start time to 0`

		} else if(event.start >= videoLength) {
			if(canAccessDom)
				document.getElementById(`side-tab-explanation`).innerHTML=`Start time cannot be larger than ${videoLength} <br/> Changed values to match criteria`

		}
		if(event.start >= 0 && event.start < videoLength){
			if(canAccessDom){
				document.getElementById(`side-tab-message`).style.color=`green`
				document.getElementById(`side-tab-message`).innerHTML=`Start and end times have been updated correctly`
				document.getElementById(`side-tab-explanation`).innerHTML=``
				setDisableSave(false)
			}
		} else
			setDisableSave(true)

	}

	const updateEvents = (index, event, layerIndex, side, type) => {

		if(showSideEditor && document.getElementById(`side-tab-message`))
			document.getElementById(`side-tab-message`).style.color = `red`

		const currentEvents = [...allEvents]
		if(event.type === `Pause`)
			runPauseTimeCheck(side, event, type)
		else
			runTimeCheck(side, event, type)

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
			Object.keys(cEvent[`position`]).filter(val => parseFloat(cEvent.position[val]) < parseFloat(cEvent.position[item])).sort((a, b) =>
				parseFloat(cEvent.position[b]) - parseFloat(cEvent.position[a]))[0]

		const posNext =
			Object.keys(cEvent[`position`]).filter(val => parseFloat(cEvent.position[val]) > parseFloat(cEvent.position[item])).sort((a, b) =>
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
				`${parseInt(Object.keys(pos).sort((a, b) => parseFloat(b) - parseFloat(a))[0]) + 1}`
				: `0`
			let exists = false
			Object.keys(pos).forEach((val) => {
				if (pos[val][0].toString() === parseFloat(time).toFixed(1).toString()) exists = true
			})
			if(exists) return

			cEvent.position[id] = [`${parseFloat(time).toFixed(1)}`, 50, 50, 30, 40]
			updateEvents(index, cEvent, layer)
		}
	}

	const handleEditCensor = async (e, item, int, type) => {
		const object = editCensor
		const index = eventToEdit
		const cEvent = allEvents[index]
		const layer = cEvent.layer
		const pos = cEvent.position
		let value
		if(int === 0)
			value = convertToSeconds(e.target.value, videoLength)
		else
			value = Number(parseFloat(e.target.value).toFixed(0))

		// 0 by default is the actual time of the video when the censor is added
		switch (int) {
		case 0:
			if(value === 0)
				pos[item][0] = `0.0`
			else
				pos[item][0] = value
			document.getElementById(`censorTimeInput-${item}`).value = convertSecondsToHMS(parseFloat(pos[item][0]), videoLength)
			break

		case 1: // x in %
			pos[item][1] = value
			break

		case 2: // y in %
			pos[item][2] = value
			break

		case 3: // width in %
			if(isNaN(value))
				pos[item][3] = 0
			else
				pos[item][3] = value
			break

		case 4: // height in %
			if(isNaN(value))
				pos[item][4] = 0
			else
				pos[item][4] = value
			break

		default:
			break
		}
		cEvent.position = pos
		updateEvents(index, cEvent, layer, ``, type)
		setEditCensor(object)
	}

	const handleEditCensorFromTrackSideMenu = (time, item, int, type) => {
		const object = editCensor
		const index = eventToEdit
		const cEvent = allEvents[index]
		const layer = cEvent.layer
		const pos = cEvent.position
		let value
		if (int === 5)
			value = time
		else
			value = Number(parseFloat(time).toFixed(0))
		switch (int) {
		case 5:
			if(value === 0)
				pos[item][0] = `0.0`
			else
				pos[item][0] = value
			document.getElementById(`censorTimeInput-${item}`).value = convertSecondsToHMS(parseFloat(pos[item][0]), videoLength)
			break

		default:
			break
		}
		cEvent.position = pos
		updateEvents(index, cEvent, layer, ``, type)
		setEditCensor(object)
	}

	// THIS IS PART OF CENSOR
	const handleLastClick = (height, width, x, y, time) => {
		const newWidth = 30
		const newHeight = 40
		const nav = document.getElementById(`navbar`)
		const navHeight = nav.offsetHeight
		if(eventToEdit < allEvents.length && allEvents[eventToEdit].type === `Censor`){

			const index = eventToEdit
			const cEvent = allEvents[index]
			const layer = cEvent.layer
			const pos = cEvent.position
			const id = Object.keys(pos).length !== 0 ?
				`${parseInt(Object.keys(pos).sort((a, b) => parseFloat(b) - parseFloat(a))[0]) + 1}`
				: `0`

			let exists = false
			Object.keys(pos).forEach((val) => {
				if (pos[val][0].toString() === time.toFixed(1).toString()) exists = true
			})
			if(exists){
				const existId = Object.keys(cEvent.position).find(val => cEvent.position[val][0] === `${time.toFixed(1)}`)
				cEvent.position[`${existId}`] = [`${time.toFixed(1)}`, x / width * 100, (y-navHeight) / height * 100, cEvent.position[`${existId}`][3], cEvent.position[`${existId}`][4]]
			} else{
				let newX = x / width * 100
				let newY = (y - navHeight) / height * 100
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
				if(newY + newHeight / 2 > 100){
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
		for (let e = 0; e < allEvents.length; e++) {
			if (allEvents[e].type !== `Censor`){
				const data = {"options": {
					"type": allEvents[e].type.toLowerCase(),
					"label": `${convertSecondsToHMS(allEvents[e].start)} — ${convertSecondsToHMS(allEvents[e].end)}`,
					"start": parseFloat(parseFloat(allEvents[e].start).toFixed(2)),
					"end": parseFloat(parseFloat(allEvents[e].end).toFixed(2)),
					"details": `{}`,
				},
				}
				jsonData.push(data)
			} else if (allEvents[e].type === `Censor`){
				let censorPositionData = {}
				for(const value of Object.values(allEvents[e].position)) {
					const time = value[0]
					const pos = value.slice(1)
					// Y-video positions point to center of the blur, but IC player uses top-left
					pos[0] = pos[0] - pos[2]/2
					pos[1] = pos[1] - pos[3]/2
					pos[2] += 0.15
					pos[3] += 0.15
					censorPositionData[time] = pos
				}
				const data = {"options": {
					"type": allEvents[e].type.toLowerCase(),
					"label": `${convertSecondsToHMS(allEvents[e].start)} — ${convertSecondsToHMS(allEvents[e].end)}`,
					"start": parseFloat(parseFloat(allEvents[e].start).toFixed(2)),
					"end": parseFloat(parseFloat(allEvents[e].end).toFixed(2)),
					"details": {
						"type": `blur`,
						"amount": `30px`,
						"interpolate": true,
						"position": censorPositionData,
					},
				},
				}
				jsonData.push(data)
				censorPositionData = {}
			}
		}
		jsonData.sort((a, b) => (a.options.start > b.options.start) - (a.options.start < b.options.start))
		createFileAnnotationsJson(jsonData, `icplayer`)
	}

	const handleExportAnnotationYVideo = () => {
		const jsonData = []
		jsonData.push(allEvents)
		jsonData.sort((a, b) => (a.start > b.start) - (a.start < b.start))
		createFileAnnotationsJson(jsonData, `yvideo`)
	}

	const createFileAnnotationsJson = (jsonData, option)=> {
		const json = JSON.stringify(jsonData, null, 2)
		const blob = new Blob([json], {type: `application/json`})
		// get the current website url
		// create a link pointing to the blob or binary object
		const link = URL.createObjectURL(blob)
		// create an anchor element to open the link we created
		const a = document.createElement(`a`)
		// trigger download and append file name
		a.download = `${content.name}_${option}_annotations.json`
		a.href = link
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
	}

	const handleImportAnnotation = () => {
		if (allEvents.length !== 0) {
			Swal.fire({
				title: `Import Y-Video Format`,
				text: `Do you want to delete the current annotations?`,
				icon: `question`,
				confirmButtonText: `Yes`,
				showCancelButton: true,
				showDenyButton: true,
				confirmButtonColor: `#0089b7`,
				denyButtonText: `No`,
				cancelButtonText: `Cancel`,
			}).then(async (result) => {
				if (result.isConfirmed) {
					setIsReplace(true)
					await callImportFile()
				} else if (result.isDenied){
					setIsReplace(false)
					await callImportFile()
				}else
					setIsReplace(false)
			}).catch((error)=>{
				Swal.fire(`An error has occur`, error.message, `error`)
			})
		}
	}

	const callImportFile = async () => {
		if(document.getElementById(`import-file`) !== null)
			document.getElementById(`import-file`).click()
	}

	const processImportAnnotation = async () => {
		const filePath = document.getElementById(`import-file`).files
		try {
			const reader = new FileReader()
			reader.onload = (e) => {
				const newElements = JSON.parse(e.target.result)
				if(isReplace)
					allEvents.splice(0, allEvents.length)
				for(let i = 0; i < newElements[0].length; i++)
					allEvents.push(newElements[0][i])
				setBlock(true)
			}
			if(filePath !== undefined)
				reader.readAsText(filePath[0])
		}catch (error){
			Swal.fire(`An error has occur`, error.message, `error`)
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
					editorType='video'
					aspectRatio={aspectRatio}
					eventSeek={eventSeek}
					setEventSeek={setEventSeek}
					eventPosition={eventPosition}
					handleShowTip={handleShowTip}
					toggleTip={toggleTip}
					elapsed={elapsed}
					setElapsed={setElapsed}
				></VideoContainer>

				<Timeline zoom={scrollBarWidth}>

					<section>
						<div className='event-layers' id='layers-component'>
							{layers.map((layer, index) => (
								<div id={`layer-${index}`} className='layer' key={index}>
									<div className='handle' onClick={() => setDisplayLayer(index)}>
										<EventCard event={events[index]} key={index}/>
										<PlusIcon className='plusIcon' onClick={ e => addEventHandler(layer[index], index) }/>
									</div>

									<TrackLayer
										videoLength={videoLength}
										width={layerWidth}
										events={allEvents}
										activeEvent={eventToEdit}
										index={index}
										// onDrop={(item) => eventDropHandler(item, index)}
										updateEvents={updateEvents}
										displayLayer={displayLayer}
										handleEventPosition={handleEventPosition}
										setEventSeek={setEventSeek}
										activeCensorPosition={activeCensorPosition}
										setActiveCensorPosition={setActiveCensorPosition}
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
								className='zoom-indicator'
								id='zoom-indicator'
								bounds='parent'
								enableResizing={
									{
										top: false,
										right: false,
										bottom: false,
										left: false,
										topRight: false,
										bottomRight: false,
										bottomLeft: false,
										topLeft: false,
									}
								}
								dragAxis='x'
								onDrag={(e, d) => {
									handleZoomEandD(e, d)
									if(eventCount > 100)
										debouncedOnDrag()
									else
										updateZoom()
								}}
								onMouseEnter={e => handleShowTip(`te-zoom`,
									{
										x: e.target.getBoundingClientRect().x,
										y: e.target.getBoundingClientRect().y - 100,
										width: e.currentTarget.offsetWidth,
									})
								}
								onMouseLeave={() => toggleTip()}
							></Rnd>
							<img src={zoomIn} alt='' style={{ float: `right`, width: `20px` }}/>
						</div>

						<div className='zoom-scroll'>
							<div style={{ width: `100%`, height: `100%`, display: `flex` }}>
								<div id='zoom-scroll-container' className='zoom-scroll-container'>
									<Rnd
										className= 'zoom-scroll-indicator'
										size={{width: scrollBarWidth !== 0 ? `${scrollBarWidth}%` : `100%`, height: `100%`}}
										enableResizing={
											{
												top: false,
												right: false,
												bottom: false,
												left: false,
												topRight: false,
												bottomRight: false,
												bottomLeft: false,
												topLeft: false,
											}
										}
										bounds='parent'
										onDrag={(e, d) => {
											handleScrollFactor(d.x, false)
										}}
									>
									</Rnd>
								</div>
							</div>

							<div id='time-indicator-container'>
								<div id='layer-time-indicator'>
									<span id='layer-time-indicator-line'></span>
									<span id='layer-time-indicator-line-shadow'></span>
								</div>
							</div>
						</div>
					</div>
				</Timeline>
			</span>

			<EventEditor id='EventEditor' show={showSideEditor}>
				<header>
					<img
						src={helpIcon}
						alt='helpIcon'
						onClick={handleShowHelp}
						onMouseEnter={e => handleShowTip(`help`,
							{
								x: e.target.getBoundingClientRect().x,
								y: e.target.getBoundingClientRect().y + 10,
								width: e.currentTarget.offsetWidth,
							})
						}
						onMouseLeave={() => toggleTip()}
						style={{marginLeft: 10, marginTop: 15}}
					/>
					<div id='save' className='header-button'>
						{disableSave ?
							<button className='disable'>
								<span>Save</span>
							</button>
							:
							<button className='handleSaveAnnotation' onClick={handleSaveAnnotation}>
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
					<div id='export' className='header-button'>
						{disableSave || blockLeave || isLoading ?
							<button className='disable'>
								<span
									onMouseEnter={e => handleShowTip(`export-disable`,
										{
											x: e.target.getBoundingClientRect().x - 15,
											y: e.target.getBoundingClientRect().y + 20,
											width: e.currentTarget.offsetWidth + 20,
										})}
									onMouseLeave={() => toggleTip()}>Export</span>
							</button>
							:
							<div className='import-export'>
								<button className='import-export-button'>Export</button>
								<div className='dropdown-content'>
									<span onClick={handleExportAnnotationYVideo}><b>Y-Video</b></span>
									<span onClick={handleExportAnnotation}><b>IC Player</b></span>
								</div>
							</div>
						}
					</div>
					<div id='import' className='header-button'>
						{disableSave || blockLeave || isLoading ?
							<button className='disable'>
								<span
									onMouseEnter={e => handleShowTip(`import-disable`,
										{
											x: e.target.getBoundingClientRect().x + 10,
											y: e.target.getBoundingClientRect().y + 20,
											width: e.currentTarget.offsetWidth + 20,
										})}
									onMouseLeave={() => toggleTip()}>Import</span>
							</button>
							:
							<div className='import-export'>
								<button id='get_file' className='import-export-button' onClick={handleImportAnnotation}>Import</button>
								<input type='file' accept='.json' id='import-file' onChange={processImportAnnotation} style={{display:`none`}}/>
							</div>
						}
					</div>
				</header>
				<>
					<div className='breadcrumbs'>
						{ showSideEditor &&
								<>
									<>
										<span className='current'>{allEvents.length !== 0 && `${checkSideBarTitle()}`}</span>
										<button className='deleteEventButton' onClick={deleteEvent}>Delete Event</button>
									</>
								</>
						}
					</div>

					{ showSideEditor !== false ?
						<TrackEditorSideMenu
							singleEvent={checkEvent()}
							videoLength={videoLength}
							closeSideEditor={closeSideEditor}
							updateEvents={updateEvents}
							editCensor={editCensor}
							index={eventToEdit}
							handleEditCensor={handleEditCensor}
							handleEditCensorFromTrackSideMenu={handleEditCensorFromTrackSideMenu}
							handleCensorRemove={handleCensorRemove}
							handleAddCensor={handleAddCensor}
							activeCensorPosition={activeCensorPosition}
							setActiveCensorPosition={setActiveCensorPosition}
							toggleTip={toggleTip}
							handleShowTip={handleShowTip}
							setEventSeek={setEventSeek}
							handleEventPosition={handleEventPosition}
							videoCurrentTime={videoCurrentTime}
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
