import React, { PureComponent } from 'react'

import Style from './styles'
import { Status, SuperScrollbar, Timeline } from './../..'

class TimelineEditor extends PureComponent {
	render() {

		const {
			playing,
			currentTime,
			totalTime,
		} = this.props.viewstate

		const {
			togglePlay,
			handleVideoScrubChange,
		} = this.props.handlers

		const statusViewState = {
			playing,
			currentTime,
			totalTime,
		}

		const statusHandlers = {
			togglePlay,
			handleVideoScrubChange,
		}

		console.log(`Playing, timeline editor: `, playing)

		return (
			<Style>
				<Status viewstate={statusViewState} handlers={statusHandlers}/>
				<Timeline />
				<SuperScrollbar />
			</Style>
		)
	}
}

export default TimelineEditor