import React, { useState } from 'react'

import Style, { Timeline, EventList, EventListCarat } from './styles'

const TrackEditor = props => {

	// const {

	// state

	// playing,
	// volume,
	// muted,
	// played,
	// duration,
	// elapsed,
	// playbackRate,

	// handlers

	// toggleMute,
	// setVolume,
	// handleReady,
	// handleProgress,
	// handleDuration,
	// handlePlaybackRate,
	// handlePause,
	// handlePlay,

	// } = props.video

	const [tab, setTab] = useState(`events`)
	const [timelineMinimized, setTimelineMinimized] = useState(false)
	const [eventListMinimized, setEventListMinimized] = useState(false)

	const [selectedEvent, setSelectedEvent] = useState(``)

	const toggleTimeline = () => {
		setTimelineMinimized(!timelineMinimized)
	}

	const toggleEventList = () => {
		setEventListMinimized(!eventListMinimized)
	}

	const handleTabChange = tab => () => {
		setTab(tab)
	}

	return (
		<Style selectedEvent={selectedEvent}>

			<span>
				<div className='video'>
					{props.children}
				</div>

				<Timeline minimized={timelineMinimized}>
					<header>

					</header>
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

				<div className='breadcrumbs'>
					<span>Events</span>
					{!!selectedEvent &&
						<>
							<span className='carat'></span>
							<span className='current'>Skip</span>
						</>
					}
					{/* <span className='current'>{selectedEvent}</span> */}
					{/* <button className='close'></button> */}
				</div>

				<div className='event-details'>
					{selectedEvent}
				</div>
			</EventList>

		</Style>
	)
}

export default TrackEditor
