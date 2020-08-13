import React, { useState, useEffect } from 'react'

import Style, { Timeline, EventList, EventListCarat, NewLayer, Icon, AnnotationMessage } from './styles'

import { DndProvider } from 'react-dnd'
import { Rnd } from "react-rnd"

import Backend from 'react-dnd-html5-backend'

import { EventCard, TrackEditorSideMenu } from 'components/bits'

import { Controller, TrackLayer } from 'components'

import skipIcon from 'assets/event_skip.svg'
import muteIcon from 'assets/event_mute.svg'
import pauseIcon from 'assets/event_pause.svg'
import commentIcon from 'assets/event_comment.svg'
//import censorIcon from 'Assets/event_censor.svg'
import blankIcon from 'assets/event_blank.svg'
import trashIcon from 'assets/trash_icon.svg'
import closeIcon from 'assets/close_icon.svg'
import saveIcon from 'assets/annotations-save.svg'

import llIcon from 'assets/te-chevrons-left.svg'
import rrIcon from 'assets/te-chevrons-right.svg'
import lIcon from 'assets/te-chevron-left.svg'
import rIcon from 'assets/te-chevron-right.svg'

//ICONS FOR THE EVENTS CAN BE FOUND AT https://feathericons.com/
//TRASH ICON COLOR IS: #eb6e79. OTHER ICON STROKES ARE LIGHT BLUE VAR IN CSS: #0582ca

