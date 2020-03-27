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
			currentTime,
			totalTime,
		} = this.props.viewstate

		const {
			togglePlay,
			handleVideoScrubChange,
		} = this.props.handlers

		const playerViewstate = {
			content,
		}

		const timelineEditorViewstate = {
			currentTime,
			totalTime,
		}

		const timelineEditorHandlers = {
			togglePlay,
			handleVideoScrubChange,
		}

		const eventEditorViewstate = {

		}

		return (
			<Style>
				<LeftStyle>
					<Player viewstate={playerViewstate} />
					<TimelineEditor viewstate={timelineEditorViewstate} handlers={timelineEditorHandlers}/>
				</LeftStyle>
				<EventEditor viewstate={eventEditorViewstate} />
			</Style>
		)
	}
}

export default TrackEditor