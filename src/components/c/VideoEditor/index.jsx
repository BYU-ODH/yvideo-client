import React from 'react'

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import { VideoContainer, TrackLayer } from 'components'

import Style, {
	SkipIcon,
	MuteIcon,
	PauseIcon,
	CommentIcon,
	CensorIcon,
	BlankIcon,
	trashIcon,
	closeIcon,
	zoomIn,
	zoomOut,
} from './styles'

const VideoEditor = props => {

	const {
		eventsArray,
		currentContent,
		subs,
		contentError,
		controllerRef,
		videoLength,
		timelineMinimized,
		displayLayer,
		allEvents,
		eventToEdit,
		activeCensorPosition,
	} = props.viewstate

	const {
		handleShowTip,
		toggleTip,
		handleShowHelp,
		togglendTimeline,
		getVideoDuration,
		setCurrentTime,
		handleLastClick,
		updateEvents,
		setActiveCensorPosition,
	} = props.handlers

	const events = [
		{
			type: `Skip`,
			icon: SkipIcon,
			start: 0,
			end: 10,
			layer: 0,
		},
		{
			type: `Mute`,
			icon: MuteIcon,
			start: 0,
			end: 10,
			layer: 0,
		},
		{
			type: `Pause`,
			icon: PauseIcon,
			start: 0,
			end: 10,
			layer: 0,
		},
		{
			type: `Comment`,
			icon: CommentIcon,
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
			icon: CensorIcon,
			start: 0,
			end: 10,
			layer: 0,
			position: {

			},
		},
		{
			type: `Blank`,
			icon: BlankIcon,
			start: 0,
			end: 10,
			layer: 0,
		},
	]

	return (
		<>
			<Style>
				<DndProvider backend={Backend}>
					<span style={{ zIndex: 0 }}>

						<VideoContainer
							ref = {controllerRef}
							className='video'
							url={props.viewstate.url}
							handlers={togglendTimeline}
							getDuration={getVideoDuration}
							getVideoTime={setCurrentTime}
							minimized={timelineMinimized}
							togglendTimeline={togglendTimeline}
							handleLastClick = {handleLastClick}
							events = {allEvents}
							updateEvents={updateEvents}
							eventToEdit={eventToEdit}
							activeCensorPosition = {activeCensorPosition}
							setActiveCensorPosition = {setActiveCensorPosition}
						>
						</VideoContainer>
					</span>
				</DndProvider>
			</Style>
		</>
	)
}

export default VideoEditor
