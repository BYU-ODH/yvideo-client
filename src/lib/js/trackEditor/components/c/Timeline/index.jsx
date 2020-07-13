import React, { PureComponent } from 'react'

import Style from './styles'
import { TrackHandler, TrackMedia } from './../..'

class Timeline extends PureComponent {
	render() {
		return (
			<Style>
				<TrackHandler />
				<TrackMedia />
			</Style>
		)
	}
}

export default Timeline