import React, { PureComponent } from 'react'
import {
	Player,
	TimelineEditor,
} from './../..'

import Style, { LeftStyle } from './styles'

class TrackEditor extends PureComponent {
	render() {

		const {
			content,
			playing,
			muted,
			minimized,
			currentTime,
			totalTime,
		} = this.props.viewstate

		const {
			togglePlay,
			toggleMinimize,
			toggleMuted,
			handleVideoScrubChange,
			handleTotalTimeChange,
			handleCurrentTimeChange,
			handleSetPlayerRef,
		} = this.props.handlers

		const playerViewstate = {
			playing,
			muted,
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
			muted,
			minimized,
			currentTime,
			totalTime,
		}

		const timelineEditorHandlers = {
			togglePlay,
			toggleMuted,
			toggleMinimize,
			handleVideoScrubChange,
		}

		return (
			<Style>
				<LeftStyle>
					<Player viewstate={playerViewstate} handlers={playerHandlers} />
					<TimelineEditor viewstate={timelineEditorViewstate} handlers={timelineEditorHandlers}/>
				</LeftStyle>
			</Style>
		)
	}
}

export default TrackEditor