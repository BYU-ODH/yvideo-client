import React, { PureComponent } from 'react'

import { Controls, TimeBar } from '../../bits'

import Style, { ToggleButton } from './styles'

class Status extends PureComponent {
	render() {
		const {
			playing,
			time,
		} = this.props.viewstate

		const {
			togglePlay,
		} = this.props.handlers

		const controlsViewState = {
			playing,
			time,
		}

		const controlsHandlers = {
			togglePlay,
		}

		return (
			<Style >
				<Controls style={`width: 505`} viewstate={controlsViewState} handlers={controlsHandlers}/>
				<TimeBar />
				<ToggleButton />
			</Style>
		)
	}
}

export default Status

