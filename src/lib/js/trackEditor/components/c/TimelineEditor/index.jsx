import React, { PureComponent } from 'react'

import Style, { TimelineContainer, StatusContainer } from './styles'
import { Status, SuperScrollbar, Timeline } from './../..'

class TimelineEditor extends PureComponent {
	render() {

		const {
			playing,
			minimized,
			currentTime,
			totalTime,
		} = this.props.viewstate

		const {
			togglePlay,
			toggleMinimize,
			handleVideoScrubChange,
		} = this.props.handlers

		const statusViewState = {
			playing,
			minimized,
			currentTime,
			totalTime,
		}

		const statusHandlers = {
			togglePlay,
			toggleMinimize,
			handleVideoScrubChange,
		}

		console.log(`Playing, timeline editor: `, playing)

		return (
			<Style>
				<StatusContainer>
					<Status viewstate={statusViewState} handlers={statusHandlers}/>
				</StatusContainer>
				<TimelineContainer minimized={minimized}>
					<Timeline />
					<SuperScrollbar />
				</TimelineContainer>
			</Style>
		)
	}
}

export default TimelineEditor