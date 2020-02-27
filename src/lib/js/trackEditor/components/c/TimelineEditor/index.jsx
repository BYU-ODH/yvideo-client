import React, { PureComponent } from 'react'

import Style from './styles'
import { Status, SuperScrollbar, Timeline } from './../..'

class TimelineEditor extends PureComponent {
	render() {
		return (
			<Style>
				<Status />
				<Timeline />
				<SuperScrollbar />
			</Style>
		)
	}
}

export default TimelineEditor