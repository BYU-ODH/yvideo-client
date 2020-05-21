import React, { useState } from 'react'

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

	//const searchEvents = [] //array of events

	// forEach(
	// 	if searchEvents[index].beginningTime >= elapsed && elapsed < searchEvents[index].endTime --> execute this event.
	// )

	// delete this when you get the actual layers
	// TODO: Deserialize events into JS objects (Grant made an example)
	const initialLayers = [
		{
			name: `Layer 0`,
			events: [],
		}
	]

	//Pseudo code
	//Data (Rob wants)
	//const downloadedJSON = [{events, layerIndex}, {events}, {events},];

	//Visually
	// const initialLayers = [
	// 	{
	// 		name: `Layer 0`,
	// 		events: [],
	// 	},
	// 	{
	// 		name: `Layer 1`,
	// 		events: [SkipEvent.exec()],
	// 	}
	// ]

	//For executing the video events
			 // Giving an "order of operations", what events take precedence and then what layer is most important?
			 // Skip has the highest precendence
			 // If type of event == "Skip"


	//every .1 (interval) sec search through events and see if any of them have a start and end time is between current time

	const [showSideEditor, setSideEditor] = useState(false)
	const [tab, setTab] = useState(`events`)
	const [timelineMinimized, setTimelineMinimized] = useState(false)
	const [eventListMinimized, setEventListMinimized] = useState(false)
	// TODO: Replace with dynamic data from server
	const [layers, setLayers] = useState(initialLayers)

	const dateElapsed = new Date(null)
	dateElapsed.setSeconds(elapsed)
	const formattedElapsed = dateElapsed.toISOString().substr(11, 8)

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

		const newLayer = {
			name: `Layer ${currentLayers.length}`,
			events: [],
		}

		currentLayers.push(newLayer)
		setLayers(currentLayers)
	}

	const eventDropHandler = (item, index) => {
		console.log(`Event Drop Handler: `, item, index)
		addEventToLayer(item, index)
	}

	const addEventToLayer = (item, index) => {
		// TODO: Change this to use real JS event objects and insert based on time
		const currentLayers = [...layers]
		const targetLayer = currentLayers[index]
		console.log('ADDING EVENT TO LAYER INDEX:', index)
		const matchingEvent = filterValue(events, `name`, item.id)

		const eventObj = {
			name: matchingEvent.name,
			icon: matchingEvent.icon,
			beginningTime: matchingEvent.beginningTime,
			endTime: matchingEvent.endTime,
			layer: index
		}

		targetLayer.events.push(eventObj)
		setLayers(currentLayers)
	}

	const openSideEditor = (layerIndex, eventIndex) => {
		console.log('Layer', layerIndex, 'Event', eventIndex)
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

	console.log('RENDERED')

	return (
		<Style>

			<span>

				<div className='video'>
					{props.children}
				</div>

				<Timeline
					minimized={timelineMinimized}
					played={played}
				>

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
								<TrackLayer key={index} layer={layer} index={index} onDrop={(item) => eventDropHandler(item,index)} sideEditor={openSideEditor}/>
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
							{showSideEditor &&
								<>
									<span className='carat'></span>
									<span className='current'>Event Type</span>
								</>
							}
							{/* <button className='close'></button> */}
						</div>
						{ showSideEditor ? (
							<SideEditor>
								<div>
									<p onClick={closeSideEditor} className='closeEditor'>x</p>
									<div className='center'>
										<label>Start</label>
										<label>End</label>
									</div>
									<div className='center'>
										<input type='text' placeholder='bTime'/>
										<input type='text' placeholder='eTime'/>
									</div>
									<br/>
									<p>Message</p>
								</div>
							</SideEditor>
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
