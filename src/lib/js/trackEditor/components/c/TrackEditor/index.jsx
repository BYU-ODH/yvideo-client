import React, { PureComponent } from 'react'
import {
	EventEditor,
	Player,
	TimelineEditor,
} from './../..'

import Style, { LeftStyle } from './styles'

class TrackEditor extends PureComponent {
	render() {

		const {
			content,
			playing,
			minimized,
			currentTime,
			totalTime,
		} = this.props.viewstate

		const {
			togglePlay,
			toggleMinimize,
			handleVideoScrubChange,
			handleTotalTimeChange,
			handleCurrentTimeChange,
			handleSetPlayerRef,
		} = this.props.handlers

		const playerViewstate = {
			playing,
			content,
		}

		const playerHandlers = {
			togglePlay,
			handleTotalTimeChange,
			handleCurrentTimeChange,
			handleSetPlayerRef,
		}

		const timelineEditorViewstate = {
			playing,
			minimized,
			currentTime,
			totalTime,
		}

		const timelineEditorHandlers = {
			togglePlay,
			toggleMinimize,
			handleVideoScrubChange,
		}

		const eventEditorViewstate = {

		}

		return (
			<Style>
				<LeftStyle>
					<Player viewstate={playerViewstate} handlers={playerHandlers} />
					<TimelineEditor viewstate={timelineEditorViewstate} handlers={timelineEditorHandlers}/>
				</LeftStyle>
				<EventEditor viewstate={eventEditorViewstate} />
			</Style>
		)
	}
}

export default TrackEditor