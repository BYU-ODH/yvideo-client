import React, { useState } from 'react'

import { useDrop } from 'react-dnd'

import Style, { Timeline, EventList, EventListCarat } from './styles'

import { Draggable } from 'components/bits'

import skipIcon from 'assets/event_skip.svg'
import muteIcon from 'assets/event_mute.svg'
import pauseIcon from 'assets/event_pause.svg'
import commentIcon from 'assets/event_comment.svg'
import censorIcon from 'assets/event_censor.svg'

import carat from 'assets/carat_white.svg'

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

	} = props.video

	const [tab, setTab] = useState(`events`)
	const [timelineMinimized, setTimelineMinimized] = useState(false)
	const [eventListMinimized, setEventListMinimized] = useState(false)

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

	const [{ canDrop, isOver }, dropRef] = useDrop({
		accept: `timeline-event`,
		drop: item => {
			console.log(`you just dropped:`, item)
			return { name: `Timeline` }
		},
		hover: (item, monitor) => {

			// TODO: handle the drop action, add an event to the timeline

			// const {
			// 	clientOffset, // current mouse position relative to viewport
			// 	initialClientOffset, // where the mouse was when you grabbed the original element relative to the viewport
			// 	initialSourceClientOffset, // where the original drag element is on the page relative to viewport
			// } = monitor.internalMonitor.store.getState().dragOffset

		},
		collect: monitor => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	})

	const isActive = canDrop && isOver

	// TODO: turn this into a way to tell the timeline to show the current
	// drop position, according to the mouse position
	let backgroundColor = `inherit`
	if (isActive) backgroundColor = `rgba(0,255,0,.1)`
	else backgroundColor = `rgba(255,0,0,.1)`

	return (
		<Style selectedEvent={selectedEvent}>

			<span>

				<div className='video'>
					{props.children}
				</div>

				<Timeline
					minimized={timelineMinimized}
					backgroundColor={backgroundColor}
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
									<Draggable event={event} key={i} />
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
