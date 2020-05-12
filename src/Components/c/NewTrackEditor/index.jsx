import React, { useState } from 'react'

import { useDrop } from 'react-dnd'

import Style, { Timeline, EventList, EventListCarat, HandleIcon, NewLayer, Icon } from './styles'

import { EventCard } from 'components/bits'

import skipIcon from 'assets/event_skip.svg'
import muteIcon from 'assets/event_mute.svg'
import pauseIcon from 'assets/event_pause.svg'
import commentIcon from 'assets/event_comment.svg'
import censorIcon from 'assets/event_censor.svg'

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

		selectedEvent,
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

	// delete this when you get the actual layers
	const initialLayers = [
		{
			name: `Layer 0`,
			events: [
				{
					name: `Skip`,
					icon: `snip`,
				},
			],
		},
	]

	const [tab, setTab] = useState(`events`)
	const [timelineMinimized, setTimelineMinimized] = useState(false)
	const [eventListMinimized, setEventListMinimized] = useState(false)
	// TODO: Replace with dynamic data from server
	const [layers, setLayers] = useState(initialLayers)

	const dateElapsed = new Date(null)
	dateElapsed.setSeconds(elapsed)
	const formattedElapsed = dateElapsed.toISOString().substr(11, 8)

	const toggleTimeline = () => {
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
			events: [
				{
					name: `Skip`,
					icon: `snip`,
				},
			],
		}

		currentLayers.push(newLayer)
		setLayers(currentLayers)
	}

	const events = [
		{
			name: `Skip`,
			icon: skipIcon,
		},
		{
			name: `Mute`,
			icon: muteIcon,
		},
		{
			name: `Pause`,
			icon: pauseIcon,
		},
		{
			name: `Comment`,
			icon: commentIcon,
		},
		{
			name: `Censor`,
			icon: censorIcon,
		},
	]

	// Drag and Drop

	const [collectedProps, dropRef] = useDrop({
		accept: `timeline-event`,
		drop: item => {

			// TODO: handle the drop action, add an event to the timeline
			// HINT: The `item` parameter of this method is the event, you can find it in the Draggable component in components/bits

			console.log(`you just dropped:`, item)
			return { name: `Timeline` }
		},
		hover: (item, monitor) => {

			// const {
			// 	clientOffset, // current mouse position relative to viewport
			// 	initialClientOffset, // where the mouse was when you grabbed the original element relative to the viewport
			// 	initialSourceClientOffset, // where the original drag element is on the page relative to viewport
			// } = monitor.internalMonitor.store.getState().dragOffset

		},
		// collect: monitor => {
		// 	return {
		// 		isOver: monitor.isOver(),
		// 		canDrop: monitor.canDrop(),
		// 	}
		// },
	})

	return (
		<Style selectedEvent={selectedEvent}>

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

						<button className={`toggle-timeline${timelineMinimized ? ` minimized` : ``}`} onClick={toggleTimeline}>
							<img src={carat} alt='Toggle Timeline' />
						</button>

					</header>

					<span className='current-time'></span>
					<span className='current-time-dot'></span>

					<section ref={dropRef}>
						{/* //TODO: Add delete logic */}
						<div className='event-layers'>
							{layers.map((layer, index) => (
								<div className='layer' key={index}>
									<span className='handle'>
										<p>{layer.name}</p>
										<HandleIcon />
									</span>
									<span className='events'>
										{/* overflow-x should be like scroll or something */}
										{layer.events.map((event, index) => (
											<span className='layer-event' key={index}>
												{/* //TODO: Change the p tag to be an svg icon */}
												<p>{event.icon}</p>
												<p>{event.name}</p>
											</span>
										))}
									</span>
								</div>
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
							{!!selectedEvent &&
								<>
									<span className='carat'></span>
									<span className='current'>{selectedEvent}</span>
								</>
							}
							{/* <button className='close'></button> */}
						</div>

						{selectedEvent !== `` ?
							<div className='event-details'>
								{selectedEvent}
							</div>
							:
							<div className='events'>
								{events.map((event, i) => (
									<EventCard event={event} key={i} />
								))}
							</div>
						}
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