import plus from 'assets/plus-square.svg'

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

	const [allEvents, setAllEvents] = useState(eventsArray)
	const [layers, setLayers] = useState([])
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
	const [zoomFactor, setZoomFactor] = useState(0)
	const [scrollFactor, setScrollFactor] = useState(0)
	const [scrollWidth, setScrollWidth] = useState(0)
	const [annotationsSaved, setSaved] = useState(false)
	const [scrollBarWidth, setScrollBar] = useState(0)
	//const [editCensor, setEditCensor] = useState({})
	//const [lastClick, setLastClick] = useState({x: 0, y: 0})

	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth
	})

	useEffect(() => {
		setScrollWidth(document.getElementsByClassName('zoom-scroll-container')[0].clientWidth)
		function handleResize() {
			setZoomFactor(0)
			setWidth(0)
			setTimeout(() => {
				setDimensions({
					height: window.innerHeight,
					width: window.innerWidth
				})
			}, 500);
			setZoomFactor(1)
			setWidth(1)
		}
		window.addEventListener('resize', handleResize)
		setAllEvents(eventsArray)

		let largestLayer = 0

		//SORTING THE ARRAYS TO HAVE A BETTER WAY TO HANDLE THE EVENTS
		if(eventsArray !== undefined && eventsArray.length > 0){
			eventsArray.sort((a, b) => (a.layer > b.layer) ? 1 : -1)
			largestLayer = eventsArray[eventsArray.length-1].layer
		}

		eventsArray.sort((a, b) => (a.layer > b.layer) ? 1 : -1)

		//Find the largets layer number
		const initialLayers = []

		//new Array(largestLayer+1).fill(0)

		for(let i = 0; i < largestLayer + 1; i++){
			//console.log(i)
			initialLayers.push([i])
		}

		setLayers(initialLayers)
		setEvents(allEvents)

		if(annotationsSaved){
			setTimeout(() => {
				setSaved(false)
			}, 3000);
		}

	}, [eventsArray])

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

	const handleTabChange = tab => () => {
		setTab(tab)
	}

	const handleAddLayer = () => {
		const currentLayers = [...layers]

		const newLayer = currentLayers.length

		currentLayers.push(newLayer)
		setLayers(currentLayers)
		setSideEditor(false)
		setDisplayLayer(currentLayers.length-1)
	}

	const handleRemoveLayer = (e, index) => {
		//console.log(e)
		if(e !== null){
			//console.log('remove layer: ', index)
			let currentLayers = [...layers]
			let currentEvents = [...allEvents]
			let toDelete = []

			currentLayers.splice(index, 1)

			currentEvents.forEach((element, i) => {
				if(element.layer === index){
					toDelete.push(element)
				}
			});

			//console.log('%c to delete', 'color: red;', toDelete)

			toDelete.forEach((element) => {
				currentEvents.splice(currentEvents.findIndex(item => item === element), 1)
			});

			//console.log('%c left Events', 'color: blue;', currentEvents)

			setLayers(currentLayers)
			setSideEditor(false)
			setDisplayLayer(currentLayers.length-1)
			setAllEvents(currentEvents)
			setEvents(currentEvents)
		}
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
		setSaved(true)
		let content = currentContent
		content.settings.annotationDocument = [...allEvents]

		updateContent(content)
	}

	const handleScrollFactor = (direction) => {
		//console.log('called')
		if(document.getElementsByClassName('layer-container') !== undefined){
			let scrubber = document.getElementById('time-bar')
			let timeIndicator = document.getElementById('time-indicator-container')
			let alllayers = Array.from(document.getElementsByClassName('layer-container'))
			let currentLayerWidth = document.getElementsByClassName('events')[0].clientWidth
			let scrollBarContainer = ((document.getElementsByClassName('zoom-scroll-container')[0].offsetWidth))
			let scrollBar = document.getElementsByClassName('zoom-scroll-indicator')[0]

			let cLeft = parseInt(scrollBar.style.left)
			let scrollBarOffset = scrollBarContainer * 0.03
			let lastPossibleRight = document.getElementsByClassName('zoom-scroll-container')[0].clientWidth - document.getElementsByClassName('zoom-scroll-indicator')[0].clientWidth
			//console.log(lastPossibleRight)
			console.log(cLeft)
			switch (direction) {
				case 'start':
					scrubber.scrollLeft = 0
					timeIndicator.scrollLeft = 0
					alllayers.forEach((element, i) => {
						alllayers[i].scrollLeft = 0
					});
					scrollBar.style.left = '0px'

					break;
				case 'left':
					scrubber.scrollLeft -= currentLayerWidth * 0.03
					timeIndicator.scrollLeft -= currentLayerWidth * 0.03
					alllayers.forEach((element, i) => {
						alllayers[i].scrollLeft -= currentLayerWidth * 0.03
					});
					//FIND 3 PERCENT OF PARENT
					//CURRENT LEFT MINUS NEW LEFT
					if(isNaN(cLeft) === false && (cLeft - scrollBarOffset) > -1){
						scrollBar.style.left = `${cLeft - scrollBarOffset}px`
					}
					else if ((cLeft - scrollBarOffset) < 0){
						scrollBar.style.left = `0px`
					}

					break;
				case 'right':
					scrubber.scrollLeft += currentLayerWidth * 0.03
					timeIndicator.scrollLeft += currentLayerWidth * 0.03
					//console.log(scrollPercentage / scrollIndicatorWidth)
					alllayers.forEach((element, i) => {
						alllayers[i].scrollLeft += currentLayerWidth * 0.03
					});
					if(zoomFactor !== 0){
						if(isNaN(cLeft) === true){
							scrollBar.style.left = `${scrollBarOffset}px`
						}
						else {
							scrollBar.style.left = `${cLeft + scrollBarOffset}px`
						}
					}

					if ((cLeft + scrollBarOffset) > lastPossibleRight){
						console.log('got to the end')
						scrollBar.style.left = `${scrollBarContainer - scrollBar.clientWidth}px`
					}

					break;
				case 'end':
					scrubber.scrollLeft += currentLayerWidth
					timeIndicator.scrollLeft += currentLayerWidth
					alllayers.forEach((element, i) => {
						alllayers[i].scrollLeft += currentLayerWidth
					});
					scrollBar.style.left = `${scrollBarContainer - scrollBar.clientWidth}px`

					break;

				default:
					break;
			}
		}
	}

	//OLD SCROLL FUNCTIONALITY
	// const handleScrollFactorD = (e, d) => {
	// 	console.log('in scroll')
	// 	setScrollFactor(d.x)
	// 	console.log(d)
	// 	let scrollPercentage = ((d.x * 100) / scrollWidth)
	// 	//console.log(scrollPercentage)

	// 	if(document.getElementsByClassName('layer-container') !== undefined){
	// 		let scrubber = document.getElementById('time-bar')
	// 		let timeIndicator = document.getElementById('time-indicator-container')
	// 		let alllayers = Array.from(document.getElementsByClassName('layer-container'))
	// 		let currentLayerWidth = document.getElementsByClassName('events')[0].clientWidth
	// 		let scrollIndicatorWidth = ((document.getElementsByClassName('zoom-scroll-indicator')[0].clientWidth) * 100) / scrollWidth
	// 		let scrollBar = document.getElementsByClassName('zoom-scroll-indicator')[0]

	// 		if(d.x === 0){
	// 			scrubber.scrollLeft -= d.x + 100 * 100
	// 			timeIndicator.scrollLeft -= d.x + 100 * 100
	// 			console.log('got here')
	// 			scrollBar.style.transform = 'translate(0px, 0px)'
	// 			alllayers.forEach((element, i) => {
	// 				alllayers[i].scrollLeft -= d.x + 100 * 100
	// 			});
	// 		}
	// 		else if(d.x < scrollFactor){
	// 			scrubber.scrollLeft = ((scrollPercentage * currentLayerWidth) / 100)
	// 			timeIndicator.scrollLeft = ((scrollPercentage * currentLayerWidth) / 100)
	// 			alllayers.forEach((element, i) => {
	// 				alllayers[i].scrollLeft = ((scrollPercentage * currentLayerWidth) / 100)
	// 			});
	// 		}
	// 		else {
	// 			scrubber.scrollLeft = (((scrollPercentage) * currentLayerWidth) / 100)
	// 			timeIndicator.scrollLeft = (((scrollPercentage) * currentLayerWidth) / 100)
	// 			console.log(scrollPercentage / scrollIndicatorWidth)
	// 			alllayers.forEach((element, i) => {
	// 				if(scrollPercentage + scrollIndicatorWidth >= 100){
	// 					alllayers[i].scrollLeft = (((scrollPercentage + scrollIndicatorWidth) * currentLayerWidth) / 100)
	// 				}
	// 				else {
	// 					alllayers[i].scrollLeft = (((scrollPercentage + (scrollIndicatorWidth / scrollPercentage )) * currentLayerWidth) / 100)
	// 				}
	// 			});

	// 			// scrubber.scrollLeft = (((scrollPercentage  + scrollIndicatorWidth / 2) * currentLayerWidth) / 100)
	// 			// timeIndicator.scrollLeft = (((scrollPercentage  + scrollIndicatorWidth / 2) * currentLayerWidth) / 100)
	// 			// alllayers.forEach((element, i) => {
	// 			// 	//console.log(currentLayerWidth)
	// 			// 	console.log(scrollPercentage + (scrollIndicatorWidth))
	// 			// 	if(scrollPercentage + scrollIndicatorWidth >= 100){
	// 			// 		alllayers[i].scrollLeft = (((scrollPercentage + scrollIndicatorWidth) * currentLayerWidth) / 100)
	// 			// 	}
	// 			// 	else {
	// 			// 		alllayers[i].scrollLeft = (((scrollPercentage + scrollIndicatorWidth / 2) * currentLayerWidth) / 100)
	// 			// 	}
	// 			// });
	// 		}
	// 	}
	// }

	// THIS IS PART OF CENSOR
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

	return (
		<Style>
			<DndProvider backend={Backend}>

			<span style={{ zIndex: 0 }}>

				<Controller className='video'
					url={props.viewstate.url}
					handlers={togglendTimeline}
					getDuration={getVideoDuration}
					minimized={timelineMinimized}
					togglendTimeline={togglendTimeline}
					>
				</Controller>

				<Timeline minimized={timelineMinimized} zoom={scrollBarWidth}>

					<section>
						{/* //TODO: Add delete logic */}
						<div className='event-layers'>

								{layers.map((layer, index) => (
									<div className={`layer`} key={index}>
										<div className={`handle`} onClick={() => setDisplayLayer(index)}>
											<p>Layer {index} <img className={'layer-delete'} src={trashIcon} width="20px" width="20px" onClick={ e => handleRemoveLayer(e, index)}/></p>
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
												displayLayer={displayLayer}
											/>
									</div>
								))}


								<NewLayer onClick={handleAddLayer}>
									<Icon src={plus}/>
								</NewLayer>
								<br/><br/><br/><br/><br/><br/><br/>
						</div>

					</section>
					<div className='zoom-controls'>
					{/* ADD ZOOM ICON */}
						<div className='zoom-factor' style={{ visibility: `${timelineMinimized ? ` hidden` : `initial`}`}}>
							<Rnd
								className={'zoom-indicator'}
								bounds={'parent'}
								enableResizing={{top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}
								dragAxis="x"
								onDragStop={(e, d) => {
									if(d.x < zoomFactor){
										if(d.x === 0){
											//console.log('zero')
											setZoomFactor(0)
											setWidth(0)
											handleScrollFactor('start')
										}
										else {
											//console.log('smaller')
											setZoomFactor(d.x)
											setWidth(-(Math.abs(zoomFactor - d.x) * videoLength / 10))
										}
									}
									else if(d.x > zoomFactor) {
										//console.log('larger')
										setZoomFactor(d.x)
										setWidth((Math.abs(zoomFactor - d.x) * videoLength / 10))
									}
									setScrollBar(document.getElementsByClassName('layer-container')[0].clientWidth * 100 / document.getElementsByClassName('events')[0].clientWidth)
								}}
							></Rnd>
						</div>
						<div className='zoom-scroll' style={{ visibility: `${timelineMinimized ? ` hidden` : `initial`}`}}>

							<div style={{ width: '90%', height: '100%', display: 'flex', marginLeft: '5%' }}>

								{/* <Rnd
									className={'zoom-scroll-indicator'}
									bounds={'parent'}
									enableResizing={{top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}
									dragAxis="x"
									onDrag={(e, d) => handleScrollFactor(e, d)}
								></Rnd> */}
								<span onClick={ e => handleScrollFactor('start') } style={{ margin: 'auto' }}><img src={llIcon}/></span>
								<span onClick={ e => handleScrollFactor('left') } style={{ margin: 'auto' }}><img src={lIcon}/></span>
									<div className={'zoom-scroll-container'}>
										{/* <div style={{ width: '98%',  height: '100%', backgroundColor: 'red'}}></div> */}
										<div className={'zoom-scroll-indicator'}></div>
									</div>
								<span onClick={ e => handleScrollFactor('right') } style={{ margin: 'auto' }}><img src={rIcon}/></span>
								<span onClick={ e => handleScrollFactor('end') } style={{ margin: 'auto' }}><img src={rrIcon}/></span>
							</div>
							<div id={'time-indicator-container'}>
								<div id={'layer-time-indicator'}>
									<span id={'layer-time-indicator-line'}></span>
								</div>
							</div>
						</div>
					</div>
				</Timeline>

			</span>

			<EventList minimized={eventListMinimized}>

				<header>
					{/* <div className='carat'>
						<EventListCarat onClick={toggleEventList} className={eventListMinimized ? `minimized` : ``}/>
					</div> */}
					{/* <div className={`tab active`}>Events</div> */}
					<div className={`save`}><button onClick={handleSaveAnnotation}><img src={`${saveIcon}`}/><span>Save</span></button></div>

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
								<div className='eventsList'>
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
		<>
			<AnnotationMessage style={{ visibility: `${annotationsSaved ? (`visible`) : (`hidden`)}`, opacity: `${annotationsSaved ? (`1`) : (`0`)}`, }}>
				<h2>Annotations saved successfully</h2>
			</AnnotationMessage>
		</>
	</Style>
	)
}

export default TrackEditor