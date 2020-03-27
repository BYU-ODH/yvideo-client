import React, { PureComponent } from 'react'

import { Controls, TimeBar } from '../../bits'

import Style, { ToggleButton } from './styles'

class Status extends PureComponent {
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

		const controlsViewState = {
			playing,
			currentTime,
			totalTime,
		}

		const controlsHandlers = {
			togglePlay,
		}

		const timebarViewState = {
			currentTime,
			totalTime,
		}

		const timebarHandlers = {
			handleVideoScrubChange,
		}

		return (
			<Style >
				<Controls style={`width: 505`} viewstate={controlsViewState} handlers={controlsHandlers}/>
				<TimeBar viewstate={timebarViewState} handlers={ timebarHandlers } />
				<ToggleButton />
			</Style>
		)
	}
}

export default Status

