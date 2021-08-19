import React, { PureComponent } from 'react'

import Style from './styles'
import { TrackHandler } from './../..'

class Timeline extends PureComponent {
	render() {
		return (
			<Style>
				<TrackHandler />
			</Style>
		)
	}
}

export default Timeline