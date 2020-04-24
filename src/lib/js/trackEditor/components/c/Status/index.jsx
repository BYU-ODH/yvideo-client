import React, { PureComponent } from 'react'

import { Controls, TimeBar } from '../../bits'

import Style, { ToggleButton } from './styles'
import arrow from 'assets/carrot.svg'

class Status extends PureComponent {
	render() {
		const {
			playing,
			currentTime,
			totalTime,
			minimized,
		} = this.props.viewstate

		const {
			togglePlay,
			toggleMinimize,
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
				<ToggleButton src={arrow} minimized={minimized} onClick={() => toggleMinimize(!minimized)}/>
			</Style>
		)
	}
}

export default Status

