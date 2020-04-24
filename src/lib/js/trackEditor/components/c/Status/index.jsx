import React, { PureComponent } from 'react'

import { Controls, TimeBar } from '../../bits'

import Style, { ToggleButton } from './styles'
import arrow from 'assets/carrot.svg'

class Status extends PureComponent {
	render() {
		const {
			playing,
			muted,
			currentTime,
			totalTime,
			minimized,
		} = this.props.viewstate

		const {
			togglePlay,
			toggleMuted,
			toggleMinimize,
			handleVideoScrubChange,
		} = this.props.handlers

		const controlsViewState = {
			playing,
			muted,
			currentTime,
			totalTime,
		}

		const controlsHandlers = {
			togglePlay,
			toggleMuted,
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
				<ToggleButton src={arrow} minimized={minimized} onClick={() => toggleMinimize(!minimized)}/>
			</Style>
		)
	}
}

export default Status

