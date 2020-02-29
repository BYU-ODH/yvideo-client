import React, { PureComponent } from 'react'

import Style from './styles'
import { Status, SuperScrollbar, Timeline } from './../..'

class TimelineEditor extends PureComponent {
	render() {

		const {
			playing,
			time,
		} = this.props.viewstate

		const {
			togglePlay,
		} = this.props.handlers

		const statusViewState = {
			playing,
			time,
		}

		const statusHandlers = {
			togglePlay,
		}

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